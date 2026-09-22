# Changelog — v5 (from v4-final)

## Bugs found in v4 and fixed
1. **Connector line missed the selected node.** Its y positions were hard-coded (105, 165, 245, 325) against a stretched SVG. It is now computed from the real DOM positions and redrawn on resize and font load.
2. **No navigation on mobile.** The nav was hidden below 900px with no replacement, although PHASE_6 said access was retained. There is now a menu button with a sheet, scrim, focus handling and Escape.
3. **Unselected labels were nearly invisible** (28% opacity, below contrast requirements). Unselected items now keep at least 6.6:1 contrast.
4. **Scroll offset for anchors** was only defined inside the reduced-motion query, so jumping to a section hid its heading under the header. It is now global.
5. **Hero animation replayed after first paint** (hidden state applied after an observer fired). The hero now plays once on load.
6. **Timeline steps never reset** and progress was decorative. Steps now follow scroll and draw the line to the current step.
7. **Tiny type:** many labels were 9–10px monospace. Minimum is now 13px, body 16–17px.
8. **Heading tracking (-0.055em) collided Vietnamese diacritics.** Loosened to -0.02em; Vietnamese-capable fonts are now loaded.
9. Mixed English labels (PERSON, WORK, RELATION SHIP, SCROLL, A SYSTEM TO EXPLORE) on a Vietnamese page replaced with Vietnamese.
10. `data-lastNavigation` dead code removed; missing favicon and Open Graph tags added.

## Phase 1 instructions that v4 documented but did not implement
| Instruction (DIAGRAM_MODEL_AUDIT_PHASE1.md) | v5 |
|---|---|
| §10 Scene 1: compact person ↔ work teaser instead of the four-factor diamond | Hero teaser with two sides and one drawn line |
| §10 Scene 2: “Nhìn vào bản thân qua nhiều lăng kính” | Implemented, each question is tied to its named lens |
| §10 Scene 3: “Đặt hai phía cạnh nhau” as the signature diagram | Implemented |
| §10 Scene 7: return to the relationship field | Closing scene shows the field with an open pair (“?”) |
| §8: selecting a work characteristic reveals the person concept | Both sides are selectable and stay in sync |
| §8: unsupported relationships stay quiet | Only four pairs are drawn; a note says why others are not |
| §7 Risk A: state that geometry is not a measurement | Stated under the diagram |
| §9: status and source are data | `relationships[]` in `data/model-data.js`; shown in the UI |
| §11: copy corrections | Applied; scene 04 no longer duplicates scene 03 |
| Method scene claims “kiểm tra nguồn” | A source list and an explicit “Trang này không làm gì” list were added |

## Design changes
- New palette: amber = person, teal = work, pale sage neutrals. Replaces cream + terracotta.
- New type: Fraunces + Be Vietnam Pro (self-hosted, Vietnamese subsets). No monospace, no ALL-CAPS labels, no italic emphasis words.
- Dark panels only where the diagram lives; the page itself stays light.
- Three-layer design tokens.
- Floating header with current-section indicator.
- Careers scene now reads a profile through the same four work-side items and pairs each with a person-side question.

## Structure
Six scenes instead of seven (scene 04 merged into the model scene, where it duplicated the same interaction). Anchors are now `#hero #lenses #model #careers #method #next`.

## Open items (need a human)
1. **Career profiles are illustrative.** Phase 1 asked for source-backed attributes. The build environment could not reach O*NET, so the profiles were kept as written and labelled on the page as not yet checked against O*NET data. Replace them with O*NET occupation data when available.
2. **Relationship statuses** (`linked`, `occupation`, `domain`) were assigned from the wording in the Phase 1 audit. Please confirm them, especially interests ↔ activities (documented as interests ↔ occupations) and values ↔ work values.
3. **Source URLs** were copied from the Phase 1 audit and could not be opened from the build environment.
4. **Vietnamese copy**: new sentences were written for the reading panel, limits and legend. Have a native editor read them.
5. Real-device pass (iOS Safari) and a screen-reader pass.
