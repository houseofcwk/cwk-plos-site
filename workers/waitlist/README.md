# CWK. Waitlist Worker

Standalone Cloudflare Worker for the PLOS waitlist. Deploys to
`api.houseofcwk.com` and handles email-capture + confirmation-email
delivery via Resend. Migrated out of the Astro app (previously at
`src/pages/api/waitlist.ts`) so the marketing site can be served as
pure static assets.

## Routes

- `POST /waitlist` — accept `{ email }`, validate, dedupe in KV, and
  fire-and-forget a confirmation email via Resend.
- `OPTIONS /waitlist` — CORS preflight. `Access-Control-Allow-Origin`
  is set from the `ALLOWED_ORIGIN` var (`https://houseofcwk.com` in
  production, `https://houseofcwk.pages.dev` in preview).
- `GET /healthz` — returns `{ ok: true }` for smoke tests.

## Environments

`wrangler.toml` defines two environments:

- **Preview** (default, `wrangler dev` / `wrangler deploy`): talks to
  the preview KV namespace, allows the pages.dev origin.
- **Production** (`wrangler deploy --env production`): binds to the
  `api.houseofcwk.com` custom domain, uses the production KV namespace
  (same id as the previous Pages deployment, so existing waitlist
  entries carry over), allows the `houseofcwk.com` origin.

## Secrets

`RESEND_API` is the only secret. Set it once per environment:

```bash
cd workers/waitlist
wrangler secret put RESEND_API                 # preview
wrangler secret put RESEND_API --env production # production
```

All other config (`FROM_EMAIL`, `FROM_NAME`, `REPLY_TO_*`,
`ALLOWED_ORIGIN`, `ENVIRONMENT`) lives in `[vars]` / `[env.production.vars]`
in `wrangler.toml`.

## Local development

```bash
cd workers/waitlist
npm install
npm run dev            # wrangler dev on http://localhost:8787
npm run typecheck      # tsc --noEmit against @cloudflare/workers-types
```

Smoke-test locally:

```bash
curl http://localhost:8787/healthz
curl -X POST http://localhost:8787/waitlist \
  -H 'Content-Type: application/json' \
  -d '{"email":"test@example.com"}'
```

## Deploy

```bash
cd workers/waitlist
npm run deploy                       # preview (cwk-waitlist)
wrangler deploy --env production     # production (cwk-waitlist-prod)
```

## One-time Cloudflare dashboard setup

The production worker binds `api.houseofcwk.com` via `custom_domain`
routes in `wrangler.toml`. The first deploy provisions the custom
domain automatically, but you need:

1. The `houseofcwk.com` zone active on the Cloudflare account running
   `wrangler deploy`.
2. No conflicting DNS record for `api.houseofcwk.com` — Cloudflare
   creates the proxied record itself when the custom domain is added.

After the first successful `wrangler deploy --env production`, verify
`https://api.houseofcwk.com/healthz` returns `{"ok":true}`.
