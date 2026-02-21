#!/usr/bin/env node
/**
 * Reads lib/data/vocabulary_words.csv and generates supabase/seed-vocabulary.sql
 * Run: node scripts/csv-to-vocabulary-sql.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const csvPath = path.join(projectRoot, 'lib/data/vocabulary_words.csv');
const outPath = path.join(projectRoot, 'supabase/seed-vocabulary.sql');

function escapeSql(str) {
  if (str == null) return 'NULL';
  return "'" + String(str).replace(/'/g, "''") + "'";
}

const csv = readFileSync(csvPath, 'utf-8');
const lines = csv.split(/\r?\n/).filter(Boolean);
const header = lines[0];
if (!header.startsWith('word,')) {
  console.error('Expected CSV header: word,openmoji_hex,category,level,is_cultural_value,translations');
  process.exit(1);
}

const rows = [];
for (let i = 1; i < lines.length; i++) {
  const line = lines[i];
  if (!line.trim()) continue;
  // Last column is translations: ,"{"tr":"...","az":"...","es":"...","en":"..."}"
  const match = line.match(/,"(\{.*\})"$/);
  if (!match) {
    console.warn('Skipping line (no translations match):', line.slice(0, 60) + '...');
    continue;
  }
  const translationsJson = match[1];
  const rest = line.slice(0, -match[0].length);
  const parts = rest.split(',');
  if (parts.length !== 5) {
    console.warn('Skipping line (expected 5 columns before translations):', line.slice(0, 60) + '...');
    continue;
  }
  const [word, openmoji_hex, category, level, is_cultural_value] = parts;
  rows.push({
    word: word.trim(),
    openmoji_hex: openmoji_hex.trim(),
    category: category.trim(),
    level: level.trim(),
    is_cultural_value: is_cultural_value.trim().toLowerCase() === 'true',
    translations: translationsJson,
  });
}

const values = rows.map(
  (r) =>
    `(${escapeSql(r.word)}, ${escapeSql(r.openmoji_hex)}, ${escapeSql(r.category)}, ${escapeSql(r.level)}, ${r.is_cultural_value}, ${escapeSql(r.translations)}::jsonb)`
);

const sql = `-- Generated from lib/data/vocabulary_words.csv - do not edit by hand
-- Run this AFTER migration 20260221100000_vocabulary_translations.sql

DELETE FROM vocabulary_words;

INSERT INTO vocabulary_words (word, openmoji_hex, category, level, is_cultural_value, translations)
VALUES
${values.join(',\n')};
`;

writeFileSync(outPath, sql, 'utf-8');
console.log(`Wrote ${rows.length} rows to ${outPath}`);
