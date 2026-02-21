'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

const FEEDBACK_FORM_URL = 'https://forms.gle/DsRaaEgUYsHNgbYU8';

/**
 * Mascot artık Rive kullanmıyor: sayfa geçişlerinde Rive cleanup "e.delete is not a function"
 * hatası veriyordu. Statik emoji ile hem hata giderildi hem görsel korundu.
 */
export default function RiveMascot() {
  const pathname = usePathname();
  const t = useTranslations('home');
  const [bubbleOpen, setBubbleOpen] = useState(false);

  if (pathname === '/login' || pathname.startsWith('/auth')) return null;

  const hideOnGames = pathname === '/games';

  return (
    <div
      className={`fixed bottom-0 left-0 z-30 flex flex-col items-start w-fit transition-opacity ${hideOnGames ? 'opacity-0 pointer-events-none' : ''}`}
      style={{ touchAction: 'manipulation' }}
      aria-hidden={hideOnGames}
      onMouseEnter={() => setBubbleOpen(true)}
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
        className="w-28 h-28 md:w-32 md:h-32 flex items-center justify-center cursor-pointer select-none text-4xl md:text-5xl"
        onClick={() => setBubbleOpen((o) => !o)}
        aria-hidden
      >
        🦁
      </div>
    </div>
  );
}
