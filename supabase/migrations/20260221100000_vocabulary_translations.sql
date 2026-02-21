-- Replace single translation with multilingual translations (JSONB)
-- Run this before loading the new vocabulary_words.csv data

ALTER TABLE vocabulary_words
  ADD COLUMN IF NOT EXISTS translations JSONB DEFAULT '{}';

-- Migrate existing data: put current translation into translations.tr (if column exists and has data)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'vocabulary_words' AND column_name = 'translation'
  ) THEN
    UPDATE vocabulary_words
    SET translations = jsonb_build_object('tr', translation)
    WHERE translation IS NOT NULL AND translation != '';
  END IF;
END $$;

ALTER TABLE vocabulary_words
  DROP COLUMN IF EXISTS translation;

-- Optional: ensure we have a unique constraint on word for upserts later
CREATE UNIQUE INDEX IF NOT EXISTS idx_vocabulary_words_word ON vocabulary_words (word);
