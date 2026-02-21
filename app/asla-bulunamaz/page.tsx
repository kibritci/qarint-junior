import dynamic from 'next/dynamic';

const Rive404 = dynamic(() => import('@/components/rive/Rive404'), { ssr: false });

export default function LostPage() {
  return <Rive404 />;
}
