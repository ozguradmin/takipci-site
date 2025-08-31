# 🚀 Deployment Rehberi

GitHub Actions billing sorunu nedeniyle alternatif ücretsiz hosting seçenekleri.

## 🆓 Ücretsiz Hosting Seçenekleri

### 1. **Netlify** (Önerilen) ⭐

**Avantajlar:**
- ✅ Tamamen ücretsiz
- ✅ Unlimited bandwidth
- ✅ Otomatik deployment
- ✅ Custom domain
- ✅ Form handling
- ✅ Build hooks

**Kurulum:**
```bash
# 1. Netlify CLI yükle
npm install -g netlify-cli

# 2. Netlify'da hesap oluştur
# https://netlify.com

# 3. Deploy et
npm run deploy:netlify
```

**Manuel Kurulum:**
1. https://netlify.com → Sign up
2. "New site from Git" → GitHub repository seç
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Environment variables ekle:
   - `TURSO_DATABASE_URL`
   - `TURSO_AUTH_TOKEN`

### 2. **Vercel**

**Avantajlar:**
- ✅ Next.js optimized
- ✅ Otomatik deployment
- ✅ Edge functions
- ⚠️ Edge function limits

**Kurulum:**
```bash
# 1. Vercel CLI yükle
npm install -g vercel

# 2. Deploy et
npm run deploy:vercel
```

**Manuel Kurulum:**
1. https://vercel.com → Sign up
2. "Import Project" → GitHub repository seç
3. Framework: Next.js
4. Environment variables ekle

### 3. **Cloudflare Pages**

**Avantajlar:**
- ✅ Tamamen ücretsiz
- ✅ Unlimited bandwidth
- ✅ Global CDN
- ✅ Build hooks

**Kurulum:**
```bash
# 1. Wrangler CLI yükle
npm install -g wrangler

# 2. Deploy et
npm run deploy:cloudflare
```

**Manuel Kurulum:**
1. https://pages.cloudflare.com → Sign up
2. "Create a project" → GitHub repository seç
3. Build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Environment variables ekle

## 🔄 Günlük Veri Güncellemesi

### Otomatik (Build Hooks)
Her platformda build hook URL'i alıp cron job ile çağırabilirsin:

```bash
# Her gün saat 09:00'da çalıştır
0 9 * * * curl -X POST https://api.netlify.com/build_hooks/YOUR_HOOK_ID
```

### Manuel
```bash
# Hangi platformu kullanıyorsan
npm run deploy:netlify
# veya
npm run deploy:vercel
# veya
npm run deploy:cloudflare
```

## 📊 Performans Karşılaştırması

| Platform | Bandwidth | Build Time | CDN | Custom Domain |
|----------|-----------|------------|-----|---------------|
| Netlify | Unlimited | ~2-3 min | ✅ | ✅ |
| Vercel | 100GB/mo | ~1-2 min | ✅ | ✅ |
| Cloudflare | Unlimited | ~3-4 min | ✅ | ✅ |

## 🎯 Önerilen Seçim

**Netlify** öneriyorum çünkü:
- En kolay kurulum
- En güvenilir
- En iyi dokümantasyon
- En az sorun

## 🔧 Sorun Giderme

### Build Hatası
```bash
# Cache temizle
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Environment Variables
Her platformda aynı değişkenleri ekle:
- `TURSO_DATABASE_URL`
- `TURSO_AUTH_TOKEN`

### Custom Domain
1. Domain satın al
2. DNS ayarlarını platform'a yönlendir
3. SSL otomatik aktif olur
