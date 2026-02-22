#!/usr/bin/env node
/**
 * Deploy: build sonrası commit + push.
 * Agent veya kullanıcı anlamlı commit mesajı vermeli:
 *   npm run deploy -- "fix: mascot react-canvas, AppShell auth overlay"
 * Mesaj verilmezse sadece push (değişiklik varsa önce commit gerekir).
 */
import { execSync } from 'child_process';

const commitMessage = process.argv[2]?.trim();

try {
  execSync('git add -A', { stdio: 'inherit' });
  const status = execSync('git status --short', { encoding: 'utf8' });

  if (!status.trim()) {
    console.log('Değişiklik yok, sadece push.');
    execSync('git push origin master', { stdio: 'inherit' });
    console.log('Push tamamlandı. Vercel otomatik deploy alacak.');
    process.exit(0);
  }

  if (commitMessage) {
    execSync(`git commit -m ${JSON.stringify(commitMessage)}`, { stdio: 'inherit' });
  } else {
    console.error(
      'Commit mesajı gerekli. Örnek: npm run deploy -- "fix: açıklayıcı mesaj"'
    );
    process.exit(1);
  }

  execSync('git push origin master', { stdio: 'inherit' });
  console.log('Push tamamlandı. Vercel otomatik deploy alacak.');
} catch (e) {
  process.exit(e.status || 1);
}
