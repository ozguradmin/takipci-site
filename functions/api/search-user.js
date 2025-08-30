// Cloudflare Worker for search API
export async function onRequest(context) {
  const { request, env } = context;
  
  if (request.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const url = new URL(request.url);
    const username = url.searchParams.get('username');
    
    if (!username) {
      return new Response(JSON.stringify({ error: 'Username required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Search in KV
    const keys = await env.TAKIPCI_KV.list({ prefix: 'ranking_' });
    const results = [];
    
    for (const key of keys.keys) {
      const data = await env.TAKIPCI_KV.get(key.name);
      if (data) {
        const parsed = JSON.parse(data);
        if (parsed.username && parsed.username.toLowerCase().includes(username.toLowerCase())) {
          results.push(parsed);
        }
      }
    }
    
    return new Response(JSON.stringify({ results }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
