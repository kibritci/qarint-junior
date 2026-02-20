import Link from 'next/link';

export default function Home() {
  return (
    <div className="p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-primary-50 via-rose-50 to-orange-50 rounded-2xl p-8 mb-8 border border-primary-100">
          <div className="flex items-center gap-6">
            <div className="text-6xl animate-wiggle">🦁</div>
            <div>
              <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
                Welcome to Qarint Junior!
              </h1>
              <p className="text-gray-600 mb-4">
                Learn English through fun games. Play, earn XP, and keep your streak going!
              </p>
              <Link href="/games" className="btn-primary inline-block">
                Start Playing
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="card-game p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <span className="text-lg">⚡</span>
              </div>
              <div>
                <p className="text-2xl font-display font-bold text-gray-900">0</p>
                <p className="text-xs text-gray-400">Day Streak</p>
              </div>
            </div>
          </div>
          <div className="card-game p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                <span className="text-lg">🔥</span>
              </div>
              <div>
                <p className="text-2xl font-display font-bold text-gray-900">0</p>
                <p className="text-xs text-gray-400">Total XP</p>
              </div>
            </div>
          </div>
          <div className="card-game p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                <span className="text-lg">🎮</span>
              </div>
              <div>
                <p className="text-2xl font-display font-bold text-gray-900">4</p>
                <p className="text-xs text-gray-400">Games Available</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Play */}
        <h2 className="text-xl font-display font-bold text-gray-900 mb-4">Quick Play</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Memory Match', emoji: '🧩', href: '/games/memory-match', bg: 'bg-violet-50' },
            { name: 'Splat Hunt', emoji: '🎯', href: '/games/splat-word-hunt', bg: 'bg-rose-50' },
            { name: 'Sentence Builder', emoji: '✍️', href: '/games/sentence-builder', bg: 'bg-amber-50' },
            { name: 'Mad-Libs', emoji: '📖', href: '/games/mad-libs', bg: 'bg-emerald-50' },
          ].map((game) => (
            <Link
              key={game.name}
              href={game.href}
              className="card-game p-4 text-center"
            >
              <div className={`w-12 h-12 ${game.bg} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                <span className="text-xl">{game.emoji}</span>
              </div>
              <p className="text-sm font-display font-semibold text-gray-700">{game.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
