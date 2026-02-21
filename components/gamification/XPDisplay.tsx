'use client';

import { FireIcon } from '@heroicons/react/24/solid';
import { useGameStore } from '@/store/gameStore';

interface XPDisplayProps {
  size?: 'sm' | 'lg';
}

export default function XPDisplay({ size = 'sm' }: XPDisplayProps) {
  const { totalXp } = useGameStore();

  if (size === 'lg') {
    return (
      <div className="flex flex-col items-center p-4 bg-orange-50 dark:bg-orange-900/40 rounded-xl border border-orange-200 dark:border-orange-800">
        <FireIcon className="w-8 h-8 text-orange-500 dark:text-orange-400 mb-1" />
        <span className="text-2xl font-display font-black text-orange-600 dark:text-orange-300">{totalXp}</span>
        <span className="text-xs text-orange-500 dark:text-orange-400 font-semibold">Total XP</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 dark:bg-orange-900/40 rounded-full">
      <FireIcon className="w-4 h-4 text-orange-500 dark:text-orange-400" />
      <span className="text-sm font-bold text-orange-700 dark:text-orange-200">{totalXp}</span>
    </div>
  );
}
