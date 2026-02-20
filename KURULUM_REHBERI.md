# 🚀 Qarint Junior - Supabase Veritabanı Kurulum Rehberi

Bu rehber, Supabase veritabanınızı kurmak için adım adım talimatlar içerir.

## 📋 Adım 1: Supabase Dashboard'a Giriş

1. Tarayıcınızda https://app.supabase.com adresine gidin
2. Giriş yapın ve Qarint Junior projenizi seçin

## 📋 Adım 2: SQL Editor'ü Açın

1. Sol menüden **"SQL Editor"** seçeneğine tıklayın
2. Editörün **üst kısmında**, açık sekmelerin yanında **"+ New"** butonunu bulun ve tıklayın
   - Alternatif: Sol kenar çubuğundaki **"+"** ikonuna tıklayıp "Create a new snippet" seçeneğini de kullanabilirsiniz
   - En kolay yol: Editör alanına direkt SQL kodunu yazmaya başlayabilirsiniz (otomatik olarak yeni sorgu oluşur)

## 📋 Adım 3: Schema SQL'ini Çalıştırın

1. Aşağıdaki SQL kodunu kopyalayın
2. SQL Editor'e yapıştırın
3. **"Run"** butonuna tıklayın (veya Ctrl+Enter)

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Gamification Table
CREATE TABLE IF NOT EXISTS users_gamification (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  avatar_svg_url TEXT,
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
```

✅ **Başarı mesajı görmelisiniz:** "Success. No rows returned"

## 📋 Adım 4: Seed Verilerini Ekleyin

1. Tekrar **"New query"** butonuna tıklayın
2. Aşağıdaki SQL kodunu kopyalayıp yapıştırın
3. **"Run"** butonuna tıklayın

```sql
-- Seed data for Qarint Junior
-- 10 kid-friendly words based on "Family, Honesty, and Nature" themes
-- All words are aligned with Cambridge YLE Pre A1 Starters level

INSERT INTO vocabulary_words (word, translation, openmoji_hex, category, level, is_cultural_value) VALUES
-- Family Values
('mother', 'anne', '1F469', 'family', 'pre_a1_starters', true),
('father', 'baba', '1F468', 'family', 'pre_a1_starters', true),
('family', 'aile', '1F46A', 'family', 'pre_a1_starters', true),
('respect', 'saygı', '1F64F', 'values', 'pre_a1_starters', true),
('honest', 'dürüst', '1F9D1', 'values', 'pre_a1_starters', true),

-- Nature (Safe and Educational)
('tree', 'ağaç', '1F333', 'nature', 'pre_a1_starters', false),
('flower', 'çiçek', '1F33C', 'nature', 'pre_a1_starters', false),
('sun', 'güneş', '2600', 'nature', 'pre_a1_starters', false),
('moon', 'ay', '1F314', 'nature', 'pre_a1_starters', false),
('star', 'yıldız', '2B50', 'nature', 'pre_a1_starters', false)

ON CONFLICT DO NOTHING;
```

✅ **Başarı mesajı görmelisiniz:** "Success. 10 rows inserted"

## 📋 Adım 5: Kontrol Edin

1. Sol menüden **"Table Editor"** seçeneğine tıklayın
2. **"vocabulary_words"** tablosuna tıklayın
3. 10 kelime görünmeli (mother, father, family, respect, honest, tree, flower, sun, moon, star)

## ✅ Kurulum Tamamlandı!

Artık veritabanınız hazır. Uygulamayı çalıştırabilirsiniz:

```bash
npm run dev
```

## 🆘 Sorun mu Yaşıyorsunuz?

- **"relation already exists" hatası:** Tablolar zaten oluşturulmuş, devam edebilirsiniz
- **"permission denied" hatası:** Service Role Key kullanmanız gerekebilir
- **Başka bir hata:** Lütfen hata mesajını bana gönderin
