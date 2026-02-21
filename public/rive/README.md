# Rive assets

**Rive animasyonları bu klasördeki `.riv` dosyalarına bağlıdır.** Bu dosyalar repo’da yok; eklemediğiniz sürece sayfada fallback (emoji) gösterilir.

Bu klasöre şu dosyaları ekleyin:

| Dosya | Kullanım |
|--------|----------|
| `mascot.riv` | Sol alttaki karakter (State Machine 1; Follow, Hover, Unhover) |
| `404-sad.riv` | 404 sayfası (State Machine 1, otomatik) |
| `logo-loading.riv` | Sayfa yükleme animasyonu (döngü) |
| `streak-fire.riv` | Ana sayfa seri ateşi (animation: "Streak Fire") |

Mascot dosya adı farklıysa `components/rive/RiveMascot.tsx` içindeki `MASCOT_SRC` değerini güncelleyin.
