'use client';

import { useRef, useMemo, useEffect } from 'react';
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
    endDate.setDate(endDate.getDate() + 7);
    const endStr = getWeekStartString(endDate);
    for (let d = new Date(startDate); getWeekStartString(d) <= endStr; d.setDate(d.getDate() + 7)) {
      list.push(getWeekStartString(new Date(d)));
    }
    return list;
  }, [activeDates]);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const card = scrollRef.current.querySelector<HTMLElement>('[data-week]');
    const gap = 16;
    const width = card ? card.offsetWidth + gap : scrollRef.current.clientWidth;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -width : width, behavior: 'smooth' });
  };

  // Scroll to current week on mount (so "this week" is in view initially)
  useEffect(() => {
    if (!scrollRef.current || weekStarts.length === 0) return;
    const idx = weekStarts.indexOf(currentStart);
    if (idx <= 0) return;
    const card = scrollRef.current.querySelector<HTMLElement>('[data-week]');
    const gap = 16;
    const w = card ? card.offsetWidth + gap : 0;
    scrollRef.current.scrollTo({ left: idx * w, behavior: 'auto' });
  }, [weekStarts.length, currentStart]);

  return (
    <div className="relative -mx-1 md:-mx-2">
      {/* Fitness-style: one big card per week, magnet snap, peek of next/prev */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide touch-pan-x gap-4 py-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', scrollPaddingLeft: '8%', scrollPaddingRight: '8%' }}
      >
        {weekStarts.map((start) => (
          <section
            key={start}
            data-week={start}
            className="flex-shrink-0 w-[min(85%,420px)] snap-center rounded-2xl bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden"
          >
            <div className="px-5 py-5 sm:px-6 sm:py-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-display font-bold text-gray-700 dark:text-gray-300">
                  {getWeekLabel(start, locale)}
                </span>
                {start === currentStart && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300">
                    {t('thisWeek')}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{t('xpPerDay')}</p>
              <ChainStreak
                weekStart={start}
                activeDates={activeDates}
                showRewardLabel={start === currentStart}
                compact={false}
                size="large"
              />
            </div>
          </section>
        ))}
      </div>

      {/* Nav buttons - visible on desktop, subtle */}
      {weekStarts.length > 1 && (
        <>
          <div className="hidden md:block pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent rounded-l-2xl" aria-hidden />
          <div className="hidden md:block pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent rounded-r-2xl" aria-hidden />
          <button
            type="button"
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-md flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-primary/30 transition-all z-10 hidden md:flex"
            aria-label={t('prevWeek')}
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-md flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-primary/30 transition-all z-10 hidden md:flex"
            aria-label={t('nextWeek')}
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </>
      )}
    </div>
  );
}
