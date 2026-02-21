'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { updateProfile } from '@/actions/gamification';
import { createClient } from '@/lib/supabase/client';

interface ProfileFormProps {
  initialDisplayName: string;
  totalXp?: number;
  currentStreak?: number;
  /** Show XP and streak stat cards (profile page). Omit or false on settings. */
  showStats?: boolean;
}

export default function ProfileForm({
  initialDisplayName,
  totalXp = 0,
  currentStreak = 0,
  showStats = true,
}: ProfileFormProps) {
  const t = useTranslations('profile');
  const [displayName, setDisplayName] = useState(initialDisplayName);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#password') {
      document.getElementById('password')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    const result = await updateProfile({
      display_name: displayName.trim() || null,
    });
    setSaving(false);
    if (result.error) {
      setMessage({ type: 'error', text: result.error });
    } else {
      setMessage({ type: 'success', text: t('profileSaved') });
    }
  };

  return (
    <div className="space-y-6">
      {showStats && (
        <div className="grid grid-cols-2 gap-3">
          <div className="card-game p-4">
            <p className="text-2xl font-display font-bold text-gray-900 dark:text-gray-100">{totalXp}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{t('totalXp')}</p>
          </div>
          <div className="card-game p-4">
            <p className="text-2xl font-display font-bold text-gray-900 dark:text-gray-100">{currentStreak}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{t('dayStreak')}</p>
          </div>
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">
          {t('displayName')}
        </label>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder={t('displayNamePlaceholder')}
          maxLength={30}
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-gray-100
                     placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
        />
      </div>

      {message && (
        <div
          className={`p-3 rounded-xl text-sm font-medium
            ${message.type === 'success' ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300'}`}
        >
          {message.text}
        </div>
      )}

      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="w-full btn-primary py-3.5 text-sm disabled:opacity-50"
      >
        {saving ? t('saving') : t('saveProfile')}
      </button>

      <section id="password" className="pt-8 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-display font-bold text-gray-900 dark:text-gray-100 mb-2">{t('changePassword')}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {t('changePasswordHint')}
        </p>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">
              {t('newPassword')}
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              minLength={6}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-gray-100
                         placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">
              {t('confirmPassword')}
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              minLength={6}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-gray-100
                         placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          {passwordMessage && (
            <div
              className={`p-3 rounded-xl text-sm font-medium
                ${passwordMessage.type === 'success' ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300'}`}
            >
              {passwordMessage.text}
            </div>
          )}
          <button
            type="button"
            onClick={async () => {
              if (newPassword.length < 6) {
                setPasswordMessage({ type: 'error', text: t('passwordMinLength') });
                return;
              }
              if (newPassword !== confirmPassword) {
                setPasswordMessage({ type: 'error', text: t('passwordsDoNotMatch') });
                return;
              }
              setPasswordSaving(true);
              setPasswordMessage(null);
              const supabase = createClient();
              const { error } = await supabase.auth.updateUser({ password: newPassword });
              setPasswordSaving(false);
              if (error) {
                setPasswordMessage({ type: 'error', text: error.message });
              } else {
                setPasswordMessage({ type: 'success', text: t('passwordUpdated') });
                setNewPassword('');
                setConfirmPassword('');
              }
            }}
            disabled={passwordSaving || !newPassword || !confirmPassword}
            className="w-full py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-semibold text-gray-700 dark:text-gray-300
                       hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {passwordSaving ? t('updating') : t('updatePassword')}
          </button>
        </div>
      </section>
    </div>
  );
}
