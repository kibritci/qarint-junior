'use server';

import { createClient } from '@/lib/supabase/server';

export async function updateGamification(xpEarned: number) {
  try {
    const supabase = await createClient();

    await supabase
      .from('game_sessions')
      .insert({
        game_type: 'memory_match',
        score: 0,
        xp_earned: xpEarned,
      });

    return {
      success: true,
      totalXp: xpEarned,
      currentStreak: 1,
    };
  } catch {
    return { error: 'Failed to update gamification' };
  }
}

export async function getUserGamification() {
  return {
    data: {
      user_id: 'anonymous',
      total_xp: 0,
      current_streak: 0,
      last_activity_date: null,
      avatar_svg_url: null,
    },
  };
}
