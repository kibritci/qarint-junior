'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
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
        <div className="relative inline-block">
          <div className={`relative w-20 h-20 rounded-full flex items-center justify-center text-4xl overflow-hidden ${!avatarUrl ? 'bg-gray-100 dark:bg-gray-700' : ''}`}>
            {avatarUrl ? (
              <Image src={avatarUrl} alt="" fill className="object-cover" unoptimized />
            ) : (
              <span>{avatarEmoji ?? '🦁'}</span>
            )}
          </div>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            aria-label={t('editAvatar')}
            className="absolute -bottom-0.5 -right-0.5 p-1.5 rounded-full bg-white dark:bg-gray-700 shadow-sm border border-gray-200 dark:border-gray-600 text-primary hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            <PencilSquareIcon className="w-4 h-4" />
          </button>
        </div>
        <h2 className="mt-3 text-xl font-display font-bold text-gray-900 dark:text-gray-100">{displayName || tCommon('fallbackStudent')}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-full mt-0.5">{email}</p>
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
