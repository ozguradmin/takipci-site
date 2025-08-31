"use client"

import { useState, useMemo, useEffect } from "react"
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trophy, Medal, Award, Crown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { getOptimizedQuality, getOptimizedSizes } from "@/lib/image-utils"

interface RankingUser {
  id: number
  username: string
  profile_picture_url: string | null
  rank: number
  created_at: string
  updated_at: string
}

interface RankingSearchProps {
  rankings: RankingUser[]
  videoDate: string
}

async function searchUserInStaticData(username: string, videoDate: string) {
  try {
    console.log("[v0] Starting static search with:", { searchTerm: username, videoDate })
    
    // Static JSON dosyasından arama yap
    const response = await fetch(`/data/rankings-${videoDate}.json`)
    
    if (!response.ok) {
      console.log("[v0] Static file not found, falling back to local search")
      return { users: [] }
    }
    
    const data = await response.json()
    const rankings = data.rankings || []
    
    // Kullanıcı adına göre filtrele
    const filteredUsers = rankings.filter((user: any) => 
      user.username.toLowerCase().includes(username.toLowerCase())
    )
    
    console.log("[v0] Static search result:", { userCount: filteredUsers.length })
    return { users: filteredUsers }
    
  } catch (error) {
    console.error("Static search error:", error)
    return { users: [] }
  }
}

function RankingSearch({ rankings, videoDate }: RankingSearchProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [searchResults, setSearchResults] = useState<RankingUser[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const itemsPerPage = 100

  useEffect(() => {
    const searchInStaticData = async () => {
      if (searchTerm.trim().length > 0) {
        console.log("[v0] Starting static search with:", { searchTerm: searchTerm.trim(), videoDate })
        setIsSearching(true)
        const result = await searchUserInStaticData(searchTerm.trim(), videoDate)
        setSearchResults(result.users || [])
        setIsSearching(false)
      } else {
        setSearchResults([])
      }
    }

    const timeoutId = setTimeout(searchInStaticData, 300) // Debounce search
    return () => clearTimeout(timeoutId)
  }, [searchTerm, videoDate])

  const filteredRankings = useMemo(() => {
    if (!searchTerm.trim()) return rankings

    // Use static search results if available
    if (searchResults.length > 0) {
      return searchResults
    }

    // Fallback to local search
    return rankings.filter((user) => user.username.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [rankings, searchTerm, searchResults])

  const totalPages = Math.ceil(filteredRankings.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedRankings = filteredRankings.slice(startIndex, endIndex)

  useMemo(() => {
    setCurrentPage(1)
  }, [searchTerm])

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return <Trophy className="h-5 w-5 text-primary" />
    }
  }

  const getRankBadgeColor = (rank: number) => {
    if (rank <= 3) return "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white"
    if (rank <= 10) return "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
    if (rank <= 25) return "bg-gradient-to-r from-green-500 to-green-600 text-white"
    return "bg-muted text-muted-foreground"
  }

  const clearSearch = () => {
    setSearchTerm("")
    setSearchResults([])
    setCurrentPage(1)
  }

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Kullanıcı adı ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-10 bg-card/50 border-border/50 focus:border-primary/50 transition-colors"
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted/50"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Search Results Info and Pagination Info */}
      <div className="text-center space-y-2">
        {searchTerm && (
          <p className="text-sm text-muted-foreground">
            {isSearching ? (
              "Aranıyor..."
            ) : (
              <>
                <span className="font-medium text-foreground">{filteredRankings.length}</span> sonuç bulundu
                {searchTerm && (
                  <>
                    {" "}
                    "<span className="font-medium text-primary">{searchTerm}</span>" için
                  </>
                )}
              </>
            )}
          </p>
        )}
        {!searchTerm && filteredRankings.length > itemsPerPage && (
          <p className="text-sm text-muted-foreground">
            {startIndex + 1}-{Math.min(endIndex, filteredRankings.length)} / {filteredRankings.length} sıralama
            gösteriliyor
          </p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="min-w-0"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Önceki</span>
          </Button>

          <div className="flex items-center gap-1 flex-wrap">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum
              if (totalPages <= 5) {
                pageNum = i + 1
              } else if (currentPage <= 3) {
                pageNum = i + 1
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i
              } else {
                pageNum = currentPage - 2 + i
              }

              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(pageNum)}
                  className="w-10 min-w-0"
                >
                  {pageNum}
                </Button>
              )
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="min-w-0"
          >
            <span className="hidden sm:inline">Sonraki</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Rankings List */}
      <div className="space-y-3">
        {paginatedRankings.map((user) => (
          <div
            key={user.id}
            className={`flex items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-lg transition-all duration-200 hover:scale-[1.02] ${
              user.rank <= 3
                ? "bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20"
                : "bg-muted/50 hover:bg-muted/70"
            }`}
          >
            {/* Rank */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div
                className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full font-bold text-sm sm:text-lg ${getRankBadgeColor(user.rank)}`}
              >
                {user.rank}
              </div>
              <div className="hidden sm:block">{getRankIcon(user.rank)}</div>
            </div>

            {/* Profile Picture */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-border bg-muted flex-shrink-0">
              <Image
                src={
                  user.username
                    ? `https://pub-63c4f2af186d48f184dea3dfce00ba35.r2.dev/${user.username}.jpg`
                    : "/placeholder.svg?height=60&width=60"
                }
                alt={user.username}
                width={56}
                height={56}
                className="w-full h-full object-cover"
                quality={getOptimizedQuality(56)}
                loading="lazy"
                sizes={getOptimizedSizes(56)}
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg?height=60&width=60"
                }}
              />
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-base sm:text-lg text-foreground truncate">
                {searchTerm ? (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: user.username.replace(
                        new RegExp(`(${searchTerm})`, "gi"),
                        '<mark class="bg-primary/20 text-primary px-1 rounded">$1</mark>',
                      ),
                    }}
                  />
                ) : (
                  user.username
                )}
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground">Sıralama: {user.rank}. sıra</p>
            </div>

            {/* Rank Badge */}
            <Badge variant={user.rank <= 10 ? "default" : "secondary"} className="text-xs sm:text-sm flex-shrink-0">
              #{user.rank}
            </Badge>
          </div>
        ))}

        {/* No Results */}
        {filteredRankings.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Sonuç Bulunamadı</h3>
            <div className="text-muted-foreground mb-6 space-y-2 max-w-md mx-auto">
              <p>
                "<span className="font-medium text-primary">{searchTerm}</span>" için hiçbir kullanıcı bulunamadı.
              </p>
              <div className="text-sm space-y-1 bg-muted/30 p-4 rounded-lg">
                <p className="font-medium text-foreground">Lütfen kontrol edin:</p>
                <ul className="text-left space-y-1">
                  <li>• Kullanıcı adını tam olarak doğru yazdığınızdan emin olun</li>
                  <li>
                    • Instagram'dan <span className="font-medium text-primary">@takipcileridovusturuyorum</span>{" "}
                    hesabımızı takip ettiğinizden emin olun
                  </li>
                  <li>• Yeni takip ettiyseniz, bir sonraki videoda sıralamada görüneceksiniz</li>
                </ul>
              </div>
            </div>
            <Button variant="outline" onClick={clearSearch} className="bg-transparent">
              Aramayı Temizle
            </Button>
          </div>
        )}

        {/* Empty State */}
        {rankings.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Henüz Sıralama Yok</h3>
            <p className="text-muted-foreground">Sıralama verileri yüklendiğinde burada görünecek.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export { RankingSearch }
export default RankingSearch
