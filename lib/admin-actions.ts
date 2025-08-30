"use server"

import { executeQuery } from "@/lib/turso/server"
import { requireAdminAuth } from "@/lib/admin-auth"
import { revalidatePath } from "next/cache"
import { invalidateAllCaches } from "./video-actions"

export async function createRankingEntry(prevState: any, formData: FormData) {
  try {
    await requireAdminAuth()

    const username = formData.get("username")
    const profilePictureUrl = formData.get("profile_picture_url")
    const rank = formData.get("rank")

    if (!username || !rank) {
      return { error: "Kullanıcı adı ve sıralama gereklidir" }
    }

    // Check if username already exists
    const existingUser = await executeQuery("SELECT id FROM rankings WHERE username = ? LIMIT 1", [username.toString()])

    if (existingUser.rows && existingUser.rows.length > 0) {
      return { error: "Bu kullanıcı adı zaten mevcut" }
    }

    // Check if rank already exists
    const existingRank = await executeQuery("SELECT id FROM rankings WHERE rank = ? LIMIT 1", [
      Number.parseInt(rank.toString()),
    ])

    if (existingRank.rows && existingRank.rows.length > 0) {
      return { error: "Bu sıralama zaten mevcut" }
    }

    await executeQuery("INSERT INTO rankings (username, profile_picture_url, rank) VALUES (?, ?, ?)", [
      username.toString(),
      profilePictureUrl?.toString() || null,
      Number.parseInt(rank.toString()),
    ])

    await invalidateAllCaches()
    revalidatePath("/admin/rankings")
    revalidatePath("/siralama")
    return { success: "Sıralama başarıyla oluşturuldu" }
  } catch (error) {
    console.error("Create ranking error:", error)
    return { error: "Bir hata oluştu" }
  }
}

export async function updateRankingEntry(prevState: any, formData: FormData) {
  try {
    await requireAdminAuth()

    const id = formData.get("id")
    const username = formData.get("username")
    const profilePictureUrl = formData.get("profile_picture_url")
    const rank = formData.get("rank")

    if (!id || !username || !rank) {
      return { error: "Tüm alanlar gereklidir" }
    }

    // Check if username already exists (excluding current record)
    const existingUser = await executeQuery("SELECT id FROM rankings WHERE username = ? AND id != ? LIMIT 1", [
      username.toString(),
      Number.parseInt(id.toString()),
    ])

    if (existingUser.rows && existingUser.rows.length > 0) {
      return { error: "Bu kullanıcı adı zaten mevcut" }
    }

    // Check if rank already exists (excluding current record)
    const existingRank = await executeQuery("SELECT id FROM rankings WHERE rank = ? AND id != ? LIMIT 1", [
      Number.parseInt(rank.toString()),
      Number.parseInt(id.toString()),
    ])

    if (existingRank.rows && existingRank.rows.length > 0) {
      return { error: "Bu sıralama zaten mevcut" }
    }

    await executeQuery(
      "UPDATE rankings SET username = ?, profile_picture_url = ?, rank = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [
        username.toString(),
        profilePictureUrl?.toString() || null,
        Number.parseInt(rank.toString()),
        Number.parseInt(id.toString()),
      ],
    )

    await invalidateAllCaches()
    revalidatePath("/admin/rankings")
    revalidatePath("/siralama")
    return { success: "Sıralama başarıyla güncellendi" }
  } catch (error) {
    console.error("Update ranking error:", error)
    return { error: "Bir hata oluştu" }
  }
}

export async function deleteRankingEntry(id: number) {
  try {
    await requireAdminAuth()

    await executeQuery("DELETE FROM rankings WHERE id = ?", [id])

    await invalidateAllCaches()
    revalidatePath("/admin/rankings")
    revalidatePath("/siralama")
    return { success: "Sıralama başarıyla silindi" }
  } catch (error) {
    console.error("Delete ranking error:", error)
    throw error
  }
}
