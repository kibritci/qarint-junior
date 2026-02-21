'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

const COOKIE_CONSENT_KEY = 'qarint_cookie_consent';
const CONSENT_VALUE = 'accepted';

export default function CookieBanner() {
  const t = useTranslations('legal.cookieBanner');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const consent = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${COOKIE_CONSENT_KEY}=`));
    if (!consent || consent.split('=')[1] !== CONSENT_VALUE) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    if (typeof window === 'undefined') return;
    const maxAge = 365 * 24 * 60 * 60;
    document.cookie = `${COOKIE_CONSENT_KEY}=${CONSENT_VALUE}; path=/; max-age=${maxAge}; SameSite=Lax`;
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label={t('title')}
      className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg safe-area-bottom"
    >
      <div className="max-w-2xl mx-auto flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-1">
            {t('title')}
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-300">
            {t('description')}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={accept}
            className="px-4 py-2.5 rounded-xl text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            {t('acceptButton')}
          </button>
        </div>
      </div>
    </div>
  );
}
