'use client';

import { useRef } from 'react';
import ChainStreak from './ChainStreak';
import { getWeekStartString, getWeekLabel } from '@/lib/streakChain';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface WeekStreakCarouselProps {
  activeDates: string[];
}

export default function WeekStreakCarousel({ activeDates }: WeekStreakCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const today = new Date();
  const currentStart = getWeekStartString(today);

  const weekStarts: string[] = [];
  const d = new Date(today);
  for (let i = -4; i <= 1; i++) {
    const m = new Date(d);
    m.setDate(m.getDate() + i * 7);
    weekStarts.push(getWeekStartString(m));
  }

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const width = scrollRef.current.clientWidth;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -width : width, behavior: 'smooth' });
  };

  return (
    <div className="relative px-12">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-2 scroll-smooth scrollbar-hide"
      >
        {weekStarts.map((start) => (
          <div
            key={start}
            className="flex-shrink-0 w-full max-w-[320px] mx-auto snap-center"
          >
            <div className="rounded-xl bg-gray-50/90 border border-gray-100 px-4 py-4">
              <p className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                {getWeekLabel(start)}
              </p>
              <p className="text-center text-[10px] text-gray-400 mb-3">+500 XP per day</p>
              <ChainStreak
                weekStart={start}
                activeDates={activeDates}
                showRewardLabel={start === currentStart}
                compact
              />
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors z-10"
        aria-label="Önceki hafta"
      >
        <ChevronLeftIcon className="w-5 h-5" />
      </button>
      <button
        type="button"
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors z-10"
        aria-label="Sonraki hafta"
      >
        <ChevronRightIcon className="w-5 h-5" />
      </button>
    </div>
  );
}
