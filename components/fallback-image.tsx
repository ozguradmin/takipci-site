"use client"

import Image from "next/image"
import { useState } from "react"

interface FallbackImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  loading?: "eager" | "lazy"
  sizes?: string
  quality?: number
  fallbackSrc: string
}

export default function FallbackImage({
  src,
  alt,
  width,
  height,
  className,
  priority,
  loading,
  sizes,
  quality,
  fallbackSrc,
}: FallbackImageProps) {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc)

  const handleError = () => {
    console.log("[v0] Image failed to load:", imgSrc, "falling back to:", fallbackSrc)
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc)
    }
  }

  return (
    <Image
      src={imgSrc || "/default-thumbnail.png"}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      loading={loading}
      sizes={sizes}
      quality={quality}
      onError={handleError}
    />
  )
}
