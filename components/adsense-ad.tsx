"use client"

import type React from "react"

import { useEffect } from "react"

interface AdSenseAdProps {
  adSlot: string
  adFormat?: string
  fullWidthResponsive?: boolean
  style?: React.CSSProperties
  className?: string
}

export default function AdSenseAd({
  adSlot,
  adFormat = "auto",
  fullWidthResponsive = true,
  style = { display: "block" },
  className = "",
}: AdSenseAdProps) {
  // Development ortamında AdSense'i devre dışı bırak
  const isDevelopment = process.env.NODE_ENV === "development"

  useEffect(() => {
    if (isDevelopment) return // Development'da AdSense çalıştırma
    
    try {
      // @ts-ignore
      if (typeof window !== "undefined" && window.adsbygoogle) {
        // @ts-ignore
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      }
    } catch (error) {
      console.error("AdSense error:", error)
    }
  }, [isDevelopment])

  // Development ortamında placeholder göster
  if (isDevelopment) {
    return (
      <div className={`adsense-placeholder ${className}`} style={{...style, backgroundColor: '#f0f0f0', border: '2px dashed #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', fontSize: '14px'}}>
        AdSense Placeholder
      </div>
    )
  }

  return (
    <div className={`adsense-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-6995096219329553"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  )
}
