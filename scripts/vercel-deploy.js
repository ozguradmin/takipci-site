#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('🚀 Vercel deployment başlatılıyor...');

try {
  // 1. Static data oluştur
  console.log('📊 Static data oluşturuluyor...');
  execSync('npm run generate-data', { stdio: 'inherit' });

  // 2. Build yap
  console.log('🔨 Build yapılıyor...');
  execSync('npm run build', { stdio: 'inherit' });

  // 3. Vercel CLI ile deploy et
  console.log('🌐 Vercel\'e deploy ediliyor...');
  execSync('npx vercel --prod', { stdio: 'inherit' });

  console.log('🎉 Vercel deployment tamamlandı!');
  
} catch (error) {
  console.error('❌ Deployment hatası:', error.message);
  process.exit(1);
}
