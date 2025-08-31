"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { getOptimizedQuality, getOptimizedSizes } from "@/lib/image-utils"

interface LazyImageProps {
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
  onError?: (e: any) => void
}

export default function LazyImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  loading = "lazy",
  sizes,
  quality,
  fallbackSrc,
  onError,
}: LazyImageProps) {
  const [isVisible, setIsVisible] = useState(priority)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (priority || isVisible) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: "50px", // 50px önceden yükle
        threshold: 0.1,
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [priority, isVisible])

  const handleError = (e: any) => {
    setHasError(true)
    if (onError) onError(e)
  }

  const optimizedQuality = quality || getOptimizedQuality(Math.max(width, height))
  const optimizedSizes = sizes || getOptimizedSizes(width)

  return (
    <div ref={imgRef} className={className}>
      {isVisible ? (
        <Image
          src={hasError && fallbackSrc ? fallbackSrc : src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-full object-cover"
          priority={priority}
          loading={loading}
          sizes={optimizedSizes}
          quality={optimizedQuality}
          onError={handleError}
        />
      ) : (
        <div 
          className="w-full h-full bg-muted animate-pulse flex items-center justify-center"
          style={{ width, height }}
        >
          <div className="w-6 h-6 bg-muted-foreground/20 rounded" />
        </div>
      )}
    </div>
  )
}
