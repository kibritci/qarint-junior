/**
 * Cambridge YLE vocabulary filtered for Qarint Junior.
 * Source: Cambridge Young Learners English (Pre A1 Starters, A1 Movers, A2 Flyers)
 * Filtered: All content reviewed for Islamic & family values compliance.
 * Each entry mapped to OpenMoji hex codes for visual representation.
 */

export interface WordEntry {
  word: string;
  translation: string;
  openmoji_hex: string;
  category: string;
  level: 'pre_a1_starters' | 'a1_movers' | 'a2_flyers';
  is_cultural_value: boolean;
}

export const VOCABULARY: WordEntry[] = [
  // === FAMILY (Cultural Values) ===
  { word: 'mother', translation: 'anne', openmoji_hex: '1F469', category: 'family', level: 'pre_a1_starters', is_cultural_value: true },
  { word: 'father', translation: 'baba', openmoji_hex: '1F468', category: 'family', level: 'pre_a1_starters', is_cultural_value: true },
  { word: 'family', translation: 'aile', openmoji_hex: '1F46A', category: 'family', level: 'pre_a1_starters', is_cultural_value: true },
  { word: 'brother', translation: 'erkek kardeş', openmoji_hex: '1F466', category: 'family', level: 'pre_a1_starters', is_cultural_value: true },
  { word: 'sister', translation: 'kız kardeş', openmoji_hex: '1F467', category: 'family', level: 'pre_a1_starters', is_cultural_value: true },
  { word: 'baby', translation: 'bebek', openmoji_hex: '1F476', category: 'family', level: 'pre_a1_starters', is_cultural_value: true },
  { word: 'grandma', translation: 'büyükanne', openmoji_hex: '1F475', category: 'family', level: 'a1_movers', is_cultural_value: true },
  { word: 'grandpa', translation: 'büyükbaba', openmoji_hex: '1F474', category: 'family', level: 'a1_movers', is_cultural_value: true },

  // === VALUES (Cultural Values) ===
  { word: 'respect', translation: 'saygı', openmoji_hex: '1F64F', category: 'values', level: 'pre_a1_starters', is_cultural_value: true },
  { word: 'honest', translation: 'dürüst', openmoji_hex: '1F91D', category: 'values', level: 'a1_movers', is_cultural_value: true },
  { word: 'kind', translation: 'nazik', openmoji_hex: '1F970', category: 'values', level: 'pre_a1_starters', is_cultural_value: true },
  { word: 'share', translation: 'paylaşmak', openmoji_hex: '1F91D', category: 'values', level: 'pre_a1_starters', is_cultural_value: true },
  { word: 'help', translation: 'yardım etmek', openmoji_hex: '1F64B', category: 'values', level: 'pre_a1_starters', is_cultural_value: true },
  { word: 'thank you', translation: 'teşekkür ederim', openmoji_hex: '1F64F', category: 'values', level: 'pre_a1_starters', is_cultural_value: true },
  { word: 'please', translation: 'lütfen', openmoji_hex: '1F64F', category: 'values', level: 'pre_a1_starters', is_cultural_value: true },

  // === ANIMALS ===
  { word: 'cat', translation: 'kedi', openmoji_hex: '1F431', category: 'animals', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'bird', translation: 'kuş', openmoji_hex: '1F426', category: 'animals', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'fish', translation: 'balık', openmoji_hex: '1F41F', category: 'animals', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'horse', translation: 'at', openmoji_hex: '1F434', category: 'animals', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'sheep', translation: 'koyun', openmoji_hex: '1F411', category: 'animals', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'cow', translation: 'inek', openmoji_hex: '1F404', category: 'animals', level: 'a1_movers', is_cultural_value: false },
  { word: 'chicken', translation: 'tavuk', openmoji_hex: '1F414', category: 'animals', level: 'a1_movers', is_cultural_value: false },
  { word: 'rabbit', translation: 'tavşan', openmoji_hex: '1F430', category: 'animals', level: 'a1_movers', is_cultural_value: false },
  { word: 'butterfly', translation: 'kelebek', openmoji_hex: '1F98B', category: 'animals', level: 'a2_flyers', is_cultural_value: false },
  { word: 'camel', translation: 'deve', openmoji_hex: '1F42B', category: 'animals', level: 'a2_flyers', is_cultural_value: false },

  // === FOOD ===
  { word: 'apple', translation: 'elma', openmoji_hex: '1F34E', category: 'food', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'banana', translation: 'muz', openmoji_hex: '1F34C', category: 'food', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'bread', translation: 'ekmek', openmoji_hex: '1F35E', category: 'food', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'water', translation: 'su', openmoji_hex: '1F4A7', category: 'food', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'rice', translation: 'pilav', openmoji_hex: '1F35A', category: 'food', level: 'a1_movers', is_cultural_value: false },
  { word: 'egg', translation: 'yumurta', openmoji_hex: '1F95A', category: 'food', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'orange', translation: 'portakal', openmoji_hex: '1F34A', category: 'food', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'grapes', translation: 'üzüm', openmoji_hex: '1F347', category: 'food', level: 'a1_movers', is_cultural_value: false },
  { word: 'watermelon', translation: 'karpuz', openmoji_hex: '1F349', category: 'food', level: 'a1_movers', is_cultural_value: false },
  { word: 'honey', translation: 'bal', openmoji_hex: '1F36F', category: 'food', level: 'a2_flyers', is_cultural_value: true },
  { word: 'date fruit', translation: 'hurma', openmoji_hex: '1F334', category: 'food', level: 'a1_movers', is_cultural_value: true },

  // === NATURE ===
  { word: 'tree', translation: 'ağaç', openmoji_hex: '1F333', category: 'nature', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'flower', translation: 'çiçek', openmoji_hex: '1F33C', category: 'nature', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'sun', translation: 'güneş', openmoji_hex: '2600', category: 'nature', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'moon', translation: 'ay', openmoji_hex: '1F319', category: 'nature', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'star', translation: 'yıldız', openmoji_hex: '2B50', category: 'nature', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'rain', translation: 'yağmur', openmoji_hex: '1F327', category: 'nature', level: 'a1_movers', is_cultural_value: false },
  { word: 'sea', translation: 'deniz', openmoji_hex: '1F30A', category: 'nature', level: 'a1_movers', is_cultural_value: false },
  { word: 'mountain', translation: 'dağ', openmoji_hex: '26F0', category: 'nature', level: 'a2_flyers', is_cultural_value: false },
  { word: 'river', translation: 'nehir', openmoji_hex: '1F3DE', category: 'nature', level: 'a2_flyers', is_cultural_value: false },

  // === BODY PARTS ===
  { word: 'hand', translation: 'el', openmoji_hex: '270B', category: 'body', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'eye', translation: 'göz', openmoji_hex: '1F441', category: 'body', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'ear', translation: 'kulak', openmoji_hex: '1F442', category: 'body', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'nose', translation: 'burun', openmoji_hex: '1F443', category: 'body', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'mouth', translation: 'ağız', openmoji_hex: '1F444', category: 'body', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'foot', translation: 'ayak', openmoji_hex: '1F9B6', category: 'body', level: 'pre_a1_starters', is_cultural_value: false },

  // === COLORS ===
  { word: 'red', translation: 'kırmızı', openmoji_hex: '1F534', category: 'colors', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'blue', translation: 'mavi', openmoji_hex: '1F535', category: 'colors', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'green', translation: 'yeşil', openmoji_hex: '1F7E2', category: 'colors', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'yellow', translation: 'sarı', openmoji_hex: '1F7E1', category: 'colors', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'white', translation: 'beyaz', openmoji_hex: '26AA', category: 'colors', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'black', translation: 'siyah', openmoji_hex: '26AB', category: 'colors', level: 'pre_a1_starters', is_cultural_value: false },

  // === NUMBERS ===
  { word: 'one', translation: 'bir', openmoji_hex: '0031-FE0F-20E3', category: 'numbers', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'two', translation: 'iki', openmoji_hex: '0032-FE0F-20E3', category: 'numbers', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'three', translation: 'üç', openmoji_hex: '0033-FE0F-20E3', category: 'numbers', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'four', translation: 'dört', openmoji_hex: '0034-FE0F-20E3', category: 'numbers', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'five', translation: 'beş', openmoji_hex: '0035-FE0F-20E3', category: 'numbers', level: 'pre_a1_starters', is_cultural_value: false },

  // === HOME & OBJECTS ===
  { word: 'book', translation: 'kitap', openmoji_hex: '1F4D6', category: 'objects', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'house', translation: 'ev', openmoji_hex: '1F3E0', category: 'home', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'door', translation: 'kapı', openmoji_hex: '1F6AA', category: 'home', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'window', translation: 'pencere', openmoji_hex: '1FA9F', category: 'home', level: 'a1_movers', is_cultural_value: false },
  { word: 'table', translation: 'masa', openmoji_hex: '1F4DD', category: 'home', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'bed', translation: 'yatak', openmoji_hex: '1F6CF', category: 'home', level: 'pre_a1_starters', is_cultural_value: false },

  // === SCHOOL ===
  { word: 'school', translation: 'okul', openmoji_hex: '1F3EB', category: 'school', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'teacher', translation: 'öğretmen', openmoji_hex: '1F9D1-200D-1F3EB', category: 'school', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'pencil', translation: 'kalem', openmoji_hex: '270F', category: 'school', level: 'pre_a1_starters', is_cultural_value: false },

  // === CLOTHES ===
  { word: 'hat', translation: 'şapka', openmoji_hex: '1F9E2', category: 'clothes', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'shoe', translation: 'ayakkabı', openmoji_hex: '1F45F', category: 'clothes', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'bag', translation: 'çanta', openmoji_hex: '1F392', category: 'clothes', level: 'pre_a1_starters', is_cultural_value: false },

  // === ACTIONS ===
  { word: 'run', translation: 'koşmak', openmoji_hex: '1F3C3', category: 'actions', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'eat', translation: 'yemek', openmoji_hex: '1F37D', category: 'actions', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'sleep', translation: 'uyumak', openmoji_hex: '1F634', category: 'actions', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'read', translation: 'okumak', openmoji_hex: '1F4D6', category: 'actions', level: 'a1_movers', is_cultural_value: false },
  { word: 'write', translation: 'yazmak', openmoji_hex: '270D', category: 'actions', level: 'a1_movers', is_cultural_value: false },
  { word: 'smile', translation: 'gülümsemek', openmoji_hex: '1F60A', category: 'actions', level: 'a1_movers', is_cultural_value: false },
  { word: 'pray', translation: 'dua etmek', openmoji_hex: '1F64F', category: 'actions', level: 'a1_movers', is_cultural_value: true },
];

export const CATEGORIES = [...new Set(VOCABULARY.map((w) => w.category))];

export function getWordsByCategory(category: string): WordEntry[] {
  return VOCABULARY.filter((w) => w.category === category);
}

export function getWordsByLevel(level: WordEntry['level']): WordEntry[] {
  return VOCABULARY.filter((w) => w.level === level);
}

export function getCulturalValueWords(): WordEntry[] {
  return VOCABULARY.filter((w) => w.is_cultural_value);
}
