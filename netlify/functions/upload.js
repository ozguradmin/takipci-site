const { createClient } = require('@libsql/client');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const client = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });

    const data = JSON.parse(event.body);
    
    if (!data.date || !data.rankings) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Geçersiz veri formatı' })
      };
    }

    // Veriyi veritabanına kaydet
    await client.execute({
      sql: `INSERT OR REPLACE INTO video_rankings (date, rankings_data) VALUES (?, ?)`,
      args: [data.date, JSON.stringify(data.rankings)]
    });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ success: true, message: 'Veri başarıyla kaydedildi' })
    };
  } catch (error) {
    console.error('Upload error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Sunucu hatası' })
    };
  }
};
