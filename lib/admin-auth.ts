"use server"

import { validateAdminCredentials, getAdminUsername } from "@/lib/admin-config"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function adminSignIn(prevState: any, formData: FormData) {
  console.log("[v0] Admin sign in attempt started")

  // Check if formData is valid
  if (!formData) {
    console.log("[v0] Form data is missing")
    return { error: "Form data is missing" }
  }

  const username = formData.get("username")
  const password = formData.get("password")

  console.log("[v0] Received credentials:", {
    username: username?.toString(),
    passwordLength: password?.toString().length,
  })

  // Validate required fields
  if (!username || !password) {
    console.log("[v0] Missing username or password")
    return { error: "Kullanıcı adı ve şifre gereklidir" }
  }

  try {
    const isValidCredentials = validateAdminCredentials(username.toString(), password.toString())
    console.log("[v0] Credential validation result:", isValidCredentials)

    if (!isValidCredentials) {
      console.log("[v0] Invalid credentials provided")
      return { error: "Geçersiz kullanıcı adı veya şifre" }
    }

    // Set admin session cookie
    const cookieStore = await cookies()
    const sessionData = {
      username: getAdminUsername(),
      loginTime: Date.now(),
    }

    console.log("[v0] Setting admin session cookie:", sessionData)

    cookieStore.set("admin_session", JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    })

    console.log("[v0] Admin login successful, redirecting...")
  } catch (error) {
    console.error("[v0] Admin login error:", error)
    return { error: "Bir hata oluştu. Lütfen tekrar deneyin." }
  }

  redirect("/admin")
}

export async function changeAdminPassword(prevState: any, formData: FormData) {
  return { error: "Şifre değiştirme özelliği artık kullanılamıyor. Sabit şifre sistemi kullanılıyor." }
}

export async function adminSignOut() {
  const cookieStore = await cookies()
  cookieStore.delete("admin_session")
  redirect("/admin/login")
}

export async function getAdminSession() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("admin_session")

  if (!sessionCookie) {
    return null
  }

  try {
    const session = JSON.parse(sessionCookie.value)

    // Check if session is expired (24 hours)
    if (Date.now() - session.loginTime > 24 * 60 * 60 * 1000) {
      cookieStore.delete("admin_session")
      return null
    }

    return session
  } catch {
    cookieStore.delete("admin_session")
    return null
  }
}

export async function requireAdminAuth() {
  const session = await getAdminSession()
  if (!session) {
    redirect("/admin/login")
  }
  return session
}
