import { getLeaderboardWeekly } from '@/actions/gamification';
import Leaderboard from '@/components/gamification/Leaderboard';

export default async function LeaderboardPage() {
  const { data: entries, error } = await getLeaderboardWeekly();

  return (
    <div className="p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">Leaderboard</h1>
          <p className="text-sm text-gray-500">See how you compare to other students this week</p>
        </div>
        <Leaderboard entries={entries ?? []} error={error} />
      </div>
    </div>
  );
}
