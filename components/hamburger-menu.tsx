"use client"

import { useState } from "react"
import { Menu, Home, Trophy, Shield, FileText, Info, Mail, HelpCircle, Settings } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false)

  const menuItems = [
    { href: "/", label: "Ana Sayfa", icon: Home },
    { href: "/siralama", label: "Son videodaki sıralamanı gör", icon: Trophy },
    { href: "/admin", label: "Admin Panel", icon: Settings },
    { href: "/hakkimizda", label: "Hakkımızda", icon: Info },
    { href: "/iletisim", label: "İletişim", icon: Mail },
    { href: "/nasil-calisir", label: "Nasıl Çalışır", icon: HelpCircle },
    { href: "/gizlilik-politikasi", label: "Gizlilik Politikası", icon: Shield },
    { href: "/kullanim-sartlari", label: "Kullanım Şartları", icon: FileText },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Menüyü aç</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle className="text-left">Menü</SheetTitle>
        </SheetHeader>
        <nav className="mt-6">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-foreground hover:bg-muted transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
