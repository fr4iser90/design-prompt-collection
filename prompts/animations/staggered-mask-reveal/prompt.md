# Staggered Mask Reveal

Create an editorial **staggered mask reveal** for a multi-line display headline.

## Intent
- Cinematic first paint for a case-study or concept page
- Mood: darkroom / print shop — ink and paper

## Hard rules
- Each line sits in an overflow-hidden mask; lines rise (or wipe) with staggered delay.
- Optional character/word split only if it stays legible; prefer line-based masks for performance.
- Pair a characterful display face (e.g. Editorial New / Reckless) with quiet body text.
- Atmospheric background (warm dark grade + grain), not flat.
- Trigger on load and optionally again when scrolled into view (IntersectionObserver), once.
- `prefers-reduced-motion`: show final state immediately.

## Deliver
`demo.html` with the headline, supporting sentence, and CTA text static after reveal. CSS variables + comments for timing tokens.
