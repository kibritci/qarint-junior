'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas';
import { useTranslations } from 'next-intl';

const STATE_MACHINE = 'State Machine 1';
const MASCOT_SRC = '/rive/mascot.riv';

const FEEDBACK_FORM_URL = 'https://forms.gle/DsRaaEgUYsHNgbYU8';

function RiveMascotCanvas() {
  const { rive, RiveComponent } = useRive(
    {
      src: MASCOT_SRC,
      artboard: 'Artboard',
      stateMachines: STATE_MACHINE,
      autoplay: true,
      layout: new Layout({
        fit: Fit.Contain,
        alignment: Alignment.Center,
      }),
      onLoad: () => {
        console.log('[Rive] Mascot loaded successfully');
      },
      onLoadError: (e) => {
        console.error('[Rive] Load error:', e);
      },
    },
    { shouldResizeCanvasToContainer: true }
  );
  if (!rive) {
    return <span className="text-4xl md:text-5xl">🦁</span>;
  }
  return <RiveComponent className="w-full h-full" style={{ width: '100%', height: '100%' }} />;
}

export default function RiveMascot() {
  const pathname = usePathname();
  const t = useTranslations('home');
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [bubbleOpen, setBubbleOpen] = useState(false);

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

  const handleBubbleClick = () => setBubbleOpen((o) => !o);

  if (pathname === '/login' || pathname.startsWith('/auth')) return null;

  return (
    <div
      className="fixed bottom-20 left-4 z-30 md:bottom-6 md:left-6 flex flex-col items-start gap-0"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{ touchAction: 'manipulation' }}
    >
      {/* Konuşma baloncuğu – feedback yönlendirmesi */}
      <button
        type="button"
        onClick={handleBubbleClick}
        className={`
          mb-1 px-3 py-2 rounded-2xl text-left shadow-lg border transition-all duration-200
          bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600
          hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]
          max-w-[180px] md:max-w-[200px]
          ${bubbleOpen ? 'rounded-br-md' : 'rounded-br-2xl'}
        `}
        aria-label={t('sendFeedback')}
      >
        <p className="text-xs font-medium text-gray-700 dark:text-gray-200 leading-snug">
          {t('betaMessage')}
        </p>
        <span className="text-[10px] font-semibold text-primary dark:text-primary-400 mt-0.5 inline-block">
          {t('sendFeedback')} →
        </span>
      </button>

      {bubbleOpen && (
        <div className="mb-1 w-full max-w-[180px] md:max-w-[200px] rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-lg p-2">
          <a
            href={FEEDBACK_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center text-xs font-semibold text-primary dark:text-primary-400 py-1.5 px-2 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors"
          >
            {t('sendFeedback')}
          </a>
        </div>
      )}

      {/* Rive karakter – container ref burada, boyut alınca RiveMascotCanvas mount */}
      <div
        ref={containerRef}
        className={`
          w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center
          cursor-pointer select-none
          transition-colors duration-200
          ${isHovering ? 'bg-primary-50/80 dark:bg-primary-900/20' : 'bg-transparent'}
        `}
        aria-hidden
      >
        {isReady ? (
          <RiveMascotCanvas />
        ) : (
          <span className="text-4xl md:text-5xl">🦁</span>
        )}
      </div>
    </div>
  );
}
