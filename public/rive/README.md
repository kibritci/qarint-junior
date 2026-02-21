# Rive assets

**Rive animasyonları bu klasördeki `.riv` dosyalarına bağlıdır.** Bu dosyalar repo’da yok; eklemediğiniz sürece sayfada fallback (emoji) gösterilir.

Bu klasöre şu dosyaları ekleyin:

| Dosya | Kullanım |
|--------|----------|
| `mascot.riv` | Sol alttaki karakter (State Machine 1; Follow, Hover, Unhover) |
| `broken-egg.riv` | 404 / kayıp sayfa (State Machine 1, otomatik) |
| `logo-loading.riv` | Sayfa yükleme animasyonu (döngü) |
| `streak-fire.riv` | Ana sayfa seri ateşi (animation: "Streak Fire") |
| `confetti-no-loop.riv` | Oyun sonu / leaderboard kutlama (State Machine 1, Confetti 1, tek seferlik) |

Mascot dosya adı farklıysa `components/rive/RiveMascot.tsx` içindeki `MASCOT_SRC` değerini güncelleyin.
