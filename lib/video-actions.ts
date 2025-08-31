// "use server" // Disabled for static export

import { executeQuery, executeTransaction } from "@/lib/turso/server"
import { revalidatePath, revalidateTag } from "next/cache"
import { unstable_cache } from "next/cache"

export interface VideoData {
  id?: number
  title?: string
  description?: string
  thumbnail_url?: string
  video_url?: string
}

export interface VideoRankingData {
  username: string
  profile_picture_url?: string
  rank: number
}

export async function invalidateAllCaches() {
  // "use server" // Disabled for static export
  
  revalidateTag("videos")
  revalidateTag("rankings")
  revalidateTag("latest")
  revalidateTag("video-data")

  revalidatePath("/")
  revalidatePath("/siralama")
  revalidatePath("/admin")
  revalidatePath("/admin/rankings")
}

function getProfilePictureUrl(username: string, existingUrl?: string | null): string {
  if (existingUrl) return existingUrl
  return `https://pub-63c4f2af186d48f184dea3dfce00ba35.r2.dev/${username}.jpg`
}

const getCachedVideos = unstable_cache(
  async () => {
    try {
      const result = await executeQuery(`
        SELECT DISTINCT 
          v.created_at as video_date,
          v.title as video_title,
          v.description as video_description,
          v.thumbnail_url as video_thumbnail_url
        FROM videos v 
        WHERE v.created_at IS NOT NULL 
        ORDER BY v.created_at DESC
      `)

      return (result.rows || []).map((video: any) => ({
        id: video.video_date,
        video_date: video.video_date,
        title: video.video_title || `Video - ${video.video_date}`,
        description: video.video_description || `${video.video_date} tarihli video sıralaması`,
        thumbnail_url: video.video_thumbnail_url,
        created_at: video.video_date,
      }))
    } catch (error) {
      console.error("Error in getCachedVideos:", error)
      return []
    }
  },
  ["videos-static"],
  {
    revalidate: 120,
    tags: ["videos"],
  },
)

export async function getVideosStatic() {
  return getCachedVideos()
}

const getCachedLatestRankings = unstable_cache(
  async () => {
    try {
      const result = await executeQuery(`
        SELECT * FROM rankings 
        ORDER BY created_at DESC, rank ASC 
        LIMIT 5
      `)

      return (result.rows || []).map((ranking: any) => ({
        ...ranking,
        profile_picture_url: getProfilePictureUrl(ranking.username, ranking.profile_picture_url),
      }))
    } catch (error) {
      console.error("Error getting latest video rankings:", error)
      return []
    }
  },
  ["latest-rankings"],
  {
    revalidate: 90,
    tags: ["rankings", "latest"],
  },
)

export async function getLatestVideoRankingsStatic() {
  return getCachedLatestRankings()
}

export async function getVideos() {
  try {
    const result = await executeQuery(`
      SELECT DISTINCT 
        v.created_at as video_date,
        v.title as video_title,
        v.description as video_description,
        v.thumbnail_url as video_thumbnail_url
      FROM videos v 
      WHERE v.created_at IS NOT NULL 
      ORDER BY v.created_at DESC
    `)

    return (result.rows || []).map((video: any) => ({
      id: video.video_date,
      video_date: video.video_date,
      title: video.video_title || `Video - ${video.video_date}`,
      description: video.video_description || `${video.video_date} tarihli video sıralaması`,
      thumbnail_url: video.video_thumbnail_url,
      created_at: video.video_date,
    }))
  } catch (error) {
    console.error("Error in getVideos:", error)
    return []
  }
}

const getCachedVideoRankings = unstable_cache(
  async (videoDate?: string) => {
    try {
      let query = "SELECT * FROM rankings ORDER BY rank ASC"
      let params: any[] = []

      if (videoDate) {
        query = "SELECT * FROM rankings WHERE created_at = ? ORDER BY rank ASC"
        params = [videoDate]
      }

      const result = await executeQuery(query, params)

      return (result.rows || []).map((ranking: any) => ({
        ...ranking,
        profile_picture_url: getProfilePictureUrl(ranking.username, ranking.profile_picture_url),
      }))
    } catch (error) {
      console.error("Error in getCachedVideoRankings:", error)
      return []
    }
  },
  ["video-rankings"],
  {
    revalidate: 120,
    tags: ["rankings", "video-data"],
  },
)

export async function getVideoRankings(videoDate?: string) {
  if (!videoDate) {
    return getCachedVideoRankings()
  }

  try {
    const result = await executeQuery("SELECT * FROM rankings WHERE created_at = ? ORDER BY rank ASC", [videoDate])

    return (result.rows || []).map((ranking: any) => ({
      ...ranking,
      profile_picture_url: getProfilePictureUrl(ranking.username, ranking.profile_picture_url),
    }))
  } catch (error) {
    console.error("Error in getVideoRankings:", error)
    return []
  }
}

export async function searchUserRankings(username: string) {
  try {
    const result = await executeQuery(
      "SELECT * FROM rankings WHERE username LIKE ? ORDER BY created_at DESC, rank ASC",
      [`%${username}%`],
    )

    return (result.rows || []).map((ranking: any) => ({
      ...ranking,
      profile_picture_url: getProfilePictureUrl(ranking.username, ranking.profile_picture_url),
    }))
  } catch (error) {
    console.error("Error in searchUserRankings:", error)
    return []
  }
}

export async function createVideoWithRankings(videoData: VideoData, rankings: VideoRankingData[], videoDate: string) {
  try {
    const queries = []

    queries.push({
      sql: "INSERT OR IGNORE INTO videos (title, description, thumbnail_url, created_at) VALUES (?, ?, ?, ?)",
      args: [videoData.title, videoData.description, videoData.thumbnail_url, videoDate],
    })

    queries.push({
      sql: "DELETE FROM rankings WHERE created_at = ?",
      args: [videoDate],
    })

    for (const ranking of rankings) {
      queries.push({
        sql: "INSERT INTO rankings (username, profile_picture_url, rank, created_at) VALUES (?, ?, ?, ?)",
        args: [ranking.username, ranking.profile_picture_url, ranking.rank, videoDate],
      })
    }

    await executeTransaction(queries)
    await invalidateAllCaches()

    return { success: true }
  } catch (error) {
    console.error("Error creating video with rankings:", error)
    return { success: false, error: "Failed to create video with rankings" }
  }
}

export async function deleteVideo(videoDate: string) {
  try {
    await executeTransaction([
      { sql: "DELETE FROM rankings WHERE created_at = ?", args: [videoDate] },
      { sql: "DELETE FROM videos WHERE created_at = ?", args: [videoDate] },
    ])

    await invalidateAllCaches()
    return { success: true }
  } catch (error) {
    console.error("Error deleting video:", error)
    return { success: false, error: "Failed to delete video" }
  }
}

export async function getLatestVideo() {
  try {
    const result = await executeQuery(`
      SELECT created_at as video_date, title, description, thumbnail_url 
      FROM videos 
      ORDER BY created_at DESC 
      LIMIT 1
    `)

    if (result.rows && result.rows.length > 0) {
      const data = result.rows[0] as any
      return {
        video_date: data.video_date,
        title: data.title,
        description: data.description,
        thumbnail_url: data.thumbnail_url,
      }
    }
    return null
  } catch (error) {
    console.error("Error getting latest video:", error)
    return null
  }
}

export async function getLatestVideoRankings() {
  try {
    const latestVideo = await getLatestVideo()
    if (!latestVideo) return []

    return await getVideoRankings(latestVideo.video_date)
  } catch (error) {
    console.error("Error getting latest video rankings:", error)
    return []
  }
}

export async function updateVideoMetadata(
  videoDate: string,
  metadata: { title: string; description: string; thumbnail_url: string },
) {
  try {
    const result = await executeQuery(
      "UPDATE videos SET title = ?, description = ?, thumbnail_url = ? WHERE created_at = ?",
      [metadata.title, metadata.description, metadata.thumbnail_url, videoDate],
    )

    await invalidateAllCaches()
    return { success: true, data: result }
  } catch (error) {
    console.error("Error updating video metadata:", error)
    return { success: false, error: "Failed to update video metadata" }
  }
}

export async function getTopRankingsForVideo(videoDate: string, limit = 5) {
  try {
    // Güvenli sayı interpolasyonu
    const safe = Number.isFinite(limit) ? Math.max(1, Math.min(500, Number(limit))) : 5
    const result = await executeQuery(
      `SELECT username, profile_picture_url, rank 
       FROM rankings 
       WHERE created_at = ? 
       ORDER BY rank ASC 
       LIMIT ${safe}`,
      [videoDate],
    )

    return (result.rows || []).map((ranking: any) => ({
      ...ranking,
      profile_picture_url: getProfilePictureUrl(ranking.username, ranking.profile_picture_url),
    }))
  } catch (error) {
    console.error("Error in getTopRankingsForVideo:", error)
    return []
  }
}
