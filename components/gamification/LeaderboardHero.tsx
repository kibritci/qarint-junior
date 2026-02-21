'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import confetti from 'canvas-confetti';

export default function LeaderboardHero() {
  const t = useTranslations('leaderboard');
  const hasFired = useRef(false);

  useEffect(() => {
    if (hasFired.current) return;
    hasFired.current = true;
    const tid = setTimeout(() => {
      confetti({ particleCount: 120, spread: 100, origin: { y: 0.35 } });
      setTimeout(() => {
        confetti({ particleCount: 80, spread: 80, origin: { x: 0.2, y: 0.4 } });
        confetti({ particleCount: 80, spread: 80, origin: { x: 0.8, y: 0.4 } });
      }, 150);
    }, 300);
    return () => clearTimeout(tid);
  }, []);

  return (
    <div className="text-center py-8 md:py-10 mb-6">
      <p className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-gray-100 mb-2">
        {t('heroTitle')}
      </p>
      <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-md mx-auto">
        {t('heroSubtitle')}
      </p>
    </div>
  );
}
