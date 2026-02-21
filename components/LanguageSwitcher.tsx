'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { LanguageIcon, CheckIcon } from '@heroicons/react/24/outline';
import type { Locale } from '@/i18n/request';

const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  tr: 'Türkçe',
  az: 'Azərbaycan',
  es: 'Español',
};

const COOKIE_NAME = 'NEXT_LOCALE';
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 1 year

function setLocaleCookie(locale: Locale) {
  document.cookie = `${COOKIE_NAME}=${locale}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const t = useTranslations('common');
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (newLocale: Locale) => {
    if (newLocale === locale) {
      setOpen(false);
      return;
    }
    setLocaleCookie(newLocale);
    setOpen(false);
    router.refresh();
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
        aria-label={t('selectLanguage')}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <LanguageIcon className="w-5 h-5" />
        <span className="text-xs font-semibold uppercase hidden sm:inline">{locale}</span>
      </button>
      {open && (
        <div
          className="absolute right-0 top-full mt-1 py-1 bg-white rounded-xl shadow-lg border border-gray-100 z-[100] min-w-[140px]"
          role="menu"
        >
          {(Object.keys(LOCALE_LABELS) as Locale[]).map((loc) => (
            <button
              key={loc}
              type="button"
              onClick={() => handleSelect(loc)}
              className="flex items-center justify-between w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
              role="menuitem"
            >
              <span>{LOCALE_LABELS[loc]}</span>
              {locale === loc && <CheckIcon className="w-4 h-4 text-primary" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
