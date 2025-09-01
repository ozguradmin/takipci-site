const fs = require('fs');
const path = require('path');

function optimizeJsonFile(filePath) {
  try {
    console.log(`📁 ${filePath} optimize ediliyor...`);
    
    // Dosyayı oku
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Rankings'i optimize et
    if (data.rankings && Array.isArray(data.rankings)) {
      const optimizedRankings = data.rankings.map(ranking => ({
        username: ranking.username,
        profile_picture_url: ranking.profile_picture_url,
        rank: ranking.rank
        // id, created_at, updated_at kaldırıldı
      }));
      
      // Optimize edilmiş veriyi oluştur
      const optimizedData = {
        video_date: data.video_date,
        title: data.title,
        description: data.description,
        thumbnail_url: data.thumbnail_url,
        rankings: optimizedRankings,
        total_count: optimizedRankings.length,
        generated_at: new Date().toISOString()
      };
      
      // Sıkıştırılmış JSON olarak kaydet
      const optimizedJson = JSON.stringify(optimizedData);
      
      // Yedek oluştur
      const backupPath = filePath + '.backup';
      fs.copyFileSync(filePath, backupPath);
      console.log(`💾 Yedek oluşturuldu: ${backupPath}`);
      
      // Optimize edilmiş dosyayı kaydet
      fs.writeFileSync(filePath, optimizedJson);
      
      const originalSize = fs.statSync(backupPath).size;
      const optimizedSize = fs.statSync(filePath).size;
      const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
      
      console.log(`✅ Optimize edildi: ${(originalSize/1024/1024).toFixed(2)}MB → ${(optimizedSize/1024/1024).toFixed(2)}MB (${savings}% tasarruf)`);
      
      return { success: true, savings };
    }
    
  } catch (error) {
    console.error(`❌ Hata: ${error.message}`);
    return { success: false, error: error.message };
  }
}

function optimizeAllJsonFiles() {
  const dataDir = path.join(process.cwd(), 'public', 'data');
  
  if (!fs.existsSync(dataDir)) {
    console.error('❌ Data dizini bulunamadı');
    return;
  }
  
  const jsonFiles = fs.readdirSync(dataDir).filter(file => file.endsWith('.json'));
  
  if (jsonFiles.length === 0) {
    console.log('📁 JSON dosyası bulunamadı');
    return;
  }
  
  console.log(`📊 ${jsonFiles.length} JSON dosyası optimize edilecek...`);
  
  let totalSavings = 0;
  let successCount = 0;
  
  for (const file of jsonFiles) {
    const filePath = path.join(dataDir, file);
    const result = optimizeJsonFile(filePath);
    
    if (result.success) {
      successCount++;
      totalSavings += parseFloat(result.savings);
    }
  }
  
  console.log(`\n🎉 Tamamlandı! ${successCount}/${jsonFiles.length} dosya optimize edildi`);
  console.log(`📊 Ortalama tasarruf: ${(totalSavings / successCount).toFixed(1)}%`);
}

// Script çalıştır
if (require.main === module) {
  optimizeAllJsonFiles();
}

module.exports = { optimizeJsonFile, optimizeAllJsonFiles };
