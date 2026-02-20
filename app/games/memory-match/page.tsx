import { createClient } from '@/lib/supabase/server';
import MemoryMatch from '@/components/games/MemoryMatch';
import { VocabularyWord } from '@/types';
import { getWordsForGame, WordEntry } from '@/lib/data/cambridgeYLE';

function mapToVocabularyWord(entry: WordEntry, index: number): VocabularyWord {
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
    const categories = ['animals', 'food', 'family', 'home', 'clothes', 'transport'];
    const randomCat = categories[Math.floor(Math.random() * categories.length)];

    const { data, error } = await supabase
      .from('vocabulary_words')
      .select('*')
      .eq('category', randomCat)
      .limit(8);

    if (!error && data && data.length >= 6) {
      return data.slice(0, 6);
    }
  } catch {
    // Fallback to local data
  }

  const words = getWordsForGame(6);
  return words.map(mapToVocabularyWord);
}

export default async function MemoryMatchPage() {
  const words = await getVocabularyWords();
  return <MemoryMatch words={words} />;
}
