import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/turso/server"

function getProfilePictureUrl(username: string, existingUrl?: string | null): string {
  if (existingUrl) return existingUrl
  return `https://pub-63c4f2af186d48f184dea3dfce00ba35.r2.dev/${username}.jpg`
}

function convertDateFormat(dateStr: string): string {
  // Convert DD-MM-YYYY to YYYY-MM-DD
  if (dateStr && dateStr.includes("-") && dateStr.length === 10) {
    const parts = dateStr.split("-")
    if (parts.length === 3 && parts[0].length === 2) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`
    }
  }
  return dateStr
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    let { username, videoDate } = body

    console.log("[v0] Search API called with raw body:", body)
    console.log("[v0] Original date param:", videoDate)

    if (!username || username.trim().length === 0) {
      console.log("[v0] Missing required parameters:", {
        username: !!username && username.trim().length > 0,
      })
      return NextResponse.json({ error: "Username is required" }, { status: 400 })
    }

    username = username.trim().replace(/^@/, "")
    console.log("[v0] Cleaned username:", username)

    let targetVideoDate = videoDate

    // Convert date format from DD-MM-YYYY to YYYY-MM-DD if needed
    if (targetVideoDate) {
      targetVideoDate = convertDateFormat(targetVideoDate)
      console.log("[v0] Converted date format:", targetVideoDate)
    }

    if (!targetVideoDate || targetVideoDate.trim().length === 0) {
      const latestResult = await executeQuery(
        "SELECT created_at as video_date FROM rankings ORDER BY created_at DESC LIMIT 1",
      )

      if (!latestResult.rows || latestResult.rows.length === 0) {
        console.error("[v0] No video data found")
        return NextResponse.json({ error: "No video data found" }, { status: 404 })
      }

      targetVideoDate = (latestResult.rows[0] as any).video_date
    }

    // Check all video dates in database for debugging
    const allDatesResult = await executeQuery("SELECT created_at as video_date FROM rankings ORDER BY created_at DESC")
    console.log("[v0] All video_dates in database:", allDatesResult.rows)

    console.log("[v0] Executing search query with params:", {
      table: "rankings",
      videoDate: targetVideoDate,
      usernamePattern: `%${username.trim()}%`,
    })

    const result = await executeQuery(
      "SELECT * FROM rankings WHERE created_at = ? AND username LIKE ? ORDER BY rank ASC LIMIT 200",
      [targetVideoDate, `%${username.trim()}%`],
    )

    console.log("[v0] Search query completed:", {
      dataCount: result.rows?.length,
      firstResult: result.rows?.[0]
        ? { username: (result.rows[0] as any).username, rank: (result.rows[0] as any).rank }
        : null,
    })

    // Add profile picture URLs to search results
    const usersWithProfilePictures = (result.rows || []).map((user: any) => ({
      ...user,
      profile_picture_url: getProfilePictureUrl(user.username, user.profile_picture_url),
    }))

    console.log("[v0] Returning search results:", { count: usersWithProfilePictures.length })
    return NextResponse.json({ users: usersWithProfilePictures })
  } catch (error) {
    console.error("[v0] Search API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
