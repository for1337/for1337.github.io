# for1337.github.io

Personal site for **Leonardo Forconi** — DevOps &amp; Cyber Security Engineer.

Live: **https://for1337.github.io**

## Stack

- Pure HTML, CSS, and vanilla JavaScript — no build step.
- Dark by default with a light theme toggle (saved in `localStorage`).
- Self-hosted fonts via Google Fonts (Inter + JetBrains Mono).
- Designed to be accessible, responsive, and print-friendly.

## Structure

```
.
├── index.html              # single-page site
├── assets/
│   ├── css/styles.css      # all styles, dark + light theme
│   └── js/main.js          # theme toggle, mobile nav, scroll reveal
└── README.md
```

## Sections

1. **Hero** — role, tagline, identity card with live status.
2. **About** — professional summary translated from the CV.
3. **Experience** — full timeline (Leonardo S.p.A. → Cespro → QNT Simple Booking → Linea Ufficio 2).
4. **Skills** — 12 grouped categories (Kubernetes, IaC, Cyber Security, …).
5. **Services** — what I can do for a team (platform, observability, security, software).
6. **Projects** — public GitHub repos (netbird backup, mercury-agent, …).
7. **Education &amp; Languages** — BSc in progress + working languages.
8. **Contact** — email, phone, LinkedIn, GitHub, personal blog.

## Local preview

Open `index.html` directly in a browser, or:

```bash
# Python 3
python -m http.server 8000
# Node
npx serve .
```

Then visit `http://localhost:8000`.

## Deployment

Push to the `main` branch of this repository — GitHub Pages publishes
`https://for1337.github.io` automatically from the root.

## Credits

- Identity card "kubectl" line: just for the vibe.
- Icons: inline SVG, no external dependency.
