'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('common');

  return (
    <footer className="mt-auto border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 py-4 px-4">
      <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-gray-500 dark:text-gray-400">
        <Link
          href="/privacy"
          className="hover:text-gray-900 dark:hover:text-gray-100 underline"
        >
          {t('footerPrivacy')}
        </Link>
        <Link
          href="/terms"
          className="hover:text-gray-900 dark:hover:text-gray-100 underline"
        >
          {t('footerTerms')}
        </Link>
        <Link
          href="/parents"
          className="hover:text-gray-900 dark:hover:text-gray-100 underline"
        >
          {t('footerForParents')}
        </Link>
        <Link
          href="/asla-bulunamaz"
          className="hover:text-gray-900 dark:hover:text-gray-100 underline"
          aria-label={t('footer404EasterEgg')}
        >
          {t('footer404EasterEgg')}
        </Link>
      </div>
    </footer>
  );
}
