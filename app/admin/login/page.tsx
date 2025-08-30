import { getAdminSession } from "@/lib/admin-auth"
import { redirect } from "next/navigation"
import AdminLoginForm from "@/components/admin-login-form"

export default async function AdminLoginPage() {
  // Check if admin is already logged in
  const session = await getAdminSession()

  if (session) {
    redirect("/admin")
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <AdminLoginForm />
    </div>
  )
}
