'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { GAMES, GAME_ID_TO_TITLE_KEY } from '@/lib/gamesConfig';
import { getGamePlayCounts } from '@/actions/gamification';
import {
  MEMORY_MATCH_CATEGORIES,
  TOPIC_THEMES,
  type GameCategoryId,
} from '@/lib/vocabularyConfig';

const TOPIC_IDS: (GameCategoryId | 'any')[] = ['any', ...MEMORY_MATCH_CATEGORIES];

function buildGameHref(baseHref: string, category: string): string {
  if (!category || category === 'any') return baseHref;
  return `${baseHref}?category=${encodeURIComponent(category)}`;
}

function GamesLoadingSkeleton() {
  return (
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
  );
}

function GamesPageContentInner() {
  const t = useTranslations('games');
  const [category, setCategory] = useState<GameCategoryId | 'any'>('any');
  const [playCounts, setPlayCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    getGamePlayCounts().then(({ data }) => setPlayCounts(data ?? {})).catch(() => {});
  }, []);

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Başlık + Cambridge badge */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-gray-100 mb-2">
            {t('miniGames')}
          </h1>
          <div className="badge-blue inline-flex">
            <span>{t('cambridgeBadge')}</span>
          </div>
        </div>

        {/* Ana içerik: Oyunlar büyük kartlar (Duolingo tarzı) */}
        <section className="mb-8" aria-labelledby="games-heading">
          <h2 id="games-heading" className="sr-only">
            {t('pickGame')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {GAMES.map((game) => {
              const count = playCounts[game.id] ?? 0;
              const subtitleKey = GAME_ID_TO_TITLE_KEY[game.id] ?? game.id;
              return (
                <Link
                  key={game.id}
                  href={buildGameHref(game.href, category)}
                  className={`
                    card-game p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4
                    group hover:shadow-card-hover
                  `}
                >
                  <div
                    className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${game.gradient} flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform`}
                  >
                    <span className="text-2xl md:text-3xl" aria-hidden>
                      {game.emoji}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-bold text-gray-900 dark:text-gray-100 text-lg md:text-xl mb-0.5">
                      {t(`titles.${subtitleKey}`)}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t(`subtitles.${subtitleKey}`)}
                    </p>
                    {count > 0 && (
                      <p className="text-xs font-semibold text-primary mt-1.5">
                        {t('playedCount', { count })}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Konu: ikincil, tek satır */}
        <section className="border-t border-gray-100 dark:border-gray-800 pt-6" aria-labelledby="topic-heading">
          <p id="topic-heading" className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
            {t('selectTopic')}
          </p>
          <div className="flex flex-wrap gap-2">
            {TOPIC_IDS.map((id) => {
              const theme = TOPIC_THEMES[id];
              const isActive = category === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setCategory(id)}
                  aria-pressed={isActive}
                  aria-label={t(`topics.${id}`)}
                  className={`
                    inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold
                    border-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
                    ${theme.bg} ${theme.border} ${theme.text}
                    ${isActive ? 'ring-2 ring-offset-2 ring-primary' : ''}
                  `}
                >
                  <span aria-hidden>{theme.emoji}</span>
                  {t(`topics.${id}`)}
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

export default function GamesPageContent() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return <GamesLoadingSkeleton />;
  return <GamesPageContentInner />;
}
