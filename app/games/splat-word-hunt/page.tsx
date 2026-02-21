import SplatGame from '@/components/games/SplatGame';

interface SplatWordHuntPageProps {
  searchParams: Promise<{ category?: string; level?: string }> | { category?: string; level?: string };
}

export default async function SplatWordHuntPage(props: SplatWordHuntPageProps) {
  const searchParams = await Promise.resolve(props.searchParams);
  return <SplatGame initialCategoryId={searchParams?.category} />;
}
