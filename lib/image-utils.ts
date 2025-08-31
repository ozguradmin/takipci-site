/**
 * Görsel optimizasyon utility fonksiyonları
 * Bandwidth tasarrufu için agresif optimizasyon
 */

export interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  loading?: "lazy" | "eager"
  sizes?: string
  quality?: number
  fallbackSrc?: string
}

/**
 * Bandwidth tasarrufu için optimize edilmiş görsel kalitesi
 */
export function getOptimizedQuality(size: number): number {
  if (size <= 40) return 30      // Çok küçük görseller
  if (size <= 80) return 40      // Küçük görseller (thumbnail)
  if (size <= 200) return 50     // Orta boyut görseller
  return 60                       // Büyük görseller
}

/**
 * Görsel boyutuna göre optimize edilmiş sizes attribute
 */
export function getOptimizedSizes(width: number): string {
  if (width <= 40) return "40px"
  if (width <= 80) return "80px"
  if (width <= 200) return "200px"
  return "400px"
}

/**
 * Görsel yükleme stratejisi
 */
export function getLoadingStrategy(index: number, total: number): "lazy" | "eager" {
  // İlk 2 görsel eager, geri kalanı lazy
  return index < 2 ? "eager" : "lazy"
}

/**
 * Görsel öncelik stratejisi
 */
export function getPriorityStrategy(index: number, total: number): boolean {
  // Sadece ilk görsel priority
  return index === 0
}

/**
 * Fallback görsel URL'si
 */
export function getFallbackImage(type: 'profile' | 'thumbnail' | 'default'): string {
  switch (type) {
    case 'profile':
      return '/profile-picture.png'
    case 'thumbnail':
      return '/default-thumbnail.png'
    default:
      return '/placeholder.svg'
  }
}

/**
 * Görsel URL'sini optimize et
 */
export function optimizeImageUrl(url: string, width: number, height: number, quality?: number): string {
  if (!url || url.startsWith('/')) return url
  
  // Cloudflare R2 URL'leri için optimizasyon
  if (url.includes('pub-63c4f2af186d48f184dea3dfce00ba35.r2.dev')) {
    const optimizedQuality = quality || getOptimizedQuality(Math.max(width, height))
    // R2'de resize parametreleri
    return `${url}?width=${width}&height=${height}&quality=${optimizedQuality}&format=webp&resize=fill`
  }
  
  return url
}
