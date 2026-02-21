import { createClient } from '@/lib/supabase/server';
import { ParentalLockProvider } from '@/components/providers/ParentalLockProvider';

export default async function ParentalLockWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let parentBirthDate: string | null = null;
  if (user) {
    const { data } = await supabase
      .from('users_gamification')
      .select('parent_birth_date')
      .eq('user_id', user.id)
      .single();
    parentBirthDate = data?.parent_birth_date ?? null;
  }

  return (
    <ParentalLockProvider storedParentBirthDate={parentBirthDate}>
      {children}
    </ParentalLockProvider>
  );
}
