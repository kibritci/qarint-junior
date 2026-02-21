# Quiz görselleri (Resim bilgisi oyunu) – Production

Görseller Git’e eklenmediği için production’da **Supabase Storage** kullanılıyor.

## 1. Bucket + migration

**Supabase Dashboard:** Storage → **New bucket** → Name: `quiz-images`, **Public** işaretle → Create.

Ardından public read policy için migration’ı uygula:

```bash
supabase db push
```

veya SQL Editor’da `supabase/migrations/20260222200000_storage_quiz_images_bucket.sql` içeriğini çalıştır.

## 2. Service Role Key

Supabase Dashboard → **Settings → API** → **Project API keys** → `service_role` (secret) kopyala.  
`.env.local` içine ekle (bu dosyayı Git’e ekleme):

```
SUPABASE_SERVICE_ROLE_KEY=eyJ...
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
```

## 3. Görselleri yükle

`public/quiz-images/` klasöründe PNG/JPEG dosyaların varsa:

```bash
node scripts/upload-quiz-images.mjs
```

Script, tüm dosyaları `quiz-images` bucket’ına yükler ve sonunda Vercel için kullanacağın URL’i yazar.

## 4. Vercel env

Vercel → Proje → **Settings → Environment Variables**:

- **Name:** `NEXT_PUBLIC_QUIZ_IMAGES_BASE_URL`
- **Value:** `https://<PROJECT_REF>.supabase.co/storage/v1/object/public/quiz-images`  
  (Supabase URL’indeki proje ref’in ile; script çıktısında da gösterilir.)

Kaydet, sonra bir deploy tetikle (veya otomatik deploy’u bekle). Resim bilgisi oyununda görseller artık production’da da çalışır.

## Lokal

Lokal geliştirmede `NEXT_PUBLIC_QUIZ_IMAGES_BASE_URL` **tanımlı değilse** uygulama `/quiz-images` kullanır (yani `public/quiz-images/`). Bu klasörde görseller varsa lokalde sorunsuz çalışır.
