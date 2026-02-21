# Qarint Junior – Design System

## Fonts

- **font-display** (Nunito): Başlıklar (h1–h4), buton metinleri, vurgu metinleri.
- **font-body** (Nunito): Gövde metni, paragraflar, form etiketleri.
- **font-friendly** (Quicksand): Login, onboarding ve “sıcak” his veren alanlarda kullanılır.

Fontlar `app/layout.tsx` (next/font ile Nunito) ve `app/globals.css` (Quicksand @import) ile yüklenir; `tailwind.config.ts` içinde `fontFamily` ile tanımlıdır.

## Tipografi skalası

| Token         | Kullanım              | Örnek sınıflar              |
|---------------|------------------------|-----------------------------|
| `text-heading-1` | Sayfa başlığı (h1)     | `font-display text-heading-1` |
| `text-heading-2` | Bölüm başlığı (h2)     | `font-display text-heading-2` |
| `text-heading-3` | Alt başlık (h3)        | `font-display text-heading-3` |
| `text-heading-4` | Kart/panel başlığı (h4)| `font-display text-heading-4` |
| `text-body-lg`   | Büyük gövde            | `font-body text-body-lg`      |
| `text-body`      | Normal gövde (varsayılan) | `font-body text-body`     |
| `text-body-sm`   | Küçük gövde            | `font-body text-body-sm`      |
| `text-caption`   | Açıklama, ikincil metin| `text-caption`                |
| `text-label`     | Form etiketleri, küçük etiketler | `text-label font-semibold uppercase tracking-wider` |

Başlıklar için `font-display`, gövde için `font-body` kullanın; boyut için yukarıdaki `text-*` token’larını tercih edin.

## Bileşen sınıfları (globals.css)

- **.card-game**: Oyun kartı; beyaz arka plan, rounded-2xl, gölge, hover lift.
- **.btn-primary**: Ana aksiyon; primary arka plan, beyaz metin, font-display font-bold.
- **.btn-secondary**: İkincil aksiyon; gri arka plan, font-display font-semibold.
- **.game-card-face / .game-card-back / .game-card-front / .game-card-matched**: Hafıza oyunu kart yüzleri.
- **.progress-bar / .progress-bar-fill**: İlerleme çubuğu.
- **.badge**, **.badge-primary**, **.badge-blue**, **.badge-green**: Etiketler.

Bu sınıflar dark mode’da `dark:` varyantları ile güncellenir.

## Renkler (Tailwind)

- **primary** (50–600): Ana marka rengi; butonlar, vurgular, streak/XP.
- **sidebar.bg / hover / active**: Kenar çubuğu ve nav öğeleri (Header’da kullanılır).

## Dark mode

Tema `next-themes` ile yönetilir; Tailwind `darkMode: 'class'`. Header’daki tema anahtarı ile light / dark / system seçilebilir. Bileşenlerde `dark:bg-*`, `dark:text-*`, `dark:border-*` kullanılır.
