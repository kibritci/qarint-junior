function getTracesSampleRate(): number {
  const raw = process.env.SENTRY_TRACES_SAMPLE_RATE ?? process.env.NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE;
  if (raw === undefined) return 0.1;
  const n = parseFloat(raw);
  return Number.isFinite(n) ? n : 0.1;
}

export async function register() {
  const tracesSampleRate = getTracesSampleRate();
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const Sentry = await import('@sentry/nextjs');
    Sentry.init({
      dsn: process.env.SENTRY_DSN ?? process.env.NEXT_PUBLIC_SENTRY_DSN,
      tracesSampleRate,
      debug: false,
    });
  }
  if (process.env.NEXT_RUNTIME === 'edge') {
    const Sentry = await import('@sentry/nextjs');
    Sentry.init({
      dsn: process.env.SENTRY_DSN ?? process.env.NEXT_PUBLIC_SENTRY_DSN,
      tracesSampleRate,
      debug: false,
    });
  }
}
