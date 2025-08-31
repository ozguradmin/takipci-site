import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const { filename, content } = await request.json()
    
    // Data klasörünü oluştur
    const dataDir = path.join(process.cwd(), 'public', 'data')
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
    
    // JSON dosyasını kaydet
    const filePath = path.join(dataDir, filename)
    fs.writeFileSync(filePath, content)
    
    // Ana rankings.json'u güncelle
    const mainRankingsPath = path.join(dataDir, 'rankings.json')
    let mainData = { rankings: [], total_count: 0, last_updated: new Date().toISOString() }
    
    if (fs.existsSync(mainRankingsPath)) {
      mainData = JSON.parse(fs.readFileSync(mainRankingsPath, 'utf8'))
    }
    
    // Yeni veriyi parse et
    const newData = JSON.parse(content)
    const allRankings = newData.rankings || []
    
    // En son 100 kaydı al
    mainData.rankings = allRankings.slice(0, 100)
    mainData.total_count = allRankings.length
    mainData.last_updated = new Date().toISOString()
    
    fs.writeFileSync(mainRankingsPath, JSON.stringify(mainData, null, 2))
    
    return NextResponse.json({ 
      success: true, 
      message: `${allRankings.length} kayıt kaydedildi`,
      filename 
    })
    
  } catch (error) {
    console.error('Dosya kaydetme hatası:', error)
    return NextResponse.json(
      { success: false, error: 'Dosya kaydetme hatası' },
      { status: 500 }
    )
  }
}
