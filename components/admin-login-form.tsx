"use client"
import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, User, Lock } from "lucide-react"
import { adminSignIn } from "@/lib/admin-auth"

export default function AdminLoginForm() {
  const [state, formAction, pending] = useActionState(adminSignIn, { error: "" })

  return (
    <Card className="w-full max-w-md border-border/50 bg-card/50 backdrop-blur-sm shadow-2xl">
      <CardHeader className="space-y-4 text-center">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <Shield className="h-8 w-8 text-primary" />
        </div>
        <div className="space-y-2">
          <CardTitle className="text-2xl font-bold text-foreground">Yönetici Paneli</CardTitle>
          <p className="text-muted-foreground">Güvenli erişim için kimlik doğrulaması gereklidir</p>
        </div>
      </CardHeader>

      <CardContent>
        <form action={formAction} className="space-y-6">
          {state?.error && (
            <div className="bg-destructive/10 border border-destructive/50 text-destructive px-4 py-3 rounded-lg text-sm">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                {state.error}
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-foreground">
                Yönetici Kullanıcı Adı
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Kullanıcı adınızı girin"
                  required
                  className="pl-10 bg-background/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-foreground">
                Güvenlik Şifresi
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Şifrenizi girin"
                  required
                  className="pl-10 bg-background/50 border-border/50 text-foreground focus:border-primary/50"
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={pending}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg font-medium rounded-lg h-[60px]"
          >
            {pending ? (
              "Giriş yapılıyor..."
            ) : (
              <>
                <Shield className="mr-2 h-4 w-4" />
                Güvenli Giriş
              </>
            )}
          </Button>

          <div className="text-center text-xs text-muted-foreground/60">
            <p>Yetkisiz erişim girişimleri kayıt altına alınmaktadır</p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
