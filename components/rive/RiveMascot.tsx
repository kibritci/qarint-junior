'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useRive } from '@rive-app/react-canvas';

const FEEDBACK_FORM_URL = 'https://forms.gle/DsRaaEgUYsHNgbYU8';
const MASCOT_SRC = '/rive/mascot.riv';
const MASCOT_LOAD_GRACE_MS = 2500;

function MascotAsset({
  onError,
  minimal,
}: {
  onError: (err?: unknown) => void;
  minimal?: boolean;
}) {
  const [showFallback, setShowFallback] = useState(false);
  const { rive, RiveComponent } = useRive(
    minimal
      ? { src: MASCOT_SRC, autoplay: true, onLoadError: onError }
      : {
          src: MASCOT_SRC,
          artboard: 'Artboard',
          stateMachines: 'State Machine 1',
          autoplay: true,
          onLoadError: onError,
        },
    { shouldResizeCanvasToContainer: true }
  );

  // Rive bazen ilk frame'de null kalıyor; production'da ağ yavaş olabilir
  useEffect(() => {
    if (rive !== null) return;
    const t = setTimeout(() => setShowFallback(true), MASCOT_LOAD_GRACE_MS);
    return () => clearTimeout(t);
  }, [rive]);

  if (rive === null && !showFallback) {
    return (
      <div className="w-full h-full flex items-center justify-center text-4xl md:text-5xl opacity-70" aria-hidden>
        🦁
      </div>
    );
  }

  if (rive === null) {
    return (
      <div className="w-full h-full flex items-center justify-center text-4xl md:text-5xl" aria-hidden>
        🦁
      </div>
    );
  }

  return (
    <RiveComponent
      className="w-full h-full"
      style={{ width: '100%', height: '100%' }}
    />
  );
}

export default function RiveMascot() {
  const pathname = usePathname();
  const t = useTranslations('home');
  const [bubbleOpen, setBubbleOpen] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const [tryMinimal, setTryMinimal] = useState(false);
  const triedMinimalRef = useRef(false);

  const isAuth = pathname === '/login' || pathname.startsWith('/auth');
  const hideOnGames = pathname === '/games';
  const handleMascotError = useCallback((err?: unknown) => {
    if (typeof window !== 'undefined' && err) {
      console.warn('[RiveMascot] Load error:', err);
    }
    if (triedMinimalRef.current) {
      setUseFallback(true);
    } else {
      triedMinimalRef.current = true;
      setTryMinimal(true);
    }
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 z-30 flex flex-col items-start w-fit transition-opacity ${
        isAuth ? 'opacity-0 pointer-events-none invisible' : ''
      } ${hideOnGames ? 'opacity-0 pointer-events-none' : ''}`}
      style={{ touchAction: 'manipulation' }}
      aria-hidden={isAuth || hideOnGames}
      onMouseEnter={() => !hideOnGames && setBubbleOpen(true)}
      onMouseLeave={() => setBubbleOpen(false)}
    >
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

      <div
        className="w-28 h-28 md:w-32 md:h-32 flex items-center justify-center cursor-pointer select-none text-4xl md:text-5xl overflow-hidden"
        onClick={() => setBubbleOpen((o) => !o)}
        aria-hidden
      >
        {useFallback ? (
          <span>🦁</span>
        ) : (
          <MascotAsset onError={handleMascotError} minimal={tryMinimal} />
        )}
      </div>
    </div>
  );
}
