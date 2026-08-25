# for1337.github.io

Operational dossier for **Leonardo Forconi** — DevOps & Cyber Security Engineer.

Live: **https://for1337.github.io**

The site is structured as a dossier / field manual rather than a portfolio:
stamped headers, breadcrumb file paths, marginalia, a directory tree, a
repos table. No CTA buttons, no contact form, no email or phone — by
design.

## Stack

- Pure HTML, CSS, and vanilla JavaScript. No build step, no framework.
- Dark by default with a light theme toggle (saved in `localStorage`).
- Three typefaces: **Newsreader** (editorial serif, display),
  **Inter** (body), **JetBrains Mono** (metadata, file paths, tree).

## Structure

```
.
├── index.html              27142 bytes  — 8 sections
├── assets/
│   ├── css/styles.css      27291 bytes  — dossier design system
│   └── js/main.js           4192 bytes  — theme, clock, index, reveal
└── README.md
```

## Sections

1. **/dossier/** — cover page: name, role, ID grid, handles, axiom quote
2. **/observe/** — about, with marginalia annotations
3. **/operate/** — experience log (2025+ down to 2014), with git-graph motif
4. **/toolkit/** — `tree`-style skills directory
5. **/scope/** — 4 service areas, asymmetric two-column layout
6. **/repos/** — table of public repos (7 entries)
7. **/file/** — education + languages
8. **/channels/** — GitHub, LinkedIn, blog (no email, no phone)

## Design system

- **Background**: near-black `#0c0a09` (warm, not pure black).
- **Accent**: signal red `#ff3b30`. Used sparingly — only for stamps,
  redacted-bar reveals, status dots, section verbs, ID highlights.
- **Typography**: Newsreader (italic) for display names and pull quotes,
  Inter for body, JetBrains Mono for every file path, timestamp,
  status indicator, and metadata label.
- **Layout**: 12-column asymmetric grid. Stamps in cols 1–3, name in
  cols 4–12, prose in cols 3–9, marginalia in cols 10–12, repos table
  full-width, etc. No two sections share the same column placement.
- **Motifs**: redacted bars that slide off on hover to reveal
  the underlying handle; rubber-stamp rotated text; breadcrumb file
  paths at the top of every section; section markers `02 /observe/`
  with the verb in red.

## Local preview

```bash
python -m http.server 8000
# or
npx serve .
```

Then visit `http://localhost:8000`.

## Deployment

Push to the `main` branch of this repository. GitHub Pages publishes
`https://for1337.github.io` automatically from the root.
