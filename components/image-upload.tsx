"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Link, X } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
  value?: string
  onChange: (value: string) => void
  label?: string
}

export function ImageUpload({ value, onChange, label = "Video Görseli" }: ImageUploadProps) {
  const [imageUrl, setImageUrl] = useState(value || "")
  const [previewUrl, setPreviewUrl] = useState(value || "")
  const [isUploading, setIsUploading] = useState(false)

  const handleUrlChange = (url: string) => {
    setImageUrl(url)
    setPreviewUrl(url)
    onChange(url)
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)

    try {
      // Create a local URL for preview
      const localUrl = URL.createObjectURL(file)
      setPreviewUrl(localUrl)

      // For now, we'll use a placeholder URL since we don't have blob storage set up
      // In a real implementation, you would upload to Vercel Blob or similar service
      const uploadedUrl = `/placeholder.svg?height=200&width=300&query=video-thumbnail-${Date.now()}`

      onChange(uploadedUrl)
      setImageUrl(uploadedUrl)
    } catch (error) {
      console.error("Upload failed:", error)
    } finally {
      setIsUploading(false)
    }
  }

  const clearImage = () => {
    setImageUrl("")
    setPreviewUrl("")
    onChange("")
  }

  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium text-foreground">{label}</Label>

      <Tabs defaultValue="url" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="url" className="flex items-center gap-2">
            <Link className="h-4 w-4" />
            URL
          </TabsTrigger>
          <TabsTrigger value="file" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Dosya Yükle
          </TabsTrigger>
        </TabsList>

        <TabsContent value="url" className="space-y-3">
          <div className="flex gap-2">
            <Input
              type="url"
              placeholder="Görsel URL'sini girin..."
              value={imageUrl}
              onChange={(e) => handleUrlChange(e.target.value)}
              className="flex-1"
            />
            {imageUrl && (
              <Button type="button" variant="outline" size="sm" onClick={clearImage}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </TabsContent>

        <TabsContent value="file" className="space-y-3">
          <div className="flex items-center gap-2">
            <Input type="file" accept="image/*" onChange={handleFileUpload} disabled={isUploading} className="flex-1" />
            {previewUrl && (
              <Button type="button" variant="outline" size="sm" onClick={clearImage} disabled={isUploading}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          {isUploading && <p className="text-sm text-muted-foreground">Yükleniyor...</p>}
        </TabsContent>
      </Tabs>

      {/* Image Preview */}
      {previewUrl && (
        <div className="relative w-full max-w-sm mx-auto">
          <div className="aspect-video rounded-lg overflow-hidden border border-border">
            <Image
              src={previewUrl || "/placeholder.svg"}
              alt="Görsel önizleme"
              width={300}
              height={200}
              className="w-full h-full object-cover"
              onError={() => {
                setPreviewUrl("/error-loading-image.png")
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
