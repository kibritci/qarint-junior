import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getLeaderboardWeekly } from '@/actions/gamification';
import Leaderboard from '@/components/gamification/Leaderboard';
import LeaderboardConfetti from '@/components/gamification/LeaderboardConfetti';
import LeaderboardSkeleton from '@/components/gamification/LeaderboardSkeleton';

export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

async function LeaderboardContent() {
  const { data: entries, error } = await getLeaderboardWeekly();
  const list = entries ?? [];
  return <Leaderboard entries={list} error={error} />;
}

export default async function LeaderboardPage() {
  return (
    <div className="p-6 md:p-8">
      <LeaderboardConfetti />
      <div className="max-w-lg mx-auto">
        <Suspense fallback={<LeaderboardSkeleton />}>
          <LeaderboardContent />
        </Suspense>
      </div>
    </div>
  );
}
