#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Manuel deployment başlatılıyor...');

try {
  // 1. Static data oluştur
  console.log('📊 Static data oluşturuluyor...');
  execSync('npm run generate-data', { stdio: 'inherit' });

  // 2. Build yap
  console.log('🔨 Build yapılıyor...');
  execSync('npm run build', { stdio: 'inherit' });

  // 3. Zip oluştur
  console.log('📦 Zip dosyası oluşturuluyor...');
  execSync('powershell -Command "Compress-Archive -Path \'dist\\*\' -DestinationPath \'takipci-site.zip\' -Force"', { stdio: 'inherit' });

  console.log('✅ Manuel deployment hazır!');
  console.log('');
  console.log('📋 Şimdi yapman gerekenler:');
  console.log('1. https://netlify.com adresine git');
  console.log('2. "Sign up" ile hesap oluştur');
  console.log('3. "Add new site" → "Deploy manually"');
  console.log('4. "takipci-site.zip" dosyasını sürükle bırak');
  console.log('5. Site otomatik deploy olacak!');
  console.log('');
  console.log('🌐 Site URL\'i: https://[random-name].netlify.app');
  console.log('📁 Zip dosyası: takipci-site.zip');
  
} catch (error) {
  console.error('❌ Deployment hatası:', error.message);
  process.exit(1);
}
