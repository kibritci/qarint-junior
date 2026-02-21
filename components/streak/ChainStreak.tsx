'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import {
  getCurrentWeekDates,
  getWeekDatesFromMonday,
  getActiveDatesInStreak,
  getWeeklyChainLinkTypes,
} from '@/lib/streakChain';

const CHAIN_BASE = '/chain';

interface ChainStreakProps {
  lastActivityDate?: string | null;
  currentStreak?: number;
  /** Belirli bir hafta (Pazartesi YYYY-MM-DD); verilirse bu hafta gösterilir */
  weekStart?: string;
  /** Bu tarihlerde oyun oynanmış; weekStart ile birlikte kullanılır */
  activeDates?: string[];
  showRewardLabel?: boolean;
  /** compact: small (32px). large: big chain for profile carousel (56px). default: 40px */
  compact?: boolean;
  size?: 'compact' | 'normal' | 'large';
}

function getSvgForType(linkType: string): string {
  switch (linkType) {
    case 'start':
      return `${CHAIN_BASE}/link-start.svg`;
    case 'mid':
      return `${CHAIN_BASE}/link-mid.svg`;
    case 'end':
      return `${CHAIN_BASE}/link-end.svg`;
    case 'single':
      return `${CHAIN_BASE}/link-active.svg`;
    default:
      return `${CHAIN_BASE}/link-inactive.svg`;
  }
}

export default function ChainStreak({
  lastActivityDate = null,
  currentStreak = 0,
  weekStart,
  activeDates = [],
  showRewardLabel = true,
  compact = false,
  size: sizeMode = 'normal',
}: ChainStreakProps) {
  const locale = useLocale();
  const t = useTranslations('streak');
  const today = new Date().toISOString().split('T')[0];
  const weekDates = weekStart
    ? getWeekDatesFromMonday(weekStart)
    : getCurrentWeekDates();
  const activeSet = weekStart && activeDates.length >= 0
    ? new Set(weekDates.filter((d) => activeDates.includes(d)))
    : getActiveDatesInStreak(lastActivityDate, currentStreak, today);
  const links = getWeeklyChainLinkTypes(weekDates, activeSet, today, locale);

  const size = compact ? 32 : sizeMode === 'large' ? 56 : 40;
  const textSize = compact ? 'text-[9px]' : sizeMode === 'large' ? 'text-xs' : 'text-[10px]';
  const rewardTextSize = sizeMode === 'large' ? 'text-xs' : 'text-[10px]';
  const lastActiveIndex = links.map((l) => l.active).lastIndexOf(true);

  return (
    <div className="flex flex-col items-center overflow-hidden">
      <div className="flex items-end justify-center gap-0 [-webkit-backface-visibility:contain] [backface-visibility:contain]">
        {links.map(({ date, active, linkType, dayLabel }, i) => (
          <div
            key={date}
            className={`flex flex-col items-center flex-shrink-0 ${i > 0 ? '-ml-[3px]' : ''}`}
            style={i > 0 ? { minWidth: 0 } : undefined}
          >
            <div className={`flex items-center justify-center mb-0.5 leading-none ${sizeMode === 'large' ? 'h-6 min-h-6' : 'h-5 min-h-5'}`}>
              {showRewardLabel && active && i === lastActiveIndex ? (
                <span className={`${rewardTextSize} font-bold text-green-600 dark:text-green-400`}>{t('rewardLabel')}</span>
              ) : null}
            </div>
            <div className="relative inline-flex items-center justify-center">
              <Image
                src={getSvgForType(linkType)}
                alt={active ? `${dayLabel} done` : dayLabel}
                width={size}
                height={size}
                className="flex-shrink-0"
              />
            </div>
            <span className={`mt-1 ${textSize} font-medium text-gray-500 dark:text-gray-400`}>
              {dayLabel}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
