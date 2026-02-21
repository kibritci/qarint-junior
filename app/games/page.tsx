import dynamic from 'next/dynamic';

const GamesPageContent = dynamic(() => import('@/components/games/GamesPageContent'), {
  ssr: false,
  loading: () => (
    <div className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto animate-pulse">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-24 bg-gray-100 dark:bg-gray-800 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  ),
});

export default function GamesPage() {
  return <GamesPageContent />;
}
