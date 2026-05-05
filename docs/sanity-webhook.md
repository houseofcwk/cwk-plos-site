# Sanity webhook → re-deploy on edit

Editorial changes in the Sanity studio need to trigger a fresh production build
so the static site picks up new content. We have two equally-good wirings; pick
one.

## Recommended: Cloudflare Pages deploy hook

One POST URL, no auth, no GitHub round-trip. Simpler.

### One-time setup

1. **Cloudflare → Pages → houseofcwk → Settings → Builds & deployments → Deploy hooks**.
2. Click **Add deploy hook**. Name: `sanity-content-publish`. Branch: `main`.
3. Copy the URL. It looks like
   `https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/<uuid>`.
4. **Sanity Manage → Project → API → Webhooks → Add Webhook**.
   - **Name:** `Production rebuild`
   - **URL:** paste the deploy hook URL
   - **Dataset:** `production`
   - **Trigger on:** Create, Update, Delete
   - **Filter (GROQ):**
     ```
     _type in [
       "siteSettings",
       "homePage",
       "productPage",
       "aboutPage",
       "journeyPage",
       "brandMirrorPage",
       "sideQuestsPage",
       "caseStudy",
       "legalPage"
     ]
     ```
   - **HTTP method:** POST
   - **API version:** `v2024-10-01` (any recent works)
   - **Include drafts:** off
   - Save.
5. Test: edit any field on the Home Page singleton in the studio and **Publish**.
   A new production deploy should appear in Cloudflare Pages within ~10 seconds.

### Why filter on document type?

Without the filter, every keystroke autosave on a draft would fire a build.
Restricting to the doc types the static site renders means we only trigger on
content that actually affects the public site.

## Alternative: GitHub Actions workflow_dispatch

The repo's [.github/workflows/deploy.yml](../.github/workflows/deploy.yml) already
accepts `workflow_dispatch`. To use this path instead of CF deploy hooks:

1. Create a GitHub Personal Access Token with `repo` and `workflow` scopes.
2. In Sanity Manage webhooks, set:
   - **URL:** `https://api.github.com/repos/houseofcwk/website/actions/workflows/deploy.yml/dispatches`
   - **HTTP method:** POST
   - **Headers:**
     - `Authorization: Bearer <token>`
     - `Accept: application/vnd.github+json`
     - `Content-Type: application/json`
   - **Body:**
     ```json
     { "ref": "main", "inputs": { "source": "sanity" } }
     ```
3. Same GROQ filter as above.

The CF deploy hook is preferred — fewer moving parts, no token to rotate.
