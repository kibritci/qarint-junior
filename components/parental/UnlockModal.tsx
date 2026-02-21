'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useParentalLock } from '@/components/providers/ParentalLockProvider';

type UnlockModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function UnlockModal({ open, onClose }: UnlockModalProps) {
  const t = useTranslations('legal.parentalLock');
  const { requestUnlock } = useParentalLock();
  const [birthDate, setBirthDate] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const result = await requestUnlock(birthDate);
    if (result.success) {
      setBirthDate('');
      onClose();
    } else {
      setError(result.error === 'mismatch' ? t('modalError') : t('modalError'));
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="unlock-modal-title"
    >
      <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 id="unlock-modal-title" className="text-lg font-bold text-gray-900 dark:text-gray-100">
            {t('modalTitle')}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label={t('modalCancel')}
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="unlock-dob" className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">
              {t('birthDatePlaceholder')}
            </label>
            <input
              id="unlock-dob"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          )}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl text-sm font-bold border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              {t('modalCancel')}
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-700"
            >
              {t('modalSubmit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
