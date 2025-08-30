import Link from "next/link"

export function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <img
              src="https://instagram.fdiy2-1.fna.fbcdn.net/v/t51.2885-19/526027825_17847098409534320_7497183794950261517_n.jpg?stp=dst-jpg_s320x320_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.fdiy2-1.fna.fbcdn.net&_nc_cat=108&_nc_oc=Q6cZ2QGbgVwhWSY8szlcxNRLSHREjsuCdvkWwyFmphuRpF1aNr6PdRALUc9qr_A6klXxo0E&_nc_ohc=OQuX7s-PGg0Q7kNvwE1PLg4&_nc_gid=voKq3HfdYdmP21zdLQ4B_Q&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfWVue5wINEKidUE3oS0oypH0Ts3eQ1P0gMUXz5Zlr0kKg&oe=68AAA3DF&_nc_sid=8b3546"
              alt="Logo"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-xl font-bold">Takipçi Sıralaması</span>
          </Link>
          <nav className="flex items-center space-x-4">
            <Link href="/siralama" className="text-sm font-medium hover:underline">
              Sıralama
            </Link>
            <Link href="/admin" className="text-sm font-medium hover:underline">
              Admin
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
