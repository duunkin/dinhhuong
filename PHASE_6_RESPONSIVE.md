# Phase 6 — Responsive

Verified in headless Chromium at 320, 360, 390, 414, 768 and 1440px: no horizontal overflow, no console errors.

- Desktop (above 860px): two-column editorial layouts; the model is a spatial field with a connector measured from the real DOM positions of the selected nodes.
- Tablet and phone (860px and below): single-column narrative. The model becomes sequential: person list, then the pair being examined, then work list. The connector is not drawn; the pair and its evidence status are shown in text between the lists.
- Navigation: below 860px the inline links are replaced by a menu button that opens a sheet with a scrim. (v4 hid the navigation on mobile with no replacement, contrary to what this document claimed.)
- Every link and button is at least 44px tall on mobile (checked by script).
- Career tabs scroll horizontally inside their own container; the page never scrolls sideways.
- Full-height hero uses 100svh; iOS safe-area insets are respected by the header and footer.
- No hover-only interaction is required.
