import * as Sentry from '@sentry/nextjs';

const tracesSampleRate = typeof process.env.NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE === 'string'
  ? parseFloat(process.env.NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE)
  : 0.1;

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: Number.isFinite(tracesSampleRate) ? tracesSampleRate : 0.1,
  debug: false,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
