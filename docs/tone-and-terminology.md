# Qarint Junior – Ton ve Terminoloji Rehberi

Bu doküman, arayüz metinleri ve çeviriler için Duolingo tarzı (çocuk dostu, laubali olmayan) ton ve tutarlı terminoloji tanımlar. Geliştirici ve çeviri referansıdır.

---

## Ses nitelikleri (Duolingo’dan uyarlı)

### Expressive (İfade gücü)
- **Kısa cümleler:** Gereksiz kelime kullanmayın.
- **Aktif ses:** "Check your answer" ✓ / "Your answer can be checked" ✗
- **Doğrudan:** "Finish lessons to earn XP" ✓ / "It is possible to earn XP by finishing lessons" ✗
- **Heyecanlı ama abartısız:** "Well done!" ✓ / "You're the best in the entire universe!!" ✗ (çocuklar için laubali olmayalım)

### Playful (Oyuncul)
- **Neşeli ve yaratıcı:** "Keep the streak going!" gibi ifadeler kullanılabilir.
- **Dostane:** Samimi ama kurnaz veya sarkastik değil.
- **Kaçının:** Zeki görünmek için karmaşık espriler, alay, ukala ton.

### Embracing (Kucaklayıcı)
- **Destekleyici:** Yanlış cevapta "Not quite! Try again!" ✓ / "Wrong." ✗
- **Net:** Talimatlar tek adımda anlaşılır olsun.
- **Cinsiyet nötr:** "they/them" tercih edin; "him/her" yerine "them".

### Worldly (Evrensel)
- **Evrensel ifadeler:** Kültüre özgü şakalar veya sadece tek dilde bilinen referanslardan kaçının.
- **Yerelleştirilmiş:** Tüm arayüz metinleri seçilen dilde (EN, TR, AZ, ES) sunulur.

---

## Çocuk güvenliği

- **İçerik:** Dummy data, kelime listeleri ve senaryolar çocuklar için güvenli ve yaşa uygun olmalı (ör. dürüstlük, aileye saygı, paylaşım, yardım).
- **Ton:** Korkutucu, şiddet içeren veya kültürel olarak hassas ifadeler kullanılmaz.
- **Hata mesajları:** Suçlayıcı değil, teşvik edici ("Try again!" / "Tekrar dene!").

---

## Terminoloji (i18n anahtarları ve anlamları)

| Kavram        | EN (referans)   | Açıklama |
|---------------|-----------------|----------|
| Day Streak    | Day Streak      | Ardışık gün serisi; yerelleştirilecek (TR: Gün Serisi, ES: Racha diaria, AZ: Gün seriyası). |
| Total XP      | Total XP        | Toplam deneyim puanı; "XP" kısaltması kalabilir, etiket yerelleştirilir. |
| Zinciri Kırma | Zinciri Kırma   | **Marka.** Başlık tüm dillerde aynı kalabilir veya anlam korunarak çevrilebilir (örn. "Don't break the chain!"). |
| Oyun adları   | Memory Match, Splat Word Hunt, … | Her dilde çeviri; tek kaynak `messages/*.json` içinde `games.titles.*` / `games.subtitles.*`. |
| Nav           | Home, Games, Leaderboard, Profile | `common.nav.*` ile yerelleştirilir. |

---

## Örnek doğru / yanlış

| Bağlam        | ✓ Doğru                         | ✗ Kaçının |
|---------------|----------------------------------|-----------|
| Yanlış cevap  | "Not quite! Try again."         | "Wrong.", "You failed." |
| Başarı        | "Well done!", "You did it!"      | "You're a genius!!" (aşırı) |
| Talimat       | "Tap words in the correct order."| "The user should tap the words in the correct order." |
| Teşvik        | "Play at least once each day this week." | "You'd better play every day or else." |
| Boş liderlik  | "No one on the board yet this week. Play games to earn XP and appear here!" | "Leaderboard is empty." |

---

## Marka metinleri (çevrilmez / sabit)

- **Qarint Junior:** Ürün adı; logo ve metadata’da olduğu gibi kullanılır.
- **Zinciri Kırma:** Streak bölümü başlığı; planda korunuyor (isteğe bağlı: diğer dillerde anlamı koruyan çeviri).

Bu rehber, `messages/*.json` dosyalarındaki çevirilerin ve yeni eklenen metinlerin bu tona uygun olması için kullanılır.
