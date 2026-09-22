# Phase 2 — Visual System (revised in v5)

## Direction
Editorial × Psychology × Human-centered × Research × Interactive Narrative. The v4 structure is kept; the visual layer was redesigned.

## Colour carries information
- Amber = person side. Teal = work side. Ink and pale sage are neutral.
- Every use of colour is paired with a text label or a shape (the evidence status uses a filled, half-filled or outlined circle plus text).
- Dark rounded “stage” panels appear only where the diagram lives: hero teaser, model, closing. The page itself stays light, with tonal bands. This replaces v4's full-bleed alternation of cream and near-black sections.
- All text/background pairs were computed and are at least 4.5:1 (lowest: 5.04:1).

## Type
- Display: Fraunces (variable, optical size axis), roman only, no italic headings, no single-word accents.
- Body: Be Vietnam Pro 400/500/600, designed for Vietnamese.
- No monospace and no ALL-CAPS labels. Labels are sentence case.
- Heading tracking is -0.02em at most: Vietnamese stacked diacritics collide at tighter values (v4 used -0.055em).

## Tokens
Three layers in `css/tokens.css`: primitive → semantic → component. Radius is varied on purpose: 8px inner elements, 14px controls, 28px stages.

## Layout
- Asymmetric splits with a sticky heading column on desktop.
- The model is a centred, full-width stage.
- Single-column sequential composition below 860px.
- Numbers appear only where the content is truly a sequence (the method steps). The v4 scene numbering (“02 / LOOK INWARD”) and English labels (PERSON, WORK, SCROLL) were removed.

## Decision
Relationship Field remains the signature visual language because it supports a research-safe distinction between person-side and work-side characteristics without asserting unsupported causal edges.
