#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 GitHub Pages deployment başlatılıyor...');

try {
  // 1. Static data oluştur
  console.log('📊 Static data oluşturuluyor...');
  execSync('npm run generate-data', { stdio: 'inherit' });

  // 2. Build yap
  console.log('🔨 Build yapılıyor...');
  execSync('npm run build', { stdio: 'inherit' });

  // 3. Git status kontrol et
  console.log('📋 Git status kontrol ediliyor...');
  const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
  
  if (gitStatus.trim()) {
    console.log('📝 Değişiklikler commit ediliyor...');
    execSync('git add .', { stdio: 'inherit' });
    execSync('git commit -m "Auto-deploy: Update static data and build"', { stdio: 'inherit' });
  } else {
    console.log('✅ Değişiklik yok, commit atlanıyor...');
  }

  // 4. Push yap
  console.log('⬆️ GitHub\'a push yapılıyor...');
  execSync('git push origin main', { stdio: 'inherit' });

  console.log('🎉 Deployment tamamlandı!');
  console.log('📱 GitHub Pages otomatik olarak güncellenecek...');
  
} catch (error) {
  console.error('❌ Deployment hatası:', error.message);
  process.exit(1);
}
