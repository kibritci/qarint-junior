import { createClient } from '@/lib/supabase/server';
import MemoryMatch from '@/components/games/MemoryMatch';
import { VocabularyWord } from '@/types';
import { VOCABULARY } from '@/lib/data/cambridgeYLE';

function mapToVocabularyWord(entry: typeof VOCABULARY[number], index: number): VocabularyWord {
  return {
    id: String(index + 1),
    word: entry.word,
    translation: entry.translation,
    openmoji_hex: entry.openmoji_hex,
    category: entry.category,
    level: entry.level,
    is_cultural_value: entry.is_cultural_value,
  };
}

async function getVocabularyWords(): Promise<VocabularyWord[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('vocabulary_words')
      .select('*')
      .limit(10);

    if (!error && data && data.length > 0) {
      return data;
    }
  } catch {
    // Fallback to local data
  }

  // Use local Cambridge YLE data as fallback, pick random 10
  const shuffled = [...VOCABULARY]
    .filter((w) => !w.openmoji_hex.includes('-'))
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);
  return shuffled.map(mapToVocabularyWord);
}

export default async function MemoryMatchPage() {
  const words = await getVocabularyWords();
  return <MemoryMatch words={words} />;
}
