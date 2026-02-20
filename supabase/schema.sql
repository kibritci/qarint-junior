-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Gamification Table
CREATE TABLE IF NOT EXISTS users_gamification (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  avatar_svg_url TEXT,
  display_name TEXT,
  avatar_emoji TEXT,
  accent_color TEXT,
  total_xp INTEGER DEFAULT 0 NOT NULL,
  current_streak INTEGER DEFAULT 0 NOT NULL,
  last_activity_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vocabulary Words Table
CREATE TABLE IF NOT EXISTS vocabulary_words (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  word TEXT NOT NULL,
  translation TEXT NOT NULL,
  openmoji_hex TEXT NOT NULL,
  category TEXT NOT NULL,
  level TEXT CHECK (level IN ('pre_a1_starters', 'a1_movers', 'a2_flyers')),
  is_cultural_value BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Game Sessions Table
CREATE TABLE IF NOT EXISTS game_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  game_type TEXT NOT NULL,
  score INTEGER DEFAULT 0,
  xp_earned INTEGER DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Weekly Leaderboard Table
CREATE TABLE IF NOT EXISTS leaderboard_weekly (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  week_start DATE NOT NULL,
  total_xp INTEGER DEFAULT 0 NOT NULL,
  rank INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, week_start)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_gamification_user_id ON users_gamification(user_id);
CREATE INDEX IF NOT EXISTS idx_vocabulary_words_category ON vocabulary_words(category);
CREATE INDEX IF NOT EXISTS idx_vocabulary_words_level ON vocabulary_words(level);
CREATE INDEX IF NOT EXISTS idx_game_sessions_user_id ON game_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_leaderboard_weekly_week_start ON leaderboard_weekly(week_start);

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE users_gamification ENABLE ROW LEVEL SECURITY;
ALTER TABLE vocabulary_words ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard_weekly ENABLE ROW LEVEL SECURITY;

-- Users Gamification Policies
CREATE POLICY "Users can read their own gamification data"
  ON users_gamification FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own gamification data"
  ON users_gamification FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own gamification data"
  ON users_gamification FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Vocabulary Words Policies (read-only for all authenticated users)
CREATE POLICY "Authenticated users can read vocabulary words"
  ON vocabulary_words FOR SELECT
  USING (auth.role() = 'authenticated');

-- Game Sessions Policies
CREATE POLICY "Users can read their own game sessions"
  ON game_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own game sessions"
  ON game_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Leaderboard Policies (read-only for all authenticated users)
CREATE POLICY "Authenticated users can read leaderboard"
  ON leaderboard_weekly FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Users can insert their own leaderboard entries"
  ON leaderboard_weekly FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own leaderboard entries"
  ON leaderboard_weekly FOR UPDATE
  USING (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for users_gamification
CREATE TRIGGER update_users_gamification_updated_at
  BEFORE UPDATE ON users_gamification
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
