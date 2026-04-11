# Design System — CWK. PLOS Website

> Compiled from `BIZ_Brand_Guidelines_v1.pdf` and `BIZ_Document_Brand_Standards_v1.pdf`.
> This is the single source of truth for the website build. No deviations.

---

## 1. Brand Essence

| Attribute     | Value |
|---------------|-------|
| **Tagline**   | Build. Learn. Earn. Play. |
| **One-line**  | We build the infrastructure that makes expertise compound. |
| **Category**  | Business Infrastructure / Management Services |
| **Personality** | Precise. Architectural. Dark. Premium. Intentional. |
| **Anti-persona** | Never looks like a life coach, course creator, or marketing agency. |
| **Feeling**   | Walking into a firm that solves serious problems seriously. |
| **Voice**     | Calm authority. No noise. No hype. Just infrastructure. |

### Name Usage

| Format | Status |
|--------|--------|
| CWK. | Correct. Always includes the dot. |
| CWK. Experience | Correct. Full formal name. |
| CWK | Wrong. Never without the dot. |
| Cwk. | Wrong. Always all-caps. |
| C.W.K. | Wrong. No periods between letters. |
| cwk. | Wrong. Lowercase never acceptable. |

---

## 2. Color System

All colors are CSS custom properties. Every asset uses this exact palette. No substitutions.

### Primary Palette

```css
:root {
  --bg:     #07090F;  /* Page background. Foundation of every CWK. asset. */
  --bg2:    #0B0E18;  /* Secondary bg. Cards, panels, elevated surfaces. */
  --bg3:    #101422;  /* Tertiary bg. Tab panels, deep nested elements. */
  --text:   #EEF0FF;  /* Primary text. ALL headings, body, labels. */
  --cyan:   #00E5FF;  /* Primary accent. CTAs, mission bars, header gradients. */
  --purple: #7B61FF;  /* Secondary accent. Gradients, Stage 5, PLOS elements. */
  --pink:   #FB3079;  /* Tertiary accent. Warnings, high-energy moments. */
}
```

### Transparency Variants

```css
:root {
  --glass: rgba(255, 255, 255, 0.03);  /* Card fills, glassmorphic surfaces */
  --gb:    rgba(255, 255, 255, 0.08);  /* Default borders */
  --gb2:   rgba(255, 255, 255, 0.14);  /* Elevated borders, hover states */
  --muted: rgba(238, 240, 255, 0.62);  /* Secondary text, labels */
  --dim:   rgba(238, 240, 255, 0.32);  /* Tertiary text, placeholders, captions */
}
```

### Stage / Status Colors

Reserved for progress indicators and status UI. Do not use as general brand accents.

| Stage | Name | Hex | Use |
|-------|------|-----|-----|
| 01 | Survival / Error | `#FF4444` | Danger states, error indicators |
| 02 | Stuck / Warning | `#FF7A30` | Warning states |
| 03 | Breakthrough / Caution | `#FFB830` | Caution states |
| 04 | Refinement | `#00E5FF` | Shares `--cyan` |
| 05 | Growth-Ready | `#7B61FF` | Shares `--purple` |
| 06 | Sovereign / Success | `#00E396` | Complete / success state |

---

## 3. Typography

### Primary Typeface: DM Sans

| Property | Value |
|----------|-------|
| Family | DM Sans |
| Source | Google Fonts |
| Import | `fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800;900` |
| Weights | 300, 400, 500, 600, 700, 800, 900 |
| Fallback | `sans-serif` |
| Usage | Every single web element. No exceptions. |

### Accent Typeface: Agrandir

| Property | Value |
|----------|-------|
| Family | Agrandir (PP Agrandir) |
| Source | `fonts.cdnfonts.com/css/agrandir` |
| Usage | Display headlines only. Hero text, stage titles, major impact moments. |
| Fallback | DM Sans weight 800 |
| Limit | Sparingly. One element per screen maximum. |

### Type Scale

| Style | Size | Weight | Line Height | Use |
|-------|------|--------|-------------|-----|
| Display / Hero | 48-56px | 800 | 1.1-1.15 | Page titles, hero headlines |
| H1 | 32-36px | 700-800 | 1.2 | Section titles, primary headings |
| H2 | 22-26px | 700 | 1.3 | Sub-section headers, card titles |
| H3 | 16-18px | 600-700 | 1.4 | Component labels, tertiary headers |
| Body | 14-16px | 400-500 | 1.5-1.6 | All body copy, descriptions |
| Small / Caption | 11-13px | 400-500 | 1.4 | Labels, metadata, footnotes |
| Micro / Tag | 9-11px | 600-700 | 1.3 | Eyebrow labels, status tags |

### Eyebrow / Label Style

```css
.eyebrow {
  font-size: 9-11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.35-0.5em;
  color: var(--pink);    /* #FB3079 for primary CWK. labels */
  /* color: var(--cyan); for feature / module labels */
}
```

---

## 4. Background and Atmosphere

Three layers create the signature look. All three are required.

### Layer 1: Page Background

```css
html, body {
  background-color: #07090F; /* var(--bg) */
}
```

Never white. Never light. Never off-black. This exact hex. Must be set on both `html` and `body`.

### Layer 2: Ambient Orbs

| Orb | Color | Size | Position | Filter |
|-----|-------|------|----------|--------|
| Orb 1 (cyan) | `rgba(0, 229, 255, 0.04)` | 600x600px | top: -200px, left: -200px | `blur(140px)` |
| Orb 2 (purple) | `rgba(123, 97, 255, 0.05)` | 500x500px | bottom: -100px, right: -100px | `blur(140px)` |
| Orb 3 (pink) | `rgba(255, 45, 120, 0.04)` | centered | optional, high-energy pages only | `blur(140px)` |

All orbs: `position: fixed`, `pointer-events: none`, `z-index: 0`.

### Layer 3: Noise Texture Overlay

```css
body::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.5;
  /* SVG feTurbulence fractalNoise, baseFrequency 0.9, numOctaves 4 */
}
```

**NOT OPTIONAL.** Missing the noise overlay breaks the premium feel.

---

## 5. Glassmorphism and Card System

```css
.card {
  background: var(--glass);            /* rgba(255,255,255,0.03) */
  border: 1px solid var(--gb);         /* rgba(255,255,255,0.08) */
  border-radius: 12-16px;             /* 8px for components, 100px for pills */
  backdrop-filter: blur(12-20px);
  box-shadow: 0 4px 24px rgba(0,0,0,0.4);  /* elevated cards only */
}

.card:hover {
  border-color: var(--gb2);           /* rgba(255,255,255,0.14) */
  transform: scale(1.01);
}
```

### Surface Hierarchy

| Surface | Value | Use |
|---------|-------|-----|
| Page | `#07090F` | The base. Nothing sits below this. |
| Section bg | `#0B0E18` | Large panel backgrounds, tab content areas. |
| Card bg | `rgba(255,255,255,0.03)` | Standard card. Glassmorphic. |
| Card elevated | `rgba(255,255,255,0.06)` | Hover state or featured card. |
| Accent chip | `rgba(0,229,255,0.12)` | Cyan-tinted tag or label background. |
| Deep inset | `#101422` | Nested content, code blocks, data tables. |

---

## 6. Spacing and Layout

### The 2px Gap Rule

`gap: 2px` between all major stacked elements: cards, panels, rows, sections.
This creates the stacked tile effect that reads as architectural and precise.
**Do not increase. 8px or 16px destroys the effect.**

### Spacing Tokens

| Property | Value |
|----------|-------|
| Block gap | `2px` between stacked major elements |
| Card padding (large) | `36px 40px` (hero cards, feature panels) |
| Card padding (standard) | `22px 26px` (standard cards, script blocks) |
| Card padding (compact) | `14px 18px` (chips, tags, dense rows) |
| Section top padding | `72px` above major sections with eyebrow labels |
| Page max-width | `800px` for single-column tools and documents |
| Page padding | `0 24px 120px` |
| Mobile padding | `0 14px 80px` at 640px breakpoint |

### Grid System

| Layout | Value |
|--------|-------|
| Default | `display: grid` |
| Two column | `grid-template-columns: 1fr 1fr; gap: 2px` |
| Three column | `grid-template-columns: repeat(3, 1fr); gap: 2px` |
| Asymmetric | `grid-template-columns: 2fr 1fr` (content + sidebar) |
| Mobile break | 640px: all grids collapse to `1fr` |

---

## 7. Motion and Animation

### Primary Keyframe

```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

| Usage | Spec |
|-------|------|
| Page / hero on load | `animation: fadeUp 0.6s both` |
| Panel on switch | `animation: fadeUp 0.4s both` |
| Card on appear | `animation: fadeUp 0.3s both` |
| Staggered items | `animation-delay: 0.05s` increments per item |
| Hover transitions | `transition: all 0.2s ease` |
| Scale on hover | `transform: scale(1.01)` (cards, interactive elements) |
| Button active | `transform: scale(0.98)` (pressed state) |
| **NEVER** | Spring, elastic, or bounce easing |

---

## 8. Component Patterns

### Navigation

| Property | Value |
|----------|-------|
| Position | `fixed top`, `backdrop-filter: blur(20px)` |
| Background | `rgba(7, 9, 15, 0.85)` |
| Border | `1px solid rgba(255,255,255,0.08)` bottom only |
| Height | `60-70px` |
| Brand mark | Left-aligned. `--text` color. Dot optionally `--cyan`. |
| Nav items | Right-aligned. 12-13px. 500 weight. `--muted` default, `--text` on hover. |

### Buttons

| Type | Spec |
|------|------|
| Primary | `bg: --cyan`, `color: --bg`, `font-weight: 700`, `border-radius: 8px`, `padding: 12px 24px` |
| Secondary | `bg: transparent`, `border: 1px solid --cyan`, `color: --cyan` |
| Danger | `bg: #FF4444` or transparent with `#FF4444` border |
| Ghost | `bg: rgba(255,255,255,0.06)`, `color: --text`, `border: 1px solid --gb` |
| Hover | `brightness(1.1)` primary, bg fill secondary, `opacity: 0.9` ghost |
| Font | 13-14px, weight 600-700, no text-transform |

### Tags and Pills

```css
.tag {
  background: rgba(0, 229, 255, 0.1);   /* cyan variant */
  border: 1px solid rgba(0, 229, 255, 0.25);
  color: #00E5FF;
  border-radius: 100px;
  padding: 4px 12px;
  font-size: 10-11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

Purple variant: `rgba(123, 97, 255, 0.1)` bg, `#7B61FF` color.

### Dividers

| Type | Value |
|------|-------|
| Standard | `1px solid rgba(255,255,255,0.08)` (`--gb`) |
| Accent | `2px solid --cyan` or `--pink` for section emphasis |
| Gradient | `linear-gradient(90deg, transparent, --cyan, transparent)` |
| Section rule | `hr` with `opacity: 0.15` or `border-color: --gb` |

---

## 9. Gradients

| Gradient | Spec | Use |
|----------|------|-----|
| Hero text | `linear-gradient(135deg, #00E5FF, #7B61FF)` with `background-clip: text`, `-webkit-text-fill-color: transparent` | Primary hero headline on key landing pages |
| Ambient bg | `linear-gradient(180deg, #07090F 0%, #0B0E18 100%)` | Subtle section backgrounds for depth |
| Accent border | `linear-gradient(135deg, #00E5FF, #7B61FF)` as `border-image` | Featured card borders, active states |
| Glow effect | `box-shadow: 0 0 0 1px rgba(0,229,255,0.4)` | Alternative to gradient border |

---

## 10. Language Standards

| Rule | Meaning |
|------|---------|
| CWK. always has the dot | Every instance. Headers, footers, body, tables, captions. |
| No em dashes | Use a colon or a period. Em dashes are not part of the CWK. voice. |
| No force negatives | Lead with what something IS. Never "not this, not that." State it directly. |
| Plain language | 5th grade reading level. Even simpler for client-facing. |
| No AI writing patterns | No "Moreover", "Furthermore", "It is worth noting." Write how you talk. |
| Proprietary terms first | Use the glossary. Structural Fragility. Founder Dependency. Not generic business speak. |
| Positive and declarative | Every recommendation leads with a clear action. Not "you might consider." State it. |
| Confidential in footer only | Never in body text. |

---

## 11. Do / Do Not

### DO

- Dark background on every external asset
- DM Sans all weights, all elements (web)
- 2px gaps between all stacked elements
- Explicit color on every text element
- rgba transparency for glass surfaces
- Noise texture overlay via SVG
- Cyan as primary accent
- Pink (`#FB3079`) for eyebrow labels
- Subtle ambient orbs at low opacity
- All caps + letter-spacing for eyebrow labels
- `fadeUp` at 0.3-0.6s for reveals
- CWK. with the dot. Always.
- Single typeface (DM Sans for web)

### DO NOT

- Light or white backgrounds on any CWK. surface
- Mixing typefaces (no Roboto, Inter, or other sans-serif)
- 8px or 16px gaps that destroy the architectural tile effect
- Relying on browser default black in dark interfaces
- Solid opaque cards that look flat
- Skipping the noise overlay
- Using cyan as a background or fill color
- Cyan for eyebrows (pink is the default eyebrow color)
- Bright or high-opacity orbs that compete with content
- Sentence case for eyebrow or section labels
- Aggressive animations, bounces, or elastic easing
- CWK without the dot under any circumstances
- Decorative fonts, script fonts, or second sans-serif

---

## 12. Critical Rules (Non-Negotiable)

1. **Every text element needs explicit color.** Never rely on browser default black. Declare color on every heading, paragraph, span.
2. **DM Sans on everything.** No mixing typefaces. All 7 weights loaded. Right weight for the right role.
3. **The 2px gap is intentional and fixed.** Do not increase. The gap creates the architectural stacked-tile look.
4. **Noise overlay goes on top of everything.** `body::before`, `z-index: 9999`, `pointer-events: none`.
5. **Background must be set on `html` AND `body`.** Some renderers default to white.
6. **Glass cards need explicit border.** rgba fill is nearly invisible without it. Always pair fill with `border: 1px solid var(--gb)`.
7. **Never light backgrounds on external assets.** CWK. is always dark. No light mode. No white cards. No beige.
8. **No em dashes in any document.** Use a colon or a period.

---

## 13. Implementation CSS (Ready to Use)

```css
/* CWK. Design System — global.css */

@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800;900&display=swap');

:root {
  /* Primary Palette */
  --bg:     #07090F;
  --bg2:    #0B0E18;
  --bg3:    #101422;
  --text:   #EEF0FF;
  --cyan:   #00E5FF;
  --purple: #7B61FF;
  --pink:   #FB3079;

  /* Transparency */
  --glass:  rgba(255, 255, 255, 0.03);
  --gb:     rgba(255, 255, 255, 0.08);
  --gb2:    rgba(255, 255, 255, 0.14);
  --muted:  rgba(238, 240, 255, 0.62);
  --dim:    rgba(238, 240, 255, 0.32);

  /* Stage Colors */
  --stage-1: #FF4444;
  --stage-2: #FF7A30;
  --stage-3: #FFB830;
  --stage-4: #00E5FF;
  --stage-5: #7B61FF;
  --stage-6: #00E396;

  /* Typography */
  --font-primary: 'DM Sans', sans-serif;

  /* Spacing */
  --gap-tile:    2px;
  --pad-lg:      36px 40px;
  --pad-md:      22px 26px;
  --pad-sm:      14px 18px;
  --section-top: 72px;
  --page-max:    800px;

  /* Radii */
  --radius-card:      14px;
  --radius-component: 8px;
  --radius-pill:      100px;
}

html, body {
  background-color: var(--bg);
  color: var(--text);
  font-family: var(--font-primary);
  font-size: 15px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

/* Noise Texture Overlay */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.5;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px 256px;
}

/* Ambient Orbs */
.orb-cyan {
  position: fixed;
  top: -200px;
  left: -200px;
  width: 600px;
  height: 600px;
  background: rgba(0, 229, 255, 0.04);
  border-radius: 50%;
  filter: blur(140px);
  pointer-events: none;
  z-index: 0;
}

.orb-purple {
  position: fixed;
  bottom: -100px;
  right: -100px;
  width: 500px;
  height: 500px;
  background: rgba(123, 97, 255, 0.05);
  border-radius: 50%;
  filter: blur(140px);
  pointer-events: none;
  z-index: 0;
}

/* Primary Animation */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

---

## 14. Logo Specifications

| Property | Value |
|----------|-------|
| Primary background | `#07090F` (var(--bg)) |
| Logo color | `#EEF0FF` (var(--text)) with optional `#00E5FF` dot |
| Minimum size | 16px / 12pt |
| Clear space | Equal to the height of the K on all sides |
| Never place on | White, light gray, or any background reducing contrast below 7:1 |

---

## 15. File Naming Convention

```
BIZ_[File_Name]_v[#]   — Business Brand (CWK. Experience)
PB_[File_Name]_v[#]    — Personal Brand
```

- Underscores only. No spaces.
- Version number incremented on every material update.
- Examples: `BIZ_Brand_Guidelines_v1.pdf`, `BIZ_Leak_Map_Client_v1.pdf`
