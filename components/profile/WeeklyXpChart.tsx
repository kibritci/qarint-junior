'use client';

import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import { getWeekLabel } from '@/lib/streakChain';

interface WeeklyXpChartProps {
  data: { week_start: string; total_xp: number }[];
}

export default function WeeklyXpChart({ data }: WeeklyXpChartProps) {
  const locale = useLocale();
  const t = useTranslations('profile.analytics');
  const maxXp = Math.max(1, ...data.map((d) => d.total_xp));

  if (!data.length) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400 py-4 text-center">
        {t('noDataWeekly')}
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {data.map(({ week_start, total_xp }) => (
        <div key={week_start} className="flex items-center gap-3">
          <span className="w-20 sm:w-24 text-xs font-medium text-gray-600 dark:text-gray-400 shrink-0">
            {getWeekLabel(week_start, locale)}
          </span>
          <div className="flex-1 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
            <div
              className="h-full bg-primary rounded-lg transition-all duration-500 min-w-[2px]"
              style={{ width: `${Math.max(2, (total_xp / maxXp) * 100)}%` }}
            />
          </div>
          <span className="w-12 text-right text-xs font-bold text-gray-900 dark:text-gray-100 tabular-nums">
            {total_xp}
          </span>
        </div>
      ))}
    </div>
  );
}
