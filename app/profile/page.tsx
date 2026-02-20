import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import ProfileForm from '@/components/profile/ProfileForm';
import ProfileHeader from '@/components/profile/ProfileHeader';
import WeekStreakCarousel from '@/components/streak/WeekStreakCarousel';
import { getUserGamification, getActiveDatesFromSessions } from '@/actions/gamification';

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: gamification } = await getUserGamification();
  const { data: activeDates } = await getActiveDatesFromSessions();
  const displayName =
    gamification?.display_name ??
    user.user_metadata?.display_name ??
    user.email?.split('@')[0] ??
    '';

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-2">Profile</h1>
        <p className="text-sm text-gray-500 mb-6">
          Customize your name, avatar, and color. This is how you appear on the leaderboard.
        </p>

        <ProfileHeader
          displayName={displayName}
          email={user.email ?? ''}
          avatarUrl={gamification?.avatar_svg_url ?? null}
          avatarEmoji={gamification?.avatar_emoji ?? null}
          accentColor={gamification?.accent_color ?? null}
          userId={user.id}
        />

        {/* Haftalık zincir — geriye/ileriye kaydırılabilir */}
        <div className="mb-8">
          <h2 className="text-base font-display font-bold text-gray-900 mb-1">Zinciri Kırma</h2>
          <p className="text-xs text-gray-500 mb-4">Haftalar arasında kaydırın</p>
          <WeekStreakCarousel activeDates={activeDates} />
        </div>

        <ProfileForm
          initialDisplayName={displayName}
          initialAccentColor={gamification?.accent_color ?? null}
          totalXp={gamification?.total_xp ?? 0}
          currentStreak={gamification?.current_streak ?? 0}
        />
      </div>
    </div>
  );
}
