Create a 6-second looping motion graphics sequence titled 'Mono Drop Sequence' for a fictional brand 'Foundry Press'. The aesthetic is editorial-print, focusing on the physical weight and tactile reality of letterpress typography. Avoid smooth digital transitions; embrace the clunky, heavy impact of mechanical printing.

**Visual Style & Assets:**
- **Background:** Full-bleed textured paper (#F2E8E1) with subtle grain. No gradients, no SaaS glow.
- **Typography:** The word 'PRESS' in a massive, high-contrast serif (Baskerville or similar Didone). Weight: Black/Heavy. Color: #0F0F0F (Ink). 
- **Sub-brand:** 'Foundry Press' in IBM Plex Mono, small, tracking-wide, appearing below the main wordmark.
- **Accent:** Red ink (#C41E3A) used only for the 'bleeding' effect at impact points.

**Animation Sequence (6s Loop):**
1. **0.0s - 1.2s (The Drop):** Black screen fades instantly to paper texture. The letter 'P' drops from above viewport. Motion blur is applied via CSS `filter: blur()` or canvas rendering during descent. Speed is high, accelerating slightly (gravity feel).
2. **1.2s - 1.5s (Impact):** The 'P' hits the baseline. Trigger a sharp, short canvas shake (`transform: translate3d` with random jitter, decaying quickly). The 'P' settles with a slight 'squish' scale effect (scaleY 0.95 -> 1.0). 
3. **1.5s - 3.0s (Sequential Drop):** Letters 'R', 'E', 'S', 'S' drop sequentially with 0.3s intervals. Each impact triggers a smaller shake. As each letter lands, simulate 'ink bleed': a red radial gradient or SVG mask expands slightly from the bottom edges of the glyphs, fading out opacity over 0.5s to mimic wet ink spreading into paper fibers.
4. **3.0s - 4.5s (Hold & Branding):** The full word 'PRESS' holds steady. The red ink bleed effect slows and stabilizes. The text 'Foundry Press' fades in below the baseline using a simple opacity transition (0 -> 1) over 1s. 
5. **4.5s - 6.0s (Fade Out):** The paper grain shifts slightly (subtle noise animation). All elements fade to black (#0F0F0F) to reset the loop.

**Technical Constraints:**
- Use HTML/CSS/JS (Canvas or DOM). No external libraries like GSAP unless necessary for easing; prefer native CSS keyframes or `requestAnimationFrame` for the shake logic.
- The 'ink bleed' should look organic, not perfect. Use CSS `mix-blend-mode: multiply` for the red ink to interact with the paper texture.
- Ensure the poster frame at 1.5s is crisp: 'P' landed, red ink just starting to seep, background paper visible.
- No navigation, no UI chrome. Pure motion graphic.
