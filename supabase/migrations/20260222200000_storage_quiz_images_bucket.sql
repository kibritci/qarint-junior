-- Quiz (picture quiz) görselleri için public read policy.
-- Bucket'ı Supabase Dashboard'dan oluştur: Storage → New bucket → id: quiz-images, Public: true
-- (Migration ile bucket oluşturmak bazı sürümlerde farklılık gösterebilir.)

-- Herkes (anon dahil) quiz-images bucket'ındaki dosyaları okuyabilsin
DROP POLICY IF EXISTS "Public read quiz-images" ON storage.objects;
CREATE POLICY "Public read quiz-images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'quiz-images');
