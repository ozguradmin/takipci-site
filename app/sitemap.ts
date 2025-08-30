import type { MetadataRoute } from "next"
import { getVideosStatic } from "@/lib/video-actions"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://takipcileridovusturuyorum.vercel.app"

  // Get all videos to create dynamic video pages
  const videos = await getVideosStatic()

  // Format video dates for URLs
  const formatDateForUrl = (dateString: string) => {
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, "0")
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
  }

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/siralama`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/hakkimizda`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/nasil-calisir`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gizlilik-politikasi`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/kullanim-sartlari`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]

  // Dynamic video pages
  const videoPages: MetadataRoute.Sitemap = videos.map((video) => ({
    url: `${baseUrl}/video/${formatDateForUrl(video.video_date)}`,
    lastModified: new Date(video.video_date),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  return [...staticPages, ...videoPages]
}
