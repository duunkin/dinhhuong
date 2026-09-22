# Hiểu mình — Hiểu nghề

Static research-experience website for “Ứng dụng tâm lý học, nhân cách học vào định hướng nghề nghiệp”.

## Stack
HTML + CSS + vanilla JS. No framework, no animation library, no build step.
Fonts are self-hosted (Fraunces, Be Vietnam Pro; latin + vietnamese subsets; SIL OFL).

## Structure
- `index.html` — six scenes: hero, lenses, model, careers, method, closing
- `css/tokens.css` — three-layer design tokens (primitive, semantic, component)
- `css/fonts.css` — @font-face declarations
- `css/main.css` — all component and layout styles
- `js/main.js` — interaction (shared state, connector geometry, menu, scroll behaviour)
- `data/model-data.js` — person/work items, the four relationships with their evidence status and sources, careers

## Research guardrails
The site deliberately does not present the four person-side lenses as a validated causal model, does not calculate a fit score, and does not recommend a career. It uses person-side and work-side lenses as an exploratory relationship model. Only four pairs are ever drawn; each carries an evidence status and sources in `data/model-data.js`. All other combinations stay open until a source is supplied.

Career profiles are illustrative examples and have not yet been checked entry by entry against O*NET occupation data (see `CHANGELOG_v5.md`, open items).

## Run locally
Serve the folder with any static HTTP server, for example `python3 -m http.server`.
Opening `index.html` directly also works, but Chrome logs harmless warnings about the font preload hints under `file://`.

## Cloudflare Pages
Deploy the folder as a static site with no build command and `/` as the output directory.
