import Link from 'next/link';
import dynamic from 'next/dynamic';
import { getTranslations } from 'next-intl/server';
import { getUserGamification } from '@/actions/gamification';
import ChainStreak from '@/components/streak/ChainStreak';
import { GAMES, GAME_ID_TO_TITLE_KEY } from '@/lib/gamesConfig';

const StreakFireRive = dynamic(() => import('@/components/rive/StreakFireRive'), { ssr: false });

export default async function Home() {
  const t = await getTranslations('home');
  const tGames = await getTranslations('games');
  const { data: gamification } = await getUserGamification();
  const totalXp = gamification?.total_xp ?? 0;
  const currentStreak = gamification?.current_streak ?? 0;
  const lastActivityDate = gamification?.last_activity_date ?? null;

  return (
    <>
      <div className="px-4 pt-0 pb-4 md:px-8 md:pt-0 md:pb-8">
        <div className="max-w-4xl mx-auto">
          {/* Don't break the chain — weekly streak */}
        <div className="mb-6 md:mb-8 max-w-[570px] mx-auto">
          <div className="flex flex-col items-center -mt-2">
            <div className="relative flex justify-center">
              <StreakFireRive streakCount={currentStreak} />
            </div>
            <h2 className="text-center text-xl md:text-2xl font-display font-bold text-gray-900 dark:text-gray-100 mt-1 mb-2">
              {t('chainBreakTitle')}
            </h2>
            <p className="text-center text-sm text-gray-600 dark:text-gray-300 mb-1">
              {t('chainBreakHint')}
            </p>
            <div className="flex items-center justify-center gap-1.5 mb-4">
              <svg className="h-4 w-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-bold text-green-600 dark:text-green-400">{t('xpPerDay')}</span>
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
        <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8 max-w-[570px] mx-auto">
          <div className="card-game p-3 md:p-5">
            <div className="flex flex-col md:flex-row items-center md:items-center gap-2 md:gap-3 text-center md:text-left">
              <div className="w-9 h-9 md:w-10 md:h-10 bg-blue-50 dark:bg-blue-900/40 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-base md:text-lg">⚡</span>
              </div>
              <div>
                <p className="text-xl md:text-2xl font-display font-bold text-gray-900 dark:text-gray-100">{currentStreak}</p>
                <p className="text-[10px] md:text-xs text-gray-400 dark:text-gray-500">{t('dayStreak')}</p>
              </div>
            </div>
          </div>
          <div className="card-game p-3 md:p-5">
            <div className="flex flex-col md:flex-row items-center md:items-center gap-2 md:gap-3 text-center md:text-left">
              <div className="w-9 h-9 md:w-10 md:h-10 bg-orange-50 dark:bg-orange-900/40 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-base md:text-lg">🔥</span>
              </div>
              <div>
                <p className="text-xl md:text-2xl font-display font-bold text-gray-900 dark:text-gray-100">{totalXp}</p>
                <p className="text-[10px] md:text-xs text-gray-400 dark:text-gray-500">{t('totalXp')}</p>
              </div>
            </div>
          </div>
          <div className="card-game p-3 md:p-5">
            <div className="flex flex-col md:flex-row items-center md:items-center gap-2 md:gap-3 text-center md:text-left">
              <div className="w-9 h-9 md:w-10 md:h-10 bg-green-50 dark:bg-green-900/40 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-base md:text-lg">🎮</span>
              </div>
              <div>
                <p className="text-xl md:text-2xl font-display font-bold text-gray-900 dark:text-gray-100">5</p>
                <p className="text-[10px] md:text-xs text-gray-400 dark:text-gray-500">{t('games')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Play */}
        <h2 className="text-lg md:text-xl font-display font-bold text-gray-900 dark:text-gray-100 mb-3 md:mb-4">{t('quickPlay')}</h2>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
          {GAMES.map((game) => (
            <Link
              key={game.id}
              href={game.href}
              className="card-game p-3 md:p-4 text-center"
            >
              <div className={`w-10 h-10 md:w-12 md:h-12 ${game.bgLight} rounded-xl flex items-center justify-center mx-auto mb-1.5 md:mb-2`}>
                <span className="text-lg md:text-xl">{game.emoji}</span>
              </div>
              <p className="text-xs md:text-sm font-display font-semibold text-gray-700 dark:text-gray-300">{tGames(`titles.${GAME_ID_TO_TITLE_KEY[game.id] ?? game.id}`)}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
