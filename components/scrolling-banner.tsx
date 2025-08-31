"use client"

import { useEffect, useRef } from "react"

export default function ScrollingBanner() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const content = contentRef.current

    if (!wrapper || !content) return

    // Clone ile sonsuzluk
    const clone = content.cloneNode(true)
    wrapper.appendChild(clone)

    // Kaydırma animasyonu
    let scrollSpeed = 1 // piksel/frame
    let animationId: number

    function scrollBanner() {
      if (wrapper.scrollLeft >= content.offsetWidth) {
        wrapper.scrollLeft = 0
      }
      wrapper.scrollLeft += scrollSpeed
      animationId = requestAnimationFrame(scrollBanner)
    }

    scrollBanner()

    // Cleanup
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  return (
    <>
      <div className="top-banner">
        <div className="scrolling-wrapper" ref={wrapperRef}>
          <div className="scrolling-content" ref={contentRef}>
            <span className="scrolling-text">
              <strong>rmygct:</strong> Elbet bi gün biz de kazancaz
            </span>
            <span className="separator">●</span>
            <span className="scrolling-text">
              <strong>yurionlymy:</strong> burdan tüm mardine sevgiler
            </span>
            <span className="separator">●</span>
            <span className="scrolling-text">
              <strong>ozguradmin:</strong> bir bakmışsın yusuf kuyuda zordadır bir bakmışsın yusuf mısıra sultandır
            </span>
            <span className="separator">●</span>
            <span className="scrolling-text">
              <strong>ayca_22:</strong> siteye bayıldım 😍
            </span>
            <span className="separator">●</span>
            <span className="user-message">
              Kendi mesajınızı ekleyin: Instagram'dan @takipcileridovusturuyorum DM atın (ücretli)
            </span>
            <span className="separator">●</span>
            <span className="scrolling-text">
              <strong>rizeli_gariban:</strong> elbet bi gün biz de kazancaz
            </span>
            <span className="separator">●</span>
            <span className="scrolling-text">
              <strong>yakupusta:</strong> gerçekten ama gerçekten saygılar
            </span>
            <span className="separator">●</span>
            <span className="scrolling-text">
              <strong>yusuf39713:</strong> bu özellik ne olm tvlerdeki gibi WGEMŞLEQGNQWEG
            </span>
            <span className="separator">●</span>
            <span className="scrolling-text">
              <strong>tayfunkale3:</strong> Sonuncu olmuşuz aw
            </span>
            <span className="separator">●</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        body {
          font-family: 'Poppins', sans-serif;
          margin: 0;
        }

        .top-banner {
          position: sticky;
          top: 0;
          width: 100%;
          background: #0a0a0a;
          overflow: hidden;
          height: 55px;
          display: flex;
          align-items: center;
          font-size: 14px;
          padding: 0px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.5);
          z-index: 9999;
        }

        .scrolling-wrapper {
          display: flex;
          flex: 1;
          overflow: hidden;
        }

        .scrolling-content {
          display: inline-flex;
          gap: 20px;
          white-space: nowrap;
        }

        .scrolling-text {
          flex-shrink: 0;
          color: #ffffff;
          background: rgba(255,255,255,0.05);
          padding: 4px 10px;
          border-radius: 5px;
        }

        .scrolling-text strong {
          color: #ffcc00;
        }

        .user-message {
          flex-shrink: 0;
          color: #999999;
          background: rgba(255,255,255,0.05);
          padding: 4px 10px;
          border-radius: 5px;
        }

        .separator {
          color: #bbbbbb;
          font-weight: 700;
          font-size: 18px;
          position: relative;
          top: -2px;
          opacity: 0.5;
        }

        @media (max-width: 768px) {
          .top-banner {
            font-size: 13px;
            height: 50px;
            padding: 0 10px;
          }
          .scrolling-content {
            gap: 12px;
          }
        }
      `}</style>
    </>
  )
}
