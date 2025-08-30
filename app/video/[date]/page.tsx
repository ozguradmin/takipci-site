import { notFound } from "next/navigation"
import { executeQuery } from "@/lib/turso/server"
import { RankingSearch } from "@/components/ranking-search"
import { Trophy, Calendar, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

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

async function getVideoByDate(date: string): Promise<Video | null> {
  // Convert date format from DD-MM-YYYY to YYYY-MM-DD for database query
  const [day, month, year] = date.split("-")
  const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`

  console.log("[v0] Looking for video with date:", formattedDate)
  console.log("[v0] Original date param:", date)

  try {
    const result = await executeQuery(
      "SELECT created_at as video_date, title, description, thumbnail_url FROM videos WHERE created_at = ? LIMIT 1",
      [formattedDate],
    )

    console.log("[v0] Query result:", result.rows)

    if (!result.rows || result.rows.length === 0) {
      console.log("[v0] No video found for date:", formattedDate)
      return null
    }

    const data = result.rows[0] as any
    return {
      video_date: data.video_date,
      title: data.title,
      description: data.description,
      thumbnail_url: data.thumbnail_url,
    }
  } catch (error) {
    console.error("[v0] Error getting video by date:", error)
    return null
  }
}

async function getVideoRankings(videoDate: string): Promise<VideoRanking[]> {
  console.log("[v0] Getting rankings for date:", videoDate)

  try {
    const result = await executeQuery(
      "SELECT id, username, profile_picture_url, rank FROM rankings WHERE created_at = ? ORDER BY rank ASC",
      [videoDate],
    )

    console.log("[v0] Rankings data:", result.rows)
    return (result.rows || []) as VideoRanking[]
  } catch (error) {
    console.error("[v0] Error getting video rankings:", error)
    return []
  }
}

export default async function VideoRankingPage({
  params,
}: {
  params: { date: string }
}) {
  const video = await getVideoByDate(params.date)

  if (!video) {
    notFound()
  }

  const [day, month, year] = params.date.split("-")
  const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
  const rankings = await getVideoRankings(formattedDate)

  // Format date for display
  const displayDate = params.date.replace(/-/g, ".")

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
