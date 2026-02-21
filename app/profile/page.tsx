import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { createClient } from '@/lib/supabase/server';
import ProfileForm from '@/components/profile/ProfileForm';
import ProfileHeader from '@/components/profile/ProfileHeader';
import WeekStreakCarousel from '@/components/streak/WeekStreakCarousel';
import { getUserGamification, getActiveDatesFromSessions } from '@/actions/gamification';

export default async function ProfilePage() {
  const t = await getTranslations('profile');
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
        <ProfileHeader
          displayName={displayName}
          email={user.email ?? ''}
          avatarUrl={gamification?.avatar_svg_url ?? null}
          avatarEmoji={gamification?.avatar_emoji ?? null}
          userId={user.id}
        />

        <div className="mb-8">
          <h2 className="text-base font-display font-bold text-gray-900 mb-1">{t('chainBreakTitle')}</h2>
          <p className="text-xs text-gray-500 mb-3">{t('chainSwipeDescription')}</p>
          <WeekStreakCarousel activeDates={activeDates} />
        </div>

        <ProfileForm
          initialDisplayName={displayName}
          totalXp={gamification?.total_xp ?? 0}
          currentStreak={gamification?.current_streak ?? 0}
        />
      </div>
    </div>
  );
}
