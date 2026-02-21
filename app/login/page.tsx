'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Script from 'next/script';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { createClient } from '@/lib/supabase/client';

type Mode = 'login' | 'register';

const MAX_ATTEMPTS = 5;
const LOCKOUT_SECONDS = 30;
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

declare global {
  interface Window {
    turnstile?: {
      render: (el: string | HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id: string) => void;
      getResponse: (id: string) => string | undefined;
    };
  }
}

function getPasswordStrength(pw: string): { level: 0 | 1 | 2 | 3; labelKey: 'weak' | 'medium' | 'strong'; color: string } {
  if (!pw) return { level: 0, labelKey: 'weak', color: '' };
  let score = 0;
  if (pw.length >= 6) score++;
  if (pw.length >= 10) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;

  if (score <= 1) return { level: 1, labelKey: 'weak', color: 'bg-red-400' };
  if (score <= 3) return { level: 2, labelKey: 'medium', color: 'bg-amber-400' };
  return { level: 3, labelKey: 'strong', color: 'bg-green-500' };
}

export default function LoginPage() {
  const t = useTranslations('login');
  const tLegal = useTranslations('legal.registration');
  const { resolvedTheme } = useTheme();
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [marketingEmailsAllowed, setMarketingEmailsAllowed] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState<number | null>(null);
  const [lockoutCountdown, setLockoutCountdown] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const turnstileWidgetId = useRef<string | null>(null);
  const turnstileContainerRef = useRef<HTMLDivElement>(null);

  const supabase = createClient();
  const pwStrength = mode === 'register' ? getPasswordStrength(password) : null;
  const isLockedOut = lockoutUntil !== null && Date.now() < lockoutUntil;
  // Lokalde ilk render'da buton açık olsun diye varsayılan true; production'da useEffect ile false yapılır
  const [isLocalhost, setIsLocalhost] = useState(true);
  const hasTurnstile = !!TURNSTILE_SITE_KEY;
  const requireTurnstile = hasTurnstile && !isLocalhost;

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      setIsLocalhost(false);
    }
  }, []);

  useEffect(() => {
    if (!lockoutUntil) return;
    const tick = () => {
      const remaining = Math.ceil((lockoutUntil - Date.now()) / 1000);
      if (remaining <= 0) {
        setLockoutUntil(null);
        setLockoutCountdown(0);
        setFailedAttempts(0);
        if (timerRef.current) clearInterval(timerRef.current);
        return;
      }
      setLockoutCountdown(remaining);
    };
    tick();
    timerRef.current = setInterval(tick, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [lockoutUntil]);

  const renderTurnstile = useCallback(() => {
    if (!requireTurnstile || !window.turnstile || !turnstileContainerRef.current) return;
    if (turnstileWidgetId.current) {
      window.turnstile.reset(turnstileWidgetId.current);
      return;
    }
    turnstileWidgetId.current = window.turnstile.render(turnstileContainerRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      callback: (token: string) => setCaptchaToken(token),
      'expired-callback': () => setCaptchaToken(null),
      theme: 'light',
      size: 'flexible',
    });
  }, [requireTurnstile]);

  const resetCaptcha = useCallback(() => {
    setCaptchaToken(null);
    if (turnstileWidgetId.current && window.turnstile) {
      window.turnstile.reset(turnstileWidgetId.current);
    }
  }, []);

  const handleFailedLogin = useCallback(() => {
    const next = failedAttempts + 1;
    setFailedAttempts(next);
    if (next >= MAX_ATTEMPTS) {
      setLockoutUntil(Date.now() + LOCKOUT_SECONDS * 1000);
      setError(t('tooManyAttempts'));
    }
  }, [failedAttempts]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLockedOut) return;

    if (requireTurnstile && !captchaToken) {
      setError(t('completeSecurityCheck'));
      return;
    }

    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      if (mode === 'register') {
        const redirectTo = `${window.location.origin}/auth/callback`;
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              display_name: name || email.split('@')[0],
              marketing_emails_allowed: marketingEmailsAllowed,
            },
            emailRedirectTo: redirectTo,
            ...(captchaToken ? { captchaToken } : {}),
          },
        });
        if (error) throw error;
        setSuccess(t('accountCreated'));
        setMode('login');
        setPassword('');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
          options: {
            ...(captchaToken ? { captchaToken } : {}),
          },
        });
        if (error) {
          handleFailedLogin();
          throw error;
        }
        setFailedAttempts(0);
        window.location.href = '/';
      }
    } catch (err: unknown) {
      const rawMessage = err instanceof Error ? err.message : (err && typeof err === 'object' && 'message' in err && typeof (err as { message: unknown }).message === 'string' ? (err as { message: string }).message : 'Something went wrong');
      if (typeof window !== 'undefined') {
        console.error('[Login]', rawMessage, err);
      }
      const isCaptchaError = /captcha|verification|disallowed/i.test(rawMessage);
      const showMessage = isCaptchaError && typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
        ? 'Lokalde giriş için Supabase Dashboard → Authentication → Captcha korumasını kapatın (sadece geliştirme için).'
        : rawMessage;
      setError(showMessage);
      resetCaptcha();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {requireTurnstile && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          onReady={renderTurnstile}
        />
      )}

      {/* Left: Form — tam ortadan 50/50, form ve inputlara dokunulmadı */}
      <div className="w-full md:w-1/2 h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-[#fafafa] dark:bg-gray-900 relative overflow-y-auto">
        {/* Mobile: thin grainy gradient strip at top */}
        <div className="md:hidden absolute top-0 left-0 right-0 h-24 login-grainy-panel opacity-90" aria-hidden />
        <div className="w-full max-w-sm relative z-10">
          {/* Logo */}
          <div className="text-center mb-8">
            <Image
              src={resolvedTheme === 'dark' ? '/qarint-games-logo-dark-mode.svg' : '/qarint-games-logo.svg'}
              alt="Qarint"
              width={120}
              height={36}
              className="mx-auto mb-3"
              priority
            />
            <p className="text-sm text-gray-400 dark:text-gray-500">{t('tagline')}</p>
          </div>

          {/* Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card border border-gray-100 dark:border-gray-700 p-6 md:p-8">
          {/* Tabs */}
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1 mb-6">
            <button
              onClick={() => { setMode('login'); setError(null); setSuccess(null); setPassword(''); resetCaptcha(); }}
              className={`flex-1 py-2 text-sm font-display font-bold rounded-lg transition-all duration-200 ${
                mode === 'login'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow-sm'
                  : 'text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300'
              }`}
            >
              {t('logIn')}
            </button>
            <button
              onClick={() => { setMode('register'); setError(null); setSuccess(null); setPassword(''); resetCaptcha(); }}
              className={`flex-1 py-2 text-sm font-display font-bold rounded-lg transition-all duration-200 ${
                mode === 'register'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow-sm'
                  : 'text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300'
              }`}
            >
              {t('signUp')}
            </button>
          </div>

          {/* Lockout Warning */}
          {isLockedOut && (
            <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-xl text-center">
              <p className="text-sm font-bold text-amber-700 dark:text-amber-200">{t('accountLocked')}</p>
              <p className="text-xs text-amber-600 dark:text-amber-300 mt-1">
                {t('tryAgainIn', { seconds: lockoutCountdown })}
              </p>
            </div>
          )}

          {/* Error */}
          {error && !isLockedOut && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-600 dark:text-red-300 font-medium">
              {error}
              {failedAttempts > 0 && failedAttempts < MAX_ATTEMPTS && mode === 'login' && (
                <p className="text-xs text-red-400 dark:text-red-400 mt-1">
                  {t('attemptsRemaining', { count: MAX_ATTEMPTS - failedAttempts })}
                </p>
              )}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-sm text-green-600 dark:text-green-300 font-medium">
              {success}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">
                  {t('name')}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t('namePlaceholder')}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-gray-100
                             placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40
                             transition-all duration-200"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">
                {t('email')}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('emailPlaceholder')}
                required
                autoComplete="email"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-gray-100
                           placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40
                           transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">
                {t('password')}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('passwordPlaceholder')}
                required
                minLength={6}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-gray-100
                           placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40
                           transition-all duration-200"
              />

              {/* Password Strength Indicator */}
              {mode === 'register' && password.length > 0 && pwStrength && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          i <= pwStrength.level ? pwStrength.color : 'bg-gray-200 dark:bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <p className={`text-[11px] mt-1 font-medium ${
                    pwStrength.level === 1 ? 'text-red-500 dark:text-red-400'
                    : pwStrength.level === 2 ? 'text-amber-500 dark:text-amber-400'
                    : 'text-green-600 dark:text-green-400'
                  }`}>
                    {t(pwStrength.labelKey)}
                    {pwStrength.level === 1 && t('addNumbersUppercase')}
                  </p>
                </div>
              )}
            </div>

            {mode === 'register' && (
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="marketing-emails"
                  checked={marketingEmailsAllowed}
                  onChange={(e) => setMarketingEmailsAllowed(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                />
                <label htmlFor="marketing-emails" className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-medium">{tLegal('checkboxLabel')}</span>
                  <span className="block text-xs text-gray-500 dark:text-gray-400 mt-0.5">{tLegal('checkboxHint')}</span>
                </label>
              </div>
            )}

            {/* Cloudflare Turnstile — localhost'ta atlanır, böylece lokalde giriş yapılabilir */}
            {requireTurnstile && (
              <div ref={turnstileContainerRef} className="flex justify-center" />
            )}

            <button
              type="submit"
              disabled={loading || isLockedOut || (requireTurnstile && !captchaToken)}
              className="w-full btn-primary py-3.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? t('pleaseWait')
                : isLockedOut
                  ? t('locked', { seconds: lockoutCountdown })
                  : mode === 'login'
                    ? t('logIn')
                    : t('createAccount')
              }
            </button>
          </form>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-6">
            {t('footer')}
          </p>
          <p className="text-center text-[11px] text-gray-400/80 dark:text-gray-500/80 mt-2">
            {t('poweredBy')}
          </p>
        </div>
      </div>

      {/* Right: login-cover görseli, gölge/çerçeve yok; üstte ortalı tanıtım metinleri (md+) */}
      <div
        className="hidden md:flex md:w-1/2 h-screen items-center justify-center min-h-0"
        aria-hidden="true"
      >
        <div className="w-full h-full overflow-hidden relative flex flex-col">
          {/* Arka plan görseli */}
          <Image
            src="/login-cover.png"
            alt=""
            fill
            className="object-cover"
            sizes="50vw"
            priority={false}
          />
          {/* Görsel üzerinde metin — dark mode istisnası, her zaman koyu (okunaklı) */}
          <div className="relative z-10 flex flex-col items-center justify-start flex-1 w-full px-6 lg:px-10 pt-20 lg:pt-28 text-center font-friendly antialiased text-gray-900">
            <div className="space-y-6 w-full">
              <h2 className="text-2xl lg:text-3xl font-semibold text-balance">
                {t('onboarding.headline')}
              </h2>
              <ul className="space-y-4 flex flex-col items-center text-gray-800">
                <li className="flex gap-3 items-center justify-center text-base font-medium">
                  <span className="flex-shrink-0 text-primary" aria-hidden>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </span>
                  <span>{t('onboarding.feature1')}</span>
                </li>
                <li className="flex gap-3 items-center justify-center text-base font-medium">
                  <span className="flex-shrink-0 text-amber-600" aria-hidden>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                  </span>
                  <span>{t('onboarding.feature2')}</span>
                </li>
                <li className="flex gap-3 items-center justify-center text-base font-medium">
                  <span className="flex-shrink-0 text-green-700" aria-hidden>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </span>
                  <span>{t('onboarding.feature3')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
