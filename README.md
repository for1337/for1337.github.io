# for1337.github.io

Personal site for **Leonardo Forconi** — DevOps & Site Reliability Engineer.
Florence, Italy. Ten years operating critical infrastructure for payment,
energy, and regulated environments. **Open to senior remote / hybrid roles.**

## Stack

- Pure HTML + CSS + JavaScript. No build step, no framework, no dependencies.
- Inter Variable (UI) + JetBrains Mono (metadata) from Google Fonts.
- Single CSS file (`assets/css/styles.css`, ~22 KB) and a single JS file
  (`assets/js/main.js`, ~3.6 KB) for the theme toggle, active-section nav,
  and scroll reveal.

## Design — v5 **Engineer's Console**

A single-page instrument that reads like a stripped-down SRE control plane:
typographic, evidence-driven, calm, with one accent (`#0a5cff` electric
blue) and one live status signal (a 6 px green pulse dot on the hero).

The visual language is "the page you'd write if you were documenting
yourself for an on-call handover". It is **not** a glossy SaaS landing
page, a magazine layout, a template portfolio, or a dossier.

Content is organised into a hero + six numbered sections
(`/01 about`, `/02 services`, `/03 stack`, `/04 career`, `/05 projects`,
`/06 contact`).

## Layout

- Single column, max-width 760 px, padding 32 px (20 px on mobile,
  16 px below 480 px).
- Hairline rules (`1 px solid var(--line)`) separate sections — no
  cards, no rounded surfaces, no shadows-as-decoration.
- Two themes: dark default (operator at night) and light, toggled from
  the topbar. Choice persists in `localStorage`.

## Content rules

- One sentence per claim in the hero and lede.
- Numbers carry units (`10+ years`, `~5,000 endpoints`, `PCI-DSS L1`).
- Every project description answers "what problem does this solve".
- English only.

## Conversion goal

Single objective: **convert a visitor into a LinkedIn DM**. Everything on
the page — the hero CTA, the contact section, the only styled link in the
footer — funnels toward that one action.

**No email, no phone** is published on the site (by design). The contact
section ends with a primary "Open LinkedIn DM" button and a secondary
GitHub link.

## File layout

```
index.html               ~22 KB  — hero + 6 sections, topbar, footer
assets/css/styles.css    ~22 KB  — design system + responsive (320/480/720)
assets/js/main.js        ~3.6 KB — theme toggle, active nav, scroll reveal
PRODUCT.md               subject + career + stack + target reader
DESIGN.md                visual world, color tokens, content rules
README.md                this file
```

## Local preview

```bash
python -m http.server 8766 --bind 127.0.0.1
# then open http://127.0.0.1:8766/
```

## Deploy

`git push origin main` from this directory. GitHub Pages rebuilds in
~20 seconds.

## Content

Last updated 2026-09.
