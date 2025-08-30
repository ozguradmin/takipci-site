"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Lock, CheckCircle } from "lucide-react"
function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Şifre değiştiriliyor...
        </>
      ) : (
        <>
          <Lock className="mr-2 h-4 w-4" />
          Şifreyi Değiştir
        </>
      )}
    </Button>
  )
}

export function PasswordChangeForm() {
  const [state, setState] = useState({ error: "", success: false })
  const [pending, setPending] = useState(false)
  
  const handleSubmit = async (formData: FormData) => {
    setPending(true)
    setState({ error: "", success: false })
    
    try {
      const currentPassword = formData.get("currentPassword") as string
      const newPassword = formData.get("newPassword") as string
      const confirmPassword = formData.get("confirmPassword") as string
      
      if (newPassword !== confirmPassword) {
        setState({ error: "Yeni şifreler eşleşmiyor", success: false })
        return
      }
      
      if (newPassword.length < 6) {
        setState({ error: "Şifre en az 6 karakter olmalıdır", success: false })
        return
      }
      
      // Simulate password change
      setState({ error: "", success: true })
    } catch (error) {
      setState({ error: "Şifre güncellenirken bir hata oluştu", success: false })
    } finally {
      setPending(false)
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {state?.error && (
        <div className="bg-destructive/10 border border-destructive/50 text-destructive px-4 py-3 rounded-lg text-sm">
          {state.error}
        </div>
      )}

      {state?.success && (
        <div className="bg-green-500/10 border border-green-500/50 text-green-600 px-4 py-3 rounded-lg text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Şifreniz başarıyla değiştirildi!
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="currentPassword">Mevcut Şifre</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="currentPassword"
              name="currentPassword"
              type="password"
              placeholder="Mevcut şifrenizi girin"
              required
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="newPassword">Yeni Şifre</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              placeholder="Yeni şifrenizi girin"
              required
              minLength={6}
              className="pl-10"
            />
          </div>
          <p className="text-xs text-muted-foreground">Şifre en az 6 karakter olmalıdır</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Yeni Şifre (Tekrar)</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Yeni şifrenizi tekrar girin"
              required
              minLength={6}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <SubmitButton pending={pending} />
    </form>
  )
}
