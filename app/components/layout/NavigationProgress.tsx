'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false, speed: 300, trickleSpeed: 80 });

// Link tıklamalarında hemen progress başlat (sayfa yüklenmeden önce geri bildirim)
function startOnLinkClick() {
  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest('a');
    if (!anchor || !anchor.href) return;
    try {
      const url = new URL(anchor.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;
      NProgress.start();
    } catch {
      // invalid URL
    }
  };
  document.documentElement.addEventListener('click', handleClick, true);
  return () => document.documentElement.removeEventListener('click', handleClick, true);
}

export default function NavigationProgress() {
  const pathname = usePathname();
  const mounted = useRef(false);

  useEffect(() => {
    const unsub = startOnLinkClick();
    return unsub;
  }, []);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    NProgress.done();
  }, [pathname]);

  return null;
}
