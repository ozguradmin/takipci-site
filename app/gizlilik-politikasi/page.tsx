import { Trophy, Instagram, Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import HamburgerMenu from "@/components/hamburger-menu"

export const metadata = {
  title: "Gizlilik Politikası - Takipçilerimi Dövüştürüyorum",
  description: "takipcileridovusturuyorum.com olarak gizliliğinize nasıl saygı duyduğumuz ve verilerinizi nasıl koruduğumuz hakkında detaylı bilgi edinin.",
}

export default function PrivacyPolicyPage() {
  const lastUpdated = "19 Eylül 2025"

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <HamburgerMenu />
              <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <Trophy className="h-8 w-8 text-primary" />
                <h1 className="text-xl md:text-2xl font-bold text-foreground">takipcileridovusturuyorum</h1>
              </Link>
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
            <p className="text-lg text-muted-foreground">
              Son Güncelleme: {lastUpdated}
            </p>
          </div>

          <div className="space-y-8">
            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Giriş
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Bu gizlilik politikası, <strong>takipcileridovusturuyorum.com</strong> ("Site", "biz", "bize" veya "bizim") olarak, sitemizi ziyaret ettiğinizde veya hizmetlerimizi kullandığınızda kişisel bilgilerinizi nasıl topladığımızı, kullandığımızı, koruduğumuzu ve ifşa ettiğimizi açıklamaktadır. Gizliliğiniz bizim için son derece önemlidir ve verilerinizi korumayı taahhüt ediyoruz.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle>Topladığımız Bilgiler</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Hizmetlerimizi sunmak ve geliştirmek için çeşitli türde bilgiler topluyoruz:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>
                    <strong>Kullanıcı Tarafından Sağlanan Bilgiler:</strong> Sıralama sistemimize katılmak için gönderdiğiniz Instagram kullanıcı adları gibi bilgileri topluyoruz. Bu bilgiler, yalnızca sıralama oluşturma ve gösterme amacıyla kullanılır.
                  </li>
                  <li>
                    <strong>Otomatik Olarak Toplanan Bilgiler:</strong> Sitemizi ziyaret ettiğinizde, IP adresi, tarayıcı türü, işletim sistemi, ziyaret edilen sayfalar ve ziyaret süresi gibi standart web sunucusu günlüklerini ve analitik verileri (Google Analytics aracılığıyla) toplarız. Bu veriler, site trafiğini analiz etmek ve hizmet kalitemizi artırmak için kullanılır.
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle>Çerezler ve Benzeri Teknolojiler</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Web sitemiz, kullanıcı deneyimini iyileştirmek, site performansını analiz etmek ve reklamları kişiselleştirmek amacıyla çerezler kullanır. Çerezler, tarayıcınızda saklanan küçük metin dosyalarıdır. Sitemizi kullanarak çerez kullanımını kabul etmiş olursunuz. Tarayıcınızın ayarlarından çerezleri yönetebilir veya devre dışı bırakabilirsiniz, ancak bu durum sitenin bazı işlevlerinin düzgün çalışmamasına neden olabilir.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle>Google AdSense ve Reklamcılık</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Sitemizde reklam sunmak için üçüncü taraf reklam ağı olan Google AdSense'i kullanıyoruz. Google, ilgi alanlarınıza dayalı reklamlar sunmak için DoubleClick DART çerezi gibi çerezleri kullanabilir. Bu, internetteki diğer sitelere yaptığınız ziyaretlere dayalı olarak reklamların gösterilmesini sağlar. Kullanıcılar, Google Reklam ve İçerik Ağı gizlilik politikasını ziyaret ederek DART çerezinin kullanımını devre dışı bırakabilirler.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle>Veri Güvenliği ve Paylaşımı</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Topladığımız kişisel bilgilerin güvenliğini sağlamak için makul idari, teknik ve fiziksel güvenlik önlemleri alıyoruz. Verileriniz, şifrelenmiş bağlantılar (SSL) üzerinden iletilir ve güvenli sunucularda saklanır. Kişisel olarak tanımlanabilir bilgilerinizi, yasal bir zorunluluk olmadıkça veya hizmetlerimizi sağlamak için gerekli olmadıkça (örneğin, barındırma sağlayıcıları gibi) sizin izniniz olmadan üçüncü taraflarla satmayız, kiralamayız veya paylaşmayız.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle>İletişim</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Bu gizlilik politikası ile ilgili herhangi bir sorunuz veya endişeniz varsa, lütfen bizimle iletişime geçmekten çekinmeyin:
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
                <CardTitle>Politika Değişiklikleri</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Bu gizlilik politikasını zaman zaman güncelleme hakkını saklı tutarız. Politikada önemli değişiklikler yaptığımızda, bu sayfada yeni politikayı yayınlayarak ve "Son Güncelleme" tarihini değiştirerek sizi bilgilendireceğiz. Değişiklikleri takip etmek için bu sayfayı periyodik olarak gözden geçirmenizi öneririz.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
