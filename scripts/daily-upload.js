const { createClient } = require('@libsql/client');
const fs = require('fs');
const path = require('path');

async function processDailyUpload() {
  const client = createClient({
    url: 'file:./dev.db',
  });

  try {
    console.log('📅 Günlük veri yükleme işlemi başlatılıyor...');

    // Get today's date
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    console.log(`📆 Bugünün tarihi: ${today}`);

    // Check if data already exists for today
    const existingVideo = await client.execute(
      'SELECT COUNT(*) as count FROM videos WHERE created_at = ?',
      [today]
    );

    if (existingVideo.rows[0][0] > 0) {
      console.log('⚠️  Bugün için veri zaten mevcut. İşlem atlanıyor.');
      return;
    }

    // Check if rankings data exists for today
    const existingRankings = await client.execute(
      'SELECT COUNT(*) as count FROM rankings WHERE created_at = ?',
      [today]
    );

    if (existingRankings.rows[0][0] === 0) {
      console.log('❌ Bugün için sıralama verisi bulunamadı. Önce veri yükleyin.');
      return;
    }

    // Create video record for today
    await client.execute(`
      INSERT INTO videos (created_at, title, description, thumbnail_url)
      VALUES (?, ?, ?, ?)
    `, [today, `${today} Video Sıralaması`, `Takipçi sıralaması - ${today}`, null]);

    console.log(`✅ Video kaydı oluşturuldu: ${today}`);

    // Generate static data for today
    console.log('📊 Static data oluşturuluyor...');
    
    const { generateStaticData } = require('./generate-static-data');
    await generateStaticData();

    console.log('🎉 Günlük veri yükleme işlemi tamamlandı!');

  } catch (error) {
    console.error('❌ Hata:', error);
  } finally {
    await client.close();
  }
}

// Run if called directly
if (require.main === module) {
  processDailyUpload();
}

module.exports = { processDailyUpload };
