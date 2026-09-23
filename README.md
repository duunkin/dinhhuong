# Hiểu mình — Hiểu nghề (v6)

Static research-experience website for "Ứng dụng tâm lý học, nhân cách học vào định hướng nghề nghiệp".

The site walks a reader through seven scenes — hero, lenses, statement, model, careers,
method, closing — built around an exploratory person↔work relationship model. Content is
Vietnamese-first; docs in this repo are English. Everything ships as plain static files.

## Stack
HTML + CSS + vanilla JS. No framework, no animation library, no build step.
Fonts are self-hosted (Be Vietnam Pro, JetBrains Mono; latin + vietnamese subsets; SIL OFL
licenses in `assets/fonts/`).

## What's new in v6
v6 restyles v5 after studying a reference video of a different site (a dark, cinematic
portfolio/agency site with a laptop-recorded scroll-through). The reference's own imagery,
copy and code were not used — only its structure and motion language were studied and
adapted. See CHANGELOG_v6.md for the full list of what was learned and how it was adapted
to stay research-safe, plus an important font lesson from this build.

## Structure
- `index.html` — seven scenes: `#hero`, `#lenses`, `#statement`, `#model` (pinned and
  scroll-scrubbed on desktop, sequential below 860px), `#careers`, `#method`, `#next` (closing)
- `css/tokens.css` — three-layer design tokens (primitive, semantic, component)
- `css/fonts.css` — @font-face declarations, plus why Archivo Wide was rejected
- `css/main.css` — all component and layout styles
- `js/main.js` — interaction (shared state, connector geometry, menu, careers, fold accordion)
- `js/motion.js` — scene motion (line-split reveal, dock header, ground-colour shifts, model scrub)
- `js/stream-field.js` — canvas stream-field experiment from the initial build; not
  currently loaded by `index.html`, kept as reference
- `data/model-data.js` — person/work items, the four relationships with their evidence status and sources, careers
- `data/content.json` — v5-era narrative metadata (core narrative, design dials, motion grammar)
- `assets/fonts/` — self-hosted woff2 subsets + SIL OFL license files
- `assets/icons/favicon.svg`

## Docs
- `CHANGELOG_v6.md` — what changed in v5→v6 and why, including the Archivo Wide
  Vietnamese-diacritics defect
- `CHANGELOG_v5.md` — everything that changed from v4
- `PHASE_STATUS.md` and `PHASE_2_VISUAL_SYSTEM.md` … `PHASE_10_FINAL_INTEGRATION.md` —
  build-phase checklists and findings
- `RESEARCH_MODEL_AUDIT.md`, `DIAGRAM_MODEL_AUDIT_PHASE1.md` — research guardrail audits

## Research guardrails
Unchanged from v5: only four person↔work pairs are ever drawn, each with an evidence status
and sources in `data/model-data.js`. No fit score, no career recommendation. Career profiles
are illustrative examples, not checked against O*NET occupation data.

## Run locally
Serve the folder with any static HTTP server, e.g. `python3 -m http.server`.

## Deploy
- **GitHub Pages (default)** — `.github/workflows/static.yml` deploys the repo root on
  every push to `main`.
- **Cloudflare Pages** — deploy the folder as a static site, no build command, `/` as the
  output directory.
