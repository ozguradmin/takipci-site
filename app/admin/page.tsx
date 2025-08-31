"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Database, Upload, Calendar, Users, Save } from "lucide-react"
import { toast } from "sonner"

export default function AdminPage() {
  const [videoDate, setVideoDate] = useState("")
  const [rankings, setRankings] = useState("")
  const [loading, setLoading] = useState(false)
  const [existingData, setExistingData] = useState<any[]>([])

  // Mevcut verileri yükle
  useEffect(() => {
    loadExistingData()
  }, [])

  const loadExistingData = async () => {
    try {
      const response = await fetch('/data/rankings.json')
      const data = await response.json()
      setExistingData(data.rankings || [])
    } catch (error) {
      console.error('Veri yükleme hatası:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Veriyi işle
      const rankingsArray = rankings
        .split('\n')
        .filter(line => line.trim())
        .map((line, index) => {
          const [username, rank] = line.split(',').map(s => s.trim())
          return {
            id: index + 1,
            username: username,
            profile_picture_url: null,
            rank: parseInt(rank) || index + 1,
            created_at: videoDate,
            updated_at: new Date().toISOString()
          }
        })

      // JSON dosyasını oluştur
      const data = {
        video_date: videoDate,
        rankings: rankingsArray,
        total_count: rankingsArray.length,
        generated_at: new Date().toISOString()
      }

      // Local storage'a kaydet (geçici)
      localStorage.setItem(`temp-data-${videoDate}`, JSON.stringify(data))
      
      toast.success(`${rankingsArray.length} kayıt hazırlandı!`)
      
      // Formu temizle
      setVideoDate("")
      setRankings("")
      
    } catch (error) {
      toast.error("Hata oluştu!")
    } finally {
      setLoading(false)
    }
  }

  const deployData = async () => {
    setLoading(true)
    
    try {
      // Tüm temp verileri al
      const tempData: any[] = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key?.startsWith('temp-data-')) {
          const data = JSON.parse(localStorage.getItem(key) || '{}')
          tempData.push(data)
        }
      }

      if (tempData.length === 0) {
        toast.error("Deploy edilecek veri yok!")
        return
      }

      // Her veri için JSON dosyası oluştur
      for (const data of tempData) {
        const response = await fetch('/api/save-data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
        
        if (!response.ok) {
          throw new Error('Veri kaydetme hatası')
        }
      }

      // Temp verileri temizle
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key?.startsWith('temp-data-')) {
          localStorage.removeItem(key)
        }
      }

      toast.success("Veriler kaydedildi! Site güncelleniyor...")
      
      // 3 saniye sonra sayfayı yenile
      setTimeout(() => {
        window.location.reload()
      }, 3000)

    } catch (error) {
      toast.error("Deploy hatası!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Panel</h1>
          <p className="text-muted-foreground">Veri ekleme ve yönetim paneli</p>
        </div>

        {/* Veri Ekleme Formu */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Yeni Veri Ekle
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="videoDate">Video Tarihi</Label>
                <Input
                  id="videoDate"
                  type="date"
                  value={videoDate}
                  onChange={(e) => setVideoDate(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="rankings">Sıralamalar</Label>
                <Textarea
                  id="rankings"
                  placeholder="Her satırda: kullanıcı_adı,sıra&#10;Örnek:&#10;john_doe,1&#10;jane_smith,2&#10;mike_wilson,3"
                  value={rankings}
                  onChange={(e) => setRankings(e.target.value)}
                  rows={10}
                  required
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Her satırda kullanıcı adı ve sırasını virgülle ayırın
                </p>
              </div>
              
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "İşleniyor..." : "Veriyi Hazırla"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Deploy Butonu */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Save className="h-5 w-5" />
              Deploy Et
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Hazırlanan verileri siteye yükleyin. Bu işlem 2-3 dakika sürebilir.
            </p>
            <Button 
              onClick={deployData} 
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {loading ? "Deploy Ediliyor..." : "Siteye Deploy Et"}
            </Button>
          </CardContent>
        </Card>

        {/* Mevcut Veriler */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Mevcut Veriler
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {existingData.slice(0, 10).map((user, index) => (
                <div key={index} className="flex items-center gap-3 p-2 bg-muted/50 rounded">
                  <Badge variant="outline">{user.rank}</Badge>
                  <span className="font-medium">{user.username}</span>
                </div>
              ))}
              {existingData.length > 10 && (
                <p className="text-sm text-muted-foreground text-center">
                  ... ve {existingData.length - 10} kayıt daha
                </p>
              )}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
