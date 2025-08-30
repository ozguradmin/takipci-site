import { Trophy, Instagram, Users, Search, Video, BarChart3 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import HamburgerMenu from "@/components/hamburger-menu"

export const metadata = {
  title: "Nasıl Çalışır - Takipçilerimi Dövüştürüyorum",
  description: "Takipçi dövüştürme sistemi nasıl çalışır? Adım adım açıklama ve sıralama sistemi hakkında bilgi alın.",
}

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <HamburgerMenu />
              <Trophy className="h-8 w-8 text-primary" />
              <h1 className="text-xl md:text-2xl font-bold text-foreground">takipcileridovusturuyorum</h1>
            </div>
            <Link
              href="https://www.instagram.com/takipcileridovusturuyorum"
              target="_blank"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Instagram className="h-5 w-5" />
              <span className="hidden sm:inline">Instagram</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Nasıl Çalışır?</h2>
            <p className="text-lg text-muted-foreground">Takipçi dövüştürme sistemi adım adım nasıl işliyor</p>
          </div>

          <div className="space-y-8">
            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  1. Takipçi Katılımı
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Instagram'da beni takip eden 25 bin takipçim var. Onları bu eğlenceli yarışmaya dahil ediyorum.
                  Takipçilerim Instagram'da beni takip ettiklerinde otomatik olarak oyuna dahil oluyorlar.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5 text-primary" />
                  2. Video Paylaşımı
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Genellikle gece saatlerinde yeni video paylaşıyorum. Her video, takipçilerimin yeni bir "dövüş" turunu
                  temsil ediyor. Günde 1-2 video paylaşıyorum ve her video için yeni sıralama oluşturuluyor.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  3. Veri Yükleme
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Her video paylaştıktan sonra, o videonun sıralama verilerini bu web sitesine yüklüyorum. Bu veriler
                  takipçilerimin o videodaki performansını ve sıralamasını gösteriyor.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-primary" />
                  4. Sıralama Kontrolü
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Video paylaştıktan sonra takipçilerim bu web sitesine gelip kendi kullanıcı adlarını aratıyor.
                  Binlerce, hatta on binlerce kişi aynı anda siteye girip sıralamasını kontrol ediyor. Bu da çok heyecan
                  verici bir deneyim yaratıyor!
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  5. Sonuçlar ve Rekabet
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Her video için farklı bir sıralama oluşuyor. Takipçilerim kendi sıralarını görebiliyor ve diğer
                  takipçilerle rekabet edebiliyor. Bu sistem hem eğlenceli hem de etkileşimi artırıyor.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <div className="bg-muted/50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">Önemli Not</h3>
              <p className="text-muted-foreground leading-relaxed">
                Bu sistem tamamen eğlence amaçlıdır. "Dövüştürme" kelimesi mecazi anlamda kullanılmaktadır ve hiçbir
                şekilde şiddet içermez. Amacımız takipçilerimizle eğlenceli vakit geçirmek ve sosyal medya etkileşimini
                artırmaktır.
              </p>
            </div>

            <Link
              href="/siralama"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Trophy className="h-5 w-5" />
              Sıralamanı Kontrol Et
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
