'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Script from 'next/script';
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

function getPasswordStrength(pw: string): { level: 0 | 1 | 2 | 3; label: string; color: string } {
  if (!pw) return { level: 0, label: '', color: '' };
  let score = 0;
  if (pw.length >= 6) score++;
  if (pw.length >= 10) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;

  if (score <= 1) return { level: 1, label: 'Weak', color: 'bg-red-400' };
  if (score <= 3) return { level: 2, label: 'Medium', color: 'bg-amber-400' };
  return { level: 3, label: 'Strong', color: 'bg-green-500' };
}

export default function LoginPage() {
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
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
  const hasTurnstile = !!TURNSTILE_SITE_KEY;

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
    if (!hasTurnstile || !window.turnstile || !turnstileContainerRef.current) return;
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
  }, [hasTurnstile]);

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
      setError(`Too many attempts. Please wait ${LOCKOUT_SECONDS} seconds.`);
    }
  }, [failedAttempts]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLockedOut) return;

    if (hasTurnstile && !captchaToken) {
      setError('Please complete the security check.');
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
            data: { display_name: name || email.split('@')[0] },
            emailRedirectTo: redirectTo,
            ...(captchaToken ? { captchaToken } : {}),
          },
        });
        if (error) throw error;
        setSuccess('Account created! Check your email to verify, then log in.');
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
      const message = err instanceof Error ? err.message : 'Something went wrong';
      if (!error) setError(message);
      resetCaptcha();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 flex items-center justify-center p-4">
      {hasTurnstile && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          onReady={renderTurnstile}
        />
      )}

      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Image
            src="/logo-qarint.svg"
            alt="Qarint"
            width={120}
            height={36}
            className="mx-auto mb-3"
            priority
          />
          <p className="text-sm text-gray-400">Learn English through fun games</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6 md:p-8">
          {/* Tabs */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            <button
              onClick={() => { setMode('login'); setError(null); setSuccess(null); setPassword(''); resetCaptcha(); }}
              className={`flex-1 py-2 text-sm font-display font-bold rounded-lg transition-all duration-200 ${
                mode === 'login'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => { setMode('register'); setError(null); setSuccess(null); setPassword(''); resetCaptcha(); }}
              className={`flex-1 py-2 text-sm font-display font-bold rounded-lg transition-all duration-200 ${
                mode === 'register'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Lockout Warning */}
          {isLockedOut && (
            <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-center">
              <p className="text-sm font-bold text-amber-700">Account temporarily locked</p>
              <p className="text-xs text-amber-600 mt-1">
                Try again in <span className="font-mono font-bold">{lockoutCountdown}s</span>
              </p>
            </div>
          )}

          {/* Error */}
          {error && !isLockedOut && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 font-medium">
              {error}
              {failedAttempts > 0 && failedAttempts < MAX_ATTEMPTS && mode === 'login' && (
                <p className="text-xs text-red-400 mt-1">
                  {MAX_ATTEMPTS - failedAttempts} attempts remaining
                </p>
              )}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl text-sm text-green-600 font-medium">
              {success}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm
                             placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40
                             transition-all duration-200"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hello@example.com"
                required
                autoComplete="email"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm
                           placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40
                           transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm
                           placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40
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
                          i <= pwStrength.level ? pwStrength.color : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className={`text-[11px] mt-1 font-medium ${
                    pwStrength.level === 1 ? 'text-red-500'
                    : pwStrength.level === 2 ? 'text-amber-500'
                    : 'text-green-600'
                  }`}>
                    {pwStrength.label}
                    {pwStrength.level === 1 && ' — add numbers, uppercase or symbols'}
                  </p>
                </div>
              )}
            </div>

            {/* Cloudflare Turnstile */}
            {hasTurnstile && (
              <div ref={turnstileContainerRef} className="flex justify-center" />
            )}

            <button
              type="submit"
              disabled={loading || isLockedOut || (hasTurnstile && !captchaToken)}
              className="w-full btn-primary py-3.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? 'Please wait...'
                : isLockedOut
                  ? `Locked (${lockoutCountdown}s)`
                  : mode === 'login'
                    ? 'Log In'
                    : 'Create Account'
              }
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Safe and fun English learning for children
        </p>
      </div>
    </div>
  );
}
