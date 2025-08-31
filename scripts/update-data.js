#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔄 Veri güncelleme scripti başlatılıyor...\n');

// 1. Static data'yı yeniden oluştur
console.log('📊 Static data yeniden oluşturuluyor...');
try {
  execSync('node scripts/generate-static-data.js', { stdio: 'inherit' });
  console.log('✅ Static data oluşturuldu\n');
} catch (error) {
  console.error('❌ Static data oluşturma hatası:', error.message);
  process.exit(1);
}

// 2. Build yap
console.log('🏗️  Build yapılıyor...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build tamamlandı\n');
} catch (error) {
  console.error('❌ Build hatası:', error.message);
  process.exit(1);
}

// 3. GitHub'a push yap
console.log('📤 GitHub\'a push yapılıyor...');
try {
  execSync('git add .', { stdio: 'inherit' });
  execSync('git commit -m "Veri güncellendi - ' + new Date().toLocaleString('tr-TR') + '"', { stdio: 'inherit' });
  execSync('git push origin master', { stdio: 'inherit' });
  console.log('✅ GitHub\'a push yapıldı\n');
} catch (error) {
  console.error('❌ Git push hatası:', error.message);
  process.exit(1);
}

console.log('🎉 Tüm işlemler tamamlandı!');
console.log('📱 Netlify otomatik olarak yeniden deploy edecek...');
console.log('⏱️  Deploy süresi: ~2-3 dakika');
