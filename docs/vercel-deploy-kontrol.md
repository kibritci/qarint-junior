# Vercel deploy yayına girmedi – kontrol listesi

## 1. Production branch (en sık neden)

Vercel varsayılan olarak **main** branch'ini Production kabul eder. Sen **master** kullanıyorsun.

- [Vercel Dashboard](https://vercel.com) → Projeni seç
- **Settings** → **Git**
- **Production Branch** alanına bak:
  - `main` yazıyorsa → **master** yap, **Save**
  - Zaten `master` ise bu değil, aşağıya bak

Bundan sonra `master`'a her push Production deploy tetikler.

---

## 2. Repo taşındı uyarısı

Push sırasında "This repository moved. Please use the new location: https://github.com/kibritci/qarint-games.git" çıktı.

- Vercel’de proje hangi repo’ya bağlı? **Settings → Git → Connected Git Repository**
- Eski URL (`qarint-junior`) veya yeni URL (`qarint-games`) farklıysa, Vercel’de **Disconnect** deyip tekrar **Connect** ile doğru repo’yu (güncel URL) bağla.

---

## 3. Son deploy’u kontrol et

- **Deployments** sekmesine gir
- En üstteki deployment’ın:
  - **Branch:** master mı?
  - **Status:** Ready (yeşil) mı?
  - **Commit:** 5251228 "Leaderboard güvenlik..." mi?

Eğer en son deployment farklı bir commit veya branch ise, Production’a o build atanmamış olabilir.

---

## 4. Production’a elle atama

- **Deployments** → En üstteki (ve doğru commit’li) deployment’a tıkla
- Sağ üstte **⋯** (üç nokta) → **Promote to Production**
- Böylece o build Production’a alınır

---

## 5. Yeni deploy tetiklemek

Branch’i düzelttikten sonra yeni bir deploy istersen:

```bash
git commit --allow-empty -m "chore: trigger Vercel deploy"
git push origin master
```

Veya Vercel’de **Deployments** → **Redeploy** (son deployment’ta **⋯** → **Redeploy**).
