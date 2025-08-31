# Takipçi Sıralama Sitesi

Instagram takipçi sıralamalarını gösteren modern web sitesi.

## 🚀 Özellikler

- 📊 Günlük takipçi sıralamaları
- 🎥 Video bazlı sıralamalar
- 📱 Responsive tasarım
- 🔍 Kullanıcı arama
- 📈 Admin paneli
- 🎯 SEO optimizasyonu

## 🛠️ Teknolojiler

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **Database**: Turso (SQLite)
- **Hosting**: GitHub Pages
- **Deployment**: GitHub Actions

## 📦 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build
npm run build

# GitHub Pages'e deploy
npm run deploy
```

## 🔧 Environment Variables

```env
TURSO_DATABASE_URL=your_database_url
TURSO_AUTH_TOKEN=your_auth_token
```

## 📊 Veri Yönetimi

```bash
# Static data oluştur
npm run generate-data

# Günlük veri güncelleme
npm run daily-upload
```

## 🌐 Deployment

Site GitHub Pages üzerinde otomatik olarak deploy edilir:

1. `main` branch'e push yapıldığında
2. GitHub Actions workflow çalışır
3. Static data oluşturulur
4. Build yapılır
5. GitHub Pages'e deploy edilir

## 📱 Kullanım

- Ana sayfa: Güncel sıralamalar
- `/video/[tarih]`: Belirli tarihli video sıralamaları
- `/admin`: Admin paneli
- `/siralama`: Genel sıralama listesi

## 🔒 Güvenlik

- Admin paneli şifre korumalı
- Environment variables güvenli
- HTTPS zorunlu

## 📈 Performans

- Static export ile hızlı yükleme
- CDN desteği
- Image optimization
- SEO optimizasyonu

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun
3. Commit yapın
4. Push yapın
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altındadır.
