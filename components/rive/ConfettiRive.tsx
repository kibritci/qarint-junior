'use client';

import { useState, useEffect } from 'react';
import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas';

const SRC = '/rive/confetti-no-loop.riv';
const STATE_MACHINE = 'State Machine 1';
const DURATION_MS = 4000;

interface ConfettiRiveProps {
  /** Animasyon bittiğinde (veya süre dolunca) çağrılır. */
  onComplete?: () => void;
}

export default function ConfettiRive({ onComplete }: ConfettiRiveProps) {
  const [loaded, setLoaded] = useState(false);
  const { RiveComponent } = useRive(
    {
      src: SRC,
      stateMachines: STATE_MACHINE,
      autoplay: true,
      onLoad: () => setLoaded(true),
      layout: new Layout({
        fit: Fit.Cover,
        alignment: Alignment.Center,
      }),
    },
    { shouldResizeCanvasToContainer: true }
  );

  useEffect(() => {
    const tid = setTimeout(() => {
      onComplete?.();
    }, DURATION_MS);
    return () => clearTimeout(tid);
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center"
      aria-hidden
    >
      <div className="absolute inset-0 w-full h-full" style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.3s' }}>
        <RiveComponent className="w-full h-full" style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  );
}
