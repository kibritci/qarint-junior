'use client';

import { useTranslations } from 'next-intl';
import { GAME_ID_TO_TITLE_KEY } from '@/lib/gamesConfig';
import { GAMES } from '@/lib/gamesConfig';

interface GameDistributionProps {
  counts: Record<string, number>;
}

function getGameEmoji(gameType: string): string {
  const g = GAMES.find((x) => x.id === gameType);
  return g?.emoji ?? '🎮';
}

export default function GameDistribution({ counts }: GameDistributionProps) {
  const t = useTranslations('games');
  const tProfile = useTranslations('profile.analytics');
  const entries = Object.entries(counts).filter(([, n]) => n > 0);
  const maxCount = Math.max(1, ...entries.map(([, n]) => n));

  if (entries.length === 0) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400 py-4 text-center">
        {tProfile('noDataGames')}
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {entries.map(([gameType, count]) => {
        const titleKey = GAME_ID_TO_TITLE_KEY[gameType];
        const label = titleKey ? t(`titles.${titleKey}`) : gameType;
        const pct = (count / maxCount) * 100;
        return (
          <div key={gameType} className="flex items-center gap-3">
            <span className="text-lg w-7 shrink-0" title={label}>
              {getGameEmoji(gameType)}
            </span>
            <span className="w-32 sm:w-40 text-sm font-medium text-gray-700 dark:text-gray-300 truncate shrink-0">
              {label}
            </span>
            <div className="flex-1 h-6 bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden">
              <div
                className="h-full bg-primary/80 rounded-md transition-all duration-500 min-w-[4px]"
                style={{ width: `${Math.max(5, pct)}%` }}
              />
            </div>
            <span className="w-8 text-right text-sm font-bold text-gray-900 dark:text-gray-100 tabular-nums">
              {count}
            </span>
          </div>
        );
      })}
    </div>
  );
}
