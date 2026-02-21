import { Suspense } from 'react';
import { getLeaderboardWeekly } from '@/actions/gamification';
import Leaderboard from '@/components/gamification/Leaderboard';
import LeaderboardHero from '@/components/gamification/LeaderboardHero';
import LeaderboardSkeleton from '@/components/gamification/LeaderboardSkeleton';

async function LeaderboardContent() {
  const { data: entries, error } = await getLeaderboardWeekly();
  const list = entries ?? [];
  return <Leaderboard entries={list} error={error} />;
}

export default async function LeaderboardPage() {
  return (
    <div className="p-6 md:p-8">
      <div className="max-w-lg mx-auto">
        <LeaderboardHero />
        <Suspense fallback={<LeaderboardSkeleton />}>
          <LeaderboardContent />
        </Suspense>
      </div>
    </div>
  );
}
