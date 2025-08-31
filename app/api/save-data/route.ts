import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Data klasörünü oluştur
    const dataDir = path.join(process.cwd(), 'public', 'data')
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
    
    // JSON dosyasını kaydet
    const fileName = `rankings-${data.video_date}.json`
    const filePath = path.join(dataDir, fileName)
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
    
    // Ana rankings.json'u güncelle
    const mainRankingsPath = path.join(dataDir, 'rankings.json')
    let mainData = { rankings: [], total_count: 0, last_updated: new Date().toISOString() }
    
    if (fs.existsSync(mainRankingsPath)) {
      mainData = JSON.parse(fs.readFileSync(mainRankingsPath, 'utf8'))
    }
    
    // En son 100 kaydı al
    const allRankings = data.rankings || []
    mainData.rankings = allRankings.slice(0, 100)
    mainData.total_count = allRankings.length
    mainData.last_updated = new Date().toISOString()
    
    fs.writeFileSync(mainRankingsPath, JSON.stringify(mainData, null, 2))
    
    return NextResponse.json({ 
      success: true, 
      message: `${data.rankings.length} kayıt kaydedildi`,
      fileName 
    })
    
  } catch (error) {
    console.error('Veri kaydetme hatası:', error)
    return NextResponse.json(
      { success: false, error: 'Veri kaydetme hatası' },
      { status: 500 }
    )
  }
}
