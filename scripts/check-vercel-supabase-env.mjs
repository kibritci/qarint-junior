#!/usr/bin/env node
/**
 * .env.local'daki Supabase değerleri ile Vercel'deki env'leri karşılaştırman için
 * beklenen değerleri yazdırır. Vercel'de "reveal" ile açıp bire bir aynı mı kontrol et.
 *
 * Kullanım: node scripts/check-vercel-supabase-env.mjs
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const envPath = join(projectRoot, '.env.local');

function loadEnv() {
  try {
    const content = readFileSync(envPath, 'utf8');
    const out = {};
    for (const line of content.split('\n')) {
      const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
      if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, '').trim();
    }
    return out;
  } catch (e) {
    console.error('.env.local bulunamadı veya okunamadı.');
    process.exit(1);
  }
}

const env = loadEnv();
const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error('.env.local içinde NEXT_PUBLIC_SUPABASE_URL ve NEXT_PUBLIC_SUPABASE_ANON_KEY olmalı.');
  process.exit(1);
}

console.log('--- Beklenen değerler (proje .env.local) ---\n');
console.log('1) NEXT_PUBLIC_SUPABASE_URL');
console.log('   Tam değer:', url);
console.log('');
console.log('2) NEXT_PUBLIC_SUPABASE_ANON_KEY');
console.log('   Uzunluk:', key.length, 'karakter');
console.log('   Başı (ilk 30 karakter):', key.slice(0, 30) + '...');
console.log('   Sonu (son 12 karakter):', '...' + key.slice(-12));
console.log('');
console.log('--- Kontrol ---');
console.log('Vercel → Proje → Settings → Environment Variables');
console.log('  • NEXT_PUBLIC_SUPABASE_URL: Reveal et, yukarıdaki URL ile bire bir aynı mı?');
console.log('  • NEXT_PUBLIC_SUPABASE_ANON_KEY: Reveal et; uzunluk, başı ve sonu yukarıdaki ile aynı mı?');
console.log('');
console.log('İkisi de aynıysa Vercel değerleri doğru.');
