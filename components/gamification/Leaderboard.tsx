'use client';

import { TrophyIcon } from '@heroicons/react/24/solid';

interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  xp: number;
  isCurrentUser?: boolean;
}

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: 'Ali', avatar: '🦁', xp: 1240 },
  { rank: 2, name: 'Fatima', avatar: '🦋', xp: 1180 },
  { rank: 3, name: 'Omar', avatar: '🚀', xp: 1050 },
  { rank: 4, name: 'Aisha', avatar: '🌟', xp: 920 },
  { rank: 5, name: 'Yusuf', avatar: '🤖', xp: 880, isCurrentUser: true },
  { rank: 6, name: 'Maryam', avatar: '🦊', xp: 810 },
  { rank: 7, name: 'Ibrahim', avatar: '🐬', xp: 750 },
  { rank: 8, name: 'Khadija', avatar: '🦄', xp: 700 },
];

const MEDAL_COLORS = ['text-yellow-500', 'text-gray-400', 'text-amber-600'];

export default function Leaderboard() {
  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <TrophyIcon className="w-6 h-6 text-yellow-500" />
        <h2 className="text-xl font-display font-bold text-gray-900">Weekly Leaderboard</h2>
      </div>

      <div className="space-y-2">
        {MOCK_LEADERBOARD.map((entry) => (
          <div
            key={entry.rank}
            className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200
              ${entry.isCurrentUser
                ? 'bg-primary-50 border border-primary-200 shadow-sm'
                : 'bg-white border border-gray-100 hover:bg-gray-50'
              }
            `}
          >
            {/* Rank */}
            <div className="w-8 text-center">
              {entry.rank <= 3 ? (
                <TrophyIcon className={`w-5 h-5 ${MEDAL_COLORS[entry.rank - 1]} mx-auto`} />
              ) : (
                <span className="text-sm font-bold text-gray-400">{entry.rank}</span>
              )}
            </div>

            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-lg">
              {entry.avatar}
            </div>

            {/* Name */}
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold truncate ${entry.isCurrentUser ? 'text-primary' : 'text-gray-900'}`}>
                {entry.name} {entry.isCurrentUser && '(You)'}
              </p>
            </div>

            {/* XP */}
            <div className="text-right">
              <span className="text-sm font-display font-bold text-gray-700">{entry.xp}</span>
              <span className="text-xs text-gray-400 ml-1">XP</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
