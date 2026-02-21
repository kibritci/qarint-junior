'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { GAMES, GAME_ID_TO_TITLE_KEY } from '@/lib/gamesConfig';
import {
  MEMORY_MATCH_CATEGORIES,
  GAME_LEVEL_IDS,
  TOPIC_THEMES,
  type GameCategoryId,
  type GameLevelId,
} from '@/lib/vocabularyConfig';

function buildGameHref(baseHref: string, category: string, level: string): string {
  const params = new URLSearchParams();
  if (category && category !== 'any') params.set('category', category);
  if (level && level !== 'any') params.set('level', level);
  const qs = params.toString();
  return qs ? `${baseHref}?${qs}` : baseHref;
}

const TOPIC_IDS: (GameCategoryId | 'any')[] = ['any', ...MEMORY_MATCH_CATEGORIES];

export default function GamesPageContent() {
  const t = useTranslations('games');
  const [category, setCategory] = useState<GameCategoryId | 'any'>('any');
  const [level, setLevel] = useState<GameLevelId>('any');

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Üst: Başlık + Cambridge badge (sol) | Seviye dropdown (sağ) */}
        <div className="mb-6 md:mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs md:text-sm text-gray-400">{t('pageLabel')}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-2">
              {t('miniGames')}
            </h1>
            <div className="badge-blue">
              <span>{t('cambridgeBadge')}</span>
            </div>
          </div>
          <label className="flex flex-col gap-1.5 shrink-0 sm:mt-1">
            <span className="text-xs md:text-sm font-semibold text-gray-600">{t('selectLevel')}</span>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value as GameLevelId)}
              aria-label={t('selectLevel')}
              className="rounded-xl border-2 border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-800 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 min-w-[140px]"
            >
              {GAME_LEVEL_IDS.map((id) => (
                <option key={id} value={id}>
                  {t(`levels.${id}`)}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Orta: Oyun kategorisi – hangi oyun */}
        <div className="mb-8">
          <p className="text-xs md:text-sm font-semibold text-gray-600 mb-3">{t('pickGame')}</p>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {GAMES.map((game) => (
              <Link
                key={game.id}
                href={buildGameHref(game.href, category, level)}
                className={`
                  inline-flex items-center gap-2 shrink-0
                  px-4 py-3 md:px-5 md:py-3.5 rounded-xl
                  border-2 border-white/80 shadow-md
                  bg-gradient-to-br ${game.gradient}
                  text-white font-semibold text-sm md:text-base
                  hover:scale-[1.03] active:scale-[0.98]
                  transition-all duration-200
                `}
              >
                <span className="text-lg md:text-xl" aria-hidden>{game.emoji}</span>
                <span>{t(`titles.${GAME_ID_TO_TITLE_KEY[game.id] ?? game.id}`)}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Alt: Konu seçimi – alttan konu seçilince yukarıdaki oyunlar bu konuyla açılır */}
        <div>
          <p className="text-xs md:text-sm font-semibold text-gray-600 mb-3">{t('selectTopic')}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {TOPIC_IDS.map((id, i) => {
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
                    flex flex-col items-center justify-center gap-2 md:gap-3
                    min-h-[100px] md:min-h-[120px] rounded-2xl
                    border-2 transition-all duration-200
                    hover:scale-[1.02] active:scale-[0.98] shadow-sm
                    ${theme.bg} ${theme.border} ${theme.text}
                    ${isActive ? 'ring-2 ring-offset-2 ring-primary shadow-md' : 'hover:shadow'}
                  `}
                  style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}
                >
                  <span className="text-3xl md:text-4xl" aria-hidden>{theme.emoji}</span>
                  <span className="text-sm md:text-base font-bold text-center px-1">
                    {t(`topics.${id}`)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
