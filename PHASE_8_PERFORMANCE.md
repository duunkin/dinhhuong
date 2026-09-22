# Phase 8 — Performance

Measured for v5:
- HTML + CSS + JS + data: about 78 KB raw, about 20 KB gzip.
- Fonts (self-hosted woff2, latin + vietnamese only): 188 KB in total, about 120 KB for the four files preloaded for first paint. font-display: swap keeps text visible while they load.
- No framework, no animation library, no images, no third-party requests.
- Animation uses opacity, transform and stroke-dashoffset only.
- IntersectionObserver is used for scene behaviour; there are no scroll handlers.
- Connector geometry is recomputed only on selection, resize (ResizeObserver) and font load.

v4 stated ~44 KB and “no web-font dependency”. v5 adds the fonts deliberately: Vietnamese diacritics render poorly in generic serif fallbacks, and the typography is the main visual device.
