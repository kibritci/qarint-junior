'use client';

import { useRef, useMemo } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import ChainStreak from './ChainStreak';
import { getWeekStartString, getWeekLabel, getWeekStart } from '@/lib/streakChain';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface WeekStreakCarouselProps {
  activeDates: string[];
}

/** En eski aktivite tarihinin haftası (Pazartesi) — kullanıcı bu haftaya kadar geri gidebilir. */
function getEarliestWeekStart(activeDates: string[]): string {
  if (!activeDates.length) {
    const d = new Date();
    d.setDate(d.getDate() - 6 * 7);
    return getWeekStartString(d);
  }
  const earliest = activeDates.slice().sort()[0];
  return getWeekStartString(getWeekStart(new Date(earliest + 'T12:00:00')));
}

export default function WeekStreakCarousel({ activeDates }: WeekStreakCarouselProps) {
  const t = useTranslations('streak');
  const locale = useLocale();
  const scrollRef = useRef<HTMLDivElement>(null);
  const today = new Date();
  const currentStart = getWeekStartString(today);

  const weekStarts = useMemo(() => {
    const earliest = getEarliestWeekStart(activeDates);
    const list: string[] = [];
    const startDate = new Date(earliest + 'T12:00:00');
    const endDate = new Date(today);
    endDate.setDate(endDate.getDate() + 7); // +1 hafta ileri
    const endStr = getWeekStartString(endDate);
    for (let d = new Date(startDate); getWeekStartString(d) <= endStr; d.setDate(d.getDate() + 7)) {
      list.push(getWeekStartString(new Date(d)));
    }
    return list;
  }, [activeDates]);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const card = scrollRef.current.querySelector<HTMLElement>('[data-week]');
    const width = card ? card.offsetWidth : scrollRef.current.clientWidth;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -width : width, behavior: 'smooth' });
  };

  return (
    <div className="rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden">
      {/* Tek widget: içinde yatay kaydırma, haftalar bitişik */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide touch-pan-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {weekStarts.map((start) => (
            <section
              key={start}
              data-week={start}
              className="flex-shrink-0 w-[min(100%,320px)] snap-center border-r border-gray-100 last:border-r-0"
            >
              <div className="px-4 py-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                    {getWeekLabel(start, locale)}
                  </span>
                  {start === currentStart && (
                    <span className="text-[10px] font-bold text-green-600">{t('thisWeek')}</span>
                  )}
                </div>
                <p className="text-[10px] text-gray-400 mb-2">{t('xpPerDay')}</p>
                <ChainStreak
                  weekStart={start}
                  activeDates={activeDates}
                  showRewardLabel={start === currentStart}
                  compact
                />
              </div>
            </section>
          ))}
        </div>

        {/* Minimal ok butonları — sadece masaüstünde görünür, gradient ile yumuşak */}
        <div className="hidden md:flex pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white/90 to-transparent" aria-hidden />
        <div className="hidden md:flex pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white/90 to-transparent" aria-hidden />
        <button
          type="button"
          onClick={() => scroll('left')}
          className="absolute left-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/95 border border-gray-100 shadow-sm flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors z-10 md:left-2"
          aria-label={t('prevWeek')}
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => scroll('right')}
          className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/95 border border-gray-100 shadow-sm flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors z-10 md:right-2"
          aria-label={t('nextWeek')}
        >
          <ChevronRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
