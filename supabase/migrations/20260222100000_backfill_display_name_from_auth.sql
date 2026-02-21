-- Backfill display_name in users_gamification from auth (registration name or email)
-- for rows where display_name is null, so leaderboard shows names instead of "Oyuncu"
UPDATE users_gamification ug
SET display_name = COALESCE(
  NULLIF(TRIM(au.raw_user_meta_data->>'display_name'), ''),
  NULLIF(TRIM(SPLIT_PART(au.email, '@', 1)), '')
)
FROM auth.users au
WHERE ug.user_id = au.id
  AND (ug.display_name IS NULL OR ug.display_name = '');
