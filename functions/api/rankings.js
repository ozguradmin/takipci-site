// Cloudflare Worker for rankings API with cache optimization
export async function onRequest(context) {
  const { request, env } = context;
  
  if (request.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    // Check cache first
    const cache = caches.default;
    const cacheKey = new Request(request.url, request);
    let response = await cache.match(cacheKey);
    
    if (response) {
      return response;
    }
    
    // Get all rankings from KV
    const keys = await env.TAKIPCI_KV.list({ prefix: 'ranking_' });
    const rankings = [];
    
    for (const key of keys.keys) {
      const data = await env.TAKIPCI_KV.get(key.name);
      if (data) {
        const parsed = JSON.parse(data);
        rankings.push(parsed);
      }
    }
    
    // Sort by rank
    rankings.sort((a, b) => (a.rank || 0) - (b.rank || 0));
    
    // Create response with cache headers
    response = new Response(JSON.stringify({ rankings }), {
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=600' // 10 minutes cache
      }
    });
    
    // Store in cache
    context.waitUntil(cache.put(cacheKey, response.clone()));
    
    return response;
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
