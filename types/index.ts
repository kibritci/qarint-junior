export interface VocabularyWord {
  id: string;
  word: string;
  translation: string;
  openmoji_hex: string;
  category: string;
  level: 'pre_a1_starters' | 'a1_movers' | 'a2_flyers';
  is_cultural_value: boolean;
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
