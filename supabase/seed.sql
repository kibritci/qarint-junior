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
