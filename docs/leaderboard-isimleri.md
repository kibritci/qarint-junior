# Liderlikte isimler "Oyuncu" görünüyor – çözüm

Liderlik listesinde isimler **users_gamification.display_name** alanından gelir. Bu alan boşsa "Oyuncu" / "Player" yazar.

## Yapılacak (bir kez)

Mevcut kullanıcılar için bu alanı auth bilgilerinden doldurmak gerekiyor. Supabase’de aşağıdaki SQL’i **bir kez** çalıştır:

1. **Supabase Dashboard** → projeyi seç  
2. Sol menüden **SQL Editor**  
3. **New query**  
4. Aşağıdaki SQL’i yapıştır ve **Run**’e bas:

```sql
UPDATE users_gamification ug
SET display_name = COALESCE(
  NULLIF(TRIM(au.raw_user_meta_data->>'display_name'), ''),
  NULLIF(TRIM(au.raw_user_meta_data->>'full_name'), ''),
  NULLIF(TRIM(au.raw_user_meta_data->>'name'), ''),
  NULLIF(TRIM(SPLIT_PART(au.email, '@', 1)), '')
)
FROM auth.users au
WHERE ug.user_id = au.id
  AND (ug.display_name IS NULL OR ug.display_name = '');
```

Bu script:

- Sadece `display_name` boş olan satırları günceller  
- Önce `display_name`, yoksa `full_name`, yoksa `name`, son olarak e‑postanın @ öncesi kısmını yazar  

Çalıştırdıktan sonra liderlik sayfasını yenileyince isimler (maskeli: "Ad S." formatında) görünür.

## Yeni kullanıcılar

Yeni kayıt olan kullanıcıların ismi zaten ilk XP kazanıldığında auth’tan alınıp `display_name`’e yazılıyor; ekstra bir işlem gerekmez.
