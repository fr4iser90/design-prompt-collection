## Concept
The 'Mono Drop Sequence' visualizes the physical force of traditional letterpress printing. It rejects the frictionless nature of digital UI in favor of the heavy, tactile impact of metal type striking paper. The core metaphor is 'weight': gravity-driven drops, canvas shaking on impact, and ink bleeding into the substrate. This is an identity loop for 'Foundry Press', emphasizing craftsmanship and materiality.

## Beat Sheet
**Total Duration:** 6.0s (Loop)
**Aspect Ratio:** 16:9 Full-Bleed

- **0.0s - 1.2s | The Descent:**
  - Screen starts black, flashes to paper texture (#F2E8E1).
  - Letter 'P' (Baskerville, Black weight, #0F0F0F) enters from Y: -100%.
  - Motion blur increases as it falls. Easing: `ease-in` (accelerating).
  - Sound design cue (if audio enabled): Heavy metallic clank anticipated.

- **1.2s - 1.5s | The Impact (Poster Frame):**
  - 'P' hits baseline (Y: 50% center).
  - **Shake:** Canvas container shakes violently for 0.2s (random `translate3d` jitter, amplitude 5px, decaying to 0).
  - **Squish:** 'P' scales Y: 0.95 -> 1.0 immediately after impact.
  - **Ink Bleed Start:** A red (#C41E3A) radial gradient mask expands from the bottom edge of 'P'. Opacity 0 -> 0.6.
  - *Note for Shots Pipeline:* Capture still at 1.5s. 'P' is settled, red bleed is visible but not spread wide.

- **1.5s - 3.0s | The Sequence:**
  - 'R' drops (delay 0.3s after 'P' settles). Impact shake (amplitude 3px). Ink bleed starts.
  - 'E' drops (delay 0.3s). Impact shake.
  - 'S' drops (delay 0.3s). Impact shake.
  - 'S' drops (delay 0.3s). Impact shake.
  - Each letter's ink bleed expands slightly larger than the previous, accumulating visual weight.

- **3.0s - 4.5s | The Hold:**
  - All letters stationary. 
  - Ink bleed animations slow down (easing: `ease-out`), opacity stabilizes at 0.4.
  - 'Foundry Press' (IBM Plex Mono, 14px, tracking 0.2em, #0F0F0F) fades in below the baseline.
  - Paper grain texture subtly animates (noise shift) to maintain life.

- **4.5s - 6.0s | The Fade:**
  - All text and ink effects fade out (opacity 1 -> 0).
  - Background fades to black (#0F0F0F).
  - Loop restarts at 0.0s.

## Poster Frame
**Timestamp:** 1.5s
**Visual State:** 
- The letter 'P' is fully landed on the baseline.
- The canvas has just stopped shaking.
- Red ink (#C41E3A) is visibly seeping from the bottom curve and stem of the 'P', creating a wet, irregular edge against the paper grain (#F2E8E1).
- The rest of the word 'RESS' is off-screen or just beginning to enter.
- High contrast, tactile, focused on the single point of impact.

## Palette
- **Ink:** #0F0F0F (Deep Black, for type and background fade)
- **Paper:** #F2E8E1 (Warm Off-White, textured background)
- **Bleed:** #C41E3A (Crimson Red, for ink spread effect)
- **Role:** High contrast, limited palette to emphasize the 'physical' nature. No gradients except for the ink bleed mask.

## Type
- **Display:** Baskerville (or similar high-contrast Didone serif). Weight: Black/Heavy. Size: Massive (viewport-width relative, e.g., 20vw per letter). Tracking: Tight (-0.05em) to make the word feel dense.
- **Body:** IBM Plex Mono. Weight: Regular. Size: Small (14-16px). Used only for the sub-brand 'Foundry Press'.
- **Rendering:** Ensure anti-aliasing does not soften the 'crisp' edge of the type too much; it should feel like printed ink, not soft digital text.

## Frame
- **Layout:** Centered composition. The word 'PRESS' dominates the horizontal center.
- **Texture:** A subtle, high-frequency noise overlay on the paper background to simulate uncoated stock. This texture must remain visible during the animation to ground the 'print' metaphor.
- **Safe Areas:** Keep the 'Foundry Press' sub-brand within the lower 1/3rd of the screen to avoid clipping in various aspect ratios, though 16:9 is primary.

## Motion
- **Physics:** Simulate gravity. Letters accelerate as they fall. 
- **Impact:** The 'shake' is critical. It must be sharp and brief (0.2s), not a long wobble. Use `requestAnimationFrame` for precise jitter control.
- **Ink Bleed:** Use CSS `filter: blur()` combined with `mix-blend-mode: multiply` on a red layer masked by the letter shape, expanding its scale from the bottom edge. Alternatively, use an SVG mask with an animated gradient stop.
- **Looping:** The fade-out at the end must be smooth enough to mask the cut from 6.0s to 0.0s.

## Constraints
- **No Smooth Fades:** Entrance must be sharp/drop-based. Avoid standard `ease-in-out` for the drop; use `ease-in` for gravity.
- **No UI Elements:** No buttons, no nav, no progress bars.
- **Performance:** Shake effect should not cause layout thrashing. Use `transform` only.
- **Accessibility:** Provide a static fallback or reduced-motion version that shows the final poster frame (full 'PRESS' + 'Foundry Press') without animation.
- **Font Loading:** Ensure Baskerville and IBM Plex Mono are loaded before animation starts to prevent reflow.

## Acceptance Criteria
- [ ] Sequence runs for exactly 6 seconds and loops seamlessly.
- [ ] Letters 'P', 'R', 'E', 'S', 'S' drop in that exact order.
- [ ] A visible 'shake' effect occurs on the canvas/container upon each letter impact.
- [ ] Red ink bleed effect is visible at the bottom edges of letters after impact.
- [ ] Poster frame at 1.5s shows the 'P' landed with red bleed, no other letters visible.
- [ ] 'Foundry Press' appears in IBM Plex Mono below the main wordmark.
- [ ] Background is textured paper (#F2E8E1), not flat white or gradient.
- [ ] No purple glow, no SaaS aesthetics, no rounded UI cards.
