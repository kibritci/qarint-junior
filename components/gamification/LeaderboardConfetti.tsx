'use client';

import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

/** Sıralama sayfası açıldığında bir kez confetti oynatır. */
export default function LeaderboardConfetti() {
  const hasFired = useRef(false);

  useEffect(() => {
    if (hasFired.current) return;
    const tid = setTimeout(() => {
      hasFired.current = true;
      confetti({ particleCount: 120, spread: 100, origin: { y: 0.35 } });
      setTimeout(() => {
        confetti({ particleCount: 80, spread: 80, origin: { x: 0.2, y: 0.4 } });
        confetti({ particleCount: 80, spread: 80, origin: { x: 0.8, y: 0.4 } });
      }, 150);
    }, 300);
    return () => clearTimeout(tid);
  }, []);

  return null;
}
