'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui';

const RiveLoading = dynamic(() => import('@/components/rive/RiveLoading'), { ssr: false });

/**
 * Sayfa geçişlerinde (Link/router) main alanında anında gösterilir.
 * Next.js Suspense sınırında otomatik kullanılır.
 */
export default function Loading() {
  return (
    <div className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col items-center gap-4 pt-8">
          <RiveLoading />
        </div>
        <div className="flex flex-col items-center gap-2">
          <Skeleton className="h-8 w-48 rounded-xl" />
          <Skeleton className="h-4 w-64 rounded-lg" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2].map((i) => (
            <div key={i} className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 space-y-3">
              <Skeleton className="h-5 w-24 rounded" />
              <Skeleton className="h-20 w-full rounded-xl" />
              <div className="flex gap-2">
                <Skeleton className="h-9 w-20 rounded-lg" />
                <Skeleton className="h-9 w-20 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
