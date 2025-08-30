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

export default async function VideoRankingPage({
  params,
}: {
  params: { date: string }
}) {
  const date = params.date
  const [day, month, year] = date.split("-")
  const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
  const displayDate = date.replace(/-/g, ".")

  // Fetch rankings data
  let rankings: VideoRanking[] = []
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://takipcisite.netlify.app'}/api/rankings?date=${date}`, {
      cache: 'no-store'
    })
    const data = await response.json()
    
    if (data.success && data.data.length > 0) {
      rankings = data.data[0].rankings
    }
  } catch (error) {
    console.error('Error fetching rankings:', error)
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
