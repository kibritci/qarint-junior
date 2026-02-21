#!/usr/bin/env node
/**
 * public/quiz-images/ içindeki görselleri Supabase Storage 'quiz-images' bucket'ına yükler.
 * Bir kez çalıştırman yeterli (production için).
 *
 * Gereksinimler:
 * - .env.local içinde NEXT_PUBLIC_SUPABASE_URL ve SUPABASE_SERVICE_ROLE_KEY
 * - Supabase'de quiz-images bucket'ı oluşturulmuş olmalı (migration 20260222200000)
 * - public/quiz-images/ klasöründe PNG/JPEG dosyaları
 *
 * Kullanım: node scripts/upload-quiz-images.mjs
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { readdir, readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const quizImagesDir = join(projectRoot, 'public', 'quiz-images');

function loadEnvLocal() {
  try {
    const content = readFileSync(join(projectRoot, '.env.local'), 'utf8');
    for (const line of content.split('\n')) {
      const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
      if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '').trim();
    }
  } catch (_) {}
}

loadEnvLocal();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Hata: NEXT_PUBLIC_SUPABASE_URL ve SUPABASE_SERVICE_ROLE_KEY gerekli.');
  console.error('  .env.local içine ekle veya: SUPABASE_SERVICE_ROLE_KEY=xxx NEXT_PUBLIC_SUPABASE_URL=xxx node scripts/upload-quiz-images.mjs');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);
const BUCKET = 'quiz-images';
const ALLOWED_EXT = /\.(png|jpe?g|webp)$/i;

async function main() {
  let files;
  try {
    files = await readdir(quizImagesDir);
  } catch (err) {
    console.error('public/quiz-images klasörü bulunamadı veya okunamadı:', err.message);
    process.exit(1);
  }

  const toUpload = files.filter((f) => ALLOWED_EXT.test(f));
  if (toUpload.length === 0) {
    console.log('Yüklenecek resim yok (public/quiz-images içinde .png/.jpg/.webp).');
    return;
  }

  console.log(`Yüklenecek dosya sayısı: ${toUpload.length}`);

  let ok = 0;
  let fail = 0;
  for (const filename of toUpload) {
    const filePath = join(quizImagesDir, filename);
    const buffer = await readFile(filePath);
    const { error } = await supabase.storage.from(BUCKET).upload(filename, buffer, {
      contentType: filename.endsWith('.png') ? 'image/png' : filename.endsWith('.webp') ? 'image/webp' : 'image/jpeg',
      upsert: true,
    });
    if (error) {
      console.error(`  ✗ ${filename}: ${error.message}`);
      fail++;
    } else {
      console.log(`  ✓ ${filename}`);
      ok++;
    }
  }

  console.log(`\nBitti: ${ok} başarılı, ${fail} hata.`);
  const baseUrl = `${supabaseUrl.replace(/\/$/, '')}/storage/v1/object/public/${BUCKET}`;
  console.log(`\nVercel'de şu env değişkenini ekle:\n  NEXT_PUBLIC_QUIZ_IMAGES_BASE_URL=${baseUrl}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
