"use server"

import { executeQuery, executeTransaction } from "@/lib/turso/server"
import { revalidatePath, revalidateTag } from "next/cache"

interface UploadRankingData {
  username: string
  profile_picture_url?: string
  rank: number
  url?: string
}

async function invalidateAllCaches() {
  "use server"

  // Invalidate all cache tags instantly
  revalidateTag("videos")
  revalidateTag("rankings")
  revalidateTag("latest")
  revalidateTag("video-data")

  // Also revalidate paths for immediate effect
  revalidatePath("/")
  revalidatePath("/siralama")
  revalidatePath("/admin")
  revalidatePath("/admin/rankings")
}

export async function processJSONUpload(prevState: any, formData: FormData) {
  try {
    const file = formData.get("jsonFile") as File
    const replaceExisting = formData.get("replaceExisting") === "true"
    const videoDate = formData.get("videoDate") as string
    const videoTitle = formData.get("videoTitle") as string
    const videoDescription = formData.get("videoDescription") as string
    const videoThumbnail = formData.get("videoThumbnail") as string

    console.log("[v0] Processing JSON upload with data:", {
      hasFile: !!file,
      videoDate,
      videoTitle: videoTitle || "Auto-generated",
      videoDescription: videoDescription || "Auto-generated",
    })

    if (!file) {
      return { error: "Lütfen bir JSON dosyası seçin" }
    }

    if (!videoDate) {
      return { error: "Video tarihi gereklidir" }
    }

    const finalVideoTitle = videoTitle || `Video - ${videoDate}`
    const finalVideoDescription = videoDescription || `${videoDate} tarihli video sıralaması`

    if (file.type !== "application/json" && !file.name.endsWith(".json")) {
      return { error: "Lütfen geçerli bir JSON dosyası yükleyin" }
    }

    if (file.size > 500 * 1024 * 1024) {
      return { error: "Dosya boyutu 500MB'dan küçük olmalıdır" }
    }

    // Read and parse JSON
    const fileContent = await file.text()
    console.log("[v0] File content preview:", fileContent.substring(0, 200))

    let jsonData: UploadRankingData[]

    try {
      const parsedData = JSON.parse(fileContent)
      console.log("[v0] Parsed JSON type:", typeof parsedData, "isArray:", Array.isArray(parsedData))

      if (Array.isArray(parsedData)) {
        jsonData = parsedData
      } else if (parsedData && typeof parsedData === "object") {
        if (parsedData.results && Array.isArray(parsedData.results)) {
          jsonData = parsedData.results
          console.log("[v0] Using results array from JSON")
        } else {
          // If it's an object, check if it has an array property
          const arrayKeys = Object.keys(parsedData).filter((key) => Array.isArray(parsedData[key]))
          if (arrayKeys.length > 0) {
            jsonData = parsedData[arrayKeys[0]] // Use the first array found
            console.log("[v0] Using array from key:", arrayKeys[0])
          } else {
            return {
              error:
                "JSON dosyasında dizi bulunamadı. Dosya bir dizi içermeli veya dizi içeren bir özellik bulunmalıdır.",
            }
          }
        }
      } else {
        return { error: "JSON dosyası geçerli bir format içermiyor" }
      }
    } catch (parseError) {
      console.log("[v0] JSON parse error:", parseError)
      return { error: "Geçersiz JSON formatı: " + (parseError as Error).message }
    }

    console.log("[v0] Final jsonData length:", jsonData.length)

    if (jsonData.length === 0) {
      return { error: "JSON dosyası boş olamaz" }
    }

    // Validate each entry
    for (let i = 0; i < jsonData.length; i++) {
      const entry = jsonData[i]
      if (!entry.username || typeof entry.username !== "string") {
        return { error: `${i + 1}. kayıtta geçersiz kullanıcı adı` }
      }
      if (!entry.rank || typeof entry.rank !== "number" || entry.rank < 1) {
        return { error: `${i + 1}. kayıtta geçersiz sıralama` }
      }
      if (entry.url && typeof entry.url === "string") {
        entry.profile_picture_url = entry.url
      }
      if (entry.profile_picture_url && typeof entry.profile_picture_url !== "string") {
        return { error: `${i + 1}. kayıtta geçersiz profil resmi URL'si` }
      }
    }

    // Check for duplicate usernames in the upload (within same video only)
    const usernames = jsonData.map((entry) => entry.username)
    const duplicateUsernames = usernames.filter((username, index) => usernames.indexOf(username) !== index)
    if (duplicateUsernames.length > 0) {
      return { error: `Aynı videoda tekrarlanan kullanıcı adları: ${duplicateUsernames.join(", ")}` }
    }

    // Check for duplicate ranks in the upload (within same video only)
    const ranks = jsonData.map((entry) => entry.rank)
    const duplicateRanks = ranks.filter((rank, index) => ranks.indexOf(rank) !== index)
    if (duplicateRanks.length > 0) {
      return { error: `Aynı videoda tekrarlanan sıralamalar: ${duplicateRanks.join(", ")}` }
    }

    console.log("[v0] Turso client testing connection...")

    const testResult = await executeQuery("SELECT id FROM rankings LIMIT 1")
    console.log("[v0] Turso connection test successful")

    const existingVideoResult = await executeQuery("SELECT * FROM videos WHERE created_at = ? LIMIT 1", [videoDate])

    if (existingVideoResult.rows && existingVideoResult.rows.length > 0 && !replaceExisting) {
      return {
        error: `${videoDate} tarihli video verisi zaten mevcut. Değiştirmek için "Mevcut tüm verileri sil" seçeneğini işaretleyin.`,
      }
    }

    if (replaceExisting && existingVideoResult.rows && existingVideoResult.rows.length > 0) {
      await executeTransaction([
        {
          sql: "DELETE FROM rankings WHERE created_at = ?",
          args: [videoDate],
        },
        {
          sql: "DELETE FROM videos WHERE created_at = ?",
          args: [videoDate],
        },
      ])
    }

    const batchSize = 1000
    const batches = []
    for (let i = 0; i < jsonData.length; i += batchSize) {
      batches.push(jsonData.slice(i, i + batchSize))
    }

    console.log("[v0] Processing", jsonData.length, "records in", batches.length, "batches")

    await executeQuery(
      "INSERT OR REPLACE INTO videos (title, description, thumbnail_url, created_at) VALUES (?, ?, ?, ?)",
      [finalVideoTitle, finalVideoDescription, videoThumbnail || null, videoDate],
    )

    for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
      const batch = batches[batchIndex]
      console.log("[v0] Processing batch", batchIndex + 1, "of", batches.length, "with", batch.length, "records")

      const queries = batch.map((entry) => ({
        sql: "INSERT INTO rankings (username, profile_picture_url, rank, created_at) VALUES (?, ?, ?, ?)",
        args: [
          entry.username,
          entry.profile_picture_url ||
            entry.url ||
            `https://pub-63c4f2af186d48f184dea3dfce00ba35.r2.dev/${entry.username}.jpg`,
          entry.rank,
          videoDate,
        ],
      }))

      await executeTransaction(queries)
      console.log("[v0] Successfully inserted batch", batchIndex + 1)
    }

    await invalidateAllCaches()

    // Also revalidate the specific video page
    revalidatePath(`/video/${videoDate}`)

    console.log("[v0] Successfully uploaded data for video date:", videoDate, "with", jsonData.length, "entries")

    return {
      success: `${jsonData.length} kayıt ${videoDate} tarihli video için başarıyla ${replaceExisting ? "güncellendi" : "eklendi"}`,
      count: jsonData.length,
    }
  } catch (error) {
    console.error("[v0] Upload processing error:", error instanceof Error ? error.message : error)
    return { error: "Dosya işlenirken hata oluştu: " + (error instanceof Error ? error.message : "Bilinmeyen hata") }
  }
}
