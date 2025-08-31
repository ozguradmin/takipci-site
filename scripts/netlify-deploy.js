#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Netlify deployment başlatılıyor...');

try {
  // 1. Static data oluştur
  console.log('📊 Static data oluşturuluyor...');
  execSync('npm run generate-data', { stdio: 'inherit' });

  // 2. Build yap
  console.log('🔨 Build yapılıyor...');
  execSync('npm run build', { stdio: 'inherit' });

  // 3. Netlify CLI ile deploy et
  console.log('🌐 Netlify\'a deploy ediliyor...');
  execSync('npx netlify deploy --prod --dir=dist', { stdio: 'inherit' });

  console.log('🎉 Netlify deployment tamamlandı!');
  
} catch (error) {
  console.error('❌ Deployment hatası:', error.message);
  process.exit(1);
}
