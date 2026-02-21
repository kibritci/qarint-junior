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
  KeyIcon,
  ArrowRightStartOnRectangleIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { BoltIcon, FireIcon } from '@heroicons/react/24/solid';
import { createClient } from '@/lib/supabase/client';
import { getUserGamification } from '@/actions/gamification';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const mainNavItems = [
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
  const [profileOpen, setProfileOpen] = useState(false);
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [avatarEmoji, setAvatarEmoji] = useState<string>('🦁');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [totalXp, setTotalXp] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 safe-area-top">
        <div className="flex items-center justify-between h-14 md:h-16 px-4 md:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0" aria-label={t('ariaHome')}>
            <Image
              src="/logo-qarint.svg"
              alt={t('altLogo')}
              width={110}
              height={32}
              className="h-8 w-auto md:h-9"
              priority
            />
          </Link>

          {/* Desktop: Main nav */}
          <nav className="hidden md:flex items-center gap-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.nameKey}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors
                    ${active ? 'bg-primary-50 text-primary' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                >
                  <Icon className="w-4 h-4" />
                  {t(item.nameKey)}
                </Link>
              );
            })}
          </nav>

          {/* Right: Language + Stats + Profile */}
          <div className="flex items-center gap-2 md:gap-4">
            <LanguageSwitcher />
            {/* XP & Streak - desktop */}
            <div className="hidden sm:flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-blue-50 rounded-full">
                <BoltIcon className="w-4 h-4 text-blue-500" />
                <span className="text-xs font-bold text-blue-700">{currentStreak}</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-orange-50 rounded-full">
                <FireIcon className="w-4 h-4 text-orange-500" />
                <span className="text-xs font-bold text-orange-700">{totalXp}</span>
              </div>
            </div>

            {/* Profile dropdown trigger */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setProfileOpen((o) => !o)}
                className="flex items-center gap-2 p-1.5 md:pr-2 rounded-xl hover:bg-gray-100 transition-colors"
                aria-expanded={profileOpen}
                aria-haspopup="true"
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-lg shrink-0 overflow-hidden ${!avatarUrl ? 'bg-gray-100' : ''}`}>
                  {avatarUrl ? (
                    <Image src={avatarUrl} alt="" width={36} height={36} className="w-full h-full object-cover" unoptimized />
                  ) : (
                    avatarEmoji
                  )}
                </div>
                <span className="hidden md:block text-sm font-semibold text-gray-900 truncate max-w-[120px]">
                  {userName || t('nav.profile')}
                </span>
                <ChevronDownIcon
                  className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${profileOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {profileOpen && (
                <div
                  className="absolute right-0 top-full mt-1 w-56 py-1 bg-white rounded-xl shadow-lg border border-gray-100 z-[100]"
                  role="menu"
                >
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900 truncate">{userName || t('fallbackStudent')}</p>
                    <p className="text-xs text-gray-500 truncate">{userEmail}</p>
                  </div>
                  <Link
                    href="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                    role="menuitem"
                  >
                    <UserCircleIcon className="w-5 h-5 text-gray-400" />
                    {t('profileMenu.profileSettings')}
                  </Link>
                  <Link
                    href="/profile#password"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                    role="menuitem"
                  >
                    <KeyIcon className="w-5 h-5 text-gray-400" />
                    {t('profileMenu.changePassword')}
                  </Link>
                  <div className="border-t border-gray-100 my-1" />
                  <button
                    type="button"
                    onClick={() => { setProfileOpen(false); handleSignOut(); }}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 w-full"
                    role="menuitem"
                  >
                    <ArrowRightStartOnRectangleIcon className="w-5 h-5 text-red-400" />
                    {t('profileMenu.signOut')}
                  </button>
                </div>
              )}
            </div>

            {/* Mobile: Hamburger for optional extra nav (we have bottom nav, so hide hamburger or use for something else) */}
            {/* We keep bottom nav for mobile; no hamburger needed */}
          </div>
        </div>
      </header>

      {/* Mobile: Bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center justify-around py-2">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.nameKey}
                href={item.href}
                className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg min-w-[64px] transition-colors
                  ${active ? 'text-primary' : 'text-gray-400'}`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-[10px] font-semibold">{t(item.nameKey)}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
