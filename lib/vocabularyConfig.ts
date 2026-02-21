/**
 * Kategori ve seviye seçenekleri – oyunlar sayfası ve kelime çekme için.
 * ID'ler cambridgeYLE.ts / vocabulary_words tablosu ile uyumlu.
 */

export const GAME_CATEGORY_IDS = [
  'animals',
  'nature',
  'food',
  'family',
  'home',
  'clothes',
  'transport',
  'body',
  'colours',
  'sports',
  'school',
  'toys',
] as const;

export type GameCategoryId = (typeof GAME_CATEGORY_IDS)[number];

/** Seviye: Kolay = Pre A1, Orta = A1, Zor = A2. "any" = filtre yok. */
export const GAME_LEVEL_IDS = ['any', 'pre_a1_starters', 'a1_movers', 'a2_flyers'] as const;

export type GameLevelId = (typeof GAME_LEVEL_IDS)[number];

/** Oyunlarda kullanılabilecek Supabase/local kategori listesi (yeterli kelime olanlar). */
export const MEMORY_MATCH_CATEGORIES: GameCategoryId[] = [
  'animals',
  'food',
  'family',
  'home',
  'clothes',
  'transport',
  'nature',
  'body',
  'colours',
];

/** Konu kartları için emoji + gradient (pul/tab görünümü). */
export const TOPIC_THEMES: Record<
  GameCategoryId | 'any',
  { emoji: string; bg: string; border: string; text: string }
> = {
  any: { emoji: '✨', bg: 'bg-gray-100', border: 'border-gray-200', text: 'text-gray-700' },
  animals: { emoji: '🐾', bg: 'bg-amber-100', border: 'border-amber-300', text: 'text-amber-900' },
  nature: { emoji: '🌿', bg: 'bg-green-100', border: 'border-green-300', text: 'text-green-900' },
  food: { emoji: '🍎', bg: 'bg-orange-100', border: 'border-orange-300', text: 'text-orange-900' },
  family: { emoji: '👨‍👩‍👧', bg: 'bg-rose-100', border: 'border-rose-300', text: 'text-rose-900' },
  home: { emoji: '🏠', bg: 'bg-sky-100', border: 'border-sky-300', text: 'text-sky-900' },
  clothes: { emoji: '👕', bg: 'bg-violet-100', border: 'border-violet-300', text: 'text-violet-900' },
  transport: { emoji: '🚌', bg: 'bg-blue-100', border: 'border-blue-300', text: 'text-blue-900' },
  body: { emoji: '👋', bg: 'bg-teal-100', border: 'border-teal-300', text: 'text-teal-900' },
  colours: { emoji: '🎨', bg: 'bg-pink-100', border: 'border-pink-300', text: 'text-pink-900' },
  sports: { emoji: '⚽', bg: 'bg-lime-100', border: 'border-lime-300', text: 'text-lime-900' },
  school: { emoji: '📚', bg: 'bg-indigo-100', border: 'border-indigo-300', text: 'text-indigo-900' },
  toys: { emoji: '🧸', bg: 'bg-fuchsia-100', border: 'border-fuchsia-300', text: 'text-fuchsia-900' },
};

/** Seviye kartları: yıldız sayısı + renk. */
export const LEVEL_THEMES: Record<
  GameLevelId,
  { stars: number; bg: string; border: string; text: string; activeBg: string }
> = {
  any: { stars: 0, bg: 'bg-gray-100', border: 'border-gray-200', text: 'text-gray-700', activeBg: 'bg-gray-200' },
  pre_a1_starters: { stars: 1, bg: 'bg-emerald-50', border: 'border-emerald-300', text: 'text-emerald-800', activeBg: 'bg-emerald-200' },
  a1_movers: { stars: 2, bg: 'bg-amber-50', border: 'border-amber-300', text: 'text-amber-800', activeBg: 'bg-amber-200' },
  a2_flyers: { stars: 3, bg: 'bg-rose-100', border: 'border-rose-300', text: 'text-rose-800', activeBg: 'bg-rose-200' },
};
