import { Trophy } from "lucide-react"
import Link from "next/link"
import AdSenseAd from "@/components/adsense-ad"

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/30 py-8">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-6 flex justify-center">
          <AdSenseAd
            adSlot="1122334455"
            adFormat="horizontal"
            className="max-w-2xl w-full"
            style={{ display: "block", textAlign: "center", minHeight: "90px" }}
          />
        </div>

        <div className="flex items-center justify-center gap-2 mb-4">
          <Trophy className="h-6 w-6 text-primary" />
          <span className="font-bold text-foreground">takipcileridovusturuyorum</span>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-4 text-sm">
          <Link href="/gizlilik-politikasi" className="text-muted-foreground hover:text-foreground transition-colors">
            Gizlilik Politikası
          </Link>
          <span className="text-muted-foreground">•</span>
          <Link href="/kullanim-sartlari" className="text-muted-foreground hover:text-foreground transition-colors">
            Kullanım Şartları
          </Link>
          <span className="text-muted-foreground">•</span>
          <Link href="/hakkimizda" className="text-muted-foreground hover:text-foreground transition-colors">
            Hakkımızda
          </Link>
          <span className="text-muted-foreground">•</span>
          <Link href="/iletisim" className="text-muted-foreground hover:text-foreground transition-colors">
            İletişim
          </Link>
        </div>

        <p className="text-muted-foreground">
          © 2025 Tüm hakları saklıdır. En güncel takipçi sıralaması için bizi takip edin!
        </p>
      </div>
    </footer>
  )
}
