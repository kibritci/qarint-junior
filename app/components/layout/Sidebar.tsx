'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  AcademicCapIcon,
  BookOpenIcon,
  PuzzlePieceIcon,
  TrophyIcon,
  UserCircleIcon,
  ChatBubbleLeftIcon,
  ClockIcon,
  CreditCardIcon,
  ShoppingBagIcon,
  QuestionMarkCircleIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/24/outline';

const mainMenuItems = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Academy', href: '/academy', icon: AcademicCapIcon },
  { name: 'Lessons', href: '/lessons', icon: BookOpenIcon },
  { name: 'Games', href: '/games', icon: PuzzlePieceIcon },
  { name: 'Leaderboard', href: '/leaderboard', icon: TrophyIcon },
];

const accountMenuItems = [
  { name: 'Profile', href: '/profile', icon: UserCircleIcon },
  { name: 'Messages', href: '/messages', icon: ChatBubbleLeftIcon },
  { name: 'Lesson History', href: '/history', icon: ClockIcon },
  { name: 'Subscription', href: '/subscription', icon: CreditCardIcon },
];

const otherMenuItems = [
  { name: 'Shop', href: '/shop', icon: ShoppingBagIcon },
  { name: 'Support', href: '/support', icon: QuestionMarkCircleIcon },
  { name: 'More', href: '/more', icon: EllipsisHorizontalIcon },
];

export default function Sidebar() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <aside className="w-60 bg-white border-r border-gray-100 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="px-6 py-5">
        <Link href="/" className="flex items-center gap-1">
          <span className="text-2xl font-display font-black text-primary">Qarint</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 overflow-y-auto">
        {/* Main */}
        <div className="mb-1">
          {mainMenuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 mb-0.5 ${
                  active
                    ? 'bg-gray-100 text-primary font-semibold'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-primary' : 'text-gray-400'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Account */}
        <div className="mt-6 mb-1">
          <p className="px-3 mb-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Account</p>
          {accountMenuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 mb-0.5 ${
                  active
                    ? 'bg-gray-100 text-primary font-semibold'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-primary' : 'text-gray-400'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Other */}
        <div className="mt-6 mb-1">
          <p className="px-3 mb-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Other</p>
          {otherMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 mb-0.5"
              >
                <Icon className="w-5 h-5 flex-shrink-0 text-gray-400" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Profile */}
      <div className="px-4 py-4 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
            <span className="text-sm">🦁</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-semibold text-gray-400 uppercase">Profile</p>
            <p className="text-sm font-semibold text-gray-900 truncate">Student</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
