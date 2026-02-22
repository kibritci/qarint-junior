# Rive Mascot Animation – Sorun Raporu

## Ortam

| Öğe | Değer |
|-----|--------|
| Framework | Next.js 14 (App Router) |
| Rive paketi | `@rive-app/react-canvas` ^4.27.0 (mascot; mouse takibi bu runtime'da çalışıyor) |
| React | 18.3 |
| SSR | Bileşen `dynamic(..., { ssr: false })` ile yükleniyor |

---

## Dosya ve konum

- **Dosya:** `mascot.riv`
- **URL:** `/rive/mascot.riv` (projede `public/rive/mascot.riv`)
- **Durum:** Dosya repoda ve production'da mevcut (404 yok).

---

## Mevcut kod konfigürasyonu

```js
useRive(
  {
    src: '/rive/mascot.riv',
    artboard: 'Artboard',
    stateMachines: 'State Machine 1',
    autoplay: true,
  },
  { shouldResizeCanvasToContainer: true }
);
```

Render mantığı: `rive !== null` ise `<RiveComponent />`, değilse fallback olarak 🦁 emoji gösteriliyor.

---

## Referans alınan Rive rehberi (mascot)

- **Artboard:** `Artboard` (500×500 px)
- **State Machine:** `State Machine 1`
- **Katmanlar:** Breathe, Emotion, Eyeblink, Follow, Layer 5 (hepsi aynı anda)
- **Mouse:** Hitbox pointer event'leri yakalar; rehberde "ekstra kod gerekmez", `autoplay: true` yeterli deniyor.
- **ViewModel / Script:** Yok

Kod bu rehberle uyumlu olacak şekilde güncellendi: `artboard`, `autoplay` eklendi; Hover/Unhover input kullanımı kaldırıldı; canvas'ta `pointer-events-none` kaldırıldı.

---

## Sorun

- **Beklenen:** Sol altta Rive canvas render olsun; nefes, göz kırpma, duygu ve mouse takibi animasyonları oynasın.
- **Gerçek:** Çoğu zaman `rive` null kalıyor; fallback 🦁 görünüyor, animasyon hiç başlamıyor.

---

## İhtiyaç

1. **Neden `rive` null kalıyor?** Dosya yükleniyor olsa bile runtime'da sessiz hata veya parse sorunu olabilir mi?
2. **Önerilen konfigürasyon:** Bu .riv için `artboard` / `stateMachines` / `autoplay` dışında ek parametre gerekli mi?
3. **Debug:** `onLoad` / `onLoadError` veya konsol/network'te kontrol edilmesi gereken belirli noktalar var mı?

---

## Yapılan iyileştirmeler (devam)

- **Runtime:** Mascot tekrar `@rive-app/react-canvas` (mouse takibi ve animasyon bu runtime’da çalışıyor). Cleanup hatası (`e.delete is not a function`) için mascot artık hiç unmount edilmiyor: AppShell auth sayfalarında da shell + RiveMascot’u DOM’da tutuyor, login tam ekran overlay ile üstte gösteriliyor.
- **Fallback:** `rive === null` iken 2,5 s sonra Skeleton yerine 🦁 emoji gösteriliyor.
- **Yükleme:** `onLoad` ile `loaded` state; canvas opacity 0→1 fade-in.
- **Layout:** `Layout(Fit.Contain, Alignment.Center)` (raporla uyumlu, 500×500 artboard).
