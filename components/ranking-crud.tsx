"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
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
import { Plus, Edit, Trash2, User, Hash, ImageIcon } from "lucide-react"
// import { createRankingEntry, updateRankingEntry, deleteRankingEntry } from "@/lib/admin-actions"
import { Users } from "lucide-react"

interface RankingUser {
  id: number
  username: string
  profile_picture_url: string | null
  rank: number
  created_at: string
  updated_at: string
}

interface RankingCRUDProps {
  rankings: RankingUser[]
}

export default function RankingCRUD({ rankings }: RankingCRUDProps) {
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<RankingUser | null>(null)

  const [createState, setCreateState] = useState(null)
  const [updateState, setUpdateState] = useState(null)
  const [createPending, setCreatePending] = useState(false)
  const [updatePending, setUpdatePending] = useState(false)
  
  const handleCreate = async (formData: FormData) => {
    setCreatePending(true)
    setCreateState(null)
    
    try {
      // Client-side create logic
      const data = Object.fromEntries(formData)
      console.log('Creating ranking entry:', data)
      setCreateState({ success: true })
    } catch (error) {
      setCreateState({ error: 'Oluşturulurken hata oluştu' })
    } finally {
      setCreatePending(false)
    }
  }
  
  const handleUpdate = async (formData: FormData) => {
    setUpdatePending(true)
    setUpdateState(null)
    
    try {
      // Client-side update logic
      const data = Object.fromEntries(formData)
      console.log('Updating ranking entry:', data)
      setUpdateState({ success: true })
    } catch (error) {
      setUpdateState({ error: 'Güncellenirken hata oluştu' })
    } finally {
      setUpdatePending(false)
    }
  }

  const handleEdit = (user: RankingUser) => {
    setEditingUser(user)
    setEditDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteRankingEntry(id)
    } catch (error) {
      console.error("Delete error:", error)
    }
  }

  const getRankBadgeColor = (rank: number) => {
    if (rank <= 3) return "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white"
    if (rank <= 10) return "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
    if (rank <= 25) return "bg-gradient-to-r from-green-500 to-green-600 text-white"
    return "bg-muted text-muted-foreground"
  }

  return (
    <div className="space-y-6">
      {/* Add New Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-foreground">Mevcut Sıralamalar</h3>
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Yeni Ekle
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground">Yeni Sıralama Ekle</DialogTitle>
            </DialogHeader>
            <form action={handleCreate} className="space-y-4">
              {createState?.error && (
                <div className="bg-destructive/10 border border-destructive/50 text-destructive px-4 py-3 rounded-lg text-sm">
                  {createState.error}
                </div>
              )}
              {createState?.success && (
                <div className="bg-green-500/10 border border-green-500/50 text-green-700 px-4 py-3 rounded-lg text-sm">
                  {createState.success}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="create-username" className="text-foreground">
                  Kullanıcı Adı
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="create-username"
                    name="username"
                    placeholder="kullanici_adi"
                    required
                    className="pl-10 bg-background/50 border-border/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="create-rank" className="text-foreground">
                  Sıralama
                </Label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="create-rank"
                    name="rank"
                    type="number"
                    placeholder="1"
                    min="1"
                    required
                    className="pl-10 bg-background/50 border-border/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="create-profile-picture" className="text-foreground">
                  Profil Resmi URL (İsteğe bağlı)
                </Label>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="create-profile-picture"
                    name="profile_picture_url"
                    type="url"
                    placeholder="https://example.com/avatar.jpg"
                    className="pl-10 bg-background/50 border-border/50"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" disabled={createPending} className="flex-1">
                  {createPending ? "Ekleniyor..." : "Ekle"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCreateDialogOpen(false)}
                  className="bg-transparent"
                >
                  İptal
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Rankings List */}
      <div className="space-y-3">
        {rankings.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors"
          >
            {/* Rank */}
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg ${getRankBadgeColor(user.rank)}`}
            >
              {user.rank}
            </div>

            {/* Profile Picture */}
            <img
              src={
                user.username
                  ? `https://pub-63c4f2af186d48f184dea3dfce00ba35.r2.dev/${user.username}.jpg`
                  : "/placeholder.svg?height=60&width=60"
              }
              alt={user.username}
              className="w-14 h-14 rounded-full object-cover border-2 border-border"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = "/placeholder.svg?height=60&width=60"
              }}
            />

            {/* User Info */}
            <div className="flex-1">
              <h4 className="font-semibold text-lg text-foreground">{user.username}</h4>
              <p className="text-sm text-muted-foreground">Sıralama: {user.rank}. sıra</p>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Dialog open={editDialogOpen && editingUser?.id === user.id} onOpenChange={setEditDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" onClick={() => handleEdit(user)} className="bg-transparent">
                    <Edit className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-card border-border">
                  <DialogHeader>
                    <DialogTitle className="text-foreground">Sıralamayı Düzenle</DialogTitle>
                  </DialogHeader>
                  {editingUser && (
                    <form action={handleUpdate} className="space-y-4">
                      <input type="hidden" name="id" value={editingUser.id} />

                      {updateState?.error && (
                        <div className="bg-destructive/10 border border-destructive/50 text-destructive px-4 py-3 rounded-lg text-sm">
                          {updateState.error}
                        </div>
                      )}
                      {updateState?.success && (
                        <div className="bg-green-500/10 border border-green-500/50 text-green-700 px-4 py-3 rounded-lg text-sm">
                          {updateState.success}
                        </div>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="edit-username" className="text-foreground">
                          Kullanıcı Adı
                        </Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="edit-username"
                            name="username"
                            defaultValue={editingUser.username}
                            required
                            className="pl-10 bg-background/50 border-border/50"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="edit-rank" className="text-foreground">
                          Sıralama
                        </Label>
                        <div className="relative">
                          <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="edit-rank"
                            name="rank"
                            type="number"
                            defaultValue={editingUser.rank}
                            min="1"
                            required
                            className="pl-10 bg-background/50 border-border/50"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="edit-profile-picture" className="text-foreground">
                          Profil Resmi URL
                        </Label>
                        <div className="relative">
                          <ImageIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="edit-profile-picture"
                            name="profile_picture_url"
                            type="url"
                            defaultValue={editingUser.profile_picture_url || ""}
                            className="pl-10 bg-background/50 border-border/50"
                          />
                        </div>
                      </div>

                      <div className="flex gap-2 pt-4">
                        <Button type="submit" disabled={updatePending} className="flex-1">
                          {updatePending ? "Güncelleniyor..." : "Güncelle"}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setEditDialogOpen(false)}
                          className="bg-transparent"
                        >
                          İptal
                        </Button>
                      </div>
                    </form>
                  )}
                </DialogContent>
              </Dialog>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-card border-border">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-foreground">Sıralamayı Sil</AlertDialogTitle>
                    <AlertDialogDescription className="text-muted-foreground">
                      <strong>{user.username}</strong> kullanıcısını sıralamadan silmek istediğinizden emin misiniz? Bu
                      işlem geri alınamaz.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-transparent">İptal</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(user.id)}
                      className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                    >
                      Sil
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}

        {rankings.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Henüz Sıralama Yok</h3>
            <p className="text-muted-foreground">İlk sıralama kaydını eklemek için yukarıdaki butonu kullanın.</p>
          </div>
        )}
      </div>
    </div>
  )
}
