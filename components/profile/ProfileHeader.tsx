'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import EditAvatarModal from './EditAvatarModal';

function getAccentBg(colorId: string | null): string {
  if (!colorId) return 'bg-primary-100';
  const map: Record<string, string> = {
    primary: 'bg-primary-100', rose: 'bg-rose-100', amber: 'bg-amber-100',
    emerald: 'bg-emerald-100', sky: 'bg-sky-100', violet: 'bg-violet-100',
    orange: 'bg-orange-100', pink: 'bg-pink-100',
  };
  return map[colorId] ?? 'bg-primary-100';
}

interface ProfileHeaderProps {
  displayName: string;
  email: string;
  avatarUrl: string | null;
  avatarEmoji: string | null;
  accentColor: string | null;
  userId: string;
}

export default function ProfileHeader({
  displayName,
  email,
  avatarUrl,
  avatarEmoji,
  accentColor,
  userId,
}: ProfileHeaderProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const handleSaved = () => router.refresh();

  return (
    <>
      <div className="flex flex-col items-center text-center mb-8">
        <div className={`relative w-20 h-20 rounded-full flex items-center justify-center text-4xl overflow-hidden ${!avatarUrl ? getAccentBg(accentColor) : ''}`}>
          {avatarUrl ? (
            <Image src={avatarUrl} alt="" fill className="object-cover" unoptimized />
          ) : (
            <span>{avatarEmoji ?? '🦁'}</span>
          )}
        </div>
        <h2 className="mt-3 text-xl font-display font-bold text-gray-900">{displayName || 'Student'}</h2>
        <p className="text-sm text-gray-500 truncate max-w-full mt-0.5">{email}</p>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="mt-3 text-sm font-semibold text-primary hover:text-primary-600"
        >
          Edit avatar
        </button>
      </div>

      <EditAvatarModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSaved={handleSaved}
        currentAvatarUrl={avatarUrl}
        currentAvatarEmoji={avatarEmoji}
        accentColor={accentColor}
        userId={userId}
      />
    </>
  );
}
