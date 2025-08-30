"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, LogOut, Users, Database, Upload, Settings } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const adminSession = localStorage.getItem("admin-session")
    console.log("[v0] Checking admin auth status:", adminSession)

    if (adminSession === "true") {
      setIsAuthenticated(true)
    } else {
      console.log("[v0] Not authenticated, redirecting to login")
      router.push("/admin/login")
    }
    setLoading(false)
  }, [])

  const handleLogout = () => {
    console.log("[v0] Admin logout")
    localStorage.removeItem("admin-session")
    router.push("/admin/login")
  }

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
              <Shield className="h-8 w-8 text-primary" />
              <h1 className="text-xl md:text-2xl font-bold text-foreground">Admin Paneli</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Hoş geldin, <span className="font-medium text-foreground">ozguradmin</span>
              </span>
              <Button onClick={handleLogout} variant="outline" size="sm" className="bg-transparent">
                <LogOut className="h-4 w-4 mr-2" />
                Çıkış
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Yönetim Paneli</h2>
            <p className="text-lg text-muted-foreground">Takipçi sıralamasını yönetin ve verileri güncelleyin</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Ranking Management */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Users className="h-5 w-5 text-primary" />
                  Yüklenilen Veriler
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Video verilerini görüntüleyin, düzenleyin ve silin</p>
                <Link href="/admin/rankings">
                  <Button className="w-full">Verileri Yönet</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Data Upload */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Upload className="h-5 w-5 text-primary" />
                  Veri Yükleme
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  JSON dosyası yükleyerek video sıralama verilerini toplu olarak güncelleyin
                </p>
                <Link href="/admin/upload">
                  <Button className="w-full">Veri Yükle</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Database Management */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Database className="h-5 w-5 text-primary" />
                  Veritabanı
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Veritabanı durumunu görüntüleyin ve yedekleme işlemleri yapın
                </p>
                <Button className="w-full bg-transparent" variant="outline" disabled>
                  Yakında
                </Button>
              </CardContent>
            </Card>

            {/* Settings */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Settings className="h-5 w-5 text-primary" />
                  Ayarlar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Admin şifresini değiştirin ve sistem ayarlarını yönetin</p>
                <Link href="/admin/settings">
                  <Button className="w-full">Ayarları Aç</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
