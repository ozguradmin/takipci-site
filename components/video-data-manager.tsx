"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Trash2, Eye, ImageIcon, Edit } from "lucide-react"
import Link from "next/link"
import { deleteVideo, updateVideoMetadata } from "@/lib/video-actions"
import FallbackImage from "@/components/fallback-image"
import { Database } from "lucide-react"

interface Video {
  id: string // Changed to string since we're using video_date as id
  video_date: string
  title: string | null
  description: string | null
  thumbnail_url: string | null
  created_at: string
}

interface VideoDataManagerProps {
  videos: Video[]
}

export function VideoDataManager({ videos }: VideoDataManagerProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null) // Changed to string
  const [editingVideo, setEditingVideo] = useState<Video | null>(null)
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    thumbnail_url: "",
  })

  const handleDelete = async (videoDate: string) => {
    setDeletingId(videoDate)
    try {
      const result = await deleteVideo(videoDate)
      if (result.success) {
        window.location.reload()
      } else {
        alert("Silme işlemi başarısız: " + result.error)
      }
    } catch (error) {
      alert("Bir hata oluştu: " + error)
    } finally {
      setDeletingId(null)
    }
  }

  const handleEdit = (video: Video) => {
    setEditingVideo(video)
    setEditForm({
      title: video.title || "",
      description: video.description || "",
      thumbnail_url: video.thumbnail_url || "",
    })
  }

  const handleSaveEdit = async () => {
    if (!editingVideo) return

    try {
      const result = await updateVideoMetadata(editingVideo.video_date, editForm)
      if (result.success) {
        setEditingVideo(null)
        window.location.reload()
      } else {
        alert("Güncelleme başarısız: " + result.error)
      }
    } catch (error) {
      alert("Bir hata oluştu: " + error)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const formatDateForUrl = (dateString: string) => {
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, "0")
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
  }

  if (videos.length === 0) {
    return (
      <div className="text-center py-12">
        <Database className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">Henüz veri yüklenmemiş</h3>
        <p className="text-muted-foreground mb-6">İlk video verinizi yüklemek için veri yükleme sayfasını kullanın</p>
        <Link href="/admin/upload">
          <Button>Veri Yükle</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {videos.map((video) => (
        <Card key={video.video_date} className="border-border/50 bg-background/50">
          {" "}
          {/* Use video_date as key */}
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <CardTitle className="text-lg">{formatDate(video.video_date)}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {video.title || `${formatDate(video.video_date)} tarihinde paylaşılan video`}
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                {formatDate(video.video_date)} {/* Show date instead of video id */}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Video Info */}
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Açıklama</label>
                  <p className="text-sm text-foreground">{video.description || "Sıralamaları görmek için tıklayın"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Video Tarihi</label>
                  <p className="text-sm text-foreground">{formatDate(video.video_date)}</p>
                </div>
              </div>

              {/* Thumbnail */}
              {video.thumbnail_url && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <ImageIcon className="h-4 w-4" />
                    Video Görseli
                  </label>
                  <div className="aspect-video w-full max-w-48 rounded-lg overflow-hidden border border-border">
                    <FallbackImage
                      src={video.thumbnail_url}
                      alt={`${formatDate(video.video_date)} video thumbnail`}
                      width={192}
                      height={108}
                      className="w-full h-full object-cover"
                      fallbackSrc="/default-thumbnail.png"
                      loading="lazy"
                      quality={75}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-border/50">
              <Link href={`/video/${formatDateForUrl(video.video_date)}`}>
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Eye className="h-4 w-4 mr-2" />
                  Sıralamaları Gör
                </Button>
              </Link>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="bg-transparent" onClick={() => handleEdit(video)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Düzenle
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Video Bilgilerini Düzenle</DialogTitle>
                    <DialogDescription>
                      {formatDate(video.video_date)} tarihli video için başlık, açıklama ve görsel bilgilerini
                      güncelleyin.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-title">Başlık</Label>
                      <Input
                        id="edit-title"
                        value={editForm.title}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        placeholder="Video başlığı"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-description">Açıklama</Label>
                      <Textarea
                        id="edit-description"
                        value={editForm.description}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        placeholder="Video açıklaması"
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Video Görseli</Label>
                      <Input
                        value={editForm.thumbnail_url}
                        onChange={(e) => setEditForm({ ...editForm, thumbnail_url: e.target.value })}
                        placeholder="Video görsel URL'si"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setEditingVideo(null)}>
                      İptal
                    </Button>
                    <Button onClick={handleSaveEdit}>Kaydet</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent text-destructive border-destructive/50 hover:bg-destructive/10"
                    disabled={deletingId === video.video_date} // Use video_date for comparison
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    {deletingId === video.video_date ? "Siliniyor..." : "Sil"}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Video Verisini Sil</AlertDialogTitle>
                    <AlertDialogDescription>
                      {formatDate(video.video_date)} tarihli video verisini silmek istediğinizden emin misiniz? Bu işlem
                      geri alınamaz ve tüm sıralama verileri de silinecektir.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>İptal</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(video.video_date)} // Pass video_date instead of id
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Sil
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
