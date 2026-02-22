# Proje isimleri ve kullandığımız araçlar – tek referans

Bu doküman, **hangi araçta ne isim / ne ayar** olması gerektiğini tek yerde toplar. İsim değiştirirken sadece bu listeye bak; hepsini uyumlu tut.

---

## Özet tablo

| Araç | Ne olmalı | Neden önemli |
|------|-----------|---------------|
| **GitHub** | Repo: `kibritci/qarint-games` | Push bu repoya gider; Vercel bu repoya bağlı olmalı. |
| **Vercel** | Proje adı: `qarint-games` | Deployments listesinde görünür; Git bağlantısı `kibritci/qarint-games` olmalı. |
| **Vercel** | Production branch: `master` | Settings → Environments → Production → Branch: **master**. |
| **Supabase** | Proje adı: istediğin (örn. Qarint Games) | Sadece dashboard’da görünür; teknik bağlantı URL/key ile. |
| **Supabase ↔ Vercel** | Bağlantı: Supabase proje ↔ Vercel proje `qarint-games` | Sync uyarısı çıkarsa Vercel’de aynı isimde env zaten var demektir; sorun değil. |
| **Lokal klasör** | İstediğin (örn. `Qarint Games`) | Sadece bilgisayarında; Git/URL’leri etkilemez. |
| **package.json** | `"name": "qarint-games"` | npm/Node tarafı; Vercel/Supabase’i etkilemez ama tutarlılık için. |
| **Domain** | `qarint.games` | Vercel’de bu projeye atanmış custom domain. |
| **Sentry** | Proje: `qarint-games` (next.config.mjs) | Hata raporları bu projeye gider. |

---

## 1. GitHub

- **Repo adı:** `qarint-games`
- **Tam URL:** `https://github.com/kibritci/qarint-games`
- **Varsayılan branch:** `master`
- **Lokal remote:** `git remote -v` → `origin` = `https://github.com/kibritci/qarint-games.git` (veya `git@github.com:kibritci/qarint-games.git`)

Repo adını değiştirdiysen: GitHub repo **Settings** → **Repository name** → `qarint-games`. Sonra her makinede `git remote set-url origin https://github.com/kibritci/qarint-games.git`.

---

## 2. Vercel

- **Proje adı (görünen):** `qarint-games`  
  **Settings** → **General** → **Project Name** → `qarint-games`. (Eski ad `qarint-junior` ise burayı değiştir; deploy’u etkilemez.)
- **Git bağlantısı:** **Settings** → **Git** → **Connected Git Repository** = `kibritci/qarint-games`. Başka repo veya eski isim görünüyorsa **Disconnect** → **Connect** ile `kibritci/qarint-games` seç.
- **Production branch:** **Settings** → **Environments** → Production → **Branch:** `master`. (`main` ise push’lar production’a yansımaz.)
- **Domain:** **Settings** → **Domains** → `qarint.games` bu projeye atanmış olmalı.
- **Env değişkenleri:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (zorunlu). Opsiyonel: `NEXT_PUBLIC_QUIZ_IMAGES_BASE_URL`, Sentry DSN.

Vercel’de proje adını değiştirirsen: Sadece görünen isim ve `*.vercel.app` URL’i değişir; custom domain (`qarint.games`) ve Git bağlantısı aynı kalır.

---

## 3. Supabase

- **Proje adı (dashboard):** İstediğin (örn. **Qarint Games**). Teknik olarak sadece görünen isim.
- **API / bağlantı:** Proje **Settings** → **API** → Project URL ve anon key. Bunlar `.env.local` ve Vercel env’de **aynı** olmalı (bkz. `docs/vercel-supabase-env-kontrol.md`).
- **Vercel entegrasyonu:** Supabase **Settings** → **Integrations** → Vercel. Bağlantı: Bu Supabase projesi ↔ Vercel projesi **qarint-games**. “Failed to sync env” uyarısı = Vercel’de `NEXT_PUBLIC_SUPABASE_*` zaten elle ekli demektir; değerler doğruysa görmezden gelebilirsin.

---

## 4. Lokal (bilgisayarın)

- **Klasör adı:** İstediğin (örn. `Qarint Games`). Repo içeriği aynı olduğu sürece deploy’u etkilemez.
- **Git config (deploy / Vercel için):** Commit author’ın Vercel’de tanınması için:
  - `git config --global user.email` = Vercel hesabındaki e‑posta (örn. `kibritcia@gmail.com`) ve Vercel’de **Account Settings** → **Emails** içinde bu e‑posta **verified** olmalı.
  - `git config --global user.name` = İstediğin (örn. Bandini).

---

## 5. Kod / repo içi

- **package.json** → `"name": "qarint-games"`. (npm paket adı; Vercel/Supabase’i etkilemez, tutarlılık için.)
- **next.config.mjs** → Sentry `project: 'qarint-games'`. Zaten doğru.
- **app/layout.tsx** → `title`, `siteName`, `metadataBase` vb. **“Qarint Junior”** = ürün/marka adı (çocuklara İngilizce). İstersen “Qarint Games” yapabilirsin; teknik bağlantıları etkilemez. Domain `qarint.games` kalır.

---

## İsim değiştirme yaparken sıra

1. **GitHub:** Repo adı → `qarint-games`. Sonra lokal: `git remote set-url origin https://github.com/kibritci/qarint-games.git`.
2. **Vercel:** Proje adı → `qarint-games`. Git bağlantısı → `kibritci/qarint-games`. Production branch → `master`.
3. **Supabase:** Proje adı istediğin kalabilir; Vercel entegrasyonunda hedef proje = Vercel’deki `qarint-games`.
4. **package.json:** `"name": "qarint-games"`.
5. Commit author e‑postası Vercel’de tanımlı olsun; push sonrası deploy tetiklenir.

Bu sırayla hepsini **qarint-games** (ve gerekli yerlerde `master`) yaparsan deploy, env ve domain tutarlı çalışır.
