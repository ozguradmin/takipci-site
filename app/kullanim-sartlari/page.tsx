import { Trophy, Instagram, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import HamburgerMenu from "@/components/hamburger-menu"

export const metadata = {
  title: "Kullanım Şartları - Takipçilerimi Dövüştürüyorum",
  description: "Web sitemizin kullanım şartları ve kuralları hakkında bilgi alın.",
}

export default function TermsOfServicePage() {
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
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Kullanım Şartları</h2>
            <p className="text-lg text-muted-foreground">Web sitemizi kullanırken uymanız gereken kurallar</p>
          </div>

          <div className="space-y-8">
            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Genel Şartlar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Bu web sitesini kullanarak aşağıdaki şartları kabul etmiş sayılırsınız:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Web sitesi sadece eğlence amaçlı kullanılmalıdır</li>
                  <li>Sıralama sistemi tamamen eğlence içindir, ciddi bir yarışma değildir</li>
                  <li>Site içeriği telif hakkı ile korunmaktadır</li>
                  <li>Kullanıcılar sitede uygunsuz davranışlarda bulunamaz</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle>Kullanıcı Sorumlulukları</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Web sitesini kullanırken aşağıdaki kurallara uymalısınız:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Gerçek Instagram kullanıcı adınızı kullanın</li>
                  <li>Sistemi kötüye kullanmaya çalışmayın</li>
                  <li>Diğer kullanıcılara saygılı davranın</li>
                  <li>Spam veya otomatik araçlar kullanmayın</li>
                  <li>Site güvenliğini tehlikeye atacak eylemlerden kaçının</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle>Hizmet Kullanılabilirliği</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Web sitemizi mümkün olduğunca kesintisiz hizmet vermeye çalışıyoruz, ancak:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
                  <li>Teknik bakım nedeniyle geçici kesintiler olabilir</li>
                  <li>Yoğun trafik nedeniyle yavaşlama yaşanabilir</li>
                  <li>Hizmet kalitesi garanti edilmez</li>
                  <li>Önceden haber vermeksizin değişiklik yapabiliriz</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle>Fikri Mülkiyet</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Web sitesindeki tüm içerik, tasarım ve kodlar telif hakkı ile korunmaktadır. İzin alınmadan
                  kopyalanamaz, çoğaltılamaz veya dağıtılamaz. "takipcileridovusturuyorum" markası ve logosu tescilli
                  markadır.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle>Sorumluluk Reddi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Bu web sitesi "olduğu gibi" sunulmaktadır. Site sahipleri aşağıdaki konularda sorumluluk kabul etmez:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
                  <li>Sıralama verilerinin doğruluğu</li>
                  <li>Hizmet kesintilerinden kaynaklanan zararlar</li>
                  <li>Üçüncü taraf bağlantılardan kaynaklanan sorunlar</li>
                  <li>Kullanıcılar arası anlaşmazlıklar</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle>Değişiklikler</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Bu kullanım şartları herhangi bir zamanda değiştirilebilir. Önemli değişiklikler web sitesinde
                  duyurulacaktır. Değişikliklerden sonra siteyi kullanmaya devam etmeniz, yeni şartları kabul ettiğiniz
                  anlamına gelir.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle>İletişim</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Kullanım şartları hakkında sorularınız varsa bizimle iletişime geçebilirsiniz:
                </p>
                <div className="mt-4 space-y-2">
                  <div>
                    <strong className="text-foreground">E-posta:</strong>{" "}
                    <Link
                      href="mailto:wtfpiletisim@gmail.com"
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      wtfpiletisim@gmail.com
                    </Link>
                  </div>
                  <div>
                    <strong className="text-foreground">Instagram:</strong>{" "}
                    <Link
                      href="https://www.instagram.com/takipcileridovusturuyorum"
                      target="_blank"
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      @takipcileridovusturuyorum
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center mt-8">
              <p className="text-sm text-muted-foreground">Son güncelleme: Ocak 2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
