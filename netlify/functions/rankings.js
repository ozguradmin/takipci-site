const { createClient } = require('@libsql/client/web');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const client = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });

    const { date } = event.queryStringParameters || {};
    
    let sql = 'SELECT * FROM video_rankings';
    let args = [];
    
    if (date) {
      sql += ' WHERE date = ?';
      args.push(date);
    }
    
    sql += ' ORDER BY date DESC';

    const result = await client.execute({ sql, args });

    const rankings = result.rows.map(row => ({
      date: row.date,
      rankings: JSON.parse(row.rankings_data)
    }));

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        success: true, 
        data: rankings
      })
    };
  } catch (error) {
    console.error('Rankings error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Sunucu hatası' })
    };
  }
};
