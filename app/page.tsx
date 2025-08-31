import { Instagram, Play, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

import HamburgerMenu from "@/components/hamburger-menu"
import FallbackImage from "@/components/fallback-image"
import { getStaticData, getAvailableVideoDates } from "@/lib/static-data"

// Simple helper functions
function formatDateForUrl(date: string): string {
  const [year, month, day] = date.split('-');
  return `${day}-${month}-${year}`;
}

function formatDateForDisplay(date: string): string {
  const [year, month, day] = date.split('-');
  return `${day}.${month}.${year}`;
}

export const revalidate = 120 // Revalidate every 2 minutes instead of 5

export const metadata = {
  title: "Takipçi Sıralaması - takipcileridovusturuyorum",
  description: "En güncel takipçi sıralamaları ve video sonuçları. Rekabeti yakından takip edin!",
  keywords: "takipçi, sıralama, instagram, video, yarışma",
  openGraph: {
    title: "Takipçi Sıralaması - takipcileridovusturuyorum",
    description: "En güncel takipçi sıralamaları ve video sonuçları",
    type: "website",
  },
}

export default async function HomePage() {
  // Get available video dates
  const availableDates = getAvailableVideoDates()
  
  // Get latest video data directly from the most recent file
  let latestRankings = []
  let latestDate = null
  
  if (availableDates.length > 0) {
    latestDate = availableDates[0] // Most recent date
    try {
      const latestVideoData = require(`../public/data/rankings-${latestDate}.json`)
      latestRankings = latestVideoData.rankings?.slice(0, 5) || []
    } catch (error) {
      console.error('Latest video data not found:', error)
    }
  }
  
  // Create videos array from available dates with actual data
  const videos = availableDates.map(date => {
    try {
      // Try to get video data from static file
      const videoData = require(`../public/data/rankings-${date}.json`)
      return {
        video_date: date,
        title: videoData.title || `${date} tarihli video`,
        description: videoData.description || 'Video açıklaması',
        thumbnail_url: videoData.thumbnail_url || '/default-thumbnail.png'
      }
    } catch (error) {
      // Fallback if file doesn't exist
      return {
        video_date: date,
        title: `${date} tarihli video`,
        description: 'Video açıklaması',
        thumbnail_url: '/default-thumbnail.png'
      }
    }
  })

  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-background dark:text-foreground">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50 shadow-sm dark:bg-background/80 dark:border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <HamburgerMenu />
              <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <Trophy className="h-8 w-8 text-primary" />
                <h1 className="text-xl md:text-2xl font-bold text-foreground">takipcileridovusturuyorum</h1>
              </Link>
            </div>
            <Link
              href="https://www.instagram.com/takipcileridovusturuyorum"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              <Instagram className="h-5 w-5" />
              <span className="hidden sm:inline">Instagram</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Videolar ve Sıralamalar Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-4xl font-bold text-foreground mb-4">Videolar ve Sıralamalar</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              En güncel videolar ve takipçi sıralamaları burada! Rekabeti yakından takip edin.
            </p>
            <div className="flex flex-col items-center mt-6 animate-bounce">
              <svg className="w-6 h-6 text-primary mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              <span className="text-sm text-muted-foreground font-medium">Aşağı kaydırın</span>
            </div>
          </div>



                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {/* Latest Videos */}
                        <Card className="border-border/50 bg-card/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-card dark:border-border">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-foreground">
                              <Play className="h-5 w-5 text-primary" />
                              Son Videolar
                            </CardTitle>
                          </CardHeader>
              <CardContent className="space-y-4">
                {videos.slice(0, 2).map((video, index) => {
                  const dateUrl = formatDateForUrl(video.video_date)
                  const displayDate = formatDateForDisplay(video.video_date)

                  return (
                    <Link key={video.id} href={`/video/${dateUrl}`} className="block" prefetch={index === 0}>
                      <div className="flex gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors cursor-pointer relative">
                        {index === 0 && (
                          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg z-10">
                            Son Video!
                          </div>
                        )}
                        <div className="w-20 h-14 rounded-md overflow-hidden flex-shrink-0">
                          {video.thumbnail_url ? (
                            <FallbackImage
                              src={video.thumbnail_url}
                              alt={`${displayDate} video thumbnail`}
                              width={80}
                              height={56}
                              className="w-full h-full object-cover"
                              priority={index === 0}
                              loading={index === 0 ? "eager" : "lazy"}
                              sizes="80px"
                              quality={75}
                              fallbackSrc="/default-thumbnail.png"
                            />
                          ) : (
                            <div className="w-full h-full bg-primary/20 flex items-center justify-center">
                              <Play className="h-6 w-6 text-primary" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground mb-1">
                            {video.title || `${displayDate} tarihinde paylaşılan video`}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {video.description || 'Sıralamaları görmek için tıklayın'}
                          </p>
                        </div>
                      </div>
                    </Link>
                  )
                })}

                {videos.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">Henüz video yüklenmemiş</div>
                )}
              </CardContent>
            </Card>

                                    {/* Top Rankings Preview */}
                        <Card className="border-border/50 bg-card/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-card dark:border-border">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-foreground">
                              <Trophy className="h-5 w-5 text-primary" />
                              Son videodaki İlk 5 Sıralama
                            </CardTitle>
                          </CardHeader>
              <CardContent className="space-y-3">
                {latestRankings.slice(0, 5).map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                      {user.rank}
                    </div>
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-border bg-muted flex-shrink-0">
                      <FallbackImage
                        src={user.profile_picture_url || "/profile-picture.png"}
                        alt={user.username}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        sizes="40px"
                        quality={60}
                        fallbackSrc="/profile-picture.png"
                      />
                    </div>
                    <span className="font-medium text-foreground">{user.username}</span>
                  </div>
                ))}

                {latestRankings.length === 0 && (
                  <div className="text-center py-4 text-muted-foreground">Henüz sıralama verisi yok</div>
                )}

                {videos.length > 0 && (
                  <Link href={`/video/${formatDateForUrl(videos[0].video_date)}`} prefetch>
                    <Button variant="outline" className="w-full mt-4 bg-transparent">
                      Kendi sıralamanı ve tüm sıralamayı gör
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          </div>


        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-background/50 backdrop-blur-sm py-8 mt-16 dark:bg-background/50 dark:border-border/50">
        <div className="container mx-auto px-4 text-center">


          <div className="flex items-center justify-center gap-2 mb-4">
            <Trophy className="h-6 w-6 text-primary" />
            <span className="font-bold text-foreground">takipcileridovusturuyorum</span>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-4 text-sm">
            <Link href="/gizlilik-politikasi" className="text-muted-foreground hover:text-foreground transition-colors">
              Gizlilik Politikası
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/kullanim-sartlari" className="text-muted-foreground hover:text-foreground transition-colors">
              Kullanım Şartları
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/hakkimizda" className="text-muted-foreground hover:text-foreground transition-colors">
              Hakkımızda
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/iletisim" className="text-muted-foreground hover:text-foreground transition-colors">
              İletişim
            </Link>
          </div>

          <p className="text-muted-foreground">
            © 2025 Tüm hakları saklıdır. En güncel takipçi sıralaması için bizi takip edin!
          </p>
        </div>
      </footer>
    </div>
  )
}
