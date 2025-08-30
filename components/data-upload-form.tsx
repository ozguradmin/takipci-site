"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, AlertTriangle, CheckCircle, Video, Calendar, Loader2, X } from "lucide-react"
import { ImageUpload } from "@/components/image-upload"

interface ProgressUpdate {
  type: "progress" | "log" | "error" | "success" | "warning"
  message: string
  percentage?: number
  phase?: string
  count?: number
  batchInfo?: {
    current: number
    total: number
    recordsInBatch: number
  }
}

export default function DataUploadForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [replaceExisting, setReplaceExisting] = useState(false)
  const [videoDate, setVideoDate] = useState(() => {
    const today = new Date()
    return today.toISOString().split("T")[0] // Format: YYYY-MM-DD
  })
  const [videoMetadata, setVideoMetadata] = useState({
    title: "",
    description: "",
    thumbnail_url: "",
  })

  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentPhase, setCurrentPhase] = useState("")
  const [logs, setLogs] = useState<ProgressUpdate[]>([])
  const [uploadResult, setUploadResult] = useState<ProgressUpdate | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)
  const logsEndRef = useRef<HTMLDivElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      // Reset previous results when new file is selected
      setUploadResult(null)
      setLogs([])
      setProgress(0)
    }
  }

  const scrollToBottom = () => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const cancelUpload = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      setIsUploading(false)
      setLogs((prev) => [...prev, { type: "error", message: "Yükleme iptal edildi" }])
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!selectedFile) return

    setIsUploading(true)
    setProgress(0)
    setCurrentPhase("Başlatılıyor...")
    setLogs([])
    setUploadResult(null)

    // Create abort controller for cancellation
    abortControllerRef.current = new AbortController()

    try {
      const formData = new FormData()
      formData.set("jsonFile", selectedFile)
      formData.set("replaceExisting", replaceExisting.toString())
      formData.set("videoDate", videoDate)
      formData.set("videoTitle", videoMetadata.title)
      formData.set("videoDescription", videoMetadata.description)
      formData.set("videoThumbnail", videoMetadata.thumbnail_url)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
        signal: abortControllerRef.current.signal,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error("Response body is not readable")
      }

      const decoder = new TextDecoder()
      let buffer = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split("\n")
        buffer = lines.pop() || ""

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data: ProgressUpdate = JSON.parse(line.slice(6))

              if (data.type === "progress") {
                setProgress(data.percentage || 0)
                setCurrentPhase(data.message)
              }

              setLogs((prev) => [...prev, data])

              if (data.type === "success" || data.type === "error") {
                setUploadResult(data)
                setIsUploading(false)
              }

              // Auto-scroll to bottom
              setTimeout(scrollToBottom, 100)
            } catch (e) {
              console.error("Error parsing SSE data:", e)
            }
          }
        }
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        // Upload was cancelled, already handled
        return
      }

      const errorMessage = error instanceof Error ? error.message : "Bilinmeyen hata"
      setUploadResult({ type: "error", message: "Bağlantı hatası: " + errorMessage })
      setLogs((prev) => [...prev, { type: "error", message: "Bağlantı hatası: " + errorMessage }])
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* File Upload */}
        <div className="space-y-2">
          <Label htmlFor="jsonFile" className="text-foreground">
            JSON Dosyası Seç
          </Label>
          <div className="relative">
            <Input
              id="jsonFile"
              type="file"
              accept=".json,application/json"
              onChange={handleFileChange}
              disabled={isUploading}
              className="bg-background/50 border-border/50 file:bg-primary file:text-primary-foreground file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-3"
            />
          </div>
          {selectedFile && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="h-4 w-4" />
              <span>{selectedFile.name}</span>
              <span>({(selectedFile.size / 1024).toFixed(1)} KB)</span>
            </div>
          )}
        </div>

        {/* Video Metadata Section */}
        <div className="space-y-4 p-4 border border-border/50 rounded-lg bg-background/30">
          <div className="flex items-center gap-2 mb-3">
            <Video className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">Video Bilgileri</h3>
          </div>

          {/* Video Date Selection */}
          <div className="space-y-2">
            <Label htmlFor="videoDate" className="text-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Video Tarihi
            </Label>
            <Input
              id="videoDate"
              type="date"
              value={videoDate}
              onChange={(e) => setVideoDate(e.target.value)}
              disabled={isUploading}
              className="bg-background/50 border-border/50"
            />
            {videoDate === new Date().toISOString().split("T")[0] && (
              <div className="text-sm text-amber-600 flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                <span>Bugünün tarihi seçili. Sorun yaşarsanız önceki bir tarihi deneyin.</span>
              </div>
            )}
          </div>

          {/* Video Title Input */}
          <div className="space-y-2">
            <Label htmlFor="videoTitle" className="text-foreground">
              Video Başlığı
            </Label>
            <Input
              id="videoTitle"
              value={videoMetadata.title}
              onChange={(e) => setVideoMetadata({ ...videoMetadata, title: e.target.value })}
              placeholder="Örn: 19.08.2025 tarihinde paylaşılan video"
              disabled={isUploading}
              className="bg-background/50 border-border/50"
            />
          </div>

          {/* Video Description Textarea */}
          <div className="space-y-2">
            <Label htmlFor="videoDescription" className="text-foreground">
              Video Açıklaması
            </Label>
            <Textarea
              id="videoDescription"
              value={videoMetadata.description}
              onChange={(e) => setVideoMetadata({ ...videoMetadata, description: e.target.value })}
              placeholder="Sıralamaları görmek için tıklayın"
              rows={3}
              disabled={isUploading}
              className="bg-background/50 border-border/50"
            />
          </div>

          {/* Video Thumbnail Upload */}
          <div className="space-y-2">
            <Label className="text-foreground">Video Görseli</Label>
            <ImageUpload
              value={videoMetadata.thumbnail_url}
              onChange={(url) => setVideoMetadata({ ...videoMetadata, thumbnail_url: url })}
              placeholder="Video görsel URL'si veya dosya yükleyin"
              disabled={isUploading}
            />
          </div>
        </div>

        {/* Replace Existing Option */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="replaceExisting"
            checked={replaceExisting}
            onCheckedChange={(checked) => setReplaceExisting(checked as boolean)}
            disabled={isUploading}
          />
          <Label htmlFor="replaceExisting" className="text-sm text-foreground cursor-pointer">
            Mevcut tüm verileri sil ve yenileriyle değiştir
          </Label>
        </div>

        {replaceExisting && (
          <div className="bg-destructive/10 border border-destructive/50 text-destructive px-4 py-3 rounded-lg text-sm flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Dikkat!</p>
              <p>
                Bu seçenek mevcut tüm sıralama verilerini silecek ve yeni verilerle değiştirecektir. Bu işlem geri
                alınamaz.
              </p>
            </div>
          </div>
        )}

        {/* Upload Button */}
        <div className="flex gap-2">
          <Button
            type="submit"
            disabled={!selectedFile || isUploading}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            {isUploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Yükleniyor...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Dosyayı Yükle ve İşle
              </>
            )}
          </Button>

          {isUploading && (
            <Button type="button" variant="outline" onClick={cancelUpload} className="px-3 bg-transparent">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </form>

      {isUploading && (
        <div className="space-y-4 p-4 border border-border/50 rounded-lg bg-background/30">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-foreground font-medium">İlerleme</span>
              <span className="text-muted-foreground">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground">{currentPhase}</p>
          </div>
        </div>
      )}

      {logs.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold text-foreground">Anlık Loglar</h4>
          <div className="bg-muted/30 border border-border/50 rounded-lg p-4 max-h-64 overflow-y-auto">
            <div className="space-y-1 text-sm font-mono">
              {logs.map((log, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-2 ${
                    log.type === "error"
                      ? "text-red-600"
                      : log.type === "success"
                        ? "text-green-600"
                        : log.type === "warning"
                          ? "text-amber-600"
                          : "text-muted-foreground"
                  }`}
                >
                  <span className="text-xs opacity-60 mt-0.5">{new Date().toLocaleTimeString()}</span>
                  <span className="flex-1">{log.message}</span>
                  {log.batchInfo && (
                    <span className="text-xs opacity-60">
                      [{log.batchInfo.current}/{log.batchInfo.total}]
                    </span>
                  )}
                </div>
              ))}
              <div ref={logsEndRef} />
            </div>
          </div>
        </div>
      )}

      {/* Upload Result */}
      {uploadResult && (
        <div className="space-y-4">
          {uploadResult.type === "error" && (
            <div className="bg-destructive/10 border border-destructive/50 text-destructive px-4 py-3 rounded-lg text-sm flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Hata!</p>
                <p>{uploadResult.message}</p>
              </div>
            </div>
          )}

          {uploadResult.type === "success" && (
            <div className="bg-green-500/10 border border-green-500/50 text-green-700 px-4 py-3 rounded-lg text-sm flex items-start gap-2">
              <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Başarılı!</p>
                <p>{uploadResult.message}</p>
                {uploadResult.count && <p className="mt-1 text-xs">Toplam {uploadResult.count} kayıt işlendi.</p>}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Upload Tips */}
      <div className="bg-muted/30 p-4 rounded-lg">
        <h4 className="font-semibold text-foreground mb-2">İpuçları:</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Dosya yüklemeden önce JSON formatının doğru olduğundan emin olun</li>
          <li>• Video bilgilerini doldurarak Son Videolar bölümünde görünmesini sağlayın</li>
          <li>• Büyük dosyalar için yükleme biraz zaman alabilir</li>
          <li>• Mevcut verilerle çakışma olmaması için önce kontrol edin</li>
          <li>• Yedek almayı unutmayın</li>
        </ul>
      </div>
    </div>
  )
}
