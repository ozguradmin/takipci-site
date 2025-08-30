import { createClient } from "@libsql/client"

const databaseUrl = process.env.TURSO_DATABASE_URL
const authToken = process.env.TURSO_AUTH_TOKEN

if (!databaseUrl) {
  throw new Error("TURSO_DATABASE_URL environment variable is required. Please add it to your Project Settings.")
}

if (!authToken) {
  throw new Error("TURSO_AUTH_TOKEN environment variable is required. Please add it to your Project Settings.")
}

const tursoClient = createClient({
  url: databaseUrl,
  authToken: authToken,
})

export { tursoClient }
