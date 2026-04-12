interface Env {
  WAITLIST: KVNamespace;
}

interface WaitlistEntry {
  joinedAt: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function json(body: object, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...CORS_HEADERS,
    },
  });
}

export async function onRequestOptions(): Promise<Response> {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function onRequestPost(
  context: EventContext<Env, string, Record<string, unknown>>
): Promise<Response> {
  const { env } = context;

  let body: { email?: unknown };
  try {
    body = await context.request.json();
  } catch {
    return json({ error: 'invalid_request' }, 400);
  }

  const rawEmail = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';

  if (!rawEmail || !EMAIL_REGEX.test(rawEmail)) {
    return json({ error: 'invalid_email' }, 422);
  }

  try {
    const existing = await env.WAITLIST.get(rawEmail);

    if (existing !== null) {
      return json({ error: 'already_on_list' }, 409);
    }

    const entry: WaitlistEntry = { joinedAt: new Date().toISOString() };
    await env.WAITLIST.put(rawEmail, JSON.stringify(entry));

    return json({ success: true }, 200);
  } catch {
    return json({ error: 'server_error' }, 500);
  }
}
