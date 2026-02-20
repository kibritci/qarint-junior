# 🔧 Environment Variables Kontrolü

## .env.local Dosyası Kontrolü

`.env.local` dosyanızda şu değişkenlerin doğru şekilde ayarlandığından emin olun:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Supabase Bilgilerinizi Nereden Bulabilirsiniz?

1. **Supabase Dashboard'a gidin:** https://app.supabase.com
2. Projenizi seçin
3. Sol menüden **"Settings"** (⚙️) → **"API"** seçeneğine tıklayın
4. Şu bilgileri kopyalayın:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Örnek Format

```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjIzOTAyMiwiZXhwIjoxOTMxODE1MDIyfQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## ⚠️ Önemli Notlar

- URL **mutlaka** `https://` ile başlamalı
- URL'de **boşluk** olmamalı
- Key'de **tırnak işareti** olmamalı
- Her satırda sadece **bir değişken** olmalı

## Dosyayı Kaydettikten Sonra

Sunucuyu yeniden başlatın:
```bash
# Terminal'de Ctrl+C ile durdurun, sonra:
npm run dev
```
