import { Trophy, Medal, Award, Crown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import RankingSearch from "@/components/ranking-search"
import { getStaticData } from "@/lib/static-data"

interface RankingUser {
  id: number
  username: string
  profile_picture_url: string | null
  rank: number
  created_at: string
  updated_at: string
}

export default async function SiralamaPage() {
  const staticData = getStaticData()
  const rankingData: RankingUser[] = staticData?.rankings || []

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <Trophy className="h-8 w-8 text-primary" />
              <h1 className="text-xl md:text-2xl font-bold text-foreground">takipcileridovusturuyorum</h1>
            </Link>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              {rankingData.length} Takipçi
            </Badge>
          </div>
        </div>
      </header>

      {/* Page Title */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Takipçi Sıralaması</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              En güncel takipçi sıralaması! Kim zirvede, kim yükseliyor?
            </p>
          </div>

          {/* Top 3 Podium */}
          {rankingData.length >= 3 && (
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-foreground mb-6 text-center">İlk 3 Sıralama</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {/* 2nd Place */}
                <Card className="order-1 md:order-1 border-gray-400/50 bg-gradient-to-br from-gray-50/5 to-gray-100/5">
                  <CardContent className="pt-6 text-center">
                    <div className="relative mb-4">
                      <img
                        src={
                          rankingData[1]?.username
                            ? `https://pub-63c4f2af186d48f184dea3dfce00ba35.r2.dev/${rankingData[1].username}.jpg`
                            : "/placeholder.svg?height=80&width=80"
                        }
                        alt={rankingData[1]?.username}
                        className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-gray-400"
                      />
                      <div className="absolute -top-2 -right-2">
                        <Medal className="h-8 w-8 text-gray-400" />
                      </div>
                    </div>
                    <h4 className="font-bold text-lg text-foreground mb-2">{rankingData[1]?.username}</h4>
                    <Badge className="bg-gradient-to-r from-gray-400 to-gray-500 text-white">2. Sıra</Badge>
                  </CardContent>
                </Card>

                {/* 1st Place */}
                <Card className="order-2 md:order-2 border-yellow-500/50 bg-gradient-to-br from-yellow-50/10 to-yellow-100/10 transform md:scale-110">
                  <CardContent className="pt-6 text-center">
                    <div className="relative mb-4">
                      <img
                        src={
                          rankingData[0]?.username
                            ? `https://pub-63c4f2af186d48f184dea3dfce00ba35.r2.dev/${rankingData[0].username}.jpg`
                            : "/placeholder.svg?height=90&width=90"
                        }
                        alt={rankingData[0]?.username}
                        className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-yellow-500"
                      />
                      <div className="absolute -top-3 -right-3">
                        <Crown className="h-10 w-10 text-yellow-500" />
                      </div>
                    </div>
                    <h4 className="font-bold text-xl text-foreground mb-2">{rankingData[0]?.username}</h4>
                    <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-lg px-4 py-1">
                      👑 Şampiyon
                    </Badge>
                  </CardContent>
                </Card>

                {/* 3rd Place */}
                <Card className="order-3 md:order-3 border-amber-600/50 bg-gradient-to-br from-amber-50/5 to-amber-100/5">
                  <CardContent className="pt-6 text-center">
                    <div className="relative mb-4">
                      <img
                        src={
                          rankingData[2]?.username
                            ? `https://pub-63c4f2af186d48f184dea3dfce00ba35.r2.dev/${rankingData[2].username}.jpg`
                            : "/placeholder.svg?height=80&width=80"
                        }
                        alt={rankingData[2]?.username}
                        className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-amber-600"
                      />
                      <div className="absolute -top-2 -right-2">
                        <Award className="h-8 w-8 text-amber-600" />
                      </div>
                    </div>
                    <h4 className="font-bold text-lg text-foreground mb-2">{rankingData[2]?.username}</h4>
                    <Badge className="bg-gradient-to-r from-amber-600 to-amber-700 text-white">3. Sıra</Badge>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Trophy className="h-6 w-6 text-primary" />
                Tam Sıralama
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RankingSearch rankings={rankingData} />
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
