'use client';

import { Skeleton } from '@/components/ui';

const LIST_ROWS = 6;

export default function LeaderboardSkeleton() {
  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="flex items-center justify-center gap-2 mb-6">
        <Skeleton className="w-6 h-6 rounded" />
        <Skeleton className="h-6 w-40 rounded" />
      </div>

      <p className="text-sm text-gray-400 dark:text-gray-500 mb-3 text-center">
        <Skeleton className="h-4 w-28 mx-auto rounded" />
      </p>
      <div className="grid grid-cols-3 gap-2 md:gap-3 items-end mb-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`flex flex-col items-center rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 pt-4 ${i === 2 ? '' : 'mt-4'}`}
          >
            <Skeleton className="w-6 h-6 rounded mb-2" />
            <Skeleton className="w-14 h-14 rounded-full mb-2" />
            <Skeleton className="h-4 w-16 rounded mb-1" />
            <Skeleton className="h-4 w-12 rounded" />
          </div>
        ))}
      </div>

      <div className="space-y-2">
        {Array.from({ length: LIST_ROWS }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
            <Skeleton className="w-8 h-5 rounded flex-shrink-0" />
            <Skeleton className="w-9 h-9 rounded-full flex-shrink-0" />
            <Skeleton className="h-4 flex-1 max-w-[120px] rounded" />
            <Skeleton className="h-4 w-12 rounded flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
