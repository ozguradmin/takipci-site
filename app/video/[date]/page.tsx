import { RankingSearch } from "@/components/ranking-search"
import { Trophy, Calendar, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getStaticDataForDate, formatDateForDisplay, getAvailableVideoDates } from "@/lib/static-data"
import { notFound } from "next/navigation"

// Generate static params for all available video dates
export async function generateStaticParams() {
  const availableDates = getAvailableVideoDates()
  
  return availableDates.map((date) => {
    const [year, month, day] = date.split('-')
    return {
      date: `${day}-${month}-${year}` // DD-MM-YYYY format
    }
  })
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

interface VideoRankingPageProps {
  params: {
    date: string
  }
}

export default async function VideoRankingPage({ params }: VideoRankingPageProps) {
  const date = params.date
  const [day, month, year] = date.split("-")
  const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
  const displayDate = formatDateForDisplay(formattedDate)

  // Get static data for this date
  const staticData = getStaticDataForDate(formattedDate)
  
  if (!staticData) {
    notFound()
  }

  const { video, rankings } = staticData

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
              {video?.title || `${displayDate} Video Sıralaması`}
            </h2>
          </div>
          {video?.description && <p className="text-muted-foreground max-w-2xl mx-auto">{video.description}</p>}
        </div>

        {/* Rankings */}
        <RankingSearch rankings={rankings} videoDate={formattedDate} />
      </div>
    </div>
  )
}
