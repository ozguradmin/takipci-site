const { createClient } = require('@libsql/client');
const fs = require('fs');

async function cleanDatabase() {
  const client = createClient({
    url: 'file:./dev.db',
  });

  try {
    console.log('🧹 Database temizleme başlatılıyor...');

    // Delete 2025-08-31 data
    const deleteRankings = await client.execute(`
      DELETE FROM rankings WHERE created_at = '2025-08-31'
    `);
    console.log(`🗑️ ${deleteRankings.rowsAffected} ranking kaydı silindi`);

    const deleteVideos = await client.execute(`
      DELETE FROM videos WHERE created_at = '2025-08-31'
    `);
    console.log(`🗑️ ${deleteVideos.rowsAffected} video kaydı silindi`);

    console.log('✅ Database temizleme tamamlandı!');

  } catch (error) {
    console.error('❌ Hata:', error);
  } finally {
    await client.close();
  }
}

// Run if called directly
if (require.main === module) {
  cleanDatabase();
}

module.exports = { cleanDatabase };
