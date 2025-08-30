import { type NextRequest, NextResponse } from "next/server"
import { invalidateAllCaches } from "@/lib/video-actions"

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const secret = searchParams.get("secret")

    // Simple secret check (you can use VERCEL_SECRET env var)
    if (secret !== process.env.VERCEL_SECRET) {
      return NextResponse.json({ error: "Invalid secret" }, { status: 401 })
    }

    await invalidateAllCaches()

    return NextResponse.json({
      success: true,
      message: "All caches invalidated",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Cache invalidation error:", error)
    return NextResponse.json({ error: "Failed to invalidate caches" }, { status: 500 })
  }
}
