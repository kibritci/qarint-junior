# 🔑 Supabase API Key'lerini Bulma Rehberi

## Adım 1: Legacy API Keys Sekmesine Geçin

Ekranınızda üstte 2 sekme göreceksiniz:
- ✅ **"Publishable and secret API keys"** (şu an açık - yeni sistem)
- ⬇️ **"Legacy anon, service_role API keys"** ← **BURAYA TIKLAYIN**

## Adım 2: Legacy Sekmesinde Bulacaklarınız

"Legacy anon, service_role API keys" sekmesine tıkladığınızda şunları göreceksiniz:

### 1. Project URL
- **"Project URL"** başlığı altında
- Format: `https://xxxxx.supabase.co`
- Bu değeri `.env.local` dosyasındaki `NEXT_PUBLIC_SUPABASE_URL` değişkenine kopyalayın

### 2. anon public key
- **"anon public"** başlığı altında
- Uzun bir key (eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... ile başlar)
- Yanında **kopyalama ikonu** (📋) var
- Bu değeri `.env.local` dosyasındaki `NEXT_PUBLIC_SUPABASE_ANON_KEY` değişkenine kopyalayın

## Adım 3: .env.local Dosyasını Güncelleyin

`.env.local` dosyanızda şu şekilde görünmeli:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjIzOTAyMiwiZXhwIjoxOTMxODE1MDIyfQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## ⚠️ Önemli Notlar

- **Project URL** mutlaka `https://` ile başlamalı
- **anon public key** çok uzun bir string (200+ karakter)
- Key'lerde **tırnak işareti** kullanmayın
- Her satırda sadece **bir değişken** olmalı
- Dosyayı kaydettikten sonra sunucuyu yeniden başlatın

## Alternatif Yol: Settings → API

Eğer Legacy sekmesini bulamazsanız:
1. Sol menüden **"Settings"** → **"API"** seçeneğine gidin
2. Orada da **"Project URL"** ve **"anon public"** key'i bulabilirsiniz
