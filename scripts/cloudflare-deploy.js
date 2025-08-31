#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('🚀 Cloudflare Pages deployment başlatılıyor...');

try {
  // 1. Static data oluştur
  console.log('📊 Static data oluşturuluyor...');
  execSync('npm run generate-data', { stdio: 'inherit' });

  // 2. Build yap
  console.log('🔨 Build yapılıyor...');
  execSync('npm run build', { stdio: 'inherit' });

  // 3. Cloudflare Pages CLI ile deploy et
  console.log('🌐 Cloudflare Pages\'e deploy ediliyor...');
  execSync('npx wrangler pages deploy dist --project-name=takipci-site', { stdio: 'inherit' });

  console.log('🎉 Cloudflare Pages deployment tamamlandı!');
  
} catch (error) {
  console.error('❌ Deployment hatası:', error.message);
  process.exit(1);
}
