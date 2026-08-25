# for1337.github.io

Personal site for **Leonardo Forconi** — DevOps & Cyber Security Engineer.
Florence, Italy. Ten years building and operating critical infrastructure.

## Stack

- Pure HTML + CSS + JavaScript. No build step, no framework, no dependencies.
- Inter Variable (UI) + JetBrains Mono (metadata) from Google Fonts.
- Single CSS file (`assets/css/styles.css`, ~17 KB) and a single JS file
  (`assets/js/main.js`, ~3 KB) for the theme toggle and active-section nav.

## Design

R3 — **Linear School**. The site is a single column, max-width 720px,
sticky minimal topbar, with content organised into seven numbered
sections (about, work, services, skills, projects, education, contact).
The accent color is a single electric blue (`#0a5cff`); everything
else is greyscale on either a warm-black (default) or paper (light) bg.

**No CTA buttons, no contact form, no email, no phone** in source.
The only contact paths are GitHub, LinkedIn, and a personal blog link
in section /07.

## File layout

```
index.html               ~22 KB  — 7 sections, topbar, hero, footer
assets/css/styles.css    ~17 KB  — design system + responsive
assets/js/main.js        ~3 KB   — theme toggle, active nav, scroll reveal
README.md                this file
```

## Local preview

```bash
python -m http.server 8000
# then open http://127.0.0.1:8000/
```

## Deploy

`git push origin main` from this directory. GitHub Pages rebuilds in
~20 seconds.

## Content

Last updated 2026-08.
