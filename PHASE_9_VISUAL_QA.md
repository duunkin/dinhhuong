# Phase 9 — QA / Issue List (v5)

## Browser-rendered checks — PASS (headless Chromium)
- No horizontal overflow at 320, 360, 390, 414, 768, 1440px.
- No console errors or page errors when served over HTTP.
- Every link and button is at least 44px tall on a 390px viewport.
- Mobile menu: opens, focus moves inside, Escape closes and returns focus, links close it and navigate.
- Two-way selection: choosing a work node selects the paired person node and vice versa.
- Connector end points coincide with the selected dots' centres (checked numerically).
- Career tabs: ArrowRight, ArrowLeft, Home, End work.
- Scroll-spy sets aria-current on the visible section; method steps advance with scroll.
- prefers-reduced-motion: all content and state remain visible.
- Fonts (Fraunces, Be Vietnam Pro) load over both http and file://.
- Contrast: all text pairs computed at 4.5:1 or above.

## Still requires a human
1. A visual pass on a real phone (iOS Safari especially: safe areas, dynamic toolbar).
2. A screen-reader pass (VoiceOver / NVDA) on the model and the career tabs.
3. Reading the Vietnamese copy with a native editor.
4. Checking the six source URLs (copied from DIAGRAM_MODEL_AUDIT_PHASE1.md; they could not be opened from the build environment).
5. Checking each career profile entry against O*NET occupation data (see CHANGELOG_v5.md).
