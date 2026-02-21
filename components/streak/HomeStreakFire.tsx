'use client';

import dynamic from 'next/dynamic';

const StreakFireRive = dynamic(() => import('@/components/rive/StreakFireRive'), {
  ssr: false,
  loading: () => (
    <div className="relative flex items-center justify-center" style={{ width: '128px', height: '203px' }}>
      <span className="absolute inset-0 flex items-center justify-center text-5xl" aria-hidden>🔥</span>
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
