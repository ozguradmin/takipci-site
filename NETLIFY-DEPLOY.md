# 🚀 Netlify Manuel Deployment

## ✅ Hazır Dosyalar
- ✅ `takipci-site.zip` - Site dosyaları (1.08 MB)
- ✅ Build başarılı
- ✅ Tüm sayfalar hazır

## 📋 Adım Adım Deployment

### 1. Netlify Hesabı Oluştur
1. https://netlify.com adresine git
2. "Sign up" butonuna tıkla
3. GitHub ile giriş yap (önerilen)

### 2. Site Deploy Et
1. Netlify dashboard'da "Add new site" butonuna tıkla
2. "Deploy manually" seçeneğini seç
3. `takipci-site.zip` dosyasını sürükle bırak
4. Deploy otomatik başlayacak

### 3. Site Ayarları
1. Site deploy olduktan sonra "Site settings" → "Site information"
2. Site name'i değiştir (örn: `takipci-siralama`)
3. Custom domain ekle (isteğe bağlı)

### 4. Environment Variables (Önemli!)
1. "Site settings" → "Environment variables"
2. Şu değişkenleri ekle:
   - `TURSO_DATABASE_URL` = `file:./dev.db`
   - `TURSO_AUTH_TOKEN` = `dummy`

### 5. Build Settings
1. "Site settings" → "Build & deploy" → "Build settings"
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Node version: `18`

## 🔄 Günlük Güncelleme

### Otomatik (Build Hook)
1. "Site settings" → "Build & deploy" → "Build hooks"
2. "Add build hook" → "Build hook name": `daily-update`
3. Hook URL'ini kopyala
4. Cron job ile çağır:
```bash
# Her gün saat 09:00'da
0 9 * * * curl -X POST https://api.netlify.com/build_hooks/YOUR_HOOK_ID
```

### Manuel
1. Yeni veri geldiğinde:
```bash
npm run deploy:manual
```
2. Yeni zip dosyasını Netlify'a upload et

## 📊 Site Özellikleri
- ✅ **URL**: `https://[site-name].netlify.app`
- ✅ **HTTPS**: Otomatik aktif
- ✅ **CDN**: Global dağıtım
- ✅ **Bandwidth**: Unlimited
- ✅ **Custom Domain**: Desteklenir

## 🎯 Sonuç
Site tamamen ücretsiz ve sınırsız hosting ile çalışacak!

## 📱 Test
Deploy olduktan sonra:
- Ana sayfa: `https://[site-name].netlify.app`
- Video sayfası: `https://[site-name].netlify.app/video/31-08-2025/`
- Admin paneli: `https://[site-name].netlify.app/admin/`
