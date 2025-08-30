"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, ArrowLeft, Key } from "lucide-react"
import Link from "next/link"
import { PasswordChangeForm } from "@/components/password-change-form"

export default function AdminSettingsPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem("adminLoggedIn")
    console.log("[v0] Checking admin auth in settings:", adminLoggedIn)

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

  const session = {
    username: "ozguradmin",
    loginTime: Date.now(),
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Admin Paneli
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-primary" />
              <h1 className="text-lg md:text-xl font-bold text-foreground">Ayarlar</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Account Info */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Shield className="h-5 w-5 text-primary" />
                Hesap Bilgileri
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Kullanıcı Adı</label>
                  <p className="text-foreground font-medium">{session.username}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Son Giriş</label>
                  <p className="text-foreground">
                    {new Date(session.loginTime).toLocaleString("tr-TR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Password Change */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Key className="h-5 w-5 text-primary" />
                Şifre Değiştir
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PasswordChangeForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
