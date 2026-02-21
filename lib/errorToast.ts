import { toast } from 'sonner';
import * as Sentry from '@sentry/nextjs';

export const ERROR_KEYS = [
  'generic',
  'reported',
  'tryAgain',
  'network',
  'auth',
  'rateLimit',
  'serverError',
  'notAuthenticated',
  'failedUpdate',
] as const;

export type ErrorKey = (typeof ERROR_KEYS)[number];

function isErrorKey(value: string): value is ErrorKey {
  return ERROR_KEYS.includes(value as ErrorKey);
}

/** Get translated error message for display. Pass t from useTranslations('errors'). */
export function getErrorMessage(error: string, t: (key: string) => string): string {
  return isErrorKey(error) ? t(error) : error;
}

/**
 * Show an error toast. Reports to Sentry only for server/failedUpdate type errors.
 * Pass t from useTranslations('errors') so message = t(error).
 */
export function showErrorToast(error: string, t: (key: string) => string): void {
  const message = isErrorKey(error) ? t(error) : error;
  toast.error(message);
  if (error === 'failedUpdate' || error === 'serverError') {
    Sentry.captureMessage(message, 'warning');
  }
}
