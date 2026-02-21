'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  HomeIcon,
  PuzzlePieceIcon,
  TrophyIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  KeyIcon,
  ArrowRightStartOnRectangleIcon,
  LockClosedIcon,
  LanguageIcon,
  ChevronDownIcon,
  SwatchIcon,
} from '@heroicons/react/24/outline';
import { BoltIcon, FireIcon } from '@heroicons/react/24/solid';
import { useTheme } from 'next-themes';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { getUserGamification } from '@/actions/gamification';
import { setLocaleCookie, LOCALE_LABELS } from '@/components/LanguageSwitcher';
import { useParentalLock } from '@/components/providers/ParentalLockProvider';
import UnlockModal from '@/components/parental/UnlockModal';
import type { Locale } from '@/i18n/request';

const mainNavItems = [
  { nameKey: 'nav.home', href: '/', icon: HomeIcon },
  { nameKey: 'nav.games', href: '/games', icon: PuzzlePieceIcon },
  { nameKey: 'nav.leaderboard', href: '/leaderboard', icon: TrophyIcon },
];

const desktopNavItems = [
  { nameKey: 'nav.home', href: '/', icon: HomeIcon },
  { nameKey: 'nav.games', href: '/games', icon: PuzzlePieceIcon },
  { nameKey: 'nav.leaderboard', href: '/leaderboard', icon: TrophyIcon },
];

const bottomNavItems = [
  { nameKey: 'nav.home', href: '/', icon: HomeIcon },
  { nameKey: 'nav.games', href: '/games', icon: PuzzlePieceIcon },
  { nameKey: 'nav.leaderboard', href: '/leaderboard', icon: TrophyIcon },
  { nameKey: 'nav.profile', href: '/profile', icon: UserCircleIcon },
];

export default function Header() {
  const pathname = usePathname();
  const t = useTranslations('common');
  const router = useRouter();
  const locale = useLocale() as Locale;
  const { theme: themeValue, setTheme, resolvedTheme } = useTheme();
  const [profileOpen, setProfileOpen] = useState(false);
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [avatarEmoji, setAvatarEmoji] = useState<string>('🦁');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [totalXp, setTotalXp] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [unlockModalOpen, setUnlockModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { lockEnabled } = useParentalLock();

  const isGamePage = pathname.startsWith('/games/') && pathname !== '/games';
  const isAuthPage = pathname === '/login';

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setUserEmail(user.email ?? '');
      setUserName(
        user.user_metadata?.display_name ?? user.email?.split('@')[0] ?? t('fallbackStudent')
      );
      const { data } = await getUserGamification();
      if (data) {
        setTotalXp(data.total_xp ?? 0);
        setCurrentStreak(data.current_streak ?? 0);
        if (data.display_name) setUserName(data.display_name);
        if (data.avatar_emoji) setAvatarEmoji(data.avatar_emoji);
        if (data.avatar_svg_url) setAvatarUrl(data.avatar_svg_url);
      }
    };
    load();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  if (isGamePage || isAuthPage) return null;

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 safe-area-top">
        <div className="relative flex items-center justify-between h-14 md:h-16 px-4 md:px-6">
          {/* Sol: Logo — Ana sayfa logoya tıklanınca */}
          <Link href="/" className="flex items-center shrink-0" aria-label={t('ariaHome')}>
            <Image
              src={resolvedTheme === 'dark' ? '/qarint-games-logo-dark-mode.svg' : '/qarint-games-logo.svg'}
              alt={t('altLogo')}
              width={110}
              height={32}
              className="h-8 w-auto md:h-9"
              priority
            />
          </Link>

          {/* Orta: Desktop nav (Ana Sayfa, Oyunlar, Liderlik) — sayfaya ortalanmış */}
          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center p-1 rounded-full bg-gray-100 dark:bg-gray-800" role="tablist">
            {desktopNavItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.nameKey}
                  href={item.href}
                  role="tab"
                  aria-selected={active}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-0
                    ${active ? 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm' : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'}`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {t(item.nameKey)}
                </Link>
              );
            })}
          </nav>

          {/* Sağ: Stats + Profile */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* XP & Streak - desktop */}
            <div className="hidden sm:flex items-center gap-2">
              {/* Alev = günlük seri (daily streak) */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFA600]/15 dark:bg-[#FFA600]/25 border border-[#FFA600]/20 dark:border-[#FFA600]/30">
                <FireIcon className="w-4 h-4 text-[#E69500] dark:text-[#FFA600]" />
                <span className="text-xs font-bold text-[#B37400] dark:text-[#FFA600] tabular-nums">{currentStreak}</span>
              </div>
              {/* Şimşek = puan / XP */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#00BFFF]/15 dark:bg-[#00BFFF]/25 border border-[#00BFFF]/20 dark:border-[#00BFFF]/30">
                <BoltIcon className="w-4 h-4 text-[#0099CC] dark:text-[#00BFFF]" />
                <span className="text-xs font-bold text-[#007A99] dark:text-[#00BFFF] tabular-nums">{totalXp}</span>
              </div>
            </div>

            {/* When parental lock: show lock button; else profile dropdown */}
            {lockEnabled ? (
              <button
                type="button"
                onClick={() => setUnlockModalOpen(true)}
                className="flex items-center justify-center p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label={t('nav.profile')}
              >
                <LockClosedIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </button>
            ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setProfileOpen((o) => !o)}
                className="flex items-center justify-center p-1 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-expanded={profileOpen}
                aria-haspopup="true"
                aria-label={t('nav.profile')}
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-lg shrink-0 overflow-hidden ${!avatarUrl ? 'bg-gray-100 dark:bg-gray-700' : ''}`}>
                  {avatarUrl ? (
                    <Image src={avatarUrl} alt="" width={36} height={36} className="w-full h-full object-cover" unoptimized />
                  ) : (
                    avatarEmoji
                  )}
                </div>
              </button>

              {profileOpen && (
                <div
                  className="absolute right-0 top-full mt-1.5 w-60 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 z-[100]"
                  role="menu"
                >
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">{userName || t('fallbackStudent')}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{userEmail}</p>
                  </div>
                  <Link
                    href="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    role="menuitem"
                  >
                    <UserCircleIcon className="w-5 h-5 text-gray-400 dark:text-gray-500 shrink-0" />
                    <span>{t('profileMenu.profile')}</span>
                  </Link>
                  <Link
                    href="/settings"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    role="menuitem"
                  >
                    <Cog6ToothIcon className="w-5 h-5 text-gray-400 dark:text-gray-500 shrink-0" />
                    <span>{t('profileMenu.settings')}</span>
                  </Link>
                  <Link
                    href="/settings#password"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    role="menuitem"
                  >
                    <KeyIcon className="w-5 h-5 text-gray-400 dark:text-gray-500 shrink-0" />
                    <span>{t('profileMenu.changePassword')}</span>
                  </Link>
                  <div className="border-t border-gray-100 dark:border-gray-700 my-2" />
                  {/* Dil — menü satırı: ikon + select + chevron (kenara yaslanmadan) */}
                  <div
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <LanguageIcon className="w-5 h-5 text-gray-400 dark:text-gray-500 shrink-0" />
                    <div className="flex-1 min-w-0 relative flex items-center">
                      <select
                        id="profile-locale"
                        value={locale}
                        onChange={(e) => {
                          const loc = e.target.value as Locale;
                          if (loc !== locale) {
                            setLocaleCookie(loc);
                            router.refresh();
                          }
                        }}
                        className="w-full appearance-none bg-transparent border-0 py-0 pr-7 text-gray-900 dark:text-gray-100 focus:ring-0 focus:outline-none cursor-pointer"
                      >
                        {(Object.keys(LOCALE_LABELS) as Locale[]).map((loc) => (
                          <option key={loc} value={loc}>
                            {LOCALE_LABELS[loc]}
                          </option>
                        ))}
                      </select>
                      <ChevronDownIcon className="w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none absolute right-0 top-1/2 -translate-y-1/2" aria-hidden />
                    </div>
                  </div>
                  {/* Tema — menü satırı: ikon + select + chevron */}
                  <div
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <SwatchIcon className="w-5 h-5 text-gray-400 dark:text-gray-500 shrink-0" />
                    <div className="flex-1 min-w-0 relative flex items-center">
                      <select
                        id="profile-theme"
                        value={themeValue ?? 'system'}
                        onChange={(e) => setTheme(e.target.value as 'system' | 'light' | 'dark')}
                        className="w-full appearance-none bg-transparent border-0 py-0 pr-7 text-gray-900 dark:text-gray-100 focus:ring-0 focus:outline-none cursor-pointer"
                      >
                        <option value="system">{t('profileMenu.themeSystem')}</option>
                        <option value="light">{t('profileMenu.themeLight')}</option>
                        <option value="dark">{t('profileMenu.themeDark')}</option>
                      </select>
                      <ChevronDownIcon className="w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none absolute right-0 top-1/2 -translate-y-1/2" aria-hidden />
                    </div>
                  </div>
                  <div className="border-t border-gray-100 dark:border-gray-700 my-2" />
                  <button
                    type="button"
                    onClick={() => { setProfileOpen(false); handleSignOut(); }}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 w-full transition-colors"
                    role="menuitem"
                  >
                    <ArrowRightStartOnRectangleIcon className="w-5 h-5 text-red-400 shrink-0" />
                    <span>{t('profileMenu.signOut')}</span>
                  </button>
                </div>
              )}
            </div>
            )}

            {/* Mobile: Hamburger for optional extra nav (we have bottom nav, so hide hamburger or use for something else) */}
            {/* We keep bottom nav for mobile; no hamburger needed */}
          </div>
        </div>
      </header>

      {/* Mobile: Bottom nav — when locked, 4th item is unlock button instead of Profile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center justify-around py-2">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.nameKey}
                href={item.href}
                className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg min-w-[64px] transition-colors font-bold
                  ${active ? 'text-indigo-800 dark:text-indigo-200' : 'text-gray-400 dark:text-gray-500'}`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-[10px] font-bold">{t(item.nameKey)}</span>
              </Link>
            );
          })}
          {lockEnabled ? (
            <button
              type="button"
              onClick={() => setUnlockModalOpen(true)}
              className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg min-w-[64px] transition-colors font-bold text-gray-400 dark:text-gray-500"
              aria-label={t('nav.profile')}
            >
              <LockClosedIcon className="w-6 h-6" />
              <span className="text-[10px] font-bold">{t('unlock')}</span>
            </button>
          ) : (
            <Link
              href="/profile"
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg min-w-[64px] transition-colors font-bold
                ${isActive('/profile') ? 'text-indigo-800 dark:text-indigo-200' : 'text-gray-400 dark:text-gray-500'}`}
            >
              <UserCircleIcon className="w-6 h-6" />
              <span className="text-[10px] font-bold">{t('nav.profile')}</span>
            </Link>
          )}
        </div>
      </nav>

      <UnlockModal open={unlockModalOpen} onClose={() => setUnlockModalOpen(false)} />
    </>
  );
}
