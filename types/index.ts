export interface VocabularyWord {
  id: string;
  word: string;
  /** Translations by locale: tr, az, es, en */
  translations: Record<string, string>;
  openmoji_hex: string;
  category: string;
  level: 'pre_a1_starters' | 'a1_movers' | 'a2_flyers';
  is_cultural_value: boolean;
}

/** Get translation for a locale; falls back to English word or first available */
export function getVocabularyTranslation(
  word: VocabularyWord,
  locale: string
): string {
  const t = word.translations?.[locale] ?? word.translations?.en ?? word.word;
  return t ?? word.word;
}

export interface UserGamification {
  user_id: string;
  avatar_svg_url: string | null;
  display_name: string | null;
  avatar_emoji: string | null;
  accent_color: string | null;
  total_xp: number;
  current_streak: number;
  last_activity_date: string | null;
}

export interface GameSession {
  id: string;
  user_id: string;
  game_type: string;
  score: number;
  xp_earned: number;
  completed_at: string;
}
