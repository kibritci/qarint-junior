'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useParentalLock } from '@/components/providers/ParentalLockProvider';
import { updateProfile } from '@/actions/gamification';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import { showErrorToast, getErrorMessage } from '@/lib/errorToast';

type ParentalLockSectionProps = {
  initialParentBirthDate: string | null;
};

export default function ParentalLockSection({
  initialParentBirthDate,
}: ParentalLockSectionProps) {
  const t = useTranslations('legal.parentalLock');
  const tErrors = useTranslations('errors');
  const { lockEnabled, setLockEnabled } = useParentalLock();
  const [birthDate, setBirthDate] = useState(
    initialParentBirthDate ?? ''
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleToggle = (on: boolean) => {
    setLockEnabled(on);
  };

  const handleSaveBirthDate = async () => {
    setSaving(true);
    setMessage(null);
    const result = await updateProfile({
      parent_birth_date: birthDate.trim() || null,
    });
    setSaving(false);
    if (result.error) {
      const text = getErrorMessage(result.error, tErrors);
      setMessage({ type: 'error', text });
      showErrorToast(result.error, tErrors);
    } else {
      setMessage({ type: 'success', text: 'Saved.' });
    }
  };

  return (
    <section className="pt-8 border-t border-gray-200 dark:border-gray-700 space-y-4">
      <div className="flex items-center gap-2">
        <LockClosedIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
          {lockEnabled ? t('toggleLabelLocked') : t('toggleLabelUnlocked')}
        </h2>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {t('settingDescription')}
      </p>

      <div className="flex items-center gap-3">
        <button
          type="button"
          role="switch"
          aria-checked={lockEnabled}
          onClick={() => handleToggle(!lockEnabled)}
          className={`relative inline-flex h-7 w-12 shrink-0 rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
            lockEnabled
              ? 'bg-indigo-600'
              : 'bg-gray-200 dark:bg-gray-600'
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition ${
              lockEnabled ? 'translate-x-5' : 'translate-x-1'
            }`}
          />
        </button>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {lockEnabled ? t('toggleLabelLocked') : t('toggleLabelUnlocked')}
        </span>
      </div>

      <div>
        <label htmlFor="parent-birth-date" className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">
          {t('birthDatePlaceholder')} (for unlock)
        </label>
        <div className="flex gap-2">
          <input
            id="parent-birth-date"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="button"
            onClick={handleSaveBirthDate}
            disabled={saving}
            className="px-4 py-3 rounded-xl text-sm font-bold bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50"
          >
            {saving ? '...' : 'Save'}
          </button>
        </div>
      </div>

      {message && (
        <p
          className={`text-sm ${
            message.type === 'success'
              ? 'text-green-600 dark:text-green-400'
              : 'text-red-600 dark:text-red-400'
          }`}
        >
          {message.text}
        </p>
      )}
    </section>
  );
}
