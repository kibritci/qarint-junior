'use client';

import { useTranslations, useLocale } from 'next-intl';
import { GAME_ID_TO_TITLE_KEY } from '@/lib/gamesConfig';
import { GAMES } from '@/lib/gamesConfig';

interface Session {
  game_type: string;
  xp_earned: number;
  completed_at: string;
}

interface RecentActivityProps {
  sessions: Session[];
}

function getGameEmoji(gameType: string): string {
  const g = GAMES.find((x) => x.id === gameType);
  return g?.emoji ?? '🎮';
}

function formatDate(iso: string, locale: string): string {
  if (!iso) return '—';
  const d = new Date(iso);
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  const yesterday = new Date(now.getTime() - 86400000).toISOString().split('T')[0];
  const dateStr = d.toISOString().split('T')[0];
  if (dateStr === today) return new Intl.DateTimeFormat(locale, { timeStyle: 'short' }).format(d);
  if (dateStr === yesterday) return new Intl.DateTimeFormat(locale, { dateStyle: 'short' }).format(d);
  return new Intl.DateTimeFormat(locale, { dateStyle: 'short', timeStyle: 'short' }).format(d);
}

export default function RecentActivity({ sessions }: RecentActivityProps) {
  const t = useTranslations('games');
  const tProfile = useTranslations('profile.analytics');
  const locale = useLocale();

  if (sessions.length === 0) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400 py-4 text-center">
        {tProfile('noDataActivity')}
      </p>
    );
  }

  return (
    <ul className="divide-y divide-gray-100 dark:divide-gray-700">
      {sessions.map((s, i) => {
        const titleKey = GAME_ID_TO_TITLE_KEY[s.game_type];
        const label = titleKey ? t(`titles.${titleKey}`) : s.game_type;
        return (
          <li key={i} className="flex items-center justify-between py-2.5 first:pt-0">
            <span className="text-lg w-7 shrink-0">{getGameEmoji(s.game_type)}</span>
            <span className="flex-1 text-sm font-medium text-gray-800 dark:text-gray-200 truncate mx-2">
              {label}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 shrink-0 mr-2">
              {formatDate(s.completed_at, String(locale || 'en'))}
            </span>
            <span className="text-sm font-bold text-primary tabular-nums shrink-0">+{s.xp_earned}</span>
          </li>
        );
      })}
    </ul>
  );
}
