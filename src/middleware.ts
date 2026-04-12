import { defineMiddleware } from 'astro:middleware';

// HTTP Basic Auth — protects all pages on houseofcwk.com.
// Reads BASIC_AUTH_USER and BASIC_AUTH_PASS from Cloudflare env (Pages secrets).
// If the secrets are absent (local astro dev), auth is skipped automatically.
// /api/* routes are excluded so the waitlist form works without credentials.

const deny = () =>
  new Response('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="houseofcwk preview", charset="UTF-8"',
      'Content-Type': 'text/plain',
    },
  });

export const onRequest = defineMiddleware(async (context, next) => {
  // Cloudflare env is exposed via locals.runtime (injected by @astrojs/cloudflare)
  const env = (context.locals as any).runtime?.env ?? {};
  const username: string | undefined = env.BASIC_AUTH_USER;
  const password: string | undefined = env.BASIC_AUTH_PASS;

  // No secrets configured → skip auth (safe for local dev)
  if (!username || !password) return next();

  // Waitlist API must remain open for the form submission
  if (context.url.pathname.startsWith('/api/')) return next();

  const auth = context.request.headers.get('Authorization');
  if (!auth?.startsWith('Basic ')) return deny();

  try {
    const decoded = atob(auth.slice(6));
    const colon = decoded.indexOf(':');
    if (colon === -1) return deny();
    if (decoded.slice(0, colon) !== username || decoded.slice(colon + 1) !== password) {
      return deny();
    }
  } catch {
    return deny();
  }

  return next();
});
