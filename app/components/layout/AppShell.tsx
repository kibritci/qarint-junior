'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import dynamic from 'next/dynamic';
import Skeleton from '@/components/ui/Skeleton';

const RiveMascot = dynamic(() => import('@/components/rive/RiveMascot'), {
  ssr: false,
  loading: () => (
    <div className="fixed bottom-0 left-0 z-30 w-28 h-28 md:w-32 md:h-32 flex items-center justify-center p-2" aria-hidden>
      <Skeleton className="w-full h-full rounded-2xl" />
    </div>
  ),
});

/** Login/auth sayfalarında Header/Footer/Mascot göstermez; tam ekran form görünür. */
export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthRoute = pathname === '/login' || pathname.startsWith('/auth/');

  if (isAuthRoute) {
    return <div className="min-h-screen bg-white dark:bg-gray-900">{children}</div>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-900">
      <Header />
      <main className="flex-1 bg-gray-50/50 dark:bg-gray-900/80 pb-20 md:pb-0">{children}</main>
      <RiveMascot />
      <Footer />
    </div>
  );
}
