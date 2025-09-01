const { createClient } = require('@libsql/client');
const fs = require('fs');
const path = require('path');

async function generateStaticData() {
  const client = createClient({
    url: 'file:./dev.db',
  });

  try {
    console.log('📊 Static data generation başlatılıyor...');

    // Get all videos with their rankings
    const videosResult = await client.execute(`
      SELECT DISTINCT 
        v.created_at as video_date,
        v.title as video_title,
        v.description as video_description,
        v.thumbnail_url as video_thumbnail_url
      FROM videos v 
      WHERE v.created_at IS NOT NULL 
      ORDER BY v.created_at DESC
    `);

    const videos = videosResult.rows || [];
    console.log(`📹 ${videos.length} video bulundu`);

    // Create data directory
    const dataDir = path.join(process.cwd(), 'public', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Generate data for each video
    for (const video of videos) {
      const videoDate = video[0]; // created_at
      
      console.log(`📅 ${videoDate} için veri oluşturuluyor...`);

      // Get rankings for this video
      const rankingsResult = await client.execute(`
        SELECT id, username, profile_picture_url, rank 
        FROM rankings 
        WHERE created_at = ? 
        ORDER BY rank ASC
      `, [videoDate]);

      const rankings = rankingsResult.rows || [];
      console.log(`👥 ${rankings.length} sıralama bulundu`);

      // Create video data object
      const videoData = {
        video: {
          video_date: videoDate,
          title: video[1], // title
          description: video[2], // description
          thumbnail_url: video[3] // thumbnail_url
        },
        rankings: rankings.map(row => ({
          username: row[1],
          profile_picture_url: row[2],
          rank: row[3]
        })),
        generated_at: new Date().toISOString(),
        total_rankings: rankings.length
      };

      // Save to JSON file
      const fileName = `rankings-${videoDate}.json`;
      const filePath = path.join(dataDir, fileName);
      
      fs.writeFileSync(filePath, JSON.stringify(videoData));
      console.log(`✅ ${fileName} oluşturuldu (${rankings.length} kayıt)`);
    }

    // Generate main rankings file (latest video)
    if (videos.length > 0) {
      const latestVideo = videos[0];
      const latestDate = latestVideo[0];
      
      const latestRankingsResult = await client.execute(`
        SELECT id, username, profile_picture_url, rank 
        FROM rankings 
        WHERE created_at = ? 
        ORDER BY rank ASC
        LIMIT 100
      `, [latestDate]);

      const latestRankings = latestRankingsResult.rows || [];
      
      const mainData = {
        video: {
          video_date: latestDate,
          title: latestVideo[1],
          description: latestVideo[2],
          thumbnail_url: latestVideo[3]
        },
        rankings: latestRankings.map(row => ({
          username: row[1],
          profile_picture_url: row[2],
          rank: row[3]
        })),
        generated_at: new Date().toISOString(),
        total_rankings: latestRankings.length
      };

      const mainFilePath = path.join(dataDir, 'rankings.json');
      fs.writeFileSync(mainFilePath, JSON.stringify(mainData));
      console.log(`✅ Ana rankings.json oluşturuldu (${latestRankings.length} kayıt)`);
    }

    console.log('🎉 Static data generation tamamlandı!');

  } catch (error) {
    console.error('❌ Hata:', error);
  } finally {
    await client.close();
  }
}

// Run if called directly
if (require.main === module) {
  generateStaticData();
}

module.exports = { generateStaticData };
