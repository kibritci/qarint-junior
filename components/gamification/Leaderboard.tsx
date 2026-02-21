'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { TrophyIcon } from '@heroicons/react/24/solid';
import type { LeaderboardEntry } from '@/actions/gamification';
import { Skeleton } from '@/components/ui';

const MEDAL_COLORS = ['text-yellow-500', 'text-gray-400', 'text-amber-600'];

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  error?: string;
}

function LeaderboardRow({ entry, t }: { entry: LeaderboardEntry; t: (key: string) => string }) {
  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200
        ${entry.isCurrentUser
          ? 'bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-700 shadow-sm'
          : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
        }
      `}
    >
      <div className="w-8 text-center">
        {entry.rank <= 3 ? (
          <TrophyIcon className={`w-5 h-5 ${MEDAL_COLORS[entry.rank - 1]} mx-auto`} />
        ) : (
          <span className="text-sm font-bold text-gray-400 dark:text-gray-500">{entry.rank}</span>
        )}
      </div>
      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-lg overflow-hidden flex-shrink-0 ${!entry.avatar_svg_url ? 'bg-gray-100 dark:bg-gray-700' : ''}`}>
        {entry.avatar_svg_url ? (
          <Image src={entry.avatar_svg_url} alt="" width={36} height={36} className="w-full h-full object-cover" unoptimized />
        ) : (
          entry.avatar_emoji ?? '🦁'
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold truncate ${entry.isCurrentUser ? 'text-primary dark:text-primary-300' : 'text-gray-900 dark:text-gray-100'}`}>
          {entry.display_name || t('player')} {entry.isCurrentUser && t('you')}
        </p>
      </div>
      <div className="text-right flex-shrink-0">
        <span className="text-sm font-display font-bold text-gray-700 dark:text-gray-300">{entry.total_xp}</span>
        <span className="text-xs text-gray-400 dark:text-gray-500 ml-1">{t('xp')}</span>
      </div>
    </div>
  );
}

export default function Leaderboard({ entries, error }: LeaderboardProps) {
  const t = useTranslations('leaderboard');

  if (error) {
    return (
      <div className="p-6 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-300">
        {error}
      </div>
    );
  }

  if (!entries.length) {
    return (
      <div className="w-full max-w-lg mx-auto">
        <div className="flex items-center justify-center gap-2 mb-6">
          <TrophyIcon className="w-6 h-6 text-yellow-500 dark:text-yellow-400" />
          <h2 className="text-xl font-display font-bold text-gray-900 dark:text-gray-100">{t('weeklyLeaderboard')}</h2>
        </div>
        <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400 text-sm mb-6">
          <p className="font-medium">{t('emptyTitle')}</p>
          <p className="mt-1">{t('emptyHint')}</p>
        </div>
        <div className="space-y-2" aria-hidden>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
              <Skeleton className="w-8 h-5 rounded flex-shrink-0" />
              <Skeleton className="w-9 h-9 rounded-full flex-shrink-0" />
              <Skeleton className="h-4 flex-1 max-w-[100px] rounded" />
              <Skeleton className="h-4 w-10 rounded flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const top3 = entries.length >= 3 ? entries.slice(0, 3) : [];
  const rest = entries.length >= 3 ? entries.slice(3) : entries;
  const podiumOrder = top3.length === 3 ? [top3[1], top3[0], top3[2]] : [];

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="flex items-center justify-center gap-2 mb-6">
        <TrophyIcon className="w-6 h-6 text-yellow-500 dark:text-yellow-400" />
        <h2 className="text-xl font-display font-bold text-gray-900 dark:text-gray-100">{t('weeklyLeaderboard')}</h2>
      </div>

      {podiumOrder.length === 3 && (
        <>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 text-center">{t('topThree')}</p>
          <div className="grid grid-cols-3 gap-2 md:gap-3 items-end mb-6">
          {podiumOrder.map((entry) => {
            const isFirst = entry.rank === 1;
            const orderClass = entry.rank === 1 ? 'order-2' : entry.rank === 2 ? 'order-1' : 'order-3';
            return (
              <div
                key={entry.user_id}
                className={`flex flex-col items-center rounded-xl border-2 bg-white dark:bg-gray-800 p-3 pt-4 ${orderClass}
                  ${isFirst ? 'border-yellow-200 dark:border-yellow-600 shadow-md' : 'border-gray-100 dark:border-gray-700 mt-4'}
                `}
              >
                <span className={`text-lg font-display font-black mb-1 ${MEDAL_COLORS[entry.rank - 1]}`}>
                  {entry.rank}
                </span>
                <div className={`rounded-full flex items-center justify-center text-2xl overflow-hidden flex-shrink-0 mb-2 ${!entry.avatar_svg_url ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                  style={{ width: 56, height: 56 }}
                >
                  {entry.avatar_svg_url ? (
                    <Image src={entry.avatar_svg_url} alt="" width={56} height={56} className="w-full h-full object-cover" unoptimized />
                  ) : (
                    entry.avatar_emoji ?? '🦁'
                  )}
                </div>
                <p className={`text-xs md:text-sm font-semibold truncate w-full text-center ${entry.isCurrentUser ? 'text-primary dark:text-primary-300' : 'text-gray-900 dark:text-gray-100'}`}>
                  {entry.display_name || t('player')} {entry.isCurrentUser && t('you')}
                </p>
                <p className="text-sm font-display font-bold text-gray-600 dark:text-gray-400 mt-0.5">
                  {entry.total_xp} {t('xp')}
                </p>
              </div>
            );
          })}
          </div>
        </>
      )}

      <div className="space-y-2">
        {rest.map((entry) => (
          <LeaderboardRow key={entry.user_id} entry={entry} t={t} />
        ))}
      </div>
    </div>
  );
}
