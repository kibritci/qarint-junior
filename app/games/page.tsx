import Link from 'next/link';

const games = [
  {
    id: 'memory-match',
    title: 'Memory Match',
    subtitle: 'Match words with pictures',
    href: '/games/memory-match',
    emoji: '🧩',
    gradient: 'from-violet-500 to-purple-600',
    bgLight: 'bg-violet-50',
  },
  {
    id: 'splat-word-hunt',
    title: 'Splat Word Hunt',
    subtitle: 'Pop the right bubbles!',
    href: '/games/splat-word-hunt',
    emoji: '🎯',
    gradient: 'from-rose-500 to-pink-600',
    bgLight: 'bg-rose-50',
  },
  {
    id: 'sentence-builder',
    title: 'Sentence Builder',
    subtitle: 'Build sentences by dragging',
    href: '/games/sentence-builder',
    emoji: '✍️',
    gradient: 'from-amber-500 to-orange-600',
    bgLight: 'bg-amber-50',
  },
  {
    id: 'mad-libs',
    title: 'Mad-Libs Stories',
    subtitle: 'Fill in funny blanks!',
    href: '/games/mad-libs',
    emoji: '📖',
    gradient: 'from-emerald-500 to-teal-600',
    bgLight: 'bg-emerald-50',
  },
  {
    id: 'picture-quiz',
    title: 'Picture Quiz',
    subtitle: 'Name the picture!',
    href: '/games/picture-quiz',
    emoji: '🖼️',
    gradient: 'from-sky-500 to-cyan-600',
    bgLight: 'bg-sky-50',
  },
];

export default function GamesPage() {
  return (
    <div className="p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs md:text-sm text-gray-400">Games</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-2">Mini Games</h1>
          <div className="badge-blue">
            <span>Cambridge YLE Aligned</span>
          </div>
        </div>

        {/* Game Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-5">
          {games.map((game, i) => (
            <Link
              key={game.id}
              href={game.href}
              className="card-game group p-4 md:p-5 animate-slide-up"
              style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
            >
              {/* Icon */}
              <div className={`w-11 h-11 md:w-14 md:h-14 ${game.bgLight} rounded-xl flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-xl md:text-2xl">{game.emoji}</span>
              </div>

              {/* Text */}
              <h2 className="text-sm md:text-base font-display font-bold text-gray-900 mb-0.5 md:mb-1">
                {game.title}
              </h2>
              <p className="text-xs md:text-sm text-gray-400">
                {game.subtitle}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
