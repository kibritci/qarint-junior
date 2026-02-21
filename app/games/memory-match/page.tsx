import { createClient } from '@/lib/supabase/server';
import MemoryMatch from '@/components/games/MemoryMatch';
import { VocabularyWord } from '@/types';
import { getWordsForGame, WordEntry, shuffleWords } from '@/lib/data/cambridgeYLE';
import { MEMORY_MATCH_CATEGORIES, type GameCategoryId } from '@/lib/vocabularyConfig';

function mapWordEntryToVocabularyWord(entry: WordEntry, index: number): VocabularyWord {
  return {
    id: String(index + 1),
    word: entry.word,
    translations: { tr: entry.translation, en: entry.word },
    openmoji_hex: entry.openmoji_hex,
    category: entry.category,
    level: entry.level,
    is_cultural_value: entry.is_cultural_value,
  };
}

function mapSupabaseRowToVocabularyWord(row: {
  id: string;
  word: string;
  translations: Record<string, string> | null;
  openmoji_hex: string;
  category: string;
  level: string;
  is_cultural_value: boolean;
}): VocabularyWord {
  return {
    id: row.id,
    word: row.word,
    translations: row.translations ?? {},
    openmoji_hex: row.openmoji_hex,
    category: row.category,
    level: row.level as VocabularyWord['level'],
    is_cultural_value: row.is_cultural_value,
  };
}

type LevelParam = 'pre_a1_starters' | 'a1_movers' | 'a2_flyers';

async function getVocabularyWords(
  categoryParam?: string | null,
  levelParam?: string | null
): Promise<VocabularyWord[]> {
  const category =
    categoryParam && MEMORY_MATCH_CATEGORIES.includes(categoryParam as GameCategoryId)
      ? categoryParam
      : MEMORY_MATCH_CATEGORIES[Math.floor(Math.random() * MEMORY_MATCH_CATEGORIES.length)];
  const level: LevelParam | undefined =
    levelParam === 'pre_a1_starters' || levelParam === 'a1_movers' || levelParam === 'a2_flyers'
      ? levelParam
      : undefined;

  try {
    const supabase = await createClient();
    let query = supabase
      .from('vocabulary_words')
      .select('*')
      .eq('category', category)
      .limit(24);
    if (level) query = query.eq('level', level);
    const { data, error } = await query;

    if (!error && data && data.length >= 6) {
      const shuffled = shuffleWords(data);
      return shuffled.slice(0, 6).map(mapSupabaseRowToVocabularyWord);
    }
  } catch {
    // Fallback to local data
  }

  const words = getWordsForGame(
    6,
    category,
    level ? { levelMax: level } : undefined
  );
  return words.map(mapWordEntryToVocabularyWord);
}

interface MemoryMatchPageProps {
  searchParams: Promise<{ category?: string; level?: string }> | { category?: string; level?: string };
}

export default async function MemoryMatchPage(props: MemoryMatchPageProps) {
  const searchParams = await Promise.resolve(props.searchParams);
  const words = await getVocabularyWords(searchParams?.category, searchParams?.level);
  return <MemoryMatch words={words} />;
}
