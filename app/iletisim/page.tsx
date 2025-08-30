import { Trophy, Instagram, Mail } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import HamburgerMenu from "@/components/hamburger-menu"

export const metadata = {
  title: "İletişim - Takipçilerimi Dövüştürüyorum",
  description: "Bizimle iletişime geçin. Instagram hesabımızı takip edin veya e-posta gönderin.",
}

export default function ContactPage() {
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
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">İletişim</h2>
            <p className="text-lg text-muted-foreground">
              Bizimle iletişime geçmek için aşağıdaki yolları kullanabilirsiniz
            </p>
          </div>

          <div className="space-y-6">
            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Instagram className="h-5 w-5 text-primary" />
                  Instagram
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  En hızlı iletişim yolu Instagram hesabımızdır. Mesajlarınızı buradan gönderebilirsiniz.
                </p>
                <Link
                  href="https://www.instagram.com/takipcileridovusturuyorum"
                  target="_blank"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                  @takipcileridovusturuyorum
                </Link>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  E-posta
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Detaylı sorularınız için e-posta gönderebilirsiniz.</p>
                <Link
                  href="mailto:wtfpiletisim@gmail.com"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  wtfpiletisim@gmail.com
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              Mesajlarınızı mümkün olan en kısa sürede yanıtlamaya çalışıyoruz. Sabırlı olduğunuz için teşekkür ederiz!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
