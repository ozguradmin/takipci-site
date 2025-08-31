import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

export const metadata: Metadata = {
  title: "Takipçilerimi Dövüştürüyorum - Sıralama Sistemi",
  description: "En iyi takipçi sıralaması ve videolar burada!",
  generator: "v0.app",
  icons: {
    icon: "https://pub-63c4f2af186d48f184dea3dfce00ba35.r2.dev/526027825_17847098409534320_7497183794950261517_n%20(1).jpg",
    shortcut:
      "https://pub-63c4f2af186d48f184dea3dfce00ba35.r2.dev/526027825_17847098409534320_7497183794950261517_n%20(1).jpg",
    apple:
      "https://pub-63c4f2af186d48f184dea3dfce00ba35.r2.dev/526027825_17847098409534320_7497183794950261517_n%20(1).jpg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" className="dark" style={{ colorScheme: 'dark' }}>
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
          `
        }} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

        <meta name="google-adsense-account" content="ca-pub-6995096219329553" />

        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6995096219329553"
          crossOrigin="anonymous"
        ></script>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Takipçilerimi Dövüştürüyorum",
              description:
                "Instagram takipçi sıralaması ve video yarışması platformu. En güncel sıralamalar ve videolar burada!",
              url: "https://takipcileridovusturuyorum.vercel.app",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://takipcileridovusturuyorum.vercel.app/siralama?search={search_term_string}",
                "query-input": "required name=search_term_string",
              },
              publisher: {
                "@type": "Organization",
                name: "takipcileridovusturuyorum",
                logo: {
                  "@type": "ImageObject",
                  url: "https://pub-63c4f2af186d48f184dea3dfce00ba35.r2.dev/526027825_17847098409534320_7497183794950261517_n%20(1).jpg",
                },
                sameAs: ["https://www.instagram.com/takipcileridovusturuyorum"],
              },
              mainEntity: {
                "@type": "WebApplication",
                name: "Takipçi Sıralama Sistemi",
                applicationCategory: "Entertainment",
                operatingSystem: "Web Browser",
                description: "Instagram takipçilerinin video bazlı sıralama sistemi",
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "TRY",
                },
              },
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "takipcileridovusturuyorum",
              url: "https://takipcileridovusturuyorum.vercel.app",
              logo: "https://pub-63c4f2af186d48f184dea3dfce00ba35.r2.dev/526027825_17847098409534320_7497183794950261517_n%20(1).jpg",
              description: "Instagram'da takipçi dövüştürme serisi ve sıralama sistemi",
              foundingDate: "2025",
              contactPoint: {
                "@type": "ContactPoint",
                email: "wtfpiletisim@gmail.com",
                contactType: "Customer Service",
              },
              sameAs: ["https://www.instagram.com/takipcileridovusturuyorum"],
            }),
          }}
        />

        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-TQLNMRDL2L"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-TQLNMRDL2L');

              // Realtime test event
              gtag('event', 'test_active_user', {
                event_category: 'engagement',
                event_label: 'realtime_test',
              });
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
