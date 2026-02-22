'use client';

import dynamic from 'next/dynamic';
import Skeleton from '@/components/ui/Skeleton';

const StreakFireRive = dynamic(() => import('@/components/rive/StreakFireRive'), {
  ssr: false,
  loading: () => (
    <div className="relative flex items-center justify-center overflow-hidden rounded-2xl" style={{ width: '128px', height: '203px' }}>
      <Skeleton className="absolute inset-0 rounded-2xl" aria-hidden />
    </div>
  ),
});

interface HomeStreakFireProps {
  streakCount: number;
}

/** Ana sayfada streak gösterimi – Rive animasyonu (feedback mascot hariç). */
export default function HomeStreakFire({ streakCount }: HomeStreakFireProps) {
  return <StreakFireRive streakCount={streakCount} />;
}
