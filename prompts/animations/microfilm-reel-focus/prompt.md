# Microfilm Reel Focus

Simulate the optical focus of a microfilm reader. 

**Visual Rules:**
- Background: Light grey (#e0e0e0) with a subtle vignette.
- Text: Dark grey (#2b2b2b).
- Accent: A single, small 'Focus Lock' indicator in Green (#00ff00).

**Motion Brief:**
1. **State A (Out of Focus):** Text has `filter: blur(4px)` and `opacity: 0.6`.
2. **State B (In Focus):** Text has `filter: blur(0px)` and `opacity: 1`.
3. **Transition:** Use a scroll-linked animation or a slider drag. As the user scrolls/controls, the blur reduces non-linearly (quick sharpness at the end).
4. **Feedback:** When blur < 1px, the Green Focus Lock indicator lights up/pulses once.
5. **Ambient:** A very faint horizontal scanline (1px, low opacity) moves vertically to mimic a projector gate.

**Constraints:**
- Do NOT use heavy CSS filters if performance is a concern; use SVG filters if needed.
- Keep the motion mechanical, not floaty.
