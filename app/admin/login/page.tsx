"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AdminLoginForm from "@/components/admin-login-form"

export default function AdminLoginPage() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if admin is already logged in (client-side)
    const checkSession = () => {
      // Simple session check - you can implement proper session management later
      const isLoggedIn = localStorage.getItem("admin-session") === "true"
      if (isLoggedIn) {
        router.push("/admin")
      } else {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <AdminLoginForm />
    </div>
  )
}
