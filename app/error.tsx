'use client';

import { useTranslations } from 'next-intl';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('errors');
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t('generic')}</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6">{t('reported')}</p>
      <button
        onClick={() => reset()}
        className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-600 dark:hover:bg-primary-400 transition-colors"
      >
        {t('tryAgain')}
      </button>
    </div>
  );
}
