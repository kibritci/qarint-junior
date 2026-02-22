# Vercel Supabase env kontrolü

Projedeki `.env.local` ile aynı Supabase projesini kullanıyorsan, Vercel'deki değerler aşağıdakilerle **bire bir aynı** olmalı.

## 1) NEXT_PUBLIC_SUPABASE_URL

**Beklenen tam değer (proje .env.local):**
```
https://ryohbugucgscumxanonn.supabase.co
```

Vercel'de: **Settings → Environment Variables** → `NEXT_PUBLIC_SUPABASE_URL` → **Reveal** (göz ikonu).  
Yukarıdaki satırla tek karakter bile fark olmamalı (sonunda `/` olmamalı).

---

## 2) NEXT_PUBLIC_SUPABASE_ANON_KEY

**Beklenen:** Uzun bir JWT (yaklaşık 200+ karakter).

- **Başlangıcı:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- **Sonu:** `...h9Wpwp48`
- **Uzunluk:** 219 karakter

Vercel'de: `NEXT_PUBLIC_SUPABASE_ANON_KEY` → **Reveal**.  
Başı ve sonu yukarıdaki gibi mi, uzunluk 219 mu kontrol et. Tamamen aynı olmalı.

---

## Kontrol listesi

- [ ] Vercel → Proje (qarint-games) → Settings → Environment Variables
- [ ] `NEXT_PUBLIC_SUPABASE_URL` = `https://ryohbugucgscumxanonn.supabase.co` (aynı mı?)
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` = yukarıdaki baş/son ve uzunlukla eşleşiyor mu?

İkisi de aynıysa Vercel değerleri doğru; Supabase sync uyarısını görmezden gelebilirsin.
