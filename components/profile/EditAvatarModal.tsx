'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { AVATAR_EMOJIS } from '@/lib/constants/avatar';
import { updateProfile } from '@/actions/gamification';
import { createClient } from '@/lib/supabase/client';
import { showErrorToast, getErrorMessage } from '@/lib/errorToast';

const MAX_AVATAR_BYTES = 500 * 1024; // 500 KB

interface EditAvatarModalProps {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  currentAvatarUrl: string | null;
  currentAvatarEmoji: string | null;
  userId: string;
}

export default function EditAvatarModal({
  open,
  onClose,
  onSaved,
  currentAvatarUrl,
  currentAvatarEmoji,
  userId,
}: EditAvatarModalProps) {
  const t = useTranslations('profile');
  const tErrors = useTranslations('errors');
  const [tab, setTab] = useState<'emoji' | 'photo'>('emoji');
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(currentAvatarEmoji ?? '🦁');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);
    if (!file) {
      setPhotoFile(null);
      setPhotoPreview(null);
      return;
    }
    if (!file.type.startsWith('image/')) {
      setError(t('pleaseChooseImage'));
      return;
    }
    if (file.size > MAX_AVATAR_BYTES) {
      setError(t('imageTooBig', { size: MAX_AVATAR_BYTES / 1024 }));
      return;
    }
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      if (tab === 'emoji') {
        const res = await updateProfile({ avatar_emoji: selectedEmoji, avatar_svg_url: null });
        if (res.error) throw new Error(res.error);
      } else {
        if (photoFile) {
          const supabase = createClient();
          const { data: { user: authUser } } = await supabase.auth.getUser();
          if (!authUser) {
            setError(t('pleaseSignInAgain'));
            setSaving(false);
            return;
          }
          const ext = photoFile.name.split('.').pop() || 'jpg';
          const path = `${authUser.id}/avatar.${ext}`;
          const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(path, photoFile, { upsert: true });
          if (uploadError) throw uploadError;
          const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(path);
          // Client-side upsert so RLS sees same auth as upload (avoids Server Action cookie/session issues in prod)
          const { error: upsertError } = await supabase
            .from('users_gamification')
            .upsert(
              { user_id: authUser.id, avatar_svg_url: publicUrl, avatar_emoji: null },
              { onConflict: 'user_id' }
            );
          if (upsertError) throw new Error(upsertError.message);
        } else if (currentAvatarUrl) {
          const res = await updateProfile({ avatar_svg_url: currentAvatarUrl });
          if (res.error) throw new Error(res.error);
        }
      }
      onSaved();
      onClose();
    } catch (err) {
      const msg = err instanceof Error ? err.message : t('failedToSave');
      setError(getErrorMessage(msg, tErrors));
      if (err instanceof Error && msg) showErrorToast(msg, tErrors);
    } finally {
      setSaving(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-sm w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-display font-bold text-gray-900 dark:text-gray-100">{t('editAvatar')}</h3>
          <button type="button" onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            <XMarkIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="flex rounded-xl bg-gray-100 dark:bg-gray-700 p-1">
            <button
              type="button"
              onClick={() => setTab('emoji')}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${tab === 'emoji' ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}
            >
              {t('emoji')}
            </button>
            <button
              type="button"
              onClick={() => setTab('photo')}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${tab === 'photo' ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}
            >
              {t('photo')}
            </button>
          </div>

          {tab === 'emoji' && (
            <div className="flex flex-wrap gap-2">
              {AVATAR_EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setSelectedEmoji(emoji)}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all
                    ${selectedEmoji === emoji ? 'bg-primary-100 dark:bg-primary-900/40 border-2 border-primary dark:border-primary-500' : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'}`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}

          {tab === 'photo' && (
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-4 border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-xl text-sm text-gray-500 dark:text-gray-400 hover:border-primary/40 dark:hover:border-primary-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                {photoPreview ? (
                  <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                    <Image src={photoPreview} alt="Preview" fill className="object-cover" unoptimized />
                  </div>
                ) : (
                  t('choosePhoto')
                )}
              </button>
              <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-2 text-center">{t('maxSize', { size: 500 })}</p>
            </div>
          )}

          {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
        </div>

        <div className="p-4 border-t border-gray-100 dark:border-gray-700 flex gap-2">
          <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
            {t('cancel')}
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || (tab === 'photo' && !photoFile && !currentAvatarUrl)}
            className="flex-1 py-2.5 rounded-xl btn-primary text-sm disabled:opacity-50"
          >
            {saving ? t('saving') : t('save')}
          </button>
        </div>
      </div>
    </div>
  );
}
