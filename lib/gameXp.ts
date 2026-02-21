/**
 * Merkezi XP sabitleri – tüm mini oyunlarda kullanılır.
 * Yanlış cevapta puan düşülmez; sadece doğru aksiyonlarda XP verilir.
 * Oyun/round sonunda tek seferde updateGamification(toplam) ile sunucuya gönderilir.
 */
export const XP_PER_MATCH = 10; // Hafıza Eşleştirme: eşleşme başına
export const XP_PER_CORRECT_SPLAT = 10; // Kelime Avı: doğru balon başına
export const XP_PER_SENTENCE = 20; // Cümle Kur: doğru cümle başına
export const XP_PER_BLANK = 10; // Mad-Libs: doğru boşluk başına
export const XP_CORRECT_QUIZ = 10; // Resim Testi: doğru cevap
export const XP_FAST_BONUS_QUIZ = 5; // Resim Testi: hızlı cevap (süre >= 4s kala)
