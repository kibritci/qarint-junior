-- Add profile fields to users_gamification (display name, emoji avatar, accent color)
ALTER TABLE users_gamification
  ADD COLUMN IF NOT EXISTS display_name TEXT,
  ADD COLUMN IF NOT EXISTS avatar_emoji TEXT,
  ADD COLUMN IF NOT EXISTS avatar_svg_url TEXT,
  ADD COLUMN IF NOT EXISTS accent_color TEXT;

-- Allow authenticated users to read other users' profile fields (for leaderboard)
CREATE POLICY "Authenticated users can read all gamification for leaderboard"
  ON users_gamification FOR SELECT
  USING (auth.role() = 'authenticated');

-- Comment: Run this in Supabase SQL Editor if you already have the main schema applied.
-- If you get "policy already exists" for the SELECT policy, you can drop the old
-- "Users can read their own gamification data" and keep this one, or skip the policy line.
