'use server';

import { createClient } from '@/lib/supabase/server';
import { maskDisplayName } from '@/lib/displayName';
import { AVATAR_EMOJIS, ACCENT_COLORS } from '@/lib/constants/avatar';
import { checkRateLimit, RATE_LIMITS } from '@/lib/rateLimit';
import { getWeekStartString as getWeekStartStringFromDate } from '@/lib/streakChain';

const MAX_DISPLAY_NAME_LENGTH = 100;
const VALID_HEX_COLOR = /^#[0-9A-Fa-f]{6}$/;
const ACCENT_IDS = new Set(ACCENT_COLORS.map((c) => c.id));

function validateDisplayName(value: string | null): string | null {
  if (value === null || value === '') return null;
  const trimmed = String(value).trim();
  return trimmed.length > MAX_DISPLAY_NAME_LENGTH ? trimmed.slice(0, MAX_DISPLAY_NAME_LENGTH) : trimmed || null;
}

function validateAvatarUrl(value: string | null): string | null {
  if (value === null || value === '') return null;
  const url = String(value).trim();
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
  if (!base) return null;
  const prefix = `${base.replace(/\/$/, '')}/storage/v1/object/public/`;
  return url.startsWith(prefix) && !url.includes('\\') ? url : null;
}

function validateAccentColor(value: string | null): string | null {
  if (value === null || value === '') return null;
  const v = String(value).trim();
  if (ACCENT_IDS.has(v)) return v;
  if (VALID_HEX_COLOR.test(v)) return v;
  return null;
}

function validateAvatarEmoji(value: string | null): string | null {
  if (value === null || value === '') return null;
  return AVATAR_EMOJIS.includes(value) ? value : null;
}

/** Monday of current week (ISO week) as YYYY-MM-DD */
function getWeekStart(): string {
  const d = new Date();
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(d);
  monday.setDate(diff);
  return monday.toISOString().split('T')[0];
}

/** @param gameType Optional game id (e.g. 'memory-match') for progress tracking; omit for legacy. */
export async function updateGamification(xpEarned: number, gameType?: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { error: 'notAuthenticated' };
    if (checkRateLimit(`gamification:${user.id}`, RATE_LIMITS.gamification)) {
      return { error: 'rateLimit' };
    }

    await supabase
      .from('game_sessions')
      .insert({
        user_id: user.id,
        game_type: gameType ?? 'game',
        score: 0,
        xp_earned: xpEarned,
      });

    const today = new Date().toISOString().split('T')[0];
    const weekStart = getWeekStart();
    const nextMonday = new Date(weekStart);
    nextMonday.setDate(nextMonday.getDate() + 7);
    const weekEnd = nextMonday.toISOString().split('T')[0];

    const { data: existing } = await supabase
      .from('users_gamification')
      .select('*')
      .eq('user_id', user.id)
      .single();

    let totalXp: number;
    let currentStreak: number;

    if (existing) {
      const lastDate = existing.last_activity_date;
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      currentStreak = lastDate === yesterday
        ? existing.current_streak + 1
        : lastDate === today
          ? existing.current_streak
          : 1;
      totalXp = existing.total_xp + xpEarned;

      await supabase
        .from('users_gamification')
        .update({
          total_xp: totalXp,
          current_streak: currentStreak,
          last_activity_date: today,
        })
        .eq('user_id', user.id);
    } else {
      totalXp = xpEarned;
      currentStreak = 1;
      const marketingAllowed = user.user_metadata?.marketing_emails_allowed !== false;
      await supabase
        .from('users_gamification')
        .insert({
          user_id: user.id,
          total_xp: totalXp,
          current_streak: currentStreak,
          last_activity_date: today,
          marketing_emails_allowed: marketingAllowed,
        });
    }

    const { data: weekSessions } = await supabase
      .from('game_sessions')
      .select('xp_earned')
      .eq('user_id', user.id)
      .gte('completed_at', `${weekStart}T00:00:00.000Z`)
      .lt('completed_at', `${weekEnd}T00:00:00.000Z`);

    const weekXp = (weekSessions || []).reduce((sum, r) => sum + (Number(r.xp_earned) || 0), 0);
    await supabase
      .from('leaderboard_weekly')
      .upsert(
        { user_id: user.id, week_start: weekStart, total_xp: weekXp },
        { onConflict: 'user_id,week_start' }
      );

    return { success: true, totalXp, currentStreak };
  } catch {
    return { error: 'failedUpdate' };
  }
}

export async function getUserGamification() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { data: null };

    const { data } = await supabase
      .from('users_gamification')
      .select('*')
      .eq('user_id', user.id)
      .single();

    return { data };
  } catch {
    return { data: null };
  }
}

/** Oyun bazlı oynanma sayıları (game_sessions.game_type). İlerleme göstermek için. */
export async function getGamePlayCounts(): Promise<{ data: Record<string, number> }> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { data: {} };

    const { data: rows } = await supabase
      .from('game_sessions')
      .select('game_type')
      .eq('user_id', user.id);

    const counts: Record<string, number> = {};
    (rows || []).forEach((r: { game_type?: string }) => {
      const t = r.game_type ?? 'game';
      counts[t] = (counts[t] ?? 0) + 1;
    });
    return { data: counts };
  } catch {
    return { data: {} };
  }
}

/** Son N haftanın haftalık toplam XP’si (profil grafiği için). */
export async function getWeeklyXpHistory(weeks: number = 6): Promise<{ data: { week_start: string; total_xp: number }[] }> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { data: [] };

    const today = new Date();
    const weekStart = getWeekStart();
    const fromDate = new Date(today);
    fromDate.setDate(fromDate.getDate() - (weeks * 7));
    const from = getWeekStartStringFromDate(fromDate);

    const { data: rows } = await supabase
      .from('leaderboard_weekly')
      .select('week_start, total_xp')
      .eq('user_id', user.id)
      .gte('week_start', from)
      .lte('week_start', weekStart)
      .order('week_start', { ascending: true });

    const list = (rows || []).map((r: { week_start: string; total_xp: number }) => ({
      week_start: r.week_start,
      total_xp: Number(r.total_xp) || 0,
    }));
    return { data: list };
  } catch {
    return { data: [] };
  }
}

/** Son N oturum (profil "son aktiviteler" için). */
export async function getRecentSessions(limit: number = 10): Promise<{
  data: { game_type: string; xp_earned: number; completed_at: string }[];
}> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { data: [] };

    const { data: rows } = await supabase
      .from('game_sessions')
      .select('game_type, xp_earned, completed_at')
      .eq('user_id', user.id)
      .order('completed_at', { ascending: false })
      .limit(limit);

    const list = (rows || []).map((r: { game_type?: string; xp_earned?: number; completed_at?: string }) => ({
      game_type: r.game_type ?? 'game',
      xp_earned: Number(r.xp_earned) || 0,
      completed_at: r.completed_at ?? '',
    }));
    return { data: list };
  } catch {
    return { data: [] };
  }
}

/** Tarih bazlı aktif gün listesi (oyun oynanmış günler). Son ~6 ay. */
export async function getActiveDatesFromSessions(): Promise<{ data: string[] }> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { data: [] };

    const fromDate = new Date();
    fromDate.setMonth(fromDate.getMonth() - 6);
    const from = fromDate.toISOString().split('T')[0];

    const { data: rows } = await supabase
      .from('game_sessions')
      .select('completed_at')
      .eq('user_id', user.id)
      .gte('completed_at', `${from}T00:00:00.000Z`);

    const dates = new Set<string>();
    (rows || []).forEach((r: { completed_at?: string }) => {
      if (r.completed_at) dates.add(r.completed_at.split('T')[0]);
    });
    return { data: [...dates] };
  } catch {
    return { data: [] };
  }
}

export type ProfileUpdate = {
  display_name?: string | null;
  avatar_emoji?: string | null;
  avatar_svg_url?: string | null;
  accent_color?: string | null;
  marketing_emails_allowed?: boolean;
  parent_birth_date?: string | null;
};

export async function updateProfile(updates: ProfileUpdate) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { error: 'notAuthenticated' };
    if (checkRateLimit(`profile:${user.id}`, RATE_LIMITS.profile)) {
      return { error: 'rateLimit' };
    }

    const { data: existing } = await supabase
      .from('users_gamification')
      .select('user_id')
      .eq('user_id', user.id)
      .single();

    function validateBirthDate(value: string | null | undefined): string | null {
      if (value === null || value === undefined || value === '') return null;
      const s = String(value).trim();
      const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
      if (!match) return null;
      const [, y, m, d] = match;
      const date = new Date(parseInt(y!, 10), parseInt(m!, 10) - 1, parseInt(d!, 10));
      if (isNaN(date.getTime())) return null;
      return s;
    }

    const payload: Record<string, unknown> = {};
    if (updates.display_name !== undefined) payload.display_name = validateDisplayName(updates.display_name);
    if (updates.avatar_emoji !== undefined) payload.avatar_emoji = validateAvatarEmoji(updates.avatar_emoji);
    if (updates.avatar_svg_url !== undefined) payload.avatar_svg_url = validateAvatarUrl(updates.avatar_svg_url);
    if (updates.accent_color !== undefined) payload.accent_color = validateAccentColor(updates.accent_color);
    if (updates.marketing_emails_allowed !== undefined) payload.marketing_emails_allowed = !!updates.marketing_emails_allowed;
    if (updates.parent_birth_date !== undefined) payload.parent_birth_date = validateBirthDate(updates.parent_birth_date);

    if (Object.keys(payload).length === 0) return { success: true };

    const marketingAllowed = user.user_metadata?.marketing_emails_allowed !== false;

    if (existing) {
      await supabase
        .from('users_gamification')
        .update(payload)
        .eq('user_id', user.id);
    } else {
      await supabase
        .from('users_gamification')
        .insert({
          user_id: user.id,
          ...payload,
          marketing_emails_allowed: marketingAllowed,
        });
    }

    if (updates.display_name !== undefined) {
      await supabase.auth.updateUser({ data: { display_name: updates.display_name } });
    }

    return { success: true };
  } catch {
    return { error: 'failedUpdate' };
  }
}

export interface LeaderboardEntry {
  rank: number;
  user_id: string;
  display_name: string | null;
  avatar_emoji: string | null;
  avatar_svg_url: string | null;
  accent_color: string | null;
  total_xp: number;
  isCurrentUser: boolean;
}

/** Verifies parent date of birth for parental lock unlock. Returns success if match or no date set (first-time set). */
export async function verifyParentalUnlock(birthDate: string): Promise<{ success: boolean }> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false };

    const inputNormalized = birthDate.trim().split('T')[0];
    if (!inputNormalized) return { success: false };

    const { data } = await supabase
      .from('users_gamification')
      .select('parent_birth_date')
      .eq('user_id', user.id)
      .single();

    const stored = data?.parent_birth_date;
    if (!stored) {
      return { success: true };
    }
    const storedNormalized = String(stored).split('T')[0];
    return { success: inputNormalized === storedNormalized };
  } catch {
    return { success: false };
  }
}

export async function getLeaderboardWeekly(): Promise<{ data: LeaderboardEntry[] | null; error?: string }> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { data: [] };

    const weekStart = getWeekStart();

    const { data: rows, error } = await supabase
      .from('leaderboard_weekly')
      .select('user_id, total_xp')
      .eq('week_start', weekStart)
      .order('total_xp', { ascending: false })
      .limit(50);

    if (error) return { data: null, error: error.message };
    if (!rows?.length) return { data: [] };

    const userIds = rows.map((r: { user_id: string }) => r.user_id);
    const { data: profiles } = await supabase
      .from('users_gamification')
      .select('user_id, display_name, avatar_emoji, avatar_svg_url, accent_color')
      .in('user_id', userIds);

    const profileMap = new Map(
      (profiles || []).map((p: { user_id: string; display_name: string | null; avatar_emoji: string | null; avatar_svg_url: string | null; accent_color: string | null }) => [p.user_id, p])
    );

    const entries: LeaderboardEntry[] = rows.map((row: { user_id: string; total_xp: number }, index: number) => {
      const profile = profileMap.get(row.user_id);
      const isCurrentUser = row.user_id === user.id;
      const rawName = profile?.display_name ?? null;
      const display_name = isCurrentUser ? rawName : (maskDisplayName(rawName) ?? rawName);
      return {
        rank: index + 1,
        user_id: row.user_id,
        display_name,
        avatar_emoji: profile?.avatar_emoji ?? null,
        avatar_svg_url: profile?.avatar_svg_url ?? null,
        accent_color: profile?.accent_color ?? null,
        total_xp: row.total_xp,
        isCurrentUser,
      };
    });

    return { data: entries };
  } catch {
    return { data: null, error: 'Failed to load leaderboard' };
  }
}
