'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const ConfettiRive = dynamic(() => import('@/components/rive/ConfettiRive'), { ssr: false });

/** Sıralama sayfası açıldığında bir kez Rive confetti oynatır. */
export default function LeaderboardConfetti() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const tid = setTimeout(() => setShow(true), 300);
    return () => clearTimeout(tid);
  }, []);

  if (!show) return null;
  return <ConfettiRive onComplete={() => setShow(false)} />;
}
