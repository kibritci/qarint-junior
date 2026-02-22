#!/bin/bash
# Deploy adımları: build + git push
# Çalıştır: proje klasöründeyken ./deploy.sh veya: bash deploy.sh
set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
# Proje kökü: script'in bulunduğu klasör veya bir üstte "Qarint Games"
if [ -f "$SCRIPT_DIR/package.json" ]; then
  PROJECT_ROOT="$SCRIPT_DIR"
elif [ -f "/Users/bandini/Documents/Qarint Games/package.json" ]; then
  PROJECT_ROOT="/Users/bandini/Documents/Qarint Games"
else
  echo "Hata: package.json bulunamadı. Script'i 'Qarint Games' klasörüne kopyalayıp oradan çalıştırın."
  exit 1
fi
cd "$PROJECT_ROOT"
echo "Proje: $PROJECT_ROOT"
echo "=== 1. Build ==="
npm run build
echo ""
echo "=== 2. Git durumu ==="
git status
echo ""
echo "=== 3. Commit & Push ==="
git add -A
if git diff --staged --quiet; then
  echo "Değişiklik yok, sadece push."
  git push origin master || true
else
  COMMIT_MSG="${1:-}"
  if [ -z "$COMMIT_MSG" ]; then
    echo "Commit mesajı gerekli. Örnek: ./deploy.sh \"fix: açıklayıcı mesaj\""
    exit 1
  fi
  git commit -m "$COMMIT_MSG"
  git push origin master
  echo "Push tamamlandı. Vercel otomatik deploy alacak."
fi
