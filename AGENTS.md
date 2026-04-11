# AGENTS.md — CWK PLOS Website

## Project Identity

- **Product:** CWK. Experience — PLOS Product Website
- **Type:** Static marketing/product site
- **Tagline:** "The sports agent for entrepreneurs."
- **Philosophy:** Build. Learn. Earn. Play.
- **Target URL:** cwkexperience.com (Cloudflare Pages)

## Tech Stack

| Layer         | Technology                                |
|---------------|-------------------------------------------|
| Framework     | Astro (latest stable)                     |
| Language      | TypeScript (strict)                       |
| Styling       | Scoped CSS + global CSS variables         |
| Content       | Astro Content Collections (Markdown/MDX)  |
| Islands       | React (for interactive components only)   |
| Deployment    | Cloudflare Pages                          |
| Analytics     | Cloudflare Web Analytics                  |
| Fonts         | Inter (body), DM Sans (editorial/display) |

## Architecture Rules

- **Static-first** — every page should be statically generated at build time. No SSR unless explicitly required.
- **Islands architecture** — interactive components (quiz, forms) use Astro's `client:*` directives. Default to `client:visible` for lazy hydration.
- **Content Collections** — all case studies, portfolio items, and articles live in `src/content/` as Markdown/MDX with typed frontmatter schemas.
- **No JavaScript by default** — pages ship zero JS unless an island component is present. This is Astro's default; preserve it.
- **Scoped styles** — use `<style>` blocks in `.astro` files for component-scoped CSS. Global styles live in `src/styles/global.css`.
- **SEO-first** — every page must have: `<title>`, `<meta name="description">`, Open Graph tags, canonical URL. Use a shared `<SEO>` component.
- **Responsive** — mobile-first design. Breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl).

## File Conventions

```
cwk-plos-site/
├── astro.config.mjs           # Astro config (Cloudflare adapter, integrations)
├── package.json
├── tsconfig.json
├── public/                    # Static assets (favicons, robots.txt, images)
│   ├── favicon.svg
│   ├── robots.txt
│   ├── og-image.png           # Default Open Graph image
│   └── images/                # Optimized images
├── src/
│   ├── layouts/               # Page layouts
│   │   ├── Base.astro         # HTML shell: <head>, fonts, analytics, footer
│   │   └── Article.astro      # Layout for case study / article pages
│   ├── components/            # Reusable UI components
│   │   ├── Header.astro       # Global navigation
│   │   ├── Footer.astro       # Global footer
│   │   ├── Hero.astro         # Homepage hero section
│   │   ├── PillarCard.astro   # Mind/Body/Soul/Pocket card
│   │   ├── CaseStudyCard.astro
│   │   ├── SEO.astro          # Meta tags component
│   │   └── BrandMirror.tsx    # Interactive quiz (React island)
│   ├── pages/                 # File-based routing
│   │   ├── index.astro        # Homepage
│   │   ├── about.astro        # About Kris
│   │   ├── work.astro         # Portfolio grid
│   │   ├── work/[slug].astro  # Individual case study pages
│   │   ├── brand-mirror.astro # Brand Mirror quiz page
│   │   ├── side-quests.astro  # Side quests page
│   │   └── 404.astro          # Custom 404
│   ├── content/               # Content Collections
│   │   ├── config.ts          # Collection schemas
│   │   └── work/              # Case study markdown files
│   │       ├── the-lab-miami.md
│   │       ├── rob-dial.md
│   │       ├── spraycation.md
│   │       ├── dawa.md
│   │       ├── stephy-lee.md
│   │       ├── raasin-in-the-sun.md
│   │       ├── pay-the-creators.md
│   │       └── lifes-tapestry.md
│   └── styles/
│       └── global.css         # CSS variables, resets, typography, brand system
└── docs/                      # Project documentation (not deployed)
```

## Brand Design System

### CSS Variables

```css
:root {
  /* Backgrounds */
  --color-bg-deep: #0a0a0a;
  --color-bg-card: #141414;
  --color-bg-elevated: #1a1a1a;

  /* Text */
  --color-text-main: #ffffff;
  --color-text-body: #e5e7eb;
  --color-text-muted: #a3a3a3;

  /* Borders */
  --color-border: rgba(255, 255, 255, 0.1);
  --color-border-hover: rgba(255, 255, 255, 0.2);

  /* Action Gradient */
  --color-gradient-blue: #38b2f6;
  --color-gradient-purple: #b721ff;
  --action-gradient: linear-gradient(90deg, #38b2f6 0%, #b721ff 100%);

  /* Semantic */
  --color-success: #2ecc8f;
  --color-warning: #f5a623;
  --color-danger: #f55555;

  /* Typography */
  --font-body: 'Inter', system-ui, sans-serif;
  --font-display: 'DM Sans', 'Inter', system-ui, sans-serif;

  /* Spacing */
  --space-section: clamp(4rem, 8vw, 8rem);
  --space-content: clamp(1.5rem, 3vw, 3rem);
  --max-width: 1200px;
}
```

### Typography Scale

- **Hero:** 52px / 800 weight / -0.03em / DM Sans
- **H1:** 36px / 800 weight / -0.02em
- **H2:** 28px / 700 weight / -0.01em
- **H3:** 20px / 700 weight
- **Body:** 16px / 400 weight / 1.6 line-height / Inter
- **Small/Caption:** 14px / 500 weight / muted color
- **Eyebrow:** 10px / 700 weight / 0.35em tracking / uppercase

### Button Styles

- **Primary (Action):** `background: var(--action-gradient)`, white text, 8px radius, purple glow shadow
- **Ghost:** transparent bg, 1px border, muted text, hover reveals border
- **Text link:** gradient underline on hover

## Coding Patterns

- **TypeScript** — use `.ts` and `.tsx` for all scripts and React components.
- **Astro components** — use `.astro` for all static components. Only use React (`.tsx`) for interactive islands.
- **Props** — type all Astro component props with `interface Props {}` at the top.
- **Image optimization** — use Astro's `<Image>` component from `astro:assets` for all images. Provide `width`, `height`, and `alt`.
- **Semantic HTML** — use `<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`. No `<div>` soup.
- **Accessibility** — all interactive elements need focus states. All images need alt text. Maintain logical heading hierarchy.
- **Content Collections** — define schemas in `src/content/config.ts` using Zod. Access via `getCollection()` and `getEntry()`.

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `PUBLIC_SITE_URL` | Canonical site URL (for SEO/OG tags) |
| `PUBLIC_CF_ANALYTICS_TOKEN` | Cloudflare Web Analytics beacon token |

## Domain Vocabulary

| Term | Meaning |
|------|---------|
| PLOS | Personal Lifestyle Operating System — CWK's proprietary framework |
| Four Pillars | Mind, Body, Soul, Pocket |
| Brand Mirror | Free 2-min diagnostic quiz identifying business bottlenecks |
| X-Ray | Proprietary diagnostic audit of a client's business |
| Brand Destination | A 60–120 day goal sprint with milestones |
| Player | A CWK client/entrepreneur |
| Brand Guide | Admin coach (Kris San / team) |
| Sovereignty Score | Composite metric across 6 leverage dimensions |
| System Tags | codify, create, connect, convert (4 action categories) |
| Action Gradient | The brand's signature blue→purple gradient |

## SEO Requirements

- Every page needs unique `<title>` and `<meta name="description">`
- Open Graph: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
- Twitter Card: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- Canonical URLs on every page
- Structured data (JSON-LD) on homepage and case studies
- `sitemap.xml` generated by `@astrojs/sitemap`
- `robots.txt` in `public/`
