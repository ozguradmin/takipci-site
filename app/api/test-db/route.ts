import { createClient } from '@/lib/turso/client'

export async function GET() {
  try {
    const client = createClient()
    
    // Test database connection
    const result = await client.execute('SELECT 1 as test')
    
    return Response.json({ 
      success: true, 
      message: 'Database connection successful',
      data: result.rows 
    })
  } catch (error) {
    console.error('Database connection error:', error)
    
    return Response.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      env: {
        hasUrl: !!process.env.TURSO_DATABASE_URL,
        hasToken: !!process.env.TURSO_AUTH_TOKEN,
        urlPrefix: process.env.TURSO_DATABASE_URL?.substring(0, 20) + '...'
      }
    }, { status: 500 })
  }
}
