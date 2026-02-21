#!/usr/bin/env node
import { execSync } from 'child_process';
try {
  execSync('git add -A', { stdio: 'inherit' });
  const status = execSync('git status --short', { encoding: 'utf8' });
  if (!status.trim()) {
    console.log('Değişiklik yok, push atlanıyor.');
    process.exit(0);
  }
  execSync('git commit -m "chore: deploy"', { stdio: 'inherit' });
  execSync('git push origin master', { stdio: 'inherit' });
  console.log('Push tamamlandı. Vercel otomatik deploy alacak.');
} catch (e) {
  process.exit(e.status || 1);
}
