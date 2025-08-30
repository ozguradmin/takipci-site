import { Trophy, Instagram, Users, Video } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import HamburgerMenu from "@/components/hamburger-menu"

export const metadata = {
  title: "Hakkımızda - Takipçilerimi Dövüştürüyorum",
  description:
    "Takipçilerimi dövüştürme serisi hakkında bilgi alın. Instagram'da 25 bin takipçiyle başlayan bu eğlenceli yarışma nasıl çalışır?",
}

export default function AboutPage() {
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
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Hakkımızda</h2>
            <p className="text-lg text-muted-foreground">
              Takipçilerimi dövüştürme serisinin hikayesi ve nasıl çalıştığı
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Nasıl Başladı?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Instagram'da 25 bin takipçim var ve onları eğlenceli bir yarışmaya dahil etme fikri aklıma geldi. Her
                  video paylaştığımda takipçilerimi birbirleriyle "dövüştürüyorum" - tabii ki eğlenceli bir şekilde!
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5 text-primary" />
                  Nasıl Çalışır?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Gece saatlerinde yeni video paylaşıyorum ve takipçilerim web siteye gelip kendi kullanıcı adlarını
                  aratıyor. Bu sayede kim hangi sırada olduğunu görebiliyorlar.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border/50 bg-card/50 mb-8">
            <CardHeader>
              <CardTitle className="text-center">Seri Hakkında</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground leading-relaxed mb-6">
                Bu proje, sosyal medyada etkileşimi artırmak ve takipçilerle daha eğlenceli bir bağ kurmak için başladı.
                Her video sonrası binlerce, hatta on binlerce kişi siteye gelip sıralamasını kontrol ediyor. Bu da hem
                eğlenceli hem de heyecan verici bir deneyim yaratıyor.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Günde 1-2 video paylaşıyorum ve her videonun verilerini bu siteye yüklüyorum. Böylece takipçilerim her
                zaman güncel sıralamalarını görebiliyor.
              </p>
            </CardContent>
          </Card>

          <div className="text-center">
            <Link
              href="https://www.instagram.com/takipcileridovusturuyorum"
              target="_blank"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Instagram className="h-5 w-5" />
              Instagram'da Takip Et
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
