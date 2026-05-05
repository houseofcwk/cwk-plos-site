// GET /google-reviews
//
// Proxies Google Places API (New) Place Details for the configured CWK place
// and caches the slim response on the Cloudflare edge for 6 hours. Never
// throws to the client: on upstream failure we serve last-good cache with
// `stale: true`, or return an empty payload so the homepage can degrade.

import type { Env } from '../env';
import { corsHeaders, json } from '../lib/cors';

const CACHE_TTL_SECONDS = 6 * 60 * 60;
const CACHE_KEY = 'https://cache.cwk/places-reviews/v1';
const FIELD_MASK = 'id,displayName,rating,userRatingCount,reviews';

interface GoogleReview {
  name?: string;
  text?: { text?: string };
  originalText?: { text?: string };
  rating?: number;
  publishTime?: string;
  relativePublishTimeDescription?: string;
  authorAttribution?: {
    displayName?: string;
    uri?: string;
    photoUri?: string;
  };
}

interface GooglePlaceResponse {
  rating?: number;
  userRatingCount?: number;
  reviews?: GoogleReview[];
}

interface SlimReview {
  author: string;
  profilePhoto: string | null;
  authorUrl: string | null;
  text: string;
  rating: number;
  time: string;
  relativeTime: string;
}

interface SlimPayload {
  rating: number | null;
  total: number;
  reviews: SlimReview[];
  fetchedAt: string;
  stale?: boolean;
}

function slim(g: GooglePlaceResponse): SlimPayload {
  const reviews = (g.reviews ?? []).map((r): SlimReview => ({
    author: r.authorAttribution?.displayName ?? 'Anonymous',
    profilePhoto: r.authorAttribution?.photoUri ?? null,
    authorUrl: r.authorAttribution?.uri ?? null,
    text: r.text?.text ?? r.originalText?.text ?? '',
    rating: r.rating ?? 0,
    time: r.publishTime ?? '',
    relativeTime: r.relativePublishTimeDescription ?? '',
  }));
  return {
    rating: g.rating ?? null,
    total: g.userRatingCount ?? 0,
    reviews,
    fetchedAt: new Date().toISOString(),
  };
}

export async function handleGoogleReviewsGet(_request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  const cors = corsHeaders(env);
  const placeId = env.CWK_PLACE_ID;
  const apiKey = env.GOOGLE_PLACES_KEY;

  // Misconfiguration: degrade to empty payload (200) so the section can hide.
  if (!placeId || !apiKey) {
    return json(
      { rating: null, total: 0, reviews: [], fetchedAt: new Date().toISOString(), configured: false },
      200,
      env,
      { 'Cache-Control': 'no-store' },
    );
  }

  // Cloudflare exposes `caches.default`; cast through unknown so the type check
  // works under Astro's DOM lib too.
  const cache = (caches as unknown as { default: Cache }).default;
  const cacheReq = new Request(`${CACHE_KEY}/${placeId}`, { method: 'GET' });

  // Fast path: edge cache hit.
  const cached = await cache.match(cacheReq);
  if (cached) {
    const body = await cached.text();
    return new Response(body, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': `public, max-age=${CACHE_TTL_SECONDS}`,
        'X-CWK-Cache': 'hit',
        ...cors,
      },
    });
  }

  // Miss: fetch from Google.
  let payload: SlimPayload;
  try {
    const upstream = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
      {
        headers: {
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': FIELD_MASK,
        },
      },
    );

    if (!upstream.ok) {
      const errBody = await upstream.text().catch(() => '');
      console.warn('google-reviews upstream error', upstream.status, errBody.slice(0, 200));
      return json(
        { rating: null, total: 0, reviews: [], fetchedAt: new Date().toISOString(), stale: true, error: 'upstream' },
        200,
        env,
        { 'Cache-Control': 'no-store', 'X-CWK-Cache': 'error' },
      );
    }

    const data = await upstream.json() as GooglePlaceResponse;
    payload = slim(data);
  } catch (err) {
    console.warn('google-reviews fetch threw', String(err));
    return json(
      { rating: null, total: 0, reviews: [], fetchedAt: new Date().toISOString(), stale: true, error: 'network' },
      200,
      env,
      { 'Cache-Control': 'no-store', 'X-CWK-Cache': 'error' },
    );
  }

  const body = JSON.stringify(payload);
  const response = new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': `public, max-age=${CACHE_TTL_SECONDS}`,
      'X-CWK-Cache': 'miss',
      ...cors,
    },
  });

  // Persist on the edge so subsequent requests skip Google entirely.
  ctx.waitUntil(cache.put(cacheReq, response.clone()));
  return response;
}
