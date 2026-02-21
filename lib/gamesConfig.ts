/**
 * Single source for game list: id, href, emoji, gradient, bgLight.
 * Title and subtitle come from i18n: games.titles.* and games.subtitles.*
 */
export const GAMES = [
  {
    id: 'memory-match',
    href: '/games/memory-match',
    emoji: '🧩',
    gradient: 'from-violet-500 to-purple-600',
    bgLight: 'bg-violet-50',
  },
  {
    id: 'splat-word-hunt',
    href: '/games/splat-word-hunt',
    emoji: '🎯',
    gradient: 'from-rose-500 to-pink-600',
    bgLight: 'bg-rose-50',
  },
  {
    id: 'sentence-builder',
    href: '/games/sentence-builder',
    emoji: '✍️',
    gradient: 'from-amber-500 to-orange-600',
    bgLight: 'bg-amber-50',
  },
  {
    id: 'mad-libs',
    href: '/games/mad-libs',
    emoji: '📖',
    gradient: 'from-emerald-500 to-teal-600',
    bgLight: 'bg-emerald-50',
  },
  {
    id: 'picture-quiz',
    href: '/games/picture-quiz',
    emoji: '🖼️',
    gradient: 'from-sky-500 to-cyan-600',
    bgLight: 'bg-sky-50',
  },
] as const;

export type GameId = (typeof GAMES)[number]['id'];

export const GAME_ID_TO_TITLE_KEY: Record<string, string> = {
  'memory-match': 'memoryMatch',
  'splat-word-hunt': 'splatWordHunt',
  'sentence-builder': 'sentenceBuilder',
  'mad-libs': 'madLibs',
  'picture-quiz': 'pictureQuiz',
};

const ID_TO_CAMEL = GAME_ID_TO_TITLE_KEY;

/** i18n key for title (e.g. games.titles.memoryMatch) */
export function getGameTitleKey(id: string): string {
  const camel = ID_TO_CAMEL[id] ?? id;
  return `games.titles.${camel}`;
}

/** i18n key for subtitle (e.g. games.subtitles.memoryMatch) */
export function getGameSubtitleKey(id: string): string {
  const camel = ID_TO_CAMEL[id] ?? id;
  return `games.subtitles.${camel}`;
}
