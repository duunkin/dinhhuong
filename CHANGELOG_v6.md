# Changelog — v6 (from v5)

v6 is a visual restyle. The information model, the research guardrails, and everything in
`data/model-data.js` are unchanged from v5. This changelog covers style and motion only.

## What was learned from the reference video
The reference was a 29-second vertical screen recording of a laptop showing a dark
portfolio/agency site being scrolled through. Frame-by-frame review (extracted at 1s and
0.5s intervals) showed:
- a near-black page whose background tint shifts as different sections scroll past
- an oversized wordmark intro that shrinks/docks into a small header logo
- a horizontal ticker/marquee band in a bright accent colour, skewed
- pinned "hold the scene, scrub the content" sections while scrolling
- small monospace utility labels next to large serif/display headlines
- a stacked, tag-like project index

Only this structural and motion language was adapted. No text, images, colours, fonts, or
code from the reference were copied; the reference's own brand (PRODUX) and client names are
not used anywhere in this project.

## What v6 changed
- **Palette**: near-black grounds (`--ground-hero`, `--ground-model`, `--ground-careers`,
  `--ground-method`) that crossfade as the person scrolls between sections, replacing v5's
  light sage page with occasional dark panels. Person = amber, work = teal, unchanged from v5.
- **Type**: display headings moved from Fraunces to an uppercase, extended treatment; captions
  and labels moved to JetBrains Mono. Body text stays Be Vietnam Pro.
- **New structural elements not in v5**:
  - a docking wordmark intro (`#dock`, `js/motion.js`)
  - a skewed question ticker (`.ticker`)
  - a large standalone statement scene between the lenses and the model
  - the model section is now a pinned, scroll-scrubbed scene on desktop: scrolling through it
    steps through all four person↔work pairs automatically, one screen-height per pair, while
    the diagram and reading panel update. Below 860px this degrades to the same sequential
    layout v5 used (no pin, no scrub — short viewports make a 3.4x-viewport-height pinned
    section awkward on touch devices).
  - the method section is now a single-open accordion instead of a scroll-progress timeline
  - a giant word at the foot of the footer, echoing the dock intro

## A font defect found during this build
The first pass set the wordmark in Archivo Wide, a variable font with a width axis, pinned
wide to match the reference's extended capitals. At display sizes, Vietnamese's stacked
diacritics (Ể, Ề, and the like) rendered with the tone mark detached from the letter.

This was chased down properly rather than patched around:
1. First hypothesis: the build's own Python instancing of the variable font's width axis had
   broken mark-anchor interpolation. Rebuilt to ship the font still-variable (subset only, no
   instancing) and drive width from CSS `font-stretch` instead — browsers interpolate a real
   variable font's anchors more reliably than a one-off Python instancer.
2. That did not fix it. A same-file, same-glyph, isolated test was run against the completely
   untouched, unsubsetted file straight from Fontsource. It showed the identical defect. That
   ruled out anything this project did to the font — it is a property of Archivo Wide itself
   for these characters.
3. Archivo Wide was dropped. The wordmark now uses Be Vietnam Pro at weight 700 with
   letter-spacing for the extended-capitals look — a font already confirmed correct for
   Vietnamese, so no new risk was introduced.
4. A second, smaller issue surfaced after the font swap: at `line-height: 1`, the tall stacked
   diacritics on the huge display headings visually intruded into the line above, which looks
   identical to a broken mark at a glance but is a layout problem, not a font problem. Fixed by
   raising `line-height` to `1.2` on every rule using the display treatment
   (`.h2`, `.dock`, `.hero-title`, `.statement-text`, `.career-name`, `.footer-word`).

Net effect: no dedicated "wide" display font ships in v6. `--font-wide` in `css/tokens.css`
now points at Be Vietnam Pro, the same family as body text.

## Removed
- The hero's "mosaic tiles" reveal (a `js/motion.js` experiment meant to echo the reference's
  project-tile transitions) was cut after review: at the sizes needed to be visible, the tiles
  read as broken placeholder boxes overlapping real content rather than as decoration. The
  clean two-column SVG diagram was judged to work better alone.

## Verified for this build
- No horizontal overflow at 320–1440px; the ticker is an intentional exception, clipped by its
  own container.
- Every tap target ≥44px on a 390px viewport.
- Two-way model selection still works from either side, on both the desktop scrub and the
  mobile sequential fallback.
- Model scrub reaches all four pairs in order (verified numerically, not just visually) and
  disables itself under `prefers-reduced-motion` and below 860px.
- Career tabs keyboard navigation (Arrow/Home/End) and the method accordion (single-open) work.
- Text contrast recomputed for the new grounds: every text/background pair is ≥6:1 (was ≥4.5:1
  minimum requirement).
- Payload: ~90 KB raw / ~22 KB gzip of HTML+CSS+JS+data; ~110 KB of fonts total, ~22 KB of that
  needed for first paint (down from v5's ~188 KB of fonts, since v6 uses one font family
  instead of two).

## Still open
Everything listed as open in CHANGELOG_v5.md (illustrative career profiles, relationship
statuses to confirm, source URLs to verify, a native Vietnamese copy read, a real-device and
screen-reader pass) is still open and unaffected by this visual restyle.
