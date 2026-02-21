import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import ProfileHeader from '@/components/profile/ProfileHeader';
import WeekStreakCarousel from '@/components/streak/WeekStreakCarousel';
import WeeklyXpChart from '@/components/profile/WeeklyXpChart';
import GameDistribution from '@/components/profile/GameDistribution';
import RecentActivity from '@/components/profile/RecentActivity';
import {
  getUserGamification,
  getActiveDatesFromSessions,
  getWeeklyXpHistory,
  getGamePlayCounts,
  getRecentSessions,
} from '@/actions/gamification';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';

export default async function ProfilePage() {
  const t = await getTranslations('profile');
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const [
    { data: gamification },
    { data: activeDates },
    { data: weeklyXp },
    { data: gameCounts },
    { data: recentSessions },
  ] = await Promise.all([
    getUserGamification(),
    getActiveDatesFromSessions(),
    getWeeklyXpHistory(6),
    getGamePlayCounts(),
    getRecentSessions(8),
  ]);
  const displayName =
    gamification?.display_name ??
    user.user_metadata?.display_name ??
    user.email?.split('@')[0] ??
    '';
  const totalXp = gamification?.total_xp ?? 0;
  const currentStreak = gamification?.current_streak ?? 0;

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

        {/* Quick stats */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="card-game p-4">
            <p className="text-2xl font-display font-bold text-gray-900 dark:text-gray-100">{totalXp}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{t('totalXp')}</p>
          </div>
          <div className="card-game p-4">
            <p className="text-2xl font-display font-bold text-gray-900 dark:text-gray-100">{currentStreak}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{t('dayStreak')}</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-base font-display font-bold text-gray-900 dark:text-gray-100 mb-1">{t('chainBreakTitle')}</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{t('chainSwipeDescription')}</p>
          <WeekStreakCarousel activeDates={activeDates} />
        </div>

        {/* Analytics */}
        <section className="space-y-4 mt-10">
          <h2 className="text-lg font-display font-bold text-gray-900 dark:text-gray-100">
            {t('analytics.weeklyXp')}
          </h2>
          <div className="card-game p-4 sm:p-5">
            <WeeklyXpChart data={weeklyXp ?? []} />
          </div>

          <h2 className="text-lg font-display font-bold text-gray-900 dark:text-gray-100 mt-6">
            {t('analytics.gameDistribution')}
          </h2>
          <div className="card-game p-4 sm:p-5">
            <GameDistribution counts={gameCounts ?? {}} />
          </div>

          <h2 className="text-lg font-display font-bold text-gray-900 dark:text-gray-100 mt-6">
            {t('analytics.recentActivity')}
          </h2>
          <div className="card-game p-4 sm:p-5">
            <RecentActivity sessions={recentSessions ?? []} />
          </div>
        </section>

        <Link
          href="/settings"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 mt-8"
        >
          <Cog6ToothIcon className="w-5 h-5" />
          {t('editProfile')}
        </Link>
      </div>
    </div>
  );
}
