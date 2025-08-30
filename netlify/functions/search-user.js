const { createClient } = require('@libsql/client/web');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const client = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });

    const { username, date } = JSON.parse(event.body);
    
    if (!username) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Kullanıcı adı gerekli' })
      };
    }

    // Kullanıcıyı ara
    const result = await client.execute({
      sql: `SELECT * FROM video_rankings WHERE date = ? AND rankings_data LIKE ?`,
      args: [date, `%"username":"${username}"%`]
    });

    if (result.rows.length === 0) {
      return {
        statusCode: 404,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: 'Kullanıcı bulunamadı' })
      };
    }

    const rankings = JSON.parse(result.rows[0].rankings_data);
    const userRanking = rankings.find(r => r.username === username);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        success: true, 
        user: userRanking,
        date: result.rows[0].date
      })
    };
  } catch (error) {
    console.error('Search error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Sunucu hatası' })
    };
  }
};
