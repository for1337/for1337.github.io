# PRODUCT.md — for1337.github.io

> Personal site of Leonardo Forconi. **Job-seeking DevOps / SRE portfolio**,
> hosted on GitHub Pages at https://for1337.github.io.

## Subject

| Field | Value |
| --- | --- |
| Name | Leonardo Forconi |
| Handle | `@for1337` (GitHub) / `linkedin.com/in/forconi` (LinkedIn) |
| Based | Rotterdam, NL (UTC+1 / UTC+2 DST) |
| Tenure | 10+ years in IT operations |
| Current role | Cyber Security Engineer @ Leonardo S.p.A. (since 2025) |
| Education | BSc Computer Engineering @ Universitas Mercatorum (in progress, since 2026) |
| Languages | Italian (native), English (B2), Portuguese (A2) |

## Career timeline (most recent first)

1. **2025 → now** — Cyber Security Engineer, Leonardo S.p.A.
   Vulnerability mitigation, security patching, configuration hardening across
   ~5,000 endpoints. .NET / C# apps in air-gapped environments.
2. **2024 → 25** — DevOps Engineer, Cespro.
   CI/CD for distributed systems, IaC migration, internal tooling (.NET).
   Cyber Security lead for the engineering dept.
3. **2021 → 24** — System Administrator, QNT Simple Booking (Zucchetti Group).
   PCI-DSS Level 1 certification, backup / DR, SOP-driven operations.
4. **2014 → 21** — System Administrator, Linea Ufficio 2.
   Hardware / network / middleware / custom tooling for multi-client IT shop.

## Stack

| Domain | Tools |
| --- | --- |
| Container orchestration | Kubernetes, Helm, Docker, Podman |
| IaC | Terraform, OpenTofu, Ansible, SaltStack |
| CI/CD & GitOps | GitLab, GitHub, Bitbucket, Jenkins, ArgoCD, SonarQube, Nexus |
| Networking | TCP/IP, DNS, DHCP, VLAN, VPN, Cilium (eBPF), pfSense, Palo Alto |
| Cyber security | Zero-Trust, Air-gapped, PCI-DSS L1, Falco, Tetragon, Greenbone, Kali |
| Observability | Prometheus, Grafana, Loki, ELK, Hubble (Cilium), Zabbix |
| Load balancing | HAProxy |
| Programming | C# / .NET, Python, Bash / PowerShell, JavaScript |
| Platforms | GNU/Linux, Windows Server, macOS, WordPress, Directus |

## Public GitHub work (10 repos)

| Repo | What it is |
| --- | --- |
| `omarchy-mdns` | Omarchy plugin: mDNS / Avahi network watcher with desktop notifications |
| `netbird_selfhosted_backup_and_restore` ★4 | Backup & restore for self-hosted NetBird — rotation, integrity checks |
| `claude_code_cli_in_container` | Claude Code CLI in a reproducible container, no host pollution |
| `haproxy` | HAProxy configuration recipes — TLS termination, rate limiting, stick tables |
| `espocrm-yaml` | EspoCRM entity definitions in YAML, version-controlled CRM schemas |
| `xmrigScript` | Wrapper around XMRig — config templating, log shipping, graceful shutdown |
| `CopyPaste-on-Base64` | Tiny HTML utility for Base64 encoding / decoding, no upload, no tracking |
| `mercury-agent` (fork) | Local fork of Mercury Agent for internal patches + upstream sync |
| `for1337` (config) | Personal dotfiles / config repo |
| `for1337.github.io` | This site |

GitHub profile: <https://github.com/for1337> (created 2017, 10 public repos, 3 followers).

## Target reader

Primary: **DevOps / SRE hiring managers and tech recruiters** scanning for
candidates. They screen fast — first 10 seconds decide whether they keep
scrolling. The site has to communicate role, seniority, stack, and contact
in one viewport, then earn the deeper read with concrete, verifiable evidence
(projects, repo stars, runbook-grade career descriptions).

Secondary: **fellow engineers** landing from GitHub, looking for evidence that
the person behind the handle ships real work (so the projects list, the
README links, the GitHub avatar matter).

## Goal of the site

Single concrete objective: **convert a visitor into a LinkedIn DM**.

Everything on the page — hero, services, projects, contact — funnels toward
that single action. No email collection, no phone, no newsletter. The path
is: see the site → believe the person is competent → open LinkedIn → send
the message.

## Non-goals

- **Not** a blog. (LinkedIn / `leonardoforconi.com` cover that surface.)
- **Not** a CV download. (Recruiter can DM and ask for the PDF; keeps
  the in-page CTA single and obvious.)
- **Not** a contact form / lead capture.
- **Not** a corporate marketing site. No testimonials, no logos wall, no
  "trusted by" strip.

## Constraints

- GitHub Pages static hosting — no backend, no build step, no dependencies.
- Single repo = single deployment target. Anything shipped here is what the
  visitor sees.
- No frameworks. HTML + CSS + vanilla JS only. The page must load instantly
  on a 3G connection (the visitor is on the train, on the phone).
- Maintainable by Leo alone, without a CI/CD pipeline, from any laptop.
- Multilingual: page content is English (international recruiter audience),
  any copy in Italian would shrink the candidate pool.

## Mode (Impeccable taxonomy)

**Operate** — the visitor's success is "decide if this engineer is worth
contacting, and contact them". Scanability, scannable evidence, and a fast
path to the contact action outrank expression. Brand lives in precise
typography, accurate status indicators, and a coherent control-plane
aesthetic that signals "this person runs production".
