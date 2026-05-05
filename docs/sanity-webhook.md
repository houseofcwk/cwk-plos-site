# Sanity webhook → GitHub Actions re-deploy

Editorial changes in the Sanity studio need to trigger a fresh production build
so the static site picks up new content. We deploy via GitHub Actions
([.github/workflows/deploy.yml](../.github/workflows/deploy.yml)), so the
Sanity webhook calls the **workflow_dispatch** endpoint on the
`houseofcwk/website` repo.

The workflow is already wired to accept `workflow_dispatch` with a `source`
input. No workflow changes are needed — only the GitHub PAT and the Sanity
webhook config.

## Setup (one-time, ~5 minutes)

### 1. Create a fine-grained GitHub Personal Access Token

GitHub → **Settings → Developer settings → Personal access tokens →
Fine-grained tokens → Generate new token**.

| Field | Value |
| --- | --- |
| **Token name** | `sanity-webhook-deploy` |
| **Resource owner** | `houseofcwk` |
| **Expiration** | 1 year (calendar a rotation reminder) |
| **Repository access** | Only select repositories → `houseofcwk/website` |
| **Repository permissions** | `Actions: Read and write` (everything else: No access) |

Generate, **copy the token now** (it won't be shown again).

> Why fine-grained? Classic PATs grant org-wide repo access; a fine-grained
> token scoped to one repo + Actions only is the minimum permission this
> webhook needs. If the token leaks, the blast radius is limited to triggering
> deploys on this one repo.

### 2. Configure the Sanity webhook

[Sanity Manage](https://www.sanity.io/manage/project/3fsa3jok/api) →
**Webhooks → Create webhook**.

| Field | Value |
| --- | --- |
| **Name** | `Production rebuild (GH Actions)` |
| **Description** | Fires deploy.yml on content publish |
| **Dataset** | `production` |
| **Trigger on** | Create, Update, Delete |
| **Filter** (GROQ) | see below |
| **Projection** (= request body) | see below |
| **URL** | `https://api.github.com/repos/houseofcwk/website/actions/workflows/deploy.yml/dispatches` |
| **HTTP method** | `POST` |
| **HTTP Headers** | see below |
| **API version** | `v2024-10-01` (any recent works) |
| **Include drafts** | OFF |
| **Enabled** | ON |

**Filter (GROQ):** restrict to document types the static site renders, so
draft autosaves on unrelated docs don't trigger builds:

```groq
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

**HTTP Headers** (add three rows):

| Header | Value |
| --- | --- |
| `Authorization` | `Bearer <paste the GitHub PAT from step 1>` |
| `Accept` | `application/vnd.github+json` |
| `X-GitHub-Api-Version` | `2022-11-28` |

**Projection** (this becomes the POST request body — GitHub's API expects a
fixed JSON shape, so we use a constant GROQ object literal that ignores the
incoming document):

```groq
{ "ref": "main", "inputs": { "source": "sanity" } }
```

> Sanity webhooks don't have a separate "HTTP body" field. The **Projection**
> field defines the body; GROQ supports object literals, so a constant
> projection lets us send GitHub the fixed payload it requires regardless of
> which document triggered the webhook.

Save.

### 3. Smoke test

1. In the studio, open the Home Page singleton and edit any field.
2. **Publish.**
3. Within ~5 seconds, GitHub → **Actions → Deploy (Pages + API Worker)**
   should show a new run with the badge `workflow_dispatch` and
   `inputs.source = sanity`.
4. After the run completes (~2 min), the production site reflects the edit.

If no run appears: check the Sanity webhook log (Sanity Manage → Webhooks →
the webhook → Attempts). Common causes:
- Missing or wrong `Authorization` header → 401 from GitHub.
- Token doesn't have `Actions: Read and write` → 403.
- Filter too narrow → webhook didn't fire at all.

## Token rotation

The fine-grained PAT expires after the period you set in step 1. Rotation
process:

1. Generate a new fine-grained PAT with the same scope.
2. Update the `Authorization` header in the existing Sanity webhook (don't
   delete the webhook — just edit).
3. Revoke the old PAT in GitHub.

## Why not Cloudflare Pages deploy hooks?

CF Pages deploy hooks bypass GitHub Actions entirely — they trigger CF's
internal build pipeline directly. Since the deploy is owned by
`.github/workflows/deploy.yml` (which also deploys the API Worker as a
side-effect), going through GH Actions keeps the deploy pipeline single-path
and the audit trail unified.
