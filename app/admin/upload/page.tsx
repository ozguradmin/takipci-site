"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, ArrowLeft, Upload } from "lucide-react"
import Link from "next/link"
import DataUploadForm from "@/components/data-upload-form"

export default function AdminUploadPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem("adminLoggedIn")
    console.log("[v0] Checking admin auth in upload:", adminLoggedIn)

    if (adminLoggedIn === "true") {
      setIsAuthenticated(true)
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
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Geri</span>
            </Link>
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-xl md:text-2xl font-bold text-foreground">Veri Yükleme</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">JSON Veri Yükleme</h2>
            <p className="text-lg text-muted-foreground">
              Sıralama verilerini toplu olarak güncellemek için JSON dosyası yükleyin
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Form */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Upload className="h-6 w-6 text-primary" />
                  Dosya Yükle
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DataUploadForm />
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground">JSON Format Örneği</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">JSON dosyanız aşağıdaki formatta olmalıdır:</p>
                <pre className="bg-muted/50 p-4 rounded-lg text-sm overflow-x-auto">
                  <code className="text-foreground">
                    {`[
  {
    "username": "kullanici1",
    "profile_picture_url": "https://example.com/avatar1.jpg",
    "rank": 1
  },
  {
    "username": "kullanici2",
    "profile_picture_url": "https://example.com/avatar2.jpg",
    "rank": 2
  },
  {
    "username": "kullanici3",
    "rank": 3
  }
]`}
                  </code>
                </pre>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <h4 className="font-semibold text-foreground">Önemli Notlar:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>
                      <code className="bg-muted px-1 rounded">username</code> zorunludur
                    </li>
                    <li>
                      <code className="bg-muted px-1 rounded">rank</code> zorunludur ve 1'den büyük olmalıdır
                    </li>
                    <li>
                      <code className="bg-muted px-1 rounded">profile_picture_url</code> isteğe bağlıdır
                    </li>
                    <li>Kullanıcı adları ve sıralamalar tekrarlanamaz</li>
                    <li>Maksimum dosya boyutu: 5MB</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
