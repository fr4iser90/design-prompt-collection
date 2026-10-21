Create a single-file HTML5/CSS/JS motion graphics piece titled 'Wet Ink Spread' for the fictional brand 'Absorb Press'. The scene is a full-bleed, 16:9 or responsive viewport with a background color of #F0F0F0 (uncoated paper white). Centered on screen is the word 'INK' in massive, monumental Baskerville font (or closest serif fallback), colored #000000. Below it, in small Courier New monospace, is the caption 'CAPILLARY ACTION SIMULATION'.

The core mechanic is an 8-second infinite loop simulating wet ink spreading on paper. Do not use CSS blur filters. Instead, use SVG filters (`<filter>`) applied to the text container. The filter must combine `feTurbulence` (type='fractalNoise') and `feDisplacementMap`. 

Timeline:
0.0s - 2.0s: Sharp state. Displacement scale is 0. Text is crisp black.
2.0s - 6.0s: Bleed state. Animate the `scale` attribute of `feDisplacementMap` from 0 to ~15-20. Simultaneously, slightly increase the `baseFrequency` of `feTurbulence` to simulate finer capillary spread. The text edges should become fuzzy and grey (#808080) as the black ink diffuses.
6.0s - 8.0s: Dry/Recall state. Animate the displacement scale back to 0. The text returns to sharp black.

Visual details:
- The 'bleed' should look organic, not uniform. Use a high-frequency turbulence base (e.g., baseFrequency='0.01') to create irregular edges.
- Add a subtle `feColorMatrix` or opacity adjustment to make the displaced edges appear greyer than the core black text, mimicking diluted ink.
- Background must remain static #F0F0F0.
- No navigation, no UI chrome, no buttons. Just the typography and the physics.
- Reduced motion: If `prefers-reduced-motion` is active, display the sharp text (0.0s state) statically.

Constraints:
- No external libraries (no GSAP, no Three.js). Use vanilla JS `requestAnimationFrame` or CSS keyframes targeting SVG filter attributes (if supported) or JS manipulation of SVG DOM.
- Font stack: 'Baskerville', 'Georgia', serif for display; 'Courier New', monospace for caption.
- Colors strictly #000000, #F0F0F0, #808080.
- Ensure the text remains legible even at peak bleed.

Layout & Responsiveness:
- Desktop: Centered flexbox layout. Main text font-size: 15vw. Caption font-size: 1.5vw.
- Mobile: Adjust font-sizes to 20vw and 3vw respectively to maintain legibility on smaller screens. Ensure padding prevents text clipping on narrow viewports.
- The SVG filter region must be expanded (`x="-20%" y="-20%" width="140%" height="140%"`) to prevent clipping of the displaced edges.

Acceptance Criteria:
- Loop is seamless.
- No digital blur artifacts.
- Performance remains stable at 60fps.
- Deliverable: single-file HTML/CSS/JS.
