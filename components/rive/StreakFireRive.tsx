'use client';

import { useEffect, useRef, useState } from 'react';
import { useRive, Layout, Fit, Alignment } from '@rive-app/react-webgl2';
import Skeleton from '@/components/ui/Skeleton';

const SRC = '/rive/streak-fire.riv';
const STATE_MACHINE = 'Streak Fire';

interface StreakFireRiveProps {
  streakCount: number;
}

function StreakFireCanvas() {
  const [loaded, setLoaded] = useState(false);
  const { RiveComponent } = useRive(
    {
      src: SRC,
      artboard: 'Artboard',
      stateMachines: STATE_MACHINE,
      autoplay: true,
      layout: new Layout({
        fit: Fit.Cover,
        alignment: Alignment.Center,
      }),
      onLoad: () => setLoaded(true),
    },
    { shouldResizeCanvasToContainer: true }
  );

  return (
    <>
      <RiveComponent
        className="absolute inset-0 w-full h-full"
        style={{ width: '100%', height: '100%', opacity: loaded ? 1 : 0, transition: 'opacity 0.3s' }}
        aria-hidden
      />
      {!loaded && (
        <Skeleton className="absolute inset-0 rounded-2xl" aria-hidden />
      )}
    </>
  );
}

export default function StreakFireRive({ streakCount }: StreakFireRiveProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0 && entry.contentRect.height > 0) {
          setIsReady(true);
          observer.disconnect();
        }
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center"
      style={{ width: '128px', height: '203px' }}
    >
      {isReady ? (
        <StreakFireCanvas />
      ) : (
        <Skeleton className="absolute inset-0 rounded-2xl" aria-hidden />
      )}
      <span
        className="absolute bottom-6 left-0 right-0 flex items-center justify-center font-display font-black text-4xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] tabular-nums pointer-events-none"
      >
        {streakCount}
      </span>
    </div>
  );
}
