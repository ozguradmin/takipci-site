import { NextRequest, NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export async function POST(request: NextRequest) {
  try {
    // Optimize script'ini çalıştır
    const { stdout, stderr } = await execAsync('node scripts/optimize-json.js')
    
    if (stderr) {
      console.error('Optimize script stderr:', stderr)
    }
    
    // Sonuçları parse et
    const lines = stdout.split('\n')
    const savingsMatch = lines.find(line => line.includes('Ortalama tasarruf:'))
    const savings = savingsMatch ? savingsMatch.match(/(\d+\.?\d*)%/) : null
    
    return NextResponse.json({
      success: true,
      message: 'JSON dosyaları başarıyla optimize edildi',
      savings: savings ? savings[1] : '0',
      output: stdout
    })
    
  } catch (error) {
    console.error('Optimize API hatası:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Optimizasyon sırasında hata oluştu' 
      },
      { status: 500 }
    )
  }
}
