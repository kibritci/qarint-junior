'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import EditAvatarModal from './EditAvatarModal';

interface ProfileHeaderProps {
  displayName: string;
  email: string;
  avatarUrl: string | null;
  avatarEmoji: string | null;
  userId: string;
}

export default function ProfileHeader({
  displayName,
  email,
  avatarUrl,
  avatarEmoji,
  userId,
}: ProfileHeaderProps) {
  const t = useTranslations('profileHeader');
  const tCommon = useTranslations('common');
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const handleSaved = () => router.refresh();

  return (
    <>
      <div className="flex flex-col items-center text-center mb-8">
        <div className={`relative w-20 h-20 rounded-full flex items-center justify-center text-4xl overflow-hidden ${!avatarUrl ? 'bg-gray-100' : ''}`}>
          {avatarUrl ? (
            <Image src={avatarUrl} alt="" fill className="object-cover" unoptimized />
          ) : (
            <span>{avatarEmoji ?? '🦁'}</span>
          )}
        </div>
        <h2 className="mt-3 text-xl font-display font-bold text-gray-900">{displayName || tCommon('fallbackStudent')}</h2>
        <p className="text-sm text-gray-500 truncate max-w-full mt-0.5">{email}</p>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="mt-3 text-sm font-semibold text-primary hover:text-primary-600"
        >
          {t('editAvatar')}
        </button>
      </div>

      <EditAvatarModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSaved={handleSaved}
        currentAvatarUrl={avatarUrl}
        currentAvatarEmoji={avatarEmoji}
        userId={userId}
      />
    </>
  );
}
