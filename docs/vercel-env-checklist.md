# Vercel Environment Variables – Kontrol listesi

Proje **Supabase JS client** (`@supabase/ssr`) kullanıyor; doğrudan Postgres bağlantısı (Prisma vb.) yok. Supabase + Vercel entegrasyonu `POSTGRES_*` ekler; bu proje onları **kullanmıyor**. Aşağıdaki değişkenler gerekli.

## Zorunlu (auth ve veritabanı)

Vercel → Proje → **Settings → Environment Variables** içinde mutlaka olmalı:

| Değişken | Nerede kullanılıyor | Nereden alınır |
|----------|----------------------|----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `lib/supabase/client.ts`, `server.ts`, `next.config.mjs` | Supabase Dashboard → Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `lib/supabase/client.ts`, `server.ts` | Supabase Dashboard → Settings → API → anon public key |

Bu ikisi **yoksa** production’da giriş yapılamaz ve Supabase çağrıları çalışmaz.

## Opsiyonel

| Değişken | Açıklama |
|----------|----------|
| `NEXT_PUBLIC_QUIZ_IMAGES_BASE_URL` | Resim bilgisi oyunu görselleri (Supabase Storage). Yoksa production’da quiz görselleri gelmez. Bkz. `docs/quiz-images-upload.md`. |
| `NEXT_PUBLIC_SENTRY_DSN` / `SENTRY_DSN` | Sentry hata takibi. Yoksa sadece hata raporlama kapalı olur. |

## Kontrol

- Vercel’de **NEXT_PUBLIC_SUPABASE_URL** ve **NEXT_PUBLIC_SUPABASE_ANON_KEY** tanımlı mı kontrol et.
- Değerleri `.env.local` ile aynı yap (Supabase proje URL ve anon key). Production ve Preview için ikisini de ekle.
