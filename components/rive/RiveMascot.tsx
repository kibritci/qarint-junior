'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas';
import { useTranslations } from 'next-intl';

const STATE_MACHINE = 'State Machine 1';
const MASCOT_SRC = '/rive/mascot.riv';

const FEEDBACK_FORM_URL = 'https://forms.gle/DsRaaEgUYsHNgbYU8';

function RiveMascotCanvas() {
  const [loaded, setLoaded] = useState(false);
  const { RiveComponent } = useRive(
    {
      src: MASCOT_SRC,
      artboard: 'Artboard',
      stateMachines: STATE_MACHINE,
      autoplay: true,
      layout: new Layout({
        fit: Fit.Contain,
        alignment: Alignment.Center,
      }),
      onLoad: () => setLoaded(true),
    },
    { shouldResizeCanvasToContainer: true }
  );

  return (
    <div className="relative w-full h-full">
      <RiveComponent
        className="w-full h-full"
        style={{ width: '100%', height: '100%', opacity: loaded ? 1 : 0, transition: 'opacity 0.3s' }}
      />
      {!loaded && (
        <span className="absolute inset-0 flex items-center justify-center text-4xl md:text-5xl">🦁</span>
      )}
    </div>
  );
}

export default function RiveMascot() {
  const pathname = usePathname();
  const t = useTranslations('home');
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
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

  if (pathname === '/login' || pathname.startsWith('/auth')) return null;

  return (
    <div
      className="fixed bottom-0 left-0 z-30 flex flex-col items-start w-fit"
      style={{ touchAction: 'manipulation' }}
      onMouseEnter={() => setBubbleOpen(true)}
      onMouseLeave={() => setBubbleOpen(false)}
    >
      {/* Konuşma baloncuğu – hover veya tıklama ile açılır, sol alta yaslı */}
      <div
        className={`
          mb-0 transition-all duration-300 origin-bottom-left
          ${bubbleOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-2 pointer-events-none'}
        `}
      >
        <a
          href={FEEDBACK_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setBubbleOpen((o) => !o)}
          className="block px-3 py-2 rounded-2xl rounded-bl-md text-left shadow-lg border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 max-w-[180px] md:max-w-[200px]"
          aria-label={t('sendFeedback')}
        >
          <p className="text-xs font-medium text-gray-700 dark:text-gray-200 leading-snug">
            {t('betaMessage')}
          </p>
          <span className="text-[10px] font-semibold text-primary dark:text-primary-400 mt-0.5 inline-block">
            {t('sendFeedback')} →
          </span>
        </a>
      </div>

      {/* Rive karakter – sol alt köşe sıfıra sıfır */}
      <div
        ref={containerRef}
        className="w-28 h-28 md:w-32 md:h-32 flex items-center justify-center cursor-pointer select-none"
        onClick={() => setBubbleOpen((o) => !o)}
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
