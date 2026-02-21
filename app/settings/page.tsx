import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { createClient } from '@/lib/supabase/server';
import ProfileForm from '@/components/profile/ProfileForm';
import { getUserGamification } from '@/actions/gamification';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import ParentalLockSection from '@/components/parental/ParentalLockSection';

export default async function SettingsPage() {
  const t = await getTranslations('settings');
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: gamification } = await getUserGamification();
  const displayName =
    gamification?.display_name ??
    user.user_metadata?.display_name ??
    user.email?.split('@')[0] ??
    '';

  const parentBirthDate =
    gamification?.parent_birth_date != null
      ? String(gamification.parent_birth_date)
      : null;

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-xl mx-auto">
        <Link
          href="/profile"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-6"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          {t('backToProfile')}
        </Link>
        <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-gray-100 mb-2">
          {t('title')}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
          {t('description')}
        </p>
        <ProfileForm
          initialDisplayName={displayName}
          totalXp={undefined}
          currentStreak={undefined}
          showStats={false}
        />
        <ParentalLockSection initialParentBirthDate={parentBirthDate} />
      </div>
    </div>
  );
}
