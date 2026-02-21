'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRive } from '@rive-app/react-canvas';
import { useTranslations } from 'next-intl';

const SRC = '/rive/404-sad.riv';
const STATE_MACHINE = 'State Machine 1';

export default function Rive404() {
  const t = useTranslations('lostPage');
  const [loaded, setLoaded] = useState(false);
  const { RiveComponent } = useRive(
    { src: SRC, stateMachines: STATE_MACHINE, autoplay: true, onLoad: () => setLoaded(true) },
    { shouldResizeCanvasToContainer: true }
  );

  return (
    <div className="flex flex-col items-center pt-0 pb-10 md:pb-14 px-4 w-full max-w-[770px] mx-auto">
      <div className="relative w-full max-w-[500px] aspect-square mb-0 flex items-center justify-center overflow-hidden">
        <RiveComponent
          className="w-full h-full object-cover"
          style={{ width: '100%', height: '100%', opacity: loaded ? 1 : 0, transition: 'opacity 0.3s' }}
        />
        {!loaded && (
          <span className="absolute inset-0 flex items-center justify-center text-6xl md:text-7xl" aria-hidden>😢</span>
        )}
      </div>
      <h1 className="text-xl md:text-2xl font-display font-bold text-gray-900 dark:text-gray-100 mt-0 mb-2 text-center">
        {t('title')}
      </h1>
      <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mb-6 text-center max-w-xs md:max-w-sm">
        {t('description')}
      </p>
      <Link
        href="/"
        className="px-5 py-2.5 text-sm md:text-base bg-primary text-white rounded-xl hover:bg-primary-600 dark:hover:bg-primary-400 transition-colors font-semibold"
      >
        {t('goHome')}
      </Link>
    </div>
  );
}
