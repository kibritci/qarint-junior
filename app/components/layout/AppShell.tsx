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

/**
 * Shell her zaman DOM'da; Rive mascot unmount edilmez (cleanup "e.delete" hatasını önlemek için).
 * Auth sayfalarında tam ekran overlay ile form gösterilir, shell arkada gizli kalır.
 */
export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthRoute = pathname === '/login' || pathname.startsWith('/auth/');

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-900">
      {isAuthRoute ? (
        <>
          <Header />
          <main className="flex-1 bg-gray-50/50 dark:bg-gray-900/80 pb-20 md:pb-0" aria-hidden />
          <RiveMascot />
          <Footer />
          <div className="fixed inset-0 z-40 bg-white dark:bg-gray-900" aria-hidden={false}>
            {children}
          </div>
        </>
      ) : (
        <>
          <Header />
          <main className="flex-1 bg-gray-50/50 dark:bg-gray-900/80 pb-20 md:pb-0">{children}</main>
          <RiveMascot />
          <Footer />
        </>
      )}
    </div>
  );
}
