'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const ConfettiRive = dynamic(() => import('@/components/rive/ConfettiRive'), { ssr: false });

/** Sıralama sayfası açıldığında bir kez Rive confetti oynatır (hemen başlar). */
export default function LeaderboardConfetti() {
  const [show, setShow] = useState(true);

  if (!show) return null;
  return <ConfettiRive onComplete={() => setShow(false)} />;
}
