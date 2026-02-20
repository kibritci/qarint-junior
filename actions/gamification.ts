'use server';

import { createClient } from '@/lib/supabase/server';

/** Monday of current week (ISO week) as YYYY-MM-DD */
function getWeekStart(): string {
  const d = new Date();
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(d);
  monday.setDate(diff);
  return monday.toISOString().split('T')[0];
}

export async function updateGamification(xpEarned: number) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { error: 'Not authenticated' };

    await supabase
      .from('game_sessions')
      .insert({
        user_id: user.id,
        game_type: 'game',
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
      await supabase
        .from('users_gamification')
        .insert({
          user_id: user.id,
          total_xp: totalXp,
          current_streak: currentStreak,
          last_activity_date: today,
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
    return { error: 'Failed to update gamification' };
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
};

export async function updateProfile(updates: ProfileUpdate) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { error: 'Not authenticated' };

    const { data: existing } = await supabase
      .from('users_gamification')
      .select('user_id')
      .eq('user_id', user.id)
      .single();

    const payload: Record<string, unknown> = {};
    if (updates.display_name !== undefined) payload.display_name = updates.display_name;
    if (updates.avatar_emoji !== undefined) payload.avatar_emoji = updates.avatar_emoji;
    if (updates.avatar_svg_url !== undefined) payload.avatar_svg_url = updates.avatar_svg_url;
    if (updates.accent_color !== undefined) payload.accent_color = updates.accent_color;

    if (Object.keys(payload).length === 0) return { success: true };

    if (existing) {
      await supabase
        .from('users_gamification')
        .update(payload)
        .eq('user_id', user.id);
    } else {
      await supabase
        .from('users_gamification')
        .insert({ user_id: user.id, ...payload });
    }

    if (updates.display_name !== undefined) {
      await supabase.auth.updateUser({ data: { display_name: updates.display_name } });
    }

    return { success: true };
  } catch {
    return { error: 'Failed to update profile' };
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
      return {
        rank: index + 1,
        user_id: row.user_id,
        display_name: profile?.display_name ?? null,
        avatar_emoji: profile?.avatar_emoji ?? null,
        avatar_svg_url: profile?.avatar_svg_url ?? null,
        accent_color: profile?.accent_color ?? null,
        total_xp: row.total_xp,
        isCurrentUser: row.user_id === user.id,
      };
    });

    return { data: entries };
  } catch {
    return { data: null, error: 'Failed to load leaderboard' };
  }
}
