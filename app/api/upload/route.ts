import type { NextRequest } from "next/server"
import { executeQuery, executeTransaction } from "@/lib/turso/server"

interface UploadRankingData {
  username: string
  profile_picture_url?: string
  rank: number
  url?: string
}

export async function POST(request: NextRequest) {
  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const formData = await request.formData()
        const file = formData.get("jsonFile") as File
        const replaceExisting = formData.get("replaceExisting") === "true"
        const videoDate = formData.get("videoDate") as string
        const videoTitle = formData.get("videoTitle") as string
        const videoDescription = formData.get("videoDescription") as string
        const videoThumbnail = formData.get("videoThumbnail") as string

        // Helper function to send progress updates
        const sendProgress = (data: any) => {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`))
        }

        sendProgress({ type: "log", message: "Dosya yükleme başladı..." })

        if (!file) {
          sendProgress({ type: "error", message: "Lütfen bir JSON dosyası seçin" })
          controller.close()
          return
        }

        if (!videoDate) {
          sendProgress({ type: "error", message: "Video tarihi gereklidir" })
          controller.close()
          return
        }

        // Check if today's date is being used
        const today = new Date().toISOString().split("T")[0]
        if (videoDate === today) {
          sendProgress({
            type: "warning",
            message: "Bugünün tarihi kullanılıyor. Sorun yaşarsanız önceki bir tarihi deneyin.",
          })
        }

        const finalVideoTitle = videoTitle || `Video - ${videoDate}`
        const finalVideoDescription = videoDescription || `${videoDate} tarihli video sıralaması`

        if (file.type !== "application/json" && !file.name.endsWith(".json")) {
          sendProgress({ type: "error", message: "Lütfen geçerli bir JSON dosyası yükleyin" })
          controller.close()
          return
        }

        if (file.size > 500 * 1024 * 1024) {
          sendProgress({ type: "error", message: "Dosya boyutu 500MB'dan küçük olmalıdır" })
          controller.close()
          return
        }

        sendProgress({ type: "progress", phase: "parsing", percentage: 10, message: "JSON dosyası okunuyor..." })

        // Read and parse JSON
        const fileContent = await file.text()
        sendProgress({ type: "progress", phase: "parsing", percentage: 30, message: "JSON verisi ayrıştırılıyor..." })

        let jsonData: UploadRankingData[]

        try {
          const parsedData = JSON.parse(fileContent)

          if (Array.isArray(parsedData)) {
            jsonData = parsedData
          } else if (parsedData && typeof parsedData === "object") {
            if (parsedData.results && Array.isArray(parsedData.results)) {
              jsonData = parsedData.results
            } else {
              const arrayKeys = Object.keys(parsedData).filter((key) => Array.isArray(parsedData[key]))
              if (arrayKeys.length > 0) {
                jsonData = parsedData[arrayKeys[0]]
              } else {
                sendProgress({
                  type: "error",
                  message:
                    "JSON dosyasında dizi bulunamadı. Dosya bir dizi içermeli veya dizi içeren bir özellik bulunmalıdır.",
                })
                controller.close()
                return
              }
            }
          } else {
            sendProgress({ type: "error", message: "JSON dosyası geçerli bir format içermiyor" })
            controller.close()
            return
          }
        } catch (parseError) {
          sendProgress({
            type: "error",
            message: "Geçersiz JSON formatı: " + (parseError as Error).message,
          })
          controller.close()
          return
        }

        sendProgress({
          type: "progress",
          phase: "validation",
          percentage: 50,
          message: `${jsonData.length} kayıt doğrulanıyor...`,
        })

        if (jsonData.length === 0) {
          sendProgress({ type: "error", message: "JSON dosyası boş olamaz" })
          controller.close()
          return
        }

        // Validate each entry
        for (let i = 0; i < jsonData.length; i++) {
          const entry = jsonData[i]
          if (!entry.username || typeof entry.username !== "string") {
            sendProgress({ type: "error", message: `${i + 1}. kayıtta geçersiz kullanıcı adı` })
            controller.close()
            return
          }
          if (!entry.rank || typeof entry.rank !== "number" || entry.rank < 1) {
            sendProgress({ type: "error", message: `${i + 1}. kayıtta geçersiz sıralama` })
            controller.close()
            return
          }
          if (entry.url && typeof entry.url === "string") {
            entry.profile_picture_url = entry.url
          }
          if (entry.profile_picture_url && typeof entry.profile_picture_url !== "string") {
            sendProgress({ type: "error", message: `${i + 1}. kayıtta geçersiz profil resmi URL'si` })
            controller.close()
            return
          }
        }

        // Check for duplicates
        const usernames = jsonData.map((entry) => entry.username)
        const duplicateUsernames = usernames.filter((username, index) => usernames.indexOf(username) !== index)
        if (duplicateUsernames.length > 0) {
          sendProgress({
            type: "error",
            message: `Aynı videoda tekrarlanan kullanıcı adları: ${duplicateUsernames.join(", ")}`,
          })
          controller.close()
          return
        }

        const ranks = jsonData.map((entry) => entry.rank)
        const duplicateRanks = ranks.filter((rank, index) => ranks.indexOf(rank) !== index)
        if (duplicateRanks.length > 0) {
          sendProgress({
            type: "error",
            message: `Aynı videoda tekrarlanan sıralamalar: ${duplicateRanks.join(", ")}`,
          })
          controller.close()
          return
        }

        sendProgress({
          type: "progress",
          phase: "database",
          percentage: 60,
          message: "Veritabanı bağlantısı kuruluyor...",
        })

        const testResult = await executeQuery("SELECT id FROM rankings LIMIT 1")

        const existingVideoResult = await executeQuery("SELECT * FROM videos WHERE created_at = ? LIMIT 1", [videoDate])

        if (existingVideoResult.rows && existingVideoResult.rows.length > 0 && !replaceExisting) {
          sendProgress({
            type: "error",
            message: `${videoDate} tarihli video verisi zaten mevcut. Değiştirmek için "Mevcut tüm verileri sil" seçeneğini işaretleyin.`,
          })
          controller.close()
          return
        }

        if (replaceExisting && existingVideoResult.rows && existingVideoResult.rows.length > 0) {
          sendProgress({
            type: "progress",
            phase: "database",
            percentage: 65,
            message: "Mevcut veriler siliniyor...",
          })

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

        sendProgress({
          type: "log",
          message: `${jsonData.length} kayıt ${batches.length} batch halinde işlenecek`,
        })

        await executeQuery(
          "INSERT OR REPLACE INTO videos (title, description, thumbnail_url, created_at) VALUES (?, ?, ?, ?)",
          [finalVideoTitle, finalVideoDescription, videoThumbnail || null, videoDate],
        )

        // Process batches with progress updates
        for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
          const batch = batches[batchIndex]
          const progressPercentage = 70 + Math.round((batchIndex / batches.length) * 25)

          sendProgress({
            type: "progress",
            phase: "inserting",
            percentage: progressPercentage,
            message: `Batch ${batchIndex + 1}/${batches.length} işleniyor (${batch.length} kayıt)...`,
            batchInfo: {
              current: batchIndex + 1,
              total: batches.length,
              recordsInBatch: batch.length,
            },
          })

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

          sendProgress({
            type: "log",
            message: `Batch ${batchIndex + 1}/${batches.length} başarıyla eklendi`,
          })
        }

        sendProgress({
          type: "progress",
          phase: "complete",
          percentage: 100,
          message: "Tüm veriler başarıyla yüklendi!",
        })

        sendProgress({
          type: "success",
          message: `${jsonData.length} kayıt ${videoDate} tarihli video için başarıyla ${replaceExisting ? "güncellendi" : "eklendi"}`,
          count: jsonData.length,
        })

        controller.close()
      } catch (error) {
        const sendProgress = (data: any) => {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`))
        }

        sendProgress({
          type: "error",
          message: "Dosya işlenirken hata oluştu: " + (error instanceof Error ? error.message : "Bilinmeyen hata"),
        })
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  })
}
