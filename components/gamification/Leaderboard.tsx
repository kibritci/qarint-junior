'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { TrophyIcon } from '@heroicons/react/24/solid';
import type { LeaderboardEntry } from '@/actions/gamification';

const MEDAL_COLORS = ['text-yellow-500', 'text-gray-400', 'text-amber-600'];

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  error?: string;
}

export default function Leaderboard({ entries, error }: LeaderboardProps) {
  const t = useTranslations('leaderboard');

  if (error) {
    return (
      <div className="p-6 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">
        {error}
      </div>
    );
  }

  if (!entries.length) {
    return (
      <div className="p-8 rounded-xl bg-gray-50 border border-gray-100 text-center text-gray-500 text-sm">
        <p className="font-medium">{t('emptyTitle')}</p>
        <p className="mt-1">{t('emptyHint')}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <TrophyIcon className="w-6 h-6 text-yellow-500" />
        <h2 className="text-xl font-display font-bold text-gray-900">{t('weeklyLeaderboard')}</h2>
      </div>

      <div className="space-y-2">
        {entries.map((entry) => (
          <div
            key={entry.user_id}
            className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200
              ${entry.isCurrentUser
                ? 'bg-primary-50 border border-primary-200 shadow-sm'
                : 'bg-white border border-gray-100 hover:bg-gray-50'
              }
            `}
          >
            <div className="w-8 text-center">
              {entry.rank <= 3 ? (
                <TrophyIcon className={`w-5 h-5 ${MEDAL_COLORS[entry.rank - 1]} mx-auto`} />
              ) : (
                <span className="text-sm font-bold text-gray-400">{entry.rank}</span>
              )}
            </div>

            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-lg overflow-hidden ${!entry.avatar_svg_url ? 'bg-gray-100' : ''}`}>
              {entry.avatar_svg_url ? (
                <Image src={entry.avatar_svg_url} alt="" width={36} height={36} className="w-full h-full object-cover" unoptimized />
              ) : (
                entry.avatar_emoji ?? '🦁'
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold truncate ${entry.isCurrentUser ? 'text-primary' : 'text-gray-900'}`}>
                {entry.display_name || t('player')} {entry.isCurrentUser && t('you')}
              </p>
            </div>

            <div className="text-right">
              <span className="text-sm font-display font-bold text-gray-700">{entry.total_xp}</span>
              <span className="text-xs text-gray-400 ml-1">{t('xp')}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
