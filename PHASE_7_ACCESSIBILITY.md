# Phase 7 — Accessibility

Implemented:
- semantic header / nav / main / section / footer structure, one h1, headings in order;
- skip link;
- native buttons and links only; visible 3px focus ring (mint on dark stages);
- model nodes are buttons with aria-pressed; both sides are selectable and stay in sync;
- career tabs follow the ARIA tabs pattern with roving tabindex and Arrow / Home / End keys; the panel is labelled by the active tab;
- a polite live region announces the selected pair, its evidence status and its question;
- mobile menu: aria-expanded, focus moves into the menu, Tab is trapped, Escape closes and returns focus to the button;
- the current section is marked with aria-current in the navigation;
- evidence status and side (person / work) are never conveyed by colour alone;
- decorative SVG is aria-hidden; external links are announced as opening in a new tab;
- prefers-reduced-motion: all information and state is preserved, only animation is removed;
- text contrast at least 4.5:1 for all text pairs;
- touch targets at least 44px;
- content stays visible if JavaScript fails (the hidden-until-revealed state is only applied when JS runs successfully).

Not yet done: a screen-reader pass with a real assistive technology (VoiceOver / NVDA).
