export default {
  async fetch(request, env) {

    const url = new URL(request.url);
    const path = url.pathname + url.search;

    const TMDB_BASE = "https://api.themoviedb.org";

    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    const cacheKey = `cache:${path}`;

    const cached = await env.TMDB_CACHE.get(cacheKey);

    if (cached) {
      return new Response(cached, {
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const tmdbUrl = TMDB_BASE + path;

    const headers = {};
    const auth = request.headers.get("Authorization");
    if (auth) headers["Authorization"] = auth;

    const response = await fetch(tmdbUrl, { headers });

    const text = await response.text();

    if (response.status === 200) {
      await env.TMDB_CACHE.put(cacheKey, text, {
        expirationTtl: 600,
      });
    }

    return new Response(text, {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      },
    });
  }
};
