'use client';

import Image from 'next/image';
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
  compact?: boolean;
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
}: ChainStreakProps) {
  const today = new Date().toISOString().split('T')[0];
  const weekDates = weekStart
    ? getWeekDatesFromMonday(weekStart)
    : getCurrentWeekDates();
  const activeSet = weekStart && activeDates.length >= 0
    ? new Set(weekDates.filter((d) => activeDates.includes(d)))
    : getActiveDatesInStreak(lastActivityDate, currentStreak, today);
  const links = getWeeklyChainLinkTypes(weekDates, activeSet, today);

  const size = compact ? 32 : 40;
  const gap = compact ? 'gap-0.5' : 'gap-1';
  const lastActiveIndex = links.map((l) => l.active).lastIndexOf(true);

  return (
    <div className="flex flex-col items-center">
      <div className={`flex items-end justify-center ${gap}`}>
        {links.map(({ date, active, linkType, dayLabel }, i) => (
          <div key={date} className="flex flex-col items-center">
            {/* Sabit yükseklik: +500 görünse de görünmese de halkalar aynı hizada */}
            <div className="h-5 min-h-5 flex items-center justify-center mb-0.5">
              {showRewardLabel && active && i === lastActiveIndex ? (
                <span className="text-[10px] font-bold text-green-600">+500</span>
              ) : null}
            </div>
            <Image
              src={getSvgForType(linkType)}
              alt={active ? `${dayLabel} done` : dayLabel}
              width={size}
              height={size}
              className="flex-shrink-0"
            />
            <span className={`mt-1 ${compact ? 'text-[9px]' : 'text-[10px]'} font-medium text-gray-500`}>
              {dayLabel}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
