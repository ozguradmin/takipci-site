// Cloudflare Worker for upload API
export async function onRequest(context) {
  const { request, env } = context;
  
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    
    // Store in KV
    const key = `ranking_${Date.now()}`;
    await env.TAKIPCI_KV.put(key, JSON.stringify(data));
    
    return new Response(JSON.stringify({ success: true, key }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
