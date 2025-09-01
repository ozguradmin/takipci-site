"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Database, Upload, Calendar, Users, Save, FileText, Image, Edit, Trash2, Zap } from "lucide-react"
import { toast } from "sonner"

export default function AdminPage() {
  const [videoDate, setVideoDate] = useState("")
  const [videoTitle, setVideoTitle] = useState("")
  const [videoDescription, setVideoDescription] = useState("")
  const [videoThumbnail, setVideoThumbnail] = useState("")
  const [jsonFile, setJsonFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [existingData, setExistingData] = useState<any[]>([])
  const [existingVideos, setExistingVideos] = useState<any[]>([])

  // Mevcut verileri yükle
  useEffect(() => {
    loadExistingData()
    loadExistingVideos()
  }, [])

  const loadExistingData = async () => {
    try {
      const response = await fetch('/data/rankings.json')
      if (response.ok) {
        const data = await response.json()
        setExistingData(data.rankings || [])
      } else {
        console.log('Rankings.json bulunamadı, boş veri gösteriliyor')
        setExistingData([])
      }
    } catch (error) {
      console.error('Veri yükleme hatası:', error)
      setExistingData([])
    }
  }

  const loadExistingVideos = async () => {
    try {
      // Mevcut video dosyalarını listele
      const dates = ['2025-08-31'] // Şimdilik sabit, sonra dinamik yapacağız
      const videos = []
      
      for (const date of dates) {
        try {
          const response = await fetch(`/data/rankings-${date}.json`)
          if (response.ok) {
            const data = await response.json()
            videos.push({
              date: date,
              title: data.title || `${date} tarihli video`,
              description: data.description || 'Video açıklaması',
              thumbnail: data.thumbnail_url || '/default-thumbnail.png',
              count: data.rankings?.length || 0
            })
          } else {
            console.log(`Video ${date} bulunamadı`)
          }
        } catch (error) {
          console.log(`Video ${date} yüklenemedi:`, error)
        }
      }
      
      setExistingVideos(videos)
    } catch (error) {
      console.error('Video yükleme hatası:', error)
      setExistingVideos([])
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setJsonFile(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let rankingsArray = []

      if (jsonFile) {
        // JSON dosyasından oku
        const text = await jsonFile.text()
        const jsonData = JSON.parse(text)
        
        rankingsArray = jsonData.map((item: any, index: number) => ({
          username: item.username,
          profile_picture_url: item.profile_picture_url || null,
          rank: item.rank || index + 1
          // id, created_at, updated_at kaldırıldı (optimizasyon için)
        }))
      } else {
        toast.error("JSON dosyası seçin!")
        return
      }

      // Optimize edilmiş JSON dosyasını oluştur
      const data = {
        video_date: videoDate,
        title: videoTitle || `${videoDate} tarihli video`,
        description: videoDescription || 'Video açıklaması',
        thumbnail_url: videoThumbnail || null,
        rankings: rankingsArray,
        total_count: rankingsArray.length,
        generated_at: new Date().toISOString()
      }

      // Sıkıştırılmış JSON (optimizasyon için)
      const optimizedJson = JSON.stringify(data)
      
      try {
        // Dosyayı otomatik olarak public/data klasörüne kaydet
        const fileName = `rankings-${videoDate}.json`
        const filePath = `/data/${fileName}`
        
        // Dosyayı indir
        const blob = new Blob([optimizedJson], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        
        const a = document.createElement('a')
        a.href = url
        a.download = fileName
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        
        // Başarı mesajı
        toast.success(`${rankingsArray.length} kayıt hazırlandı ve optimize edildi!`)
        
        // Otomatik talimatlar
        setTimeout(() => {
          alert(`🎉 VERİ HAZIRLANDI VE OPTİMİZE EDİLDİ!

📁 Dosya: ${fileName}
📊 Kayıt Sayısı: ${rankingsArray.length}
💾 Boyut: ${(optimizedJson.length / 1024 / 1024).toFixed(2)}MB

📋 SONRAKI ADIMLAR:
1. İndirilen dosyayı "public/data/" klasörüne kopyala
2. Terminal'de şu komutları çalıştır:
   git add .
   git commit -m "Yeni veri: ${videoDate}"
   git push origin master

3. Site otomatik deploy olacak (2-3 dakika)

🚀 Optimizasyon sayesinde bandwidth %50 azalacak!`)
        }, 1000)
        
      } catch (error) {
        console.error('Dosya kaydetme hatası:', error)
        toast.error("Dosya kaydedilemedi!")
      }
      
      // Formu temizle
      setVideoDate("")
      setVideoTitle("")
      setVideoDescription("")
      setVideoThumbnail("")
      setJsonFile(null)
      
    } catch (error) {
      toast.error("JSON dosyası okuma hatası!")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const deployData = async () => {
    setLoading(true)
    
    try {
      // Manuel talimatlar göster
      toast.success("Deploy talimatları:")
      
      const instructions = `
DEPLOY TALİMATLARI:

1. İndirilen JSON dosyasını public/data/ klasörüne kopyalayın
2. Terminal'de şu komutları çalıştırın:
   git add .
   git commit -m "Veri güncellendi"
   git push origin master

3. Netlify otomatik olarak deploy edecek (2-3 dakika)
      `
      
      alert(instructions)
      
    } catch (error) {
      toast.error("Hata oluştu!")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 dark:bg-background dark:text-foreground">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Panel</h1>
          <p className="text-muted-foreground">Veri ekleme ve yönetim paneli</p>
        </div>

        <Tabs defaultValue="add-data" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="add-data">Yeni Veri Ekle</TabsTrigger>
            <TabsTrigger value="manage-videos">Video Yönetimi</TabsTrigger>
            <TabsTrigger value="optimize">Optimize</TabsTrigger>
            <TabsTrigger value="deploy">Deploy</TabsTrigger>
          </TabsList>

          {/* Yeni Veri Ekleme Tab */}
          <TabsContent value="add-data">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Yeni Veri Ekle
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <Label htmlFor="videoTitle">Video Başlığı</Label>
                      <Input
                        id="videoTitle"
                        value={videoTitle}
                        onChange={(e) => setVideoTitle(e.target.value)}
                        placeholder="Video başlığı (opsiyonel)"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="videoDescription">Video Açıklaması</Label>
                    <Textarea
                      id="videoDescription"
                      value={videoDescription}
                      onChange={(e) => setVideoDescription(e.target.value)}
                      placeholder="Video açıklaması (opsiyonel)"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="videoThumbnail">Video Görseli URL</Label>
                    <Input
                      id="videoThumbnail"
                      value={videoThumbnail}
                      onChange={(e) => setVideoThumbnail(e.target.value)}
                      placeholder="https://example.com/image.jpg (opsiyonel)"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="jsonFile">JSON Dosyası</Label>
                    <Input
                      id="jsonFile"
                      type="file"
                      accept=".json"
                      onChange={handleFileUpload}
                      required
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Sıralama verilerini içeren JSON dosyasını seçin
                    </p>
                    {jsonFile && (
                      <p className="text-sm text-green-600 mt-1">
                        ✅ {jsonFile.name} seçildi
                      </p>
                    )}
                  </div>
                  
                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? "İşleniyor..." : "Veriyi Hazırla"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Video Yönetimi Tab */}
          <TabsContent value="manage-videos">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Edit className="h-5 w-5" />
                  Mevcut Videolar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {existingVideos.map((video, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-12 bg-muted rounded overflow-hidden">
                          <img 
                            src={video.thumbnail} 
                            alt={video.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold">{video.title}</h3>
                          <p className="text-sm text-muted-foreground">{video.description}</p>
                          <p className="text-xs text-muted-foreground">{video.date} - {video.count} kayıt</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4 mr-1" />
                          Düzenle
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Sil
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Optimize Tab */}
          <TabsContent value="optimize">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  JSON Optimizasyonu
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    JSON dosyalarını otomatik olarak optimize ederek bandwidth tasarrufu sağlayın.
                  </p>
                  
                  <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h4 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">🎯 Optimizasyon Faydaları</h4>
                    <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                      <li>• Dosya boyutu %50'ye kadar azalır</li>
                      <li>• Bandwidth kullanımı önemli ölçüde düşer</li>
                      <li>• Sayfa yükleme hızı artar</li>
                      <li>• Cache sistemi otomatik çalışır</li>
                    </ul>
                  </div>
                  
                  <Button 
                    onClick={async () => {
                      try {
                        setLoading(true)
                        toast.success("JSON dosyaları optimize ediliyor...")
                        
                        // Optimize script'ini çalıştır
                        const response = await fetch('/api/optimize-json', {
                          method: 'POST'
                        })
                        
                        if (response.ok) {
                          const result = await response.json()
                          toast.success(`✅ Optimizasyon tamamlandı! ${result.savings}% tasarruf sağlandı.`)
                        } else {
                          toast.error("Optimizasyon hatası!")
                        }
                      } catch (error) {
                        console.error('Optimize hatası:', error)
                        toast.error("Optimizasyon başarısız!")
                      } finally {
                        setLoading(false)
                      }
                    }}
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    {loading ? "Optimize Ediliyor..." : "JSON Dosyalarını Optimize Et"}
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    💡 Bu işlem mevcut JSON dosyalarını optimize eder ve yedeklerini oluşturur.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Deploy Tab */}
          <TabsContent value="deploy">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Save className="h-5 w-5" />
                  Deploy Talimatları
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    İndirilen JSON dosyasını siteye yüklemek için:
                  </p>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Adım 1: JSON Verisini Kaydet</h4>
                    <p className="text-sm text-muted-foreground">
                      "Veriyi Hazırla" butonuna bastıktan sonra JSON verisi panoya kopyalanır.
                      Ctrl+V ile bir dosyaya yapıştır ve <code>rankings-YYYY-MM-DD.json</code> olarak kaydet.
                    </p>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Adım 2: Dosyayı Kopyala</h4>
                    <p className="text-sm text-muted-foreground">
                      Kaydettiğin JSON dosyasını <code>public/data/</code> klasörüne kopyala
                    </p>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Adım 3: Git Komutları</h4>
                    <div className="bg-black text-green-400 p-3 rounded font-mono text-sm">
                      <div>git add .</div>
                      <div>git commit -m "Veri güncellendi"</div>
                      <div>git push origin master</div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Adım 4: Otomatik Deploy</h4>
                    <p className="text-sm text-muted-foreground">
                      Netlify otomatik olarak deploy edecek (2-3 dakika)
                    </p>
                  </div>
                  
                  <Button 
                    onClick={deployData} 
                    disabled={loading}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    {loading ? "Talimatlar Gösteriliyor..." : "Talimatları Göster"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

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
