import { Trophy, Instagram, Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import HamburgerMenu from "@/components/hamburger-menu"

export const metadata = {
  title: "Gizlilik Politikası - Takipçilerimi Dövüştürüyorum",
  description: "Gizlilik politikamız ve kişisel verilerinizin nasıl korunduğu hakkında bilgi alın.",
}

export default function PrivacyPolicyPage() {
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
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Gizlilik Politikası</h2>
            <p className="text-lg text-muted-foreground">Kişisel verilerinizin korunması bizim için önemlidir</p>
          </div>

          <div className="space-y-8">
            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Toplanan Bilgiler
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Web sitemizde aşağıdaki bilgiler toplanmaktadır:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Instagram kullanıcı adları (sadece sıralama amaçlı)</li>
                  <li>Web sitesi kullanım istatistikleri (Google Analytics)</li>
                  <li>Çerezler (site performansı için)</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle>Bilgilerin Kullanımı</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Toplanan bilgiler aşağıdaki amaçlarla kullanılır:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Takipçi sıralama sisteminin işletilmesi</li>
                  <li>Web sitesi performansının iyileştirilmesi</li>
                  <li>Kullanıcı deneyiminin geliştirilmesi</li>
                  <li>İstatistiksel analiz yapılması</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle>Veri Güvenliği</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Verilerinizin güvenliği için endüstri standardı güvenlik önlemleri alınmaktadır. Tüm veriler
                  şifrelenmiş bağlantılar üzerinden iletilir ve güvenli sunucularda saklanır. Kişisel bilgileriniz
                  hiçbir şekilde üçüncü taraflarla paylaşılmaz.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle>Çerezler</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Web sitemiz, kullanıcı deneyimini iyileştirmek için çerezler kullanır. Bu çerezler site performansını
                  analiz etmek ve size daha iyi hizmet sunmak için kullanılır. Tarayıcınızın ayarlarından çerezleri
                  devre dışı bırakabilirsiniz.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle>Google AdSense</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Web sitemizde Google AdSense reklamları gösterilmektedir. Google, size daha alakalı reklamlar
                  gösterebilmek için çerezler kullanabilir. Google'ın gizlilik politikası hakkında daha fazla bilgi için
                  Google'ın resmi gizlilik politikasını inceleyebilirsiniz.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle>İletişim</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Gizlilik politikamız hakkında sorularınız varsa, bizimle iletişime geçebilirsiniz:
                </p>
                <div className="mt-4">
                  <Link
                    href="mailto:wtfpiletisim@gmail.com"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    wtfpiletisim@gmail.com
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle>Politika Güncellemeleri</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Bu gizlilik politikası zaman zaman güncellenebilir. Önemli değişiklikler olduğunda kullanıcılarımızı
                  bilgilendireceğiz. Son güncelleme tarihi: Ocak 2025
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
