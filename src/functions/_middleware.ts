// HTTP Basic Auth middleware — protects all pages in preview/production.
// Credentials are stored as Cloudflare Pages secrets:
//   wrangler pages secret put BASIC_AUTH_USER --project-name=houseofcwk
//   wrangler pages secret put BASIC_AUTH_PASS --project-name=houseofcwk
//
// If the secrets are not set (e.g. local dev without wrangler), auth is
// skipped so the site remains accessible.
//
// Reference site (old): cwkexperience.com — this project deploys to houseofcwk.com

interface Env {
  BASIC_AUTH_USER: string;
  BASIC_AUTH_PASS: string;
}

const UNAUTHORIZED = new Response('Unauthorized', {
  status: 401,
  headers: {
    'WWW-Authenticate': 'Basic realm="houseofcwk preview", charset="UTF-8"',
    'Content-Type': 'text/plain',
  },
});

export const onRequest: PagesFunction<Env> = async (context) => {
  const { BASIC_AUTH_USER: username, BASIC_AUTH_PASS: password } = context.env;

  // Skip auth if secrets are not configured (local dev / open deploy)
  if (!username || !password) {
    return context.next();
  }

  // Skip auth for API routes so the waitlist form continues to work
  const { pathname } = new URL(context.request.url);
  if (pathname.startsWith('/api/')) {
    return context.next();
  }

  const auth = context.request.headers.get('Authorization');
  if (!auth?.startsWith('Basic ')) {
    return UNAUTHORIZED;
  }

  // Decode "Basic <base64(user:pass)>"
  let user: string, pass: string;
  try {
    const decoded = atob(auth.slice(6));
    const colon = decoded.indexOf(':');
    if (colon === -1) return UNAUTHORIZED;
    user = decoded.slice(0, colon);
    pass = decoded.slice(colon + 1);
  } catch {
    return UNAUTHORIZED;
  }

  if (user !== username || pass !== password) {
    return UNAUTHORIZED;
  }

  return context.next();
};
