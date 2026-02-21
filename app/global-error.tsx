'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect, useState } from 'react';

const ERROR_MESSAGES: Record<string, { generic: string; reported: string; tryAgain: string }> = {
  en: { generic: 'Something went wrong.', reported: "We've been notified and are looking into it.", tryAgain: 'Try again' },
  tr: { generic: 'Bir hata oluştu.', reported: 'Bildirildi, inceliyoruz.', tryAgain: 'Tekrar dene' },
  az: { generic: 'Xəta baş verdi.', reported: 'Bildirildi, yoxlayırıq.', tryAgain: 'Yenidən cəhd et' },
  es: { generic: 'Algo salió mal.', reported: 'Lo hemos notificado y lo estamos revisando.', tryAgain: 'Intentar de nuevo' },
};

function getLocale(): string {
  if (typeof document === 'undefined') return 'en';
  const match = document.cookie.match(/\bNEXT_LOCALE=([^;]+)/);
  const locale = match ? match[1].trim() : '';
  return ERROR_MESSAGES[locale] ? locale : 'en';
}

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [locale, setLocale] = useState<string>('en');

  useEffect(() => {
    Sentry.captureException(error);
    setLocale(getLocale());
  }, [error]);

  const msg = ERROR_MESSAGES[locale] ?? ERROR_MESSAGES.en;

  return (
    <html lang={locale}>
      <body>
        <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'system-ui, sans-serif' }}>
          <h1>{msg.generic}</h1>
          <p>{msg.reported}</p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              cursor: 'pointer',
            }}
          >
            {msg.tryAgain}
          </button>
        </div>
      </body>
    </html>
  );
}
