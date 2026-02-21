'use client';

import { useRive } from '@rive-app/react-canvas';

const SRC = '/rive/streak-fire.riv';
const ANIMATION_NAME = 'Streak Fire';

interface StreakFireRiveProps {
  streakCount: number;
}

export default function StreakFireRive({ streakCount }: StreakFireRiveProps) {
  const { rive, RiveComponent } = useRive(
    { src: SRC, animations: ANIMATION_NAME },
    { shouldResizeCanvasToContainer: true }
  );

  return (
    <div className="relative w-20 h-[96px] md:w-24 md:h-[115px] flex items-center justify-center">
      {rive ? (
        <RiveComponent
          className="absolute inset-0 w-full h-full"
          style={{ width: '100%', height: '100%' }}
          aria-hidden
        />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center text-3xl" aria-hidden>🔥</span>
      )}
      <span
        className="absolute inset-0 flex items-center justify-center pt-2 font-display font-black text-xl text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)] md:text-2xl tabular-nums pointer-events-none"
        aria-hidden
      >
        {streakCount}
      </span>
    </div>
  );
}
