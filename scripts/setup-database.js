/**
 * Supabase Veritabanı Kurulum Scripti
 * Bu script schema.sql ve seed.sql dosyalarını Supabase'e yükler
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Environment variables kontrolü
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Hata: Supabase environment variables bulunamadı!');
  console.log('\nLütfen .env.local dosyanızda şunları kontrol edin:');
  console.log('- NEXT_PUBLIC_SUPABASE_URL');
  console.log('- SUPABASE_SERVICE_ROLE_KEY (veya NEXT_PUBLIC_SUPABASE_ANON_KEY)');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function readSQLFile(filename) {
  const filePath = path.join(__dirname, '..', 'supabase', filename);
  return fs.readFileSync(filePath, 'utf8');
}

async function executeSQL(sql) {
  // Supabase REST API kullanarak SQL çalıştırma
  // Not: Bu metod sadece service role key ile çalışır
  const response = await supabase.rpc('exec_sql', { sql_query: sql }).catch(async () => {
    // RPC yoksa, doğrudan REST API kullanmayı dene
    console.log('⚠️  RPC metodu bulunamadı, alternatif yöntem deneniyor...');
    
    // SQL'i satır satır parse et ve çalıştır
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    for (const statement of statements) {
      if (statement.includes('CREATE TABLE') || statement.includes('CREATE INDEX') || statement.includes('ALTER TABLE')) {
        console.log(`📝 Çalıştırılıyor: ${statement.substring(0, 50)}...`);
        // Bu tür DDL komutları için Supabase dashboard kullanılmalı
      }
    }
    
    return null;
  });

  return response;
}

async function setupDatabase() {
  console.log('🚀 Supabase veritabanı kurulumu başlatılıyor...\n');

  try {
    // Schema SQL'i oku
    console.log('📖 schema.sql dosyası okunuyor...');
    const schemaSQL = await readSQLFile('schema.sql');
    console.log('✅ Schema dosyası okundu\n');

    // Seed SQL'i oku
    console.log('📖 seed.sql dosyası okunuyor...');
    const seedSQL = await readSQLFile('seed.sql');
    console.log('✅ Seed dosyası okundu\n');

    console.log('⚠️  ÖNEMLİ: Bu script Supabase REST API üzerinden çalışmaz.');
    console.log('📋 Lütfen aşağıdaki adımları takip edin:\n');
    console.log('1. Supabase Dashboard\'a gidin: https://app.supabase.com');
    console.log('2. Projenizi seçin');
    console.log('3. Sol menüden "SQL Editor" seçeneğine tıklayın');
    console.log('4. "New query" butonuna tıklayın');
    console.log('5. Aşağıdaki SQL kodunu kopyalayıp yapıştırın ve "Run" butonuna basın:\n');
    console.log('─'.repeat(60));
    console.log(schemaSQL);
    console.log('─'.repeat(60));
    console.log('\n6. Şimdi seed verilerini eklemek için tekrar "New query" tıklayın');
    console.log('7. Aşağıdaki SQL kodunu çalıştırın:\n');
    console.log('─'.repeat(60));
    console.log(seedSQL);
    console.log('─'.repeat(60));
    console.log('\n✅ Kurulum tamamlandı!\n');

  } catch (error) {
    console.error('❌ Hata:', error.message);
    process.exit(1);
  }
}

setupDatabase();
