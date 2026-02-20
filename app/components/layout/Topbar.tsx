'use client';

import { BoltIcon, FireIcon } from '@heroicons/react/24/solid';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useGameStore } from '@/store/gameStore';

export default function Topbar() {
  const { totalXp, currentStreak } = useGameStore();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Search */}
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <div className="relative w-full">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm
                         placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40
                         transition-all duration-200"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-5">
          {/* Streak */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 rounded-full">
            <BoltIcon className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-bold text-blue-700">{currentStreak || 0}</span>
          </div>

          {/* XP */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 rounded-full">
            <FireIcon className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-bold text-orange-700">{totalXp || 0}</span>
          </div>

          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
            <span className="text-sm">🦁</span>
          </div>
        </div>
      </div>
    </header>
  );
}
