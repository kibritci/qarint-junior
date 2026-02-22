# Vercel Supabase env kontrolü

Projedeki `.env.local` ile aynı Supabase projesini kullanıyorsan, Vercel'deki değerler **bire bir aynı** olmalı.

## 1) NEXT_PUBLIC_SUPABASE_URL

**Beklenen:** Supabase Dashboard → **Settings → API** → **Project URL** ile aynı değer.

- Format: `https://<PROJECT_REF>.supabase.co` (sonunda `/` olmamalı)
- Vercel'de: **Settings → Environment Variables** → `NEXT_PUBLIC_SUPABASE_URL` → **Reveal** ile karşılaştır.

---

## 2) NEXT_PUBLIC_SUPABASE_ANON_KEY

**Beklenen:** Supabase Dashboard → **Settings → API** → **anon public** key ile aynı değer.

- Uzun bir JWT (birkaç yüz karakter). Client tarafında kullanıldığı için "public" sayılır; yine de repoda tam değer veya parçası yazmayın.
- Vercel'de: `NEXT_PUBLIC_SUPABASE_ANON_KEY` → **Reveal**. `.env.local` içindeki anon key ile tamamen aynı olmalı.

---

## Kontrol listesi

- [ ] Vercel → Proje → Settings → Environment Variables
- [ ] `NEXT_PUBLIC_SUPABASE_URL` = Supabase API sayfasındaki Project URL ile aynı mı?
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Supabase API sayfasındaki anon key ile aynı mı?

İkisi de aynıysa Vercel değerleri doğru; Supabase sync uyarısını görmezden gelebilirsin.
