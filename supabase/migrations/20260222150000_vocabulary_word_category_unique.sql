-- Allow same word in different categories (e.g. watch=wristwatch vs watch=to watch)
-- Drop single-column unique on word; add composite unique on (word, category).

DROP INDEX IF EXISTS idx_vocabulary_words_word;

CREATE UNIQUE INDEX IF NOT EXISTS idx_vocabulary_words_word_category
  ON vocabulary_words (word, category);
