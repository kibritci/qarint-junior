#!/usr/bin/env node
/**
 * QUIZ_IMAGES listesindeki filename'ler ile public/quiz-images/ (veya verilen klasör)
 * içindeki dosyaları karşılaştırır. Listede olup dosyası olmayan = production'da 404 riski.
 *
 * Kullanım: node scripts/check-quiz-images.mjs [quiz-images-klasörü]
 * Örnek: node scripts/check-quiz-images.mjs public/quiz-images
 */

import { readdir } from 'fs/promises';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const defaultDir = join(projectRoot, 'public', 'quiz-images');

function getListedFilenames() {
  const path = join(projectRoot, 'lib', 'data', 'quizImages.ts');
  const content = readFileSync(path, 'utf8');
  const re = /filename:\s*['"]([^'"]+)['"]/g;
  const names = new Set();
  let m;
  while ((m = re.exec(content)) !== null) names.add(m[1]);
  return [...names].sort();
}

async function main() {
  const dir = process.argv[2] ? join(process.cwd(), process.argv[2]) : defaultDir;
  const listed = getListedFilenames();
  const existing = await readdir(dir).catch(() => []);

  const existingSet = new Set(existing);
  const missing = listed.filter((f) => !existingSet.has(f));
  const extra = existing.filter((f) => !listed.includes(f));

  console.log('QUIZ_IMAGES satır sayısı:', listed.length);
  console.log('Klasördeki dosya sayısı:', existing.length);
  console.log('');

  if (missing.length > 0) {
    console.log('⚠️  Listede var ama klasörde YOK (soru gelince 404 olur):');
    missing.forEach((f) => console.log('   ', f));
    console.log('');
  }
  if (extra.length > 0) {
    console.log('ℹ️  Klasörde var ama listede yok (kullanılmıyor):');
    extra.slice(0, 20).forEach((f) => console.log('   ', f));
    if (extra.length > 20) console.log('   ... ve', extra.length - 20, 'tane daha');
    console.log('');
  }
  if (missing.length === 0 && extra.length === 0) {
    console.log('✓ Liste ve klasör bire bir eşleşiyor.');
  } else if (missing.length === 0) {
    console.log('✓ Listede olan her dosya klasörde mevcut.');
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
