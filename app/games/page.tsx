import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { GAMES, GAME_ID_TO_TITLE_KEY } from '@/lib/gamesConfig';

export default async function GamesPage() {
  const t = await getTranslations('games');

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs md:text-sm text-gray-400">{t('pageLabel')}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-2">{t('miniGames')}</h1>
          <div className="badge-blue">
            <span>{t('cambridgeBadge')}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-5">
          {GAMES.map((game, i) => (
            <Link
              key={game.id}
              href={game.href}
              className="card-game group p-4 md:p-5 animate-slide-up"
              style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
            >
              <div className={`w-11 h-11 md:w-14 md:h-14 ${game.bgLight} rounded-xl flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-xl md:text-2xl">{game.emoji}</span>
              </div>
              <h2 className="text-sm md:text-base font-display font-bold text-gray-900 mb-0.5 md:mb-1">
                {t(`titles.${GAME_ID_TO_TITLE_KEY[game.id] ?? game.id}`)}
              </h2>
              <p className="text-xs md:text-sm text-gray-400">
                {t(`subtitles.${GAME_ID_TO_TITLE_KEY[game.id] ?? game.id}`)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
