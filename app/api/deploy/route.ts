import { NextRequest, NextResponse } from 'next/server'
import { execSync } from 'child_process'

export async function POST(request: NextRequest) {
  try {
    // Git add, commit, push yap
    execSync('git add .', { stdio: 'inherit' })
    execSync(`git commit -m "Veri güncellendi - ${new Date().toLocaleString('tr-TR')}"`, { stdio: 'inherit' })
    execSync('git push origin master', { stdio: 'inherit' })
    
    return NextResponse.json({ 
      success: true, 
      message: 'Deploy başlatıldı' 
    })
    
  } catch (error) {
    console.error('Deploy hatası:', error)
    return NextResponse.json(
      { success: false, error: 'Deploy hatası' },
      { status: 500 }
    )
  }
}
