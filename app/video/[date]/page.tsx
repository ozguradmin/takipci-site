"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { RankingSearch } from "@/components/ranking-search"
import { Trophy, Calendar, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export async function generateStaticParams() {
  return [
    { date: '30-08-2025' },
    { date: '29-08-2025' },
    { date: '28-08-2025' },
    { date: '27-08-2025' },
    { date: '26-08-2025' }
  ]
}

interface VideoRanking {
  id: number
  username: string
  profile_picture_url: string | null
  rank: number
}

interface Video {
  video_date: string
  title: string | null
  description: string | null
  thumbnail_url: string | null
}

export default function VideoRankingPage() {
  const params = useParams()
  const [rankings, setRankings] = useState<VideoRanking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const date = params.date as string
  const [day, month, year] = date.split("-")
  const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
  const displayDate = date.replace(/-/g, ".")

  useEffect(() => {
    async function fetchRankings() {
      try {
        const response = await fetch(`/api/rankings?date=${date}`)
        const data = await response.json()
        
        if (data.success && data.data.length > 0) {
          setRankings(data.data[0].rankings)
        } else {
          setError("Bu tarih için veri bulunamadı")
        }
      } catch (err) {
        setError("Veri yükleme hatası")
      } finally {
        setLoading(false)
      }
    }

    fetchRankings()
  }, [date])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Veriler yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">{error}</p>
          <Link href="/">
            <Button>Ana Sayfaya Dön</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Ana Sayfa
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <Trophy className="h-6 w-6 text-primary" />
              <h1 className="text-lg md:text-xl font-bold text-foreground">{displayDate} Video Sıralaması</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Video Info */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              {video.title || `${displayDate} Video Sıralaması`}
            </h2>
          </div>
          {video.description && <p className="text-muted-foreground max-w-2xl mx-auto">{video.description}</p>}
        </div>

        {/* Rankings */}
        <RankingSearch rankings={rankings} videoDate={formattedDate} />
      </div>
    </div>
  )
}
