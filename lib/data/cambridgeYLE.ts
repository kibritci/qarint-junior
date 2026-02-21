/**
 * Cambridge YLE vocabulary for Qarint Junior.
 * Source: Cambridge Young Learners English (Pre A1 Starters, A1 Movers, A2 Flyers)
 * Filtered: All content reviewed for child safety and age-appropriateness.
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
  // =====================
  // ANIMALS (40 words)
  // =====================
  { word: 'animal', translation: 'hayvan', openmoji_hex: '1F43E', category: 'animals', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'bear', translation: 'ayı', openmoji_hex: '1F43B', category: 'animals', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'bee', translation: 'arı', openmoji_hex: '1F41D', category: 'animals', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'bird', translation: 'kuş', openmoji_hex: '1F426', category: 'animals', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'cat', translation: 'kedi', openmoji_hex: '1F431', category: 'animals', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'chicken', translation: 'tavuk', openmoji_hex: '1F414', category: 'animals', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'cow', translation: 'inek', openmoji_hex: '1F404', category: 'animals', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'crocodile', translation: 'timsah', openmoji_hex: '1F40A', category: 'animals', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'dog', translation: 'köpek', openmoji_hex: '1F436', category: 'animals', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'dolphin', translation: 'yunus', openmoji_hex: '1F42C', category: 'animals', level: 'a1_movers', is_cultural_value: false },
  { word: 'donkey', translation: 'eşek', openmoji_hex: '1F434', category: 'animals', level: 'a1_movers', is_cultural_value: false },
  { word: 'duck', translation: 'ördek', openmoji_hex: '1F986', category: 'animals', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'elephant', translation: 'fil', openmoji_hex: '1F418', category: 'animals', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'fish', translation: 'balık', openmoji_hex: '1F41F', category: 'animals', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'fly', translation: 'sinek', openmoji_hex: '1FAB0', category: 'animals', level: 'a1_movers', is_cultural_value: false },
  { word: 'frog', translation: 'kurbağa', openmoji_hex: '1F438', category: 'animals', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'giraffe', translation: 'zürafa', openmoji_hex: '1F992', category: 'animals', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'goat', translation: 'keçi', openmoji_hex: '1F410', category: 'animals', level: 'a1_movers', is_cultural_value: false },
  { word: 'hippo', translation: 'su aygırı', openmoji_hex: '1F99B', category: 'animals', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'horse', translation: 'at', openmoji_hex: '1F434', category: 'animals', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'kangaroo', translation: 'kanguru', openmoji_hex: '1F998', category: 'animals', level: 'a2_flyers', is_cultural_value: false },
  { word: 'kitten', translation: 'yavru kedi', openmoji_hex: '1F431', category: 'animals', level: 'a1_movers', is_cultural_value: false },
  { word: 'lion', translation: 'aslan', openmoji_hex: '1F981', category: 'animals', level: 'a1_movers', is_cultural_value: false },
  { word: 'monkey', translation: 'maymun', openmoji_hex: '1F435', category: 'animals', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'mouse', translation: 'fare', openmoji_hex: '1F42D', category: 'animals', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'parrot', translation: 'papağan', openmoji_hex: '1F99C', category: 'animals', level: 'a1_movers', is_cultural_value: false },
  { word: 'penguin', translation: 'penguen', openmoji_hex: '1F427', category: 'animals', level: 'a1_movers', is_cultural_value: false },
  { word: 'puppy', translation: 'yavru köpek', openmoji_hex: '1F436', category: 'animals', level: 'a1_movers', is_cultural_value: false },
  { word: 'rabbit', translation: 'tavşan', openmoji_hex: '1F430', category: 'animals', level: 'a1_movers', is_cultural_value: false },
  { word: 'shark', translation: 'köpek balığı', openmoji_hex: '1F988', category: 'animals', level: 'a1_movers', is_cultural_value: false },
  { word: 'sheep', translation: 'koyun', openmoji_hex: '1F411', category: 'animals', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'snake', translation: 'yılan', openmoji_hex: '1F40D', category: 'animals', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'spider', translation: 'örümcek', openmoji_hex: '1F577', category: 'animals', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'tiger', translation: 'kaplan', openmoji_hex: '1F42F', category: 'animals', level: 'a1_movers', is_cultural_value: false },
  { word: 'turtle', translation: 'kaplumbağa', openmoji_hex: '1F422', category: 'animals', level: 'a1_movers', is_cultural_value: false },
  { word: 'whale', translation: 'balina', openmoji_hex: '1F433', category: 'animals', level: 'a1_movers', is_cultural_value: false },
  { word: 'zebra', translation: 'zebra', openmoji_hex: '1F993', category: 'animals', level: 'a1_movers', is_cultural_value: false },
  { word: 'butterfly', translation: 'kelebek', openmoji_hex: '1F98B', category: 'animals', level: 'a2_flyers', is_cultural_value: false },
  { word: 'camel', translation: 'deve', openmoji_hex: '1F42B', category: 'animals', level: 'a2_flyers', is_cultural_value: false },
  { word: 'pet', translation: 'evcil hayvan', openmoji_hex: '1F43E', category: 'animals', level: 'a1_movers', is_cultural_value: false },

  // =====================
  // BODY & FACE (20 words)
  // =====================
  { word: 'arm', translation: 'kol', openmoji_hex: '1F4AA', category: 'body', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'back', translation: 'sırt', openmoji_hex: '1F9CD', category: 'body', level: 'a1_movers', is_cultural_value: false },
  { word: 'ear', translation: 'kulak', openmoji_hex: '1F442', category: 'body', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'eye', translation: 'göz', openmoji_hex: '1F441', category: 'body', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'face', translation: 'yüz', openmoji_hex: '1F642', category: 'body', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'finger', translation: 'parmak', openmoji_hex: '261D', category: 'body', level: 'a1_movers', is_cultural_value: false },
  { word: 'foot', translation: 'ayak', openmoji_hex: '1F9B6', category: 'body', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'hair', translation: 'saç', openmoji_hex: '1F9D1', category: 'body', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'hand', translation: 'el', openmoji_hex: '270B', category: 'body', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'head', translation: 'baş', openmoji_hex: '1F9D1', category: 'body', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'knee', translation: 'diz', openmoji_hex: '1F9B5', category: 'body', level: 'a1_movers', is_cultural_value: false },
  { word: 'leg', translation: 'bacak', openmoji_hex: '1F9B5', category: 'body', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'mouth', translation: 'ağız', openmoji_hex: '1F444', category: 'body', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'neck', translation: 'boyun', openmoji_hex: '1F9CD', category: 'body', level: 'a1_movers', is_cultural_value: false },
  { word: 'nose', translation: 'burun', openmoji_hex: '1F443', category: 'body', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'shoulder', translation: 'omuz', openmoji_hex: '1F9CD', category: 'body', level: 'a2_flyers', is_cultural_value: false },
  { word: 'stomach', translation: 'mide', openmoji_hex: '1F912', category: 'body', level: 'a2_flyers', is_cultural_value: false },
  { word: 'teeth', translation: 'dişler', openmoji_hex: '1F9B7', category: 'body', level: 'a1_movers', is_cultural_value: false },
  { word: 'thumb', translation: 'baş parmak', openmoji_hex: '1F44D', category: 'body', level: 'a2_flyers', is_cultural_value: false },
  { word: 'tongue', translation: 'dil', openmoji_hex: '1F445', category: 'body', level: 'a2_flyers', is_cultural_value: false },

  // =====================
  // CLOTHES (18 words)
  // =====================
  { word: 'bag', translation: 'çanta', openmoji_hex: '1F45C', category: 'clothes', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'boot', translation: 'çizme', openmoji_hex: '1F97E', category: 'clothes', level: 'a1_movers', is_cultural_value: false },
  { word: 'clothes', translation: 'kıyafetler', openmoji_hex: '1F45A', category: 'clothes', level: 'a1_movers', is_cultural_value: false },
  { word: 'coat', translation: 'palto', openmoji_hex: '1F9E5', category: 'clothes', level: 'a1_movers', is_cultural_value: false },
  { word: 'dress', translation: 'elbise', openmoji_hex: '1F457', category: 'clothes', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'glasses', translation: 'gözlük', openmoji_hex: '1F453', category: 'clothes', level: 'a1_movers', is_cultural_value: false },
  { word: 'glove', translation: 'eldiven', openmoji_hex: '1F9E4', category: 'clothes', level: 'a2_flyers', is_cultural_value: false },
  { word: 'handbag', translation: 'el çantası', openmoji_hex: '1F45C', category: 'clothes', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'hat', translation: 'şapka', openmoji_hex: '1F9E2', category: 'clothes', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'jacket', translation: 'ceket', openmoji_hex: '1F9E5', category: 'clothes', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'jeans', translation: 'kot pantolon', openmoji_hex: '1F456', category: 'clothes', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'scarf', translation: 'atkı', openmoji_hex: '1F9E3', category: 'clothes', level: 'a1_movers', is_cultural_value: false },
  { word: 'shirt', translation: 'gömlek', openmoji_hex: '1F455', category: 'clothes', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'shoe', translation: 'ayakkabı', openmoji_hex: '1F45F', category: 'clothes', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'skirt', translation: 'etek', openmoji_hex: '1FA73', category: 'clothes', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'sock', translation: 'çorap', openmoji_hex: '1F9E6', category: 'clothes', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'trousers', translation: 'pantolon', openmoji_hex: '1F456', category: 'clothes', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'umbrella', translation: 'şemsiye', openmoji_hex: '2602', category: 'clothes', level: 'a1_movers', is_cultural_value: false },

  // =====================
  // COLOURS (12 words)
  // =====================
  { word: 'black', translation: 'siyah', openmoji_hex: '26AB', category: 'colours', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'blue', translation: 'mavi', openmoji_hex: '1F535', category: 'colours', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'brown', translation: 'kahverengi', openmoji_hex: '1F7EB', category: 'colours', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'green', translation: 'yeşil', openmoji_hex: '1F7E2', category: 'colours', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'grey', translation: 'gri', openmoji_hex: '26AA', category: 'colours', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'orange', translation: 'turuncu', openmoji_hex: '1F7E0', category: 'colours', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'pink', translation: 'pembe', openmoji_hex: '1F338', category: 'colours', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'purple', translation: 'mor', openmoji_hex: '1F7E3', category: 'colours', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'red', translation: 'kırmızı', openmoji_hex: '1F534', category: 'colours', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'white', translation: 'beyaz', openmoji_hex: '26AA', category: 'colours', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'yellow', translation: 'sarı', openmoji_hex: '1F7E1', category: 'colours', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'gold', translation: 'altın', openmoji_hex: '1F7E1', category: 'colours', level: 'a2_flyers', is_cultural_value: false },

  // =====================
  // FAMILY & FRIENDS (16 words)
  // =====================
  { word: 'baby', translation: 'bebek', openmoji_hex: '1F476', category: 'family', level: 'pre_a1_starters', is_cultural_value: true },
  { word: 'boy', translation: 'erkek çocuk', openmoji_hex: '1F466', category: 'family', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'brother', translation: 'erkek kardeş', openmoji_hex: '1F466', category: 'family', level: 'pre_a1_starters', is_cultural_value: true },
  { word: 'child', translation: 'çocuk', openmoji_hex: '1F9D2', category: 'family', level: 'a1_movers', is_cultural_value: false },
  { word: 'cousin', translation: 'kuzen', openmoji_hex: '1F9D1', category: 'family', level: 'a1_movers', is_cultural_value: true },
  { word: 'dad', translation: 'baba', openmoji_hex: '1F468', category: 'family', level: 'pre_a1_starters', is_cultural_value: true },
  { word: 'family', translation: 'aile', openmoji_hex: '1F46A', category: 'family', level: 'pre_a1_starters', is_cultural_value: true },
  { word: 'friend', translation: 'arkadaş', openmoji_hex: '1F91D', category: 'family', level: 'pre_a1_starters', is_cultural_value: true },
  { word: 'girl', translation: 'kız çocuk', openmoji_hex: '1F467', category: 'family', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'grandma', translation: 'büyükanne', openmoji_hex: '1F475', category: 'family', level: 'a1_movers', is_cultural_value: true },
  { word: 'grandpa', translation: 'büyükbaba', openmoji_hex: '1F474', category: 'family', level: 'a1_movers', is_cultural_value: true },
  { word: 'mother', translation: 'anne', openmoji_hex: '1F469', category: 'family', level: 'pre_a1_starters', is_cultural_value: true },
  { word: 'father', translation: 'baba', openmoji_hex: '1F468', category: 'family', level: 'pre_a1_starters', is_cultural_value: true },
  { word: 'parent', translation: 'ebeveyn', openmoji_hex: '1F46A', category: 'family', level: 'a1_movers', is_cultural_value: true },
  { word: 'sister', translation: 'kız kardeş', openmoji_hex: '1F467', category: 'family', level: 'pre_a1_starters', is_cultural_value: true },
  { word: 'uncle', translation: 'amca', openmoji_hex: '1F468', category: 'family', level: 'a1_movers', is_cultural_value: true },

  // =====================
  // FOOD & DRINK (40 words)
  // =====================
  { word: 'apple', translation: 'elma', openmoji_hex: '1F34E', category: 'food', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'banana', translation: 'muz', openmoji_hex: '1F34C', category: 'food', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'bean', translation: 'fasulye', openmoji_hex: '1FAD8', category: 'food', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'bread', translation: 'ekmek', openmoji_hex: '1F35E', category: 'food', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'butter', translation: 'tereyağı', openmoji_hex: '1F9C8', category: 'food', level: 'a1_movers', is_cultural_value: false },
  { word: 'cake', translation: 'kek', openmoji_hex: '1F370', category: 'food', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'candy', translation: 'şeker', openmoji_hex: '1F36C', category: 'food', level: 'a1_movers', is_cultural_value: false },
  { word: 'carrot', translation: 'havuç', openmoji_hex: '1F955', category: 'food', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'cheese', translation: 'peynir', openmoji_hex: '1F9C0', category: 'food', level: 'a1_movers', is_cultural_value: false },
  { word: 'cherry', translation: 'kiraz', openmoji_hex: '1F352', category: 'food', level: 'a2_flyers', is_cultural_value: false },
  { word: 'chocolate', translation: 'çikolata', openmoji_hex: '1F36B', category: 'food', level: 'a1_movers', is_cultural_value: false },
  { word: 'coconut', translation: 'hindistan cevizi', openmoji_hex: '1F965', category: 'food', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'egg', translation: 'yumurta', openmoji_hex: '1F95A', category: 'food', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'flour', translation: 'un', openmoji_hex: '1F33E', category: 'food', level: 'a2_flyers', is_cultural_value: false },
  { word: 'grape', translation: 'üzüm', openmoji_hex: '1F347', category: 'food', level: 'a1_movers', is_cultural_value: false },
  { word: 'ice cream', translation: 'dondurma', openmoji_hex: '1F368', category: 'food', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'juice', translation: 'meyve suyu', openmoji_hex: '1F9C3', category: 'food', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'lemon', translation: 'limon', openmoji_hex: '1F34B', category: 'food', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'mango', translation: 'mango', openmoji_hex: '1F96D', category: 'food', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'meat', translation: 'et', openmoji_hex: '1F356', category: 'food', level: 'a1_movers', is_cultural_value: false },
  { word: 'milk', translation: 'süt', openmoji_hex: '1F95B', category: 'food', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'mushroom', translation: 'mantar', openmoji_hex: '1F344', category: 'food', level: 'a2_flyers', is_cultural_value: false },
  { word: 'onion', translation: 'soğan', openmoji_hex: '1F9C5', category: 'food', level: 'a1_movers', is_cultural_value: false },
  { word: 'orange', translation: 'portakal', openmoji_hex: '1F34A', category: 'food', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'pasta', translation: 'makarna', openmoji_hex: '1F35D', category: 'food', level: 'a2_flyers', is_cultural_value: false },
  { word: 'pea', translation: 'bezelye', openmoji_hex: '1FAD1', category: 'food', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'pear', translation: 'armut', openmoji_hex: '1F350', category: 'food', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'pepper', translation: 'biber', openmoji_hex: '1FAD1', category: 'food', level: 'a2_flyers', is_cultural_value: false },
  { word: 'pineapple', translation: 'ananas', openmoji_hex: '1F34D', category: 'food', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'potato', translation: 'patates', openmoji_hex: '1F954', category: 'food', level: 'a1_movers', is_cultural_value: false },
  { word: 'rice', translation: 'pilav', openmoji_hex: '1F35A', category: 'food', level: 'a1_movers', is_cultural_value: false },
  { word: 'salad', translation: 'salata', openmoji_hex: '1F957', category: 'food', level: 'a1_movers', is_cultural_value: false },
  { word: 'sandwich', translation: 'sandviç', openmoji_hex: '1F96A', category: 'food', level: 'a1_movers', is_cultural_value: false },
  { word: 'soup', translation: 'çorba', openmoji_hex: '1F958', category: 'food', level: 'a1_movers', is_cultural_value: false },
  { word: 'strawberry', translation: 'çilek', openmoji_hex: '1F353', category: 'food', level: 'a2_flyers', is_cultural_value: false },
  { word: 'sugar', translation: 'şeker', openmoji_hex: '1F36C', category: 'food', level: 'a2_flyers', is_cultural_value: false },
  { word: 'tea', translation: 'çay', openmoji_hex: '2615', category: 'food', level: 'a1_movers', is_cultural_value: false },
  { word: 'tomato', translation: 'domates', openmoji_hex: '1F345', category: 'food', level: 'a1_movers', is_cultural_value: false },
  { word: 'water', translation: 'su', openmoji_hex: '1F4A7', category: 'food', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'watermelon', translation: 'karpuz', openmoji_hex: '1F349', category: 'food', level: 'pre_a1_starters', is_cultural_value: false },

  // =====================
  // HOME (30 words)
  // =====================
  { word: 'bathroom', translation: 'banyo', openmoji_hex: '1F6C1', category: 'home', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'bed', translation: 'yatak', openmoji_hex: '1F6CF', category: 'home', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'bedroom', translation: 'yatak odası', openmoji_hex: '1F6CF', category: 'home', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'bookcase', translation: 'kitaplık', openmoji_hex: '1F4DA', category: 'home', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'chair', translation: 'sandalye', openmoji_hex: '1FA91', category: 'home', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'clock', translation: 'saat', openmoji_hex: '1F570', category: 'home', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'cupboard', translation: 'dolap', openmoji_hex: '1F3E0', category: 'home', level: 'a1_movers', is_cultural_value: false },
  { word: 'desk', translation: 'masa', openmoji_hex: '1F4DD', category: 'home', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'dining room', translation: 'yemek odası', openmoji_hex: '1F37D', category: 'home', level: 'a1_movers', is_cultural_value: false },
  { word: 'door', translation: 'kapı', openmoji_hex: '1F6AA', category: 'home', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'flat', translation: 'daire', openmoji_hex: '1F3E2', category: 'home', level: 'a1_movers', is_cultural_value: false },
  { word: 'floor', translation: 'zemin', openmoji_hex: '1F3E0', category: 'home', level: 'a1_movers', is_cultural_value: false },
  { word: 'fridge', translation: 'buzdolabı', openmoji_hex: '1F9CA', category: 'home', level: 'a1_movers', is_cultural_value: false },
  { word: 'garden', translation: 'bahçe', openmoji_hex: '1F33B', category: 'home', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'house', translation: 'ev', openmoji_hex: '1F3E0', category: 'home', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'kitchen', translation: 'mutfak', openmoji_hex: '1F373', category: 'home', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'lamp', translation: 'lamba', openmoji_hex: '1F4A1', category: 'home', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'living room', translation: 'oturma odası', openmoji_hex: '1F6CB', category: 'home', level: 'a1_movers', is_cultural_value: false },
  { word: 'mirror', translation: 'ayna', openmoji_hex: '1FA9E', category: 'home', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'phone', translation: 'telefon', openmoji_hex: '1F4F1', category: 'home', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'radio', translation: 'radyo', openmoji_hex: '1F4FB', category: 'home', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'roof', translation: 'çatı', openmoji_hex: '1F3E0', category: 'home', level: 'a2_flyers', is_cultural_value: false },
  { word: 'room', translation: 'oda', openmoji_hex: '1F6AA', category: 'home', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'sofa', translation: 'kanepe', openmoji_hex: '1F6CB', category: 'home', level: 'a1_movers', is_cultural_value: false },
  { word: 'stairs', translation: 'merdiven', openmoji_hex: '1FA9C', category: 'home', level: 'a2_flyers', is_cultural_value: false },
  { word: 'table', translation: 'masa', openmoji_hex: '1F4DD', category: 'home', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'television', translation: 'televizyon', openmoji_hex: '1F4FA', category: 'home', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'wall', translation: 'duvar', openmoji_hex: '1F9F1', category: 'home', level: 'a1_movers', is_cultural_value: false },
  { word: 'window', translation: 'pencere', openmoji_hex: '1FA9F', category: 'home', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'yard', translation: 'avlu', openmoji_hex: '1F33F', category: 'home', level: 'a2_flyers', is_cultural_value: false },

  // =====================
  // SCHOOL (20 words)
  // =====================
  { word: 'board', translation: 'tahta', openmoji_hex: '1F4CB', category: 'school', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'book', translation: 'kitap', openmoji_hex: '1F4D6', category: 'school', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'classroom', translation: 'sınıf', openmoji_hex: '1F3EB', category: 'school', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'computer', translation: 'bilgisayar', openmoji_hex: '1F4BB', category: 'school', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'crayon', translation: 'boya kalemi', openmoji_hex: '1F58D', category: 'school', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'desk', translation: 'sıra', openmoji_hex: '1F4DD', category: 'school', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'dictionary', translation: 'sözlük', openmoji_hex: '1F4D5', category: 'school', level: 'a2_flyers', is_cultural_value: false },
  { word: 'eraser', translation: 'silgi', openmoji_hex: '1F4DD', category: 'school', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'homework', translation: 'ödev', openmoji_hex: '1F4DD', category: 'school', level: 'a1_movers', is_cultural_value: false },
  { word: 'lesson', translation: 'ders', openmoji_hex: '1F4D6', category: 'school', level: 'a1_movers', is_cultural_value: false },
  { word: 'letter', translation: 'harf', openmoji_hex: '1F524', category: 'school', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'number', translation: 'sayı', openmoji_hex: '1F522', category: 'school', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'page', translation: 'sayfa', openmoji_hex: '1F4C4', category: 'school', level: 'a1_movers', is_cultural_value: false },
  { word: 'pen', translation: 'tükenmez kalem', openmoji_hex: '1F58A', category: 'school', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'pencil', translation: 'kurşun kalem', openmoji_hex: '270F', category: 'school', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'picture', translation: 'resim', openmoji_hex: '1F5BC', category: 'school', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'ruler', translation: 'cetvel', openmoji_hex: '1F4CF', category: 'school', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'school', translation: 'okul', openmoji_hex: '1F3EB', category: 'school', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'teacher', translation: 'öğretmen', openmoji_hex: '1F9D1', category: 'school', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'word', translation: 'kelime', openmoji_hex: '1F524', category: 'school', level: 'a1_movers', is_cultural_value: false },

  // =====================
  // SPORTS & LEISURE (20 words)
  // =====================
  { word: 'ball', translation: 'top', openmoji_hex: '26BD', category: 'sports', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'basketball', translation: 'basketbol', openmoji_hex: '1F3C0', category: 'sports', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'beach', translation: 'kumsal', openmoji_hex: '1F3D6', category: 'sports', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'bike', translation: 'bisiklet', openmoji_hex: '1F6B2', category: 'sports', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'camera', translation: 'kamera', openmoji_hex: '1F4F7', category: 'sports', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'football', translation: 'futbol', openmoji_hex: '26BD', category: 'sports', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'game', translation: 'oyun', openmoji_hex: '1F3AE', category: 'sports', level: 'a1_movers', is_cultural_value: false },
  { word: 'guitar', translation: 'gitar', openmoji_hex: '1F3B8', category: 'sports', level: 'a1_movers', is_cultural_value: false },
  { word: 'kite', translation: 'uçurtma', openmoji_hex: '1FA81', category: 'sports', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'movie', translation: 'film', openmoji_hex: '1F3AC', category: 'sports', level: 'a2_flyers', is_cultural_value: false },
  { word: 'painting', translation: 'resim', openmoji_hex: '1F3A8', category: 'sports', level: 'a1_movers', is_cultural_value: false },
  { word: 'park', translation: 'park', openmoji_hex: '1F3DE', category: 'sports', level: 'a1_movers', is_cultural_value: false },
  { word: 'piano', translation: 'piyano', openmoji_hex: '1F3B9', category: 'sports', level: 'a1_movers', is_cultural_value: false },
  { word: 'playground', translation: 'oyun alanı', openmoji_hex: '1F3A0', category: 'sports', level: 'a1_movers', is_cultural_value: false },
  { word: 'race', translation: 'yarış', openmoji_hex: '1F3C3', category: 'sports', level: 'a2_flyers', is_cultural_value: false },
  { word: 'song', translation: 'şarkı', openmoji_hex: '1F3B5', category: 'sports', level: 'a1_movers', is_cultural_value: false },
  { word: 'sport', translation: 'spor', openmoji_hex: '26BD', category: 'sports', level: 'a1_movers', is_cultural_value: false },
  { word: 'story', translation: 'hikaye', openmoji_hex: '1F4D6', category: 'sports', level: 'a1_movers', is_cultural_value: false },
  { word: 'swimming pool', translation: 'yüzme havuzu', openmoji_hex: '1F3CA', category: 'sports', level: 'a1_movers', is_cultural_value: false },
  { word: 'tennis', translation: 'tenis', openmoji_hex: '1F3BE', category: 'sports', level: 'pre_a1_starters', is_cultural_value: false },

  // =====================
  // TRANSPORT (12 words)
  // =====================
  { word: 'boat', translation: 'tekne', openmoji_hex: '26F5', category: 'transport', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'bus', translation: 'otobüs', openmoji_hex: '1F68C', category: 'transport', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'car', translation: 'araba', openmoji_hex: '1F697', category: 'transport', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'helicopter', translation: 'helikopter', openmoji_hex: '1F681', category: 'transport', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'lorry', translation: 'kamyon', openmoji_hex: '1F69A', category: 'transport', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'motorbike', translation: 'motosiklet', openmoji_hex: '1F3CD', category: 'transport', level: 'a1_movers', is_cultural_value: false },
  { word: 'plane', translation: 'uçak', openmoji_hex: '2708', category: 'transport', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'rocket', translation: 'roket', openmoji_hex: '1F680', category: 'transport', level: 'a2_flyers', is_cultural_value: false },
  { word: 'ship', translation: 'gemi', openmoji_hex: '1F6A2', category: 'transport', level: 'a1_movers', is_cultural_value: false },
  { word: 'taxi', translation: 'taksi', openmoji_hex: '1F695', category: 'transport', level: 'a2_flyers', is_cultural_value: false },
  { word: 'train', translation: 'tren', openmoji_hex: '1F682', category: 'transport', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'truck', translation: 'kamyon', openmoji_hex: '1F69A', category: 'transport', level: 'a1_movers', is_cultural_value: false },

  // =====================
  // WEATHER & NATURE (18 words)
  // =====================
  { word: 'cloud', translation: 'bulut', openmoji_hex: '2601', category: 'nature', level: 'a1_movers', is_cultural_value: false },
  { word: 'field', translation: 'tarla', openmoji_hex: '1F33E', category: 'nature', level: 'a2_flyers', is_cultural_value: false },
  { word: 'flower', translation: 'çiçek', openmoji_hex: '1F33C', category: 'nature', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'forest', translation: 'orman', openmoji_hex: '1F332', category: 'nature', level: 'a2_flyers', is_cultural_value: false },
  { word: 'grass', translation: 'çimen', openmoji_hex: '1F33F', category: 'nature', level: 'a1_movers', is_cultural_value: false },
  { word: 'hill', translation: 'tepe', openmoji_hex: '26F0', category: 'nature', level: 'a2_flyers', is_cultural_value: false },
  { word: 'island', translation: 'ada', openmoji_hex: '1F3DD', category: 'nature', level: 'a2_flyers', is_cultural_value: false },
  { word: 'lake', translation: 'göl', openmoji_hex: '1F30A', category: 'nature', level: 'a2_flyers', is_cultural_value: false },
  { word: 'moon', translation: 'ay', openmoji_hex: '1F319', category: 'nature', level: 'a1_movers', is_cultural_value: false },
  { word: 'mountain', translation: 'dağ', openmoji_hex: '26F0', category: 'nature', level: 'a2_flyers', is_cultural_value: false },
  { word: 'rain', translation: 'yağmur', openmoji_hex: '1F327', category: 'nature', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'rainbow', translation: 'gökkuşağı', openmoji_hex: '1F308', category: 'nature', level: 'a1_movers', is_cultural_value: false },
  { word: 'river', translation: 'nehir', openmoji_hex: '1F3DE', category: 'nature', level: 'a2_flyers', is_cultural_value: false },
  { word: 'sea', translation: 'deniz', openmoji_hex: '1F30A', category: 'nature', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'snow', translation: 'kar', openmoji_hex: '2744', category: 'nature', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'star', translation: 'yıldız', openmoji_hex: '2B50', category: 'nature', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'sun', translation: 'güneş', openmoji_hex: '2600', category: 'nature', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'tree', translation: 'ağaç', openmoji_hex: '1F333', category: 'nature', level: 'pre_a1_starters', is_cultural_value: false },

  // =====================
  // NUMBERS (10 words)
  // =====================
  { word: 'one', translation: 'bir', openmoji_hex: '0031-FE0F-20E3', category: 'numbers', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'two', translation: 'iki', openmoji_hex: '0032-FE0F-20E3', category: 'numbers', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'three', translation: 'üç', openmoji_hex: '0033-FE0F-20E3', category: 'numbers', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'four', translation: 'dört', openmoji_hex: '0034-FE0F-20E3', category: 'numbers', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'five', translation: 'beş', openmoji_hex: '0035-FE0F-20E3', category: 'numbers', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'six', translation: 'altı', openmoji_hex: '0036-FE0F-20E3', category: 'numbers', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'seven', translation: 'yedi', openmoji_hex: '0037-FE0F-20E3', category: 'numbers', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'eight', translation: 'sekiz', openmoji_hex: '0038-FE0F-20E3', category: 'numbers', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'nine', translation: 'dokuz', openmoji_hex: '0039-FE0F-20E3', category: 'numbers', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'ten', translation: 'on', openmoji_hex: '1F51F', category: 'numbers', level: 'pre_a1_starters', is_cultural_value: false },

  // =====================
  // ACTIONS / VERBS (30 words)
  // =====================
  { word: 'climb', translation: 'tırmanmak', openmoji_hex: '1F9D7', category: 'actions', level: 'a1_movers', is_cultural_value: false },
  { word: 'cook', translation: 'pişirmek', openmoji_hex: '1F373', category: 'actions', level: 'a1_movers', is_cultural_value: false },
  { word: 'dance', translation: 'dans etmek', openmoji_hex: '1F483', category: 'actions', level: 'a1_movers', is_cultural_value: false },
  { word: 'draw', translation: 'çizmek', openmoji_hex: '1F58D', category: 'actions', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'drink', translation: 'içmek', openmoji_hex: '1F964', category: 'actions', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'eat', translation: 'yemek', openmoji_hex: '1F37D', category: 'actions', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'fly', translation: 'uçmak', openmoji_hex: '1F985', category: 'actions', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'help', translation: 'yardım etmek', openmoji_hex: '1F91D', category: 'actions', level: 'pre_a1_starters', is_cultural_value: true },
  { word: 'jump', translation: 'zıplamak', openmoji_hex: '1F938', category: 'actions', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'kick', translation: 'tekmelemek', openmoji_hex: '26BD', category: 'actions', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'laugh', translation: 'gülmek', openmoji_hex: '1F602', category: 'actions', level: 'a1_movers', is_cultural_value: false },
  { word: 'learn', translation: 'öğrenmek', openmoji_hex: '1F4D6', category: 'actions', level: 'a1_movers', is_cultural_value: false },
  { word: 'listen', translation: 'dinlemek', openmoji_hex: '1F442', category: 'actions', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'paint', translation: 'boyamak', openmoji_hex: '1F3A8', category: 'actions', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'play', translation: 'oynamak', openmoji_hex: '1F3AE', category: 'actions', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'read', translation: 'okumak', openmoji_hex: '1F4D6', category: 'actions', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'ride', translation: 'sürmek', openmoji_hex: '1F6B2', category: 'actions', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'run', translation: 'koşmak', openmoji_hex: '1F3C3', category: 'actions', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'share', translation: 'paylaşmak', openmoji_hex: '1F91D', category: 'actions', level: 'pre_a1_starters', is_cultural_value: true },
  { word: 'sing', translation: 'şarkı söylemek', openmoji_hex: '1F3A4', category: 'actions', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'sit', translation: 'oturmak', openmoji_hex: '1FA91', category: 'actions', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'sleep', translation: 'uyumak', openmoji_hex: '1F634', category: 'actions', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'smile', translation: 'gülümsemek', openmoji_hex: '1F60A', category: 'actions', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'stand', translation: 'ayakta durmak', openmoji_hex: '1F9CD', category: 'actions', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'swim', translation: 'yüzmek', openmoji_hex: '1F3CA', category: 'actions', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'throw', translation: 'fırlatmak', openmoji_hex: '1F938', category: 'actions', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'walk', translation: 'yürümek', openmoji_hex: '1F6B6', category: 'actions', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'wash', translation: 'yıkamak', openmoji_hex: '1F9FC', category: 'actions', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'watch', translation: 'izlemek', openmoji_hex: '1F440', category: 'actions', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'write', translation: 'yazmak', openmoji_hex: '270D', category: 'actions', level: 'pre_a1_starters', is_cultural_value: false },

  // =====================
  // VALUES (8 words)
  // =====================
  { word: 'kind', translation: 'nazik', openmoji_hex: '1F970', category: 'values', level: 'pre_a1_starters', is_cultural_value: true },
  { word: 'honest', translation: 'dürüst', openmoji_hex: '1F91D', category: 'values', level: 'a1_movers', is_cultural_value: true },
  { word: 'respect', translation: 'saygı', openmoji_hex: '1F64F', category: 'values', level: 'a1_movers', is_cultural_value: true },
  { word: 'thank you', translation: 'teşekkür ederim', openmoji_hex: '1F64F', category: 'values', level: 'pre_a1_starters', is_cultural_value: true },
  { word: 'please', translation: 'lütfen', openmoji_hex: '1F64F', category: 'values', level: 'pre_a1_starters', is_cultural_value: true },
  { word: 'sorry', translation: 'özür dilerim', openmoji_hex: '1F625', category: 'values', level: 'pre_a1_starters', is_cultural_value: true },
  { word: 'brave', translation: 'cesur', openmoji_hex: '1F4AA', category: 'values', level: 'a2_flyers', is_cultural_value: true },
  { word: 'careful', translation: 'dikkatli', openmoji_hex: '1F9D0', category: 'values', level: 'a2_flyers', is_cultural_value: true },

  // =====================
  // TOYS (10 words)
  // =====================
  { word: 'balloon', translation: 'balon', openmoji_hex: '1F388', category: 'toys', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'board game', translation: 'kutu oyunu', openmoji_hex: '1F3B2', category: 'toys', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'doll', translation: 'bebek', openmoji_hex: '1F9F8', category: 'toys', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'drum', translation: 'davul', openmoji_hex: '1F941', category: 'toys', level: 'a1_movers', is_cultural_value: false },
  { word: 'robot', translation: 'robot', openmoji_hex: '1F916', category: 'toys', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'skateboard', translation: 'kaykay', openmoji_hex: '1F6F9', category: 'toys', level: 'a1_movers', is_cultural_value: false },
  { word: 'teddy bear', translation: 'oyuncak ayı', openmoji_hex: '1F9F8', category: 'toys', level: 'a2_flyers', is_cultural_value: false },
  { word: 'toy', translation: 'oyuncak', openmoji_hex: '1F9F8', category: 'toys', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'train', translation: 'oyuncak tren', openmoji_hex: '1F682', category: 'toys', level: 'pre_a1_starters', is_cultural_value: false },
  { word: 'puzzle', translation: 'yapboz', openmoji_hex: '1F9E9', category: 'toys', level: 'a2_flyers', is_cultural_value: false },
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

/** Seviye sırası: Pre A1 → A1 → A2 (kolaydan zora) */
const LEVEL_ORDER: WordEntry['level'][] = ['pre_a1_starters', 'a1_movers', 'a2_flyers'];

/** Dizi karıştırma (Fisher-Yates) – oyunlarda tutarlı rastgele sıra için */
export function shuffleWords<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export type GetWordsForGameOptions = {
  category?: string;
  /** Sadece bu seviye (örn. 'pre_a1_starters'). Verilmezse tüm seviyeler. */
  level?: WordEntry['level'];
  /** Bu seviyeye kadar (dahil). Örn. 'a1_movers' = Pre A1 + A1. Verilmezse tüm seviyeler. */
  levelMax?: WordEntry['level'];
};

export function getWordsForGame(
  count: number,
  category?: string,
  options?: GetWordsForGameOptions
): WordEntry[] {
  let pool = category ? getWordsByCategory(category) : VOCABULARY;
  pool = pool.filter((w) => !w.openmoji_hex.includes('-'));

  if (options?.level) {
    pool = pool.filter((w) => w.level === options.level);
  } else if (options?.levelMax) {
    const maxIndex = LEVEL_ORDER.indexOf(options.levelMax);
    if (maxIndex >= 0) {
      const allowed = new Set(LEVEL_ORDER.slice(0, maxIndex + 1));
      pool = pool.filter((w) => allowed.has(w.level));
    }
  }

  const shuffled = shuffleWords(pool);
  return shuffled.slice(0, count);
}
