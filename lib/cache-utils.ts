/**
 * Browser cache utility functions for better bandwidth management
 */

interface CacheItem {
  data: any
  timestamp: number
  expires: number
}

const CACHE_PREFIX = 'takipci_cache_'
const DEFAULT_CACHE_DURATION = 7 * 24 * 60 * 60 * 1000 // 1 week in milliseconds

/**
 * Set data to browser cache (localStorage)
 */
export function setCacheItem(key: string, data: any, duration: number = DEFAULT_CACHE_DURATION): void {
  try {
    const item: CacheItem = {
      data,
      timestamp: Date.now(),
      expires: Date.now() + duration
    }
    
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(item))
  } catch (error) {
    console.warn('Cache set failed:', error)
  }
}

/**
 * Get data from browser cache (localStorage)
 */
export function getCacheItem(key: string): any | null {
  try {
    const cached = localStorage.getItem(CACHE_PREFIX + key)
    if (!cached) return null
    
    const item: CacheItem = JSON.parse(cached)
    
    // Check if expired
    if (Date.now() > item.expires) {
      localStorage.removeItem(CACHE_PREFIX + key)
      return null
    }
    
    return item.data
  } catch (error) {
    console.warn('Cache get failed:', error)
    return null
  }
}

/**
 * Clear expired cache items
 */
export function clearExpiredCache(): void {
  try {
    const keys = Object.keys(localStorage)
    keys.forEach(key => {
      if (key.startsWith(CACHE_PREFIX)) {
        const item = localStorage.getItem(key)
        if (item) {
          try {
            const parsed: CacheItem = JSON.parse(item)
            if (Date.now() > parsed.expires) {
              localStorage.removeItem(key)
            }
          } catch {
            localStorage.removeItem(key) // Remove corrupted items
          }
        }
      }
    })
  } catch (error) {
    console.warn('Cache cleanup failed:', error)
  }
}

/**
 * Get cache size in MB
 */
export function getCacheSize(): number {
  try {
    let totalSize = 0
    const keys = Object.keys(localStorage)
    
    keys.forEach(key => {
      if (key.startsWith(CACHE_PREFIX)) {
        const item = localStorage.getItem(key)
        if (item) {
          totalSize += item.length
        }
      }
    })
    
    return Math.round(totalSize / 1024 / 1024 * 100) / 100 // MB
  } catch {
    return 0
  }
}

/**
 * Clear all cache
 */
export function clearAllCache(): void {
  try {
    const keys = Object.keys(localStorage)
    keys.forEach(key => {
      if (key.startsWith(CACHE_PREFIX)) {
        localStorage.removeItem(key)
      }
    })
  } catch (error) {
    console.warn('Cache clear failed:', error)
  }
}

/**
 * Fetch data with caching
 */
export async function fetchWithCache(
  url: string, 
  cacheKey: string, 
  duration: number = DEFAULT_CACHE_DURATION
): Promise<any> {
  // Check cache first
  const cached = getCacheItem(cacheKey)
  if (cached) {
    console.log(`Cache hit for ${cacheKey}`)
    return cached
  }
  
  try {
    console.log(`Fetching fresh data for ${cacheKey}`)
    const response = await fetch(url)
    const data = await response.json()
    
    // Cache the result
    setCacheItem(cacheKey, data, duration)
    
    return data
  } catch (error) {
    console.error('Fetch failed:', error)
    throw error
  }
}

/**
 * Initialize cache system (cleanup old items)
 */
export function initCache(): void {
  clearExpiredCache()
  console.log(`Cache initialized. Size: ${getCacheSize()}MB`)
}
