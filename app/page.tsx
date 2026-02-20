import Link from 'next/link';
import { getUserGamification } from '@/actions/gamification';
import ChainStreak from '@/components/streak/ChainStreak';

export default async function Home() {
  const { data: gamification } = await getUserGamification();
  const totalXp = gamification?.total_xp ?? 0;
  const currentStreak = gamification?.current_streak ?? 0;
  const lastActivityDate = gamification?.last_activity_date ?? null;

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Beta Banner */}
        <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 mb-4 md:mb-5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-amber-400 text-white text-[10px] font-bold uppercase tracking-wider">
              Beta
            </span>
            <p className="text-xs text-amber-700">
              You&apos;re one of our first testers — your feedback shapes the next version!
            </p>
          </div>
          <a
            href="https://forms.gle/DsRaaEgUYsHNgbYU8"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-amber-600 hover:text-amber-800 whitespace-nowrap ml-3 underline underline-offset-2"
          >
            Send Feedback
          </a>
        </div>

        {/* Don't break the chain — weekly streak */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col items-center">
            {/* Ateş ikonu + streak sayısı */}
            <div className="relative mb-3">
              <img
                src="/streak/fire-streak-icon.svg"
                alt=""
                className="h-20 w-auto md:h-24"
                width={128}
                height={153}
              />
              <div
                className="absolute inset-0 flex items-center justify-center pt-2"
                aria-hidden
              >
                <span className="font-black text-xl text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)] md:text-2xl tabular-nums">
                  {currentStreak}
                </span>
              </div>
            </div>
            <h2 className="text-center text-xl md:text-2xl font-display font-bold text-gray-900 mb-2">
              Zinciri Kırma!
            </h2>
            <p className="text-center text-sm text-gray-600 mb-1">
              Play at least once each day this week.
            </p>
            <div className="flex items-center justify-center gap-1.5 mb-4">
              <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-bold text-green-600">+500 XP per day</span>
            </div>
            <ChainStreak
              lastActivityDate={lastActivityDate}
              currentStreak={currentStreak}
              showRewardLabel
              compact={false}
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
          <div className="card-game p-3 md:p-5">
            <div className="flex flex-col md:flex-row items-center md:items-center gap-2 md:gap-3 text-center md:text-left">
              <div className="w-9 h-9 md:w-10 md:h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-base md:text-lg">⚡</span>
              </div>
              <div>
                <p className="text-xl md:text-2xl font-display font-bold text-gray-900">{currentStreak}</p>
                <p className="text-[10px] md:text-xs text-gray-400">Day Streak</p>
              </div>
            </div>
          </div>
          <div className="card-game p-3 md:p-5">
            <div className="flex flex-col md:flex-row items-center md:items-center gap-2 md:gap-3 text-center md:text-left">
              <div className="w-9 h-9 md:w-10 md:h-10 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-base md:text-lg">🔥</span>
              </div>
              <div>
                <p className="text-xl md:text-2xl font-display font-bold text-gray-900">{totalXp}</p>
                <p className="text-[10px] md:text-xs text-gray-400">Total XP</p>
              </div>
            </div>
          </div>
          <div className="card-game p-3 md:p-5">
            <div className="flex flex-col md:flex-row items-center md:items-center gap-2 md:gap-3 text-center md:text-left">
              <div className="w-9 h-9 md:w-10 md:h-10 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-base md:text-lg">🎮</span>
              </div>
              <div>
                <p className="text-xl md:text-2xl font-display font-bold text-gray-900">5</p>
                <p className="text-[10px] md:text-xs text-gray-400">Games</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Play */}
        <h2 className="text-lg md:text-xl font-display font-bold text-gray-900 mb-3 md:mb-4">Quick Play</h2>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
          {[
            { name: 'Memory Match', emoji: '🧩', href: '/games/memory-match', bg: 'bg-violet-50' },
            { name: 'Splat Hunt', emoji: '🎯', href: '/games/splat-word-hunt', bg: 'bg-rose-50' },
            { name: 'Sentence Builder', emoji: '✍️', href: '/games/sentence-builder', bg: 'bg-amber-50' },
            { name: 'Mad-Libs', emoji: '📖', href: '/games/mad-libs', bg: 'bg-emerald-50' },
            { name: 'Picture Quiz', emoji: '🖼️', href: '/games/picture-quiz', bg: 'bg-sky-50' },
          ].map((game) => (
            <Link
              key={game.name}
              href={game.href}
              className="card-game p-3 md:p-4 text-center"
            >
              <div className={`w-10 h-10 md:w-12 md:h-12 ${game.bg} rounded-xl flex items-center justify-center mx-auto mb-1.5 md:mb-2`}>
                <span className="text-lg md:text-xl">{game.emoji}</span>
              </div>
              <p className="text-xs md:text-sm font-display font-semibold text-gray-700">{game.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
