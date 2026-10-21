## Concept
This motion graphic simulates the physical behavior of wet ink spreading (bleeding) on uncoated paper stock. It serves as an identity loop for 'Absorb Press', a fictional studio specializing in tactile print media. The piece relies on SVG filter displacement rather than digital blur to achieve a realistic, organic material effect. The aesthetic is editorial-print: monumental typography, high contrast, and clean lines that degrade into organic chaos and resolve back to order.

## Beat sheet
**0.0s – 2.0s: The Strike (Sharp)**
- **Visual:** The word 'INK' appears instantly in solid #000000 Baskerville. Edges are razor-sharp. The caption 'CAPILLARY ACTION SIMULATION' in #808080 Courier New is static below.
- **Physics:** No displacement. Ink is 'on' the paper surface.

**2.0s – 6.0s: The Bleed (Absorption)**
- **Visual:** The edges of the 'INK' glyphs begin to fray and expand outward. The black core remains, but a grey (#808080) halo grows around the characters.
- **Physics:** Capillary action. The `feDisplacementMap` scale increases linearly (or ease-in) from 0 to max intensity. The `feTurbulence` base frequency may subtly shift to mimic finer grain absorption.
- **Texture:** The displacement should look fibrous, not like gaussian blur. The noise pattern must be static in position but the *amplitude* of displacement grows.

**6.0s – 8.0s: The Dry (Recall)**
- **Visual:** The grey halo recedes. The fuzzy edges crisp up. The text returns to the initial sharp black state.
- **Physics:** Evaporation/Drying. Displacement scale returns to 0.
- **Loop:** Seamless transition back to 0.0s.

## Poster frame
**Time:** ~1.5s (Mid-Sharp/Early Bleed transition is less ideal; use 0.0s or 1.0s for maximum clarity, or 4.0s for maximum texture).
**Selected Frame:** 4.0s (Mid-Bleed).
**Description:** The word 'INK' is centered on a #F0F0F0 background. The letters are black, but the edges are heavily displaced, creating a soft, grey, fibrous halo (#808080) that extends about 10-15% of the character height outward. The caption 'CAPILLARY ACTION SIMULATION' is visible below in small monospace. The image looks like a high-res scan of a wet ink blot on rough paper.

## Palette
- **Background:** #F0F0F0 (Uncoated Paper White) – Provides high contrast for black ink.
- **Ink Core:** #000000 (Pure Black) – The solid, unabsorbed pigment.
- **Bleed/Halo:** #808080 (Medium Grey) – The diluted ink at the edges of the capillary spread.

## Type
- **Display:** 'Baskerville', 'Georgia', 'Times New Roman', serif. Weight: Regular or Bold. Size: Massive, filling ~60-70% of viewport width. Tracking: Normal.
- **Body/Caption:** 'Courier New', 'Courier', monospace. Weight: Regular. Size: ~14-18px. Color: #808080. Placed 2rem below the main word.

## Frame
- **Aspect Ratio:** Responsive, ideally 16:9 or full-viewport.
- **Layout:** Centered alignment for both the main word and the caption.
- **Background:** Solid #F0F0F0. No textures in the DOM background (texture comes from the SVG filter on the text).

## Motion
**Implementation Strategy:**
1.  **SVG Structure:** Wrap the text elements in an `<svg>` or `<div>` with `filter: url(#ink-bleed)`.
2.  **Filter Definition:**
    ```xml
    <filter id="ink-bleed">
      <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" result="noise" seed="42" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" />
    </filter>
    ```
3.  **Animation Logic (JS):**
    - Use `requestAnimationFrame`.
    - Track `time` modulo 8000ms.
    - If `t < 2000`: `scale = 0`.
    - If `2000 <= t < 6000`: `scale = lerp(0, 20, (t-2000)/4000)`. Use an easing function (e.g., easeInOutCubic) for a more organic start/stop of the bleed.
    - If `6000 <= t < 8000`: `scale = lerp(20, 0, (t-6000)/2000)`.
    - Update the `scale` attribute of the `feDisplacementMap` element.
4.  **Color Bleed Simulation:**
    - Standard displacement moves pixels. To get the grey edge, we can layer two texts: one black (core) and one grey (halo) slightly larger or with a stroke, OR use a `feColorMatrix` to lighten the displaced pixels if they fall outside a certain threshold (harder). 
    - *Simpler approach:* Just use the displacement on black text. The anti-aliasing + displacement naturally creates softer edges. To enhance the 'grey' look, apply a slight `feComponentTransfer` to lift the blacks to greys at the edges, or simply rely on the visual softness against the light background which reads as grey.
    - *Better approach:* Use `feMorphology` operator='dilate' on the noise channel to expand the displacement area, creating a 'spread' effect.

## Constraints
- **No CSS Blur:** Do not use `filter: blur()`. It looks digital and cheap. The effect must come from displacement/turbulence.
- **Performance:** SVG filters can be heavy. Limit `numOctaves` in `feTurbulence` to 2-3. Ensure the filter region is not excessively large.
- **No Libraries:** Vanilla JS only.
- **Accessibility:** Respect `prefers-reduced-motion`. Show static sharp text.
- **Fonts:** Must load Baskerville/Georgia and Courier New. No Google Fonts required if system fallbacks are used, but web fonts are preferred for consistency.

## Layout & Responsiveness
- **Desktop:** Use a flexbox container centered vertically and horizontally. The main 'INK' text should be sized at `15vw` to dominate the screen. The caption should be `1.5vw`.
- **Mobile:** Media queries should adjust the main text to `20vw` and the caption to `3vw` to ensure readability on smaller devices. Ensure sufficient padding (e.g., `2rem`) on the sides to prevent the displaced edges from clipping off-screen.
- **Filter Region:** Crucially, the SVG filter must have an expanded region (`x="-20%" y="-20%" width="140%" height="140%"`) to allow the displaced pixels to render outside the original bounding box of the text. Without this, the bleed will be cut off abruptly.

## Acceptance criteria
- [ ] The loop runs continuously for 8 seconds without glitches.
- [ ] At 0.0s, the text 'INK' is perfectly sharp and black (#000000).
- [ ] At ~4.0s, the text edges are visibly fuzzy/displaced, extending outward, and the overall impression is 'wet' or 'bleeding'.
- [ ] The displacement looks organic/fibrous, not like a uniform Gaussian blur.
- [ ] The background is strictly #F0F0F0.
- [ ] The caption 'CAPILLARY ACTION SIMULATION' is present and static in Courier New.
- [ ] No scrollbars or UI elements are visible.
- [ ] The animation is smooth (60fps target).
- [ ] Reduced motion mode displays the static sharp text.
- [ ] The layout is responsive and does not clip on mobile or desktop.
- [ ] Deliverable: single-file HTML/CSS/JS.

## Type pairing
Baskerville + Courier New
