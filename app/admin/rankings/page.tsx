"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getVideos } from "@/lib/video-actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Database, Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { VideoDataManager } from "@/components/video-data-manager"

export default function AdminDataPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [videos, setVideos] = useState([])

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem("adminLoggedIn")
    console.log("[v0] Checking admin auth in rankings:", adminLoggedIn)

    if (adminLoggedIn === "true") {
      setIsAuthenticated(true)
      // Load videos after auth check
      getVideos().then(setVideos).catch(console.error)
    } else {
      console.log("[v0] Not authenticated, redirecting to login")
      router.push("/admin/login")
    }
    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-8 w-8 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/admin"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="hidden sm:inline">Geri</span>
              </Link>
              <Shield className="h-8 w-8 text-primary" />
              <h1 className="text-xl md:text-2xl font-bold text-foreground">Yüklenilen Veriler</h1>
            </div>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              {videos.length} Video
            </Badge>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Video Verilerini Yönet</h2>
            <p className="text-lg text-muted-foreground">
              Yüklenilen video verilerini görüntüleyin, düzenleyin ve silin
            </p>
          </div>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Database className="h-6 w-6 text-primary" />
                  Video Verileri
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <VideoDataManager videos={videos} />
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
