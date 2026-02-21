# Profil & Ayarlar Yenileme – Yol Haritası

## 1. Amaçlar
- **Profil** ve **Ayarlar** sayfalarını ayırmak
- Profil sayfasını görsel ve işlevsel olarak güzelleştirmek
- Streak bölümünü fitness uygulamalarındaki gibi büyük, magnetik kaydırmalı dönem geçişli yapmak
- Profil analizi: grafikler, tablolar, oyunlaştırma öğeleri eklemek

---

## 2. Profil / Ayarlar Ayrımı

| Sayfa | İçerik |
|-------|--------|
| **Profil** (`/profile`) | Avatar, isim (sadece görüntüleme + “Ayarlarda düzenle” linki), streak bölümü, istatistik kartları (XP, seri), grafikler (haftalık XP, oyun dağılımı), son aktiviteler / gamification öğeleri |
| **Ayarlar** (`/settings`) | Görünen ad düzenleme, şifre değiştirme, dil/tema (varsa). İsteğe bağlı: avatar düzenleme burada da olabilir veya profil sayfasında kalabilir. |

**Navigasyon**
- Header dropdown: “Profil” → `/profile`, “Ayarlar” → `/settings`
- Profil sayfasında “Adını veya şifreni değiştir” → `/settings`

**Teknik**
- `ProfileForm` (display name + şifre) → Ayarlar sayfasına taşınır veya `SettingsForm` olarak ayrı bileşen.
- Profil sayfası sadece `ProfileHeader`, streak carousel, istatistikler, grafikler/tablolar.

---

## 3. Streak Bölümü – Fitness Tarzı Tasarım

**Mevcut sorunlar**
- Küçük kalan alan, kutucuklar içinde sıkışık his
- Dönemler arası geçiş daha belirgin ve “magnetik” olmalı

**Hedef**
- **Tam genişlik** kullanım (max-width sadece sayfa layout’unda)
- **Hafta kartları**: Her hafta tek bir büyük “dönem kartı”; içinde o haftanın 7 günü büyük ve net (zincir görseli daha büyük)
- **Magnetik kaydırma**: `snap-x snap-mandatory`, `snap-center`; kart genişliği viewport’a yakın (örn. `min(92vw, 400px)`), böylece her kaydırmada bir hafta ortalanır
- **Görsel**: Kutucuk sınırı yerine hafif gölge / rounded kart; “Bu hafta” vurgusu (badge veya border)
- **Chain bileşeni**: `compact` kaldırılacak; zincir ikonları büyütülecek (örn. 48px), gün isimleri okunaklı

**Bileşenler**
- `WeekStreakCarousel`: Aynı mantık, fakat her `section` tam bir “hafta kartı” (büyük, snap’li).
- `ChainStreak`: Varsayılan büyük mod; compact sadece gerekirse (başka yerde) kullanılır.

---

## 4. Profil Sayfası Güzelleştirme

**Üst bölüm (Hero)**
- Avatar (mevcut), isim, e-posta (truncate)
- “Avatarı düzenle” butonu
- Hemen altında iki büyük metrik: **Toplam XP** | **Gün serisi** (ikonlu, vurgulu)

**İstatistik kartları**
- Beyaz kartlar, `rounded-2xl`, `shadow-sm` (design system)
- Örnek: Toplam XP, Mevcut seri, Bu hafta kazanılan XP, Toplam oyun sayısı (veya “Aktif gün sayısı”)

**Streak bölümü**
- Başlık: “Zinciri kırma” / “Don’t break the chain”
- Açıklama: “Haftalar arasında kaydır”
- Yeni büyük carousel (yukarıdaki gibi)

**Analiz / Grafikler**
- **Haftalık XP**: Son 4–6 hafta, hafta bazlı toplam XP (bar chart veya line). Veri: `game_sessions` → tarih aralığı + `xp_earned` toplamı.
- **Oyun dağılımı**: Oyun türüne göre oynanma sayısı (pie veya horizontal bar). Veri: `getGamePlayCounts` zaten var.
- **Son aktiviteler**: Son 5–10 oyun (tarih, oyun adı, XP) — basit tablo veya liste.

**Oyunlaştırma**
- Basit rozet / milestone metinleri: “7 gün serisi!”, “1000 XP’ye ulaştın!” (opsiyonel, metin + ikon)
- Haftalık hedef: “Bu hafta 5 gün oyna” → ilerleme çubuğu (mevcut haftanın aktif gün sayısı / 5)

---

## 5. Veri İhtiyaçları

| Veri | Kaynak | Not |
|------|--------|-----|
| Kullanıcı + gamification | `getUserGamification`, auth | Mevcut |
| Aktif günler (tarih listesi) | `getActiveDatesFromSessions` | Mevcut |
| Oyun sayıları (türe göre) | `getGamePlayCounts` | Mevcut |
| Haftalık XP (son N hafta) | Yeni: `getWeeklyXpHistory(userId, weeks)` | `game_sessions` gruplu |
| Son oturumlar (tarih, oyun, XP) | Yeni: `getRecentSessions(limit)` | `game_sessions` son kayıtlar |

---

## 6. Uygulama Sırası

1. **Profil / Ayarlar ayrımı**  
   - `/settings` sayfası, SettingsForm (ad + şifre).  
   - Profil sayfasından form kaldır; “Ayarlara git” linki.  
   - Header: Profil + Ayarlar linkleri.

2. **Streak carousel yenileme**  
   - Büyük hafta kartları, magnetik snap, tam genişlik.  
   - ChainStreak büyük mod, kutucuktan çıkar.

3. **Profil veri katmanı**  
   - `getWeeklyXpHistory`, `getRecentSessions` action’ları.

4. **Profil sayfası layout**  
   - Hero düzenleme, istatistik kartları, streak bölümü yerleşimi.

5. **Analiz bileşenleri**  
   - Haftalık XP grafiği, oyun dağılımı, son aktiviteler tablosu.

6. **Oyunlaştırma dokunuşları**  
   - Haftalık hedef çubuğu, basit milestone metinleri.

7. **Çeviriler**  
   - `settings`, `profile`, `streak` için yeni/güncel anahtarlar (en, tr, az, es).

---

## 7. Teknik Notlar
- Chart için: CSS tabanlı bar’lar (Tailwind) veya hafif bir kütüphane (recharts vb.). Proje bağımlılığına göre seçim.
- Touch: `touch-pan-x`, `scroll-snap` ile mobilde de magnetik kaydırma.
- Dark mode: Tüm yeni bileşenlerde `dark:` sınıfları.
