'use client';

import { BoltIcon } from '@heroicons/react/24/solid';
import { useGameStore } from '@/store/gameStore';

interface StreakDisplayProps {
  size?: 'sm' | 'lg';
}

export default function StreakDisplay({ size = 'sm' }: StreakDisplayProps) {
  const { currentStreak } = useGameStore();

  if (size === 'lg') {
    return (
      <div className="flex flex-col items-center p-4 bg-blue-50 rounded-xl border border-blue-200">
        <BoltIcon className="w-8 h-8 text-blue-500 mb-1" />
        <span className="text-2xl font-display font-black text-blue-600">{currentStreak}</span>
        <span className="text-xs text-blue-500 font-semibold">Day Streak</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 rounded-full">
      <BoltIcon className="w-4 h-4 text-blue-500" />
      <span className="text-sm font-bold text-blue-700">{currentStreak}</span>
    </div>
  );
}
