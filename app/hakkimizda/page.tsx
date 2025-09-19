import { Trophy, Instagram, Users, Video } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import HamburgerMenu from "@/components/hamburger-menu"

export const metadata = {
  title: "Hakkımızda - Takipçilerimi Dövüştürüyorum",
  description:
    "takipcileridovusturuyorum.com projesinin hikayesini, misyonunu ve arkasındaki ekibi tanıyın. Instagram'daki en eğlenceli yarışmanın perde arkası.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-background dark:text-foreground">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50 shadow-sm dark:bg-background/80 dark:border-border/50">
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
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Hakkımızda</h2>
            <p className="text-lg text-muted-foreground">
              Bir Fikirden Topluluğa: Takipçi Dövüştürme Serisinin Hikayesi
            </p>
          </div>

          <Card className="border-border/50 bg-card/80 backdrop-blur-sm shadow-lg mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Users className="h-6 w-6 text-primary" />
                Misyonumuz
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed text-lg">
                <strong>takipcileridovusturuyorum.com</strong> olarak misyonumuz, sosyal medya etkileşimini sıradanlıktan çıkarıp, takipçiler için eğlenceli, rekabetçi ve bağ kurabilecekleri bir platforma dönüştürmektir. Amacımız, her gün binlerce insanın heyecanla sonuçları beklediği, kendi sıralamasını gördüğü ve bu rekabetin bir parçası olmaktan keyif aldığı bir topluluk oluşturmaktır.
              </p>
            </CardContent>
          </Card>

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
                  Her şey, 35.000'den fazla takipçiye sahip Instagram hesabımızda basit bir fikirle başladı: "Takipçilerle nasıl daha eğlenceli bir etkileşim kurabiliriz?" Bu sorunun cevabı, onları tatlı bir rekabete sokan video serisi oldu. Her video, takipçiler arasında kimin daha üstün olduğunu belirleyen (tamamen eğlence amaçlı) bir "dövüş" içeriyordu. Bu fikir, beklenenden çok daha fazla ilgi gördü.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5 text-primary" />
                  Sistem Nasıl Çalışıyor?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Her gün 1-2 yeni video ile Instagram'da rekabeti başlatıyoruz. Videonun yayınlanmasının hemen ardından, sonuçları ve güncel sıralamaları bu web sitesine yüklüyoruz. Takipçilerimiz siteye gelerek kullanıcı adlarını aratabilir ve genel sıralamadaki yerlerini anında görebilirler. Bu şeffaf ve hızlı sistem, heyecanı her zaman taze tutuyor.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border/50 bg-card/50 mb-8">
            <CardHeader>
              <CardTitle className="text-center">Projenin Arkasındaki İsim</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground leading-relaxed mb-4">
                Bu projenin kurucusu ve yöneticisi ben, Özgür. Bir sosyal medya meraklısı ve yazılım geliştirici olarak, iki tutkumu bir araya getirerek bu platformu hayata geçirdim. Amacım, hem teknik bilgimi kullanarak faydalı bir araç oluşturmak hem de Instagram topluluğuma benzersiz bir deneyim sunmaktı.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Her gün on binlerce kişinin siteyi ziyaret edip sıralamasını kontrol etmesi, bu projenin ne kadar sevildiğini gösteriyor ve beni daha da motive ediyor.
              </p>
            </CardContent>
          </Card>

          <div className="text-center">
            <Link
              href="/iletisim"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Bize Ulaşın
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
