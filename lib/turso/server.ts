import { createClient } from "@libsql/client"

const databaseUrl = process.env.TURSO_DATABASE_URL || "file:./dev.db"
const authToken = process.env.TURSO_AUTH_TOKEN || "dummy"

// Only throw error in production
if (!process.env.TURSO_DATABASE_URL && process.env.NODE_ENV === "production") {
  throw new Error("TURSO_DATABASE_URL environment variable is required. Please add it to your Project Settings.")
}

if (!process.env.TURSO_AUTH_TOKEN && process.env.NODE_ENV === "production") {
  throw new Error("TURSO_AUTH_TOKEN environment variable is required. Please add it to your Project Settings.")
}

const tursoClient = createClient({
  url: databaseUrl,
  authToken: authToken,
})

export async function executeQuery(sql: string, params?: any[]) {
  try {
    const result = await tursoClient.execute({
      sql,
      args: params || [],
    })
    return result
  } catch (error) {
    console.error("[v0] Turso query error:", error)
    throw error
  }
}

export async function executeTransaction(queries: Array<{ sql: string; args?: any[] }>) {
  try {
    const results = await tursoClient.batch(queries)
    return results
  } catch (error) {
    console.error("[v0] Turso transaction error:", error)
    throw error
  }
}

export { tursoClient }
