'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { XMarkIcon } from '@heroicons/react/24/outline';

const FEEDBACK_FORM_URL = 'https://forms.gle/DsRaaEgUYsHNgbYU8';

export default function BetaFeedbackPill() {
  const t = useTranslations('home');
  const [open, setOpen] = useState(false);

  const handleOpenForm = () => {
    window.open(FEEDBACK_FORM_URL, '_blank', 'noopener,noreferrer');
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        title={t('betaMessage')}
        className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-30 flex items-center gap-1.5 rounded-full bg-amber-100/90 dark:bg-amber-900/30 border border-amber-200/80 dark:border-amber-700/50 px-3 py-1.5 text-[11px] font-medium text-amber-800 dark:text-amber-200 shadow-sm hover:bg-amber-200/90 dark:hover:bg-amber-800/40 transition-colors backdrop-blur-sm"
      >
        <span className="text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wide">{t('beta')}</span>
        <span className="text-amber-500 dark:text-amber-500">·</span>
        <span>{t('sendFeedback')}</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="beta-modal-title"
          aria-describedby="beta-modal-desc"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-sm rounded-2xl bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label={t('betaModalClose')}
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
            <h2 id="beta-modal-title" className="font-display font-bold text-lg text-gray-900 dark:text-gray-100 pr-8 mb-2">
              {t('betaModalTitle')}
            </h2>
            <p id="beta-modal-desc" className="text-sm text-gray-600 dark:text-gray-300 mb-6">
              {t('betaModalDescription')}
            </p>
            <div className="flex flex-col gap-2">
              <a
                href={FEEDBACK_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleOpenForm}
                className="inline-flex items-center justify-center rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold py-2.5 px-4 transition-colors"
              >
                {t('sendFeedback')}
              </a>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                {t('betaModalClose')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
