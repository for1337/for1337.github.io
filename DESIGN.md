# DESIGN.md — for1337.github.io

> Companion to PRODUCT.md. Captures the visual world, design system, and
> content rules for the site so future iterations stay coherent.

## Visual world: **Engineer's Console**

A single-page instrument that reads like a stripped-down SRE control plane:
typographic, evidence-driven, calm, with a single accent and one live
status signal. The visual language is "the page you'd write if you were
documenting yourself for an on-call handover". It is **not**:

- A glossy SaaS landing page (no hero image, no gradient, no CTA card)
- A magazine layout (no display serif, no drop cap, no pull-quote)
- A template portfolio (no card grid, no icon set, no "skills radar")
- A dossier (no stamps, no redacted bars, no file-path breadcrumbs —
  those were tried in R2 and felt too performative)

## Design pillars

1. **Single column, single accent.** Everything sits in a 760px column.
   The only chromatic accent is `#0a5cff` (electric blue), used sparingly
   for status, links, and emphasis. Nothing else is blue.

2. **Mono for data, sans for prose.** Inter Variable is the body and
   display face (with `ss01`, `cv11` stylistic alternates for a
   distinctive feel). JetBrains Mono carries all data, status, code-like
   chips, and meta labels. Tabular numbers (`tnum`) on every numeric
   block so digits align in columns.

3. **Status indicators that mean status.** A small green pulse dot means
   "available / healthy / actively maintained". It is the only motion
   on the page. No decorative animation, no scroll-reveal theatre.

4. **Evidence, not adjectives.** Every claim is paired with a verifiable
   reference: a GitHub repo (with star count), a period (`2014 → 21`),
   a scale number (`~5,000 endpoints`, `PCI-DSS Level 1`). No marketing
   copy like "passionate" or "results-driven".

5. **One CTA.** The hero, the footer, the contact section, and the only
   link styling all converge on "Open LinkedIn DM". Everything else is
   supportive evidence.

## Color tokens

| Token | Value | Use |
| --- | --- | --- |
| `--bg` | `#0a0a0a` (dark) / `#fafafa` (light) | Page background |
| `--bg-soft` | `#111` / `#f4f4f4` | Subtle fills (note box) |
| `--ink` | `#fafafa` / `#0a0a0a` | Primary text |
| `--ink-2` | `#a1a1a1` / `#555` | Secondary text |
| `--ink-3` | `#6b6b6b` / `#888` | Tertiary (meta, captions) |
| `--line` | `#222` / `#e5e5e5` | Hairline rules |
| `--accent` | `#0a5cff` | Brand dot, links, key emphasis, hero CTA |
| `--accent-2` | `#4a85ff` | Link hover |
| `--accent-soft` | `rgba(10,92,255,.12)` | Selected tab fill |
| `--ok` | `#22c55e` | "Available", "healthy", pulsing status dot |
| `--warn` | `#f59e0b` | "In progress" badge (BSc, etc.) |

The light theme keeps the same accent + status hues (they read fine on
both backgrounds) and only inverts the greys.

## Typography

- **Display & body**: Inter Variable, weights 300 / 400 / 500 / 600 / 700.
  Features enabled: `ss01`, `cv11` (subtle stylistic alternates),
  `cv05` (open digits), `calt` (contextual ligatures).
- **Mono**: JetBrains Mono Variable, weights 400 / 500. `tnum` enabled
  on every numeric block.
- **Scale**: 11 / 12 / 13.5 / 14 / 15 / 17 / 22 / 32 / 48 px.
- **Hero name**: 48px, weight 500, line-height 0.98, tracking -0.035em.
  Italic for the last word (`Engineer.`).
- **Section heads**: 12px mono uppercase, 0.08em tracking, prefixed
  with `/01`–`/07` in accent.

## Layout

- Single column `--maxw: 760px`, side padding `--margin: 32px` (20px on
  mobile, 16px under 480px).
- Section vertical padding: 64px (48px mobile).
- Each section starts with a `/0n` mono prefix + uppercase title, then
  flows into the body.
- Hairline rules (`1px solid var(--line)`) separate sections — no cards,
  no rounded surfaces.
- Mobile: single column collapses gracefully; the about-grid becomes
  1fr; the services 2×2 becomes 1col; the projects table stacks.

## Components

- **Hero status strip**: a single row of mono labels — `status`, `role`,
  `location`, `updated` — each on its own line, left-aligned. The
  `status` row shows a 6px pulsing green dot + "Available for new roles".
- **ID card**: a 4-column definition list (`role / based / tenure /
  open-to`) replacing R4's flat id grid. Adds the explicit "Open to" cell.
- **Skills matrix**: a table — `Domain | Tools | Level`. Level uses a
  3-tier pill: `expert` (filled accent dot), `proficient` (filled
  ink-3 dot), `familiar` (outlined dot). Clean, scannable, not a
  "skills bar chart".
- **Career log**: same as R4 (`100px period | role+org+desc+bullets`).
  Each role's bullets use accent dashes for primary achievement markers.
- **Projects table**: a real `<table>` — `repo | description | lang |
  size | updated | stars`. Compact, scannable, technical.
- **Contact**: the "Note" box stays (no email / no phone). Below it, a
  single primary CTA button "Open LinkedIn" + secondary GitHub + CV
  request line.

## Motion

- One piece of motion on the page: the 6px green status dot pulses
  gently (2.4s, slow easing). It is the only animated element.
- All section content fades in on scroll-into-view, 600ms ease-out,
  8px translateY. Implemented with `IntersectionObserver` so it costs
  nothing for users who never scroll.
- No parallax, no marquee, no animated background, no hover-scaling
  beyond link colour transitions.

## Accessibility floor

- Color contrast: every text-vs-background pair meets WCAG AA at the
  font-size it ships at.
- Focus-visible: 2px accent outline + 2px offset, visible on every
  interactive element.
- Reduced motion: when `prefers-reduced-motion: reduce`, the pulse
  freezes, the scroll-reveal fades become 0ms transitions.
- Semantic HTML: real `<header>`, `<main>`, `<section>`, `<article>`,
  `<table>`, `<dl>`, `<nav>`. No div-soup.
- All images carry `alt` text; decorative SVGs use `aria-hidden="true"`.

## Content rules

- One sentence per claim in the hero / lede.
- Numbers carry units (`10+ years`, `~5,000 endpoints`, `40 km` etc.)
  or they're cut.
- Every project description answers "what problem does this solve",
  not "what is X technology".
- No emoji anywhere.
- No exclamation marks in body copy. The tone is instrument-grade,
  not enthusiastic.
- English only.

## Versioning

- The footer shows `v5` (or higher) in accent + last build date +
  a `source` link to this repo. Bump the version on every shipped
  redesign round.
