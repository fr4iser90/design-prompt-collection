## Concept
A high-precision, broadcast-quality explainer loop for 'ThermoStore' that demystifies Phase Change Material (PCM). The core narrative is the 'Latent Heat Plateau': the counter-intuitive physics where a material absorbs significant thermal energy to change phase (solid to liquid) without a rise in temperature. The visual language avoids cartoonish fire/ice metaphors in favor of abstract, engineering-grade geometry. The loop is tight (8s), rhythmic, and designed for social media or website headers where immediate comprehension is key.

## Beat Sheet
**0.0s – 1.5s: The Spike (Problem)**
- **Visual:** A stark, deep charcoal background (#212121). A solid white geometric block (the PCM) sits center-stage. From the top, a broad, glowing amber (#FFC107) bar descends rapidly. 
- **Graph:** A small line graph in the bottom right corner shows a sharp, jagged upward spike in temperature.
- **Type:** 'HEAT IN' in Syne (bold, white) slides in from the left edge, tracking with the heat bar.

**1.5s – 4.0s: The Plateau (Mechanism)**
- **Visual:** The amber bar contacts the block. The block does not glow red. Instead, its internal structure changes. Using an SVG mask or gradient overlay, the top half of the block transitions from solid white (#F5F5F5) to a translucent, layered state (simulating liquid/mixed phase). The internal grid pattern distorts slightly to suggest flow, but the outer boundary remains rigid.
- **Graph:** The temperature line, which spiked previously, suddenly flattens into a perfect horizontal line (the latent heat plateau). This is the visual anchor of the piece.
- **Type:** 'PHASE CHANGE' fades in near the block, in IBM Plex Sans (light, amber).

**4.0s – 6.0s: The Buffer (Payoff)**
- **Visual:** The amber heat bar retracts upwards. The PCM block remains in its 'melted' state. 
- **Graph:** The blue (#2196F3) temperature line remains flat and low. A faint, grey 'ghost' line spikes violently upward in the background to represent what would happen without the PCM (unbuffered). This contrast highlights the 'buffering' effect.
- **Type:** 'TEMP STABLE' appears in Syne, centered below the block.

**6.0s – 8.0s: The Lockup (Resolution)**
- **Visual:** The PCM block rapidly solidifies back to pure white. Small, blue (#2196F3) vector arrows radiate outward from the block, indicating the release of stored energy. 
- **Type:** The 'ThermoStore' wordmark (Syne, white, centered) and 'Peak Shaving' (IBM Plex, grey, smaller) fade in. The scene fades to black or resets to the initial state for the loop.

## Poster Frame
**@ 1.5s (Mid-Melt):**
The frame captures the moment of contact. The amber heat bar is touching the top edge of the white block. The top 30% of the block is beginning to 'melt' (showing a gradient/texture change), while the bottom 70% remains solid white. The temperature graph line is just beginning to flatten. The text 'HEAT IN' is visible on the left. The composition is balanced, with the block as the central anchor. This frame clearly communicates 'Heat is entering, but the structure is changing, not just heating up.'

## Palette
- **Background:** #212121 (Deep Charcoal) - Provides high contrast and a 'scientific lab' feel.
- **PCM Solid:** #F5F5F5 (Off-White) - Clean, neutral, represents the solid state.
- **Heat/Energy:** #FFC107 (Amber) - Warm, urgent, represents the incoming thermal load.
- **Temperature/Release:** #2196F3 (Material Blue) - Cool, stable, represents the controlled temperature and released energy.

## Type
- **Display:** Syne. Use for key labels ('HEAT IN', 'TEMP STABLE', 'ThermoStore'). Its quirky, variable-width forms add a modern, tech-forward personality without being generic. Weight: Bold or Extrabold for impact.
- **Body:** IBM Plex Sans. Use for sub-labels ('PHASE CHANGE', 'Peak Shaving') and axis labels on the graph. Its monospaced heritage suits the scientific context. Weight: Regular or Medium.

## Frame
- **Aspect Ratio:** 16:9 (1200x675px or 1920x1080px).
- **Layout:** Centralized composition. The PCM block occupies the central 40% of the width. The graph is pinned to the bottom-right corner (20% width). Heat source enters from the top-center. 
- **Safe Zones:** Keep all text and critical motion within the central 90% to avoid cropping on mobile/social feeds.

## Motion
- **Easing:** Use `cubic-bezier(0.25, 0.1, 0.25, 1)` for smooth, mechanical movements. The heat bar should accelerate on entry and decelerate on contact. 
- **Melting Effect:** Do not use a physics simulation. Use a CSS `mask-image` with a linear-gradient or an SVG `<clipPath>` animation that moves down the block. Alternatively, animate the `stroke-dashoffset` of an internal pattern to simulate the structure 'unlocking'. 
- **Graph Animation:** Animate the `d` attribute of an SVG path or use CSS `transform: scaleY()` on a line element. The transition from 'spike' to 'flat' must be distinct and noticeable.
- **Loop:** Ensure the reset from 8.0s to 0.0s is seamless. The block must fully return to solid white, and the graph line must reset to the baseline before the next heat spike begins.

## Constraints
- **No External JS Libraries:** Use vanilla JavaScript and `requestAnimationFrame` for precise timing control. No GSAP, no Three.js.
- **No Icons:** Do not use fire, ice, thermometer icons, or arrows unless they are abstract vector lines (like the energy release arrows). 
- **Readability:** The temperature graph must be clearly visible even on a small mobile screen. Use high contrast (Blue line on Dark bg).
- **Performance:** Keep the DOM light. Use CSS transforms and opacity for animations where possible to avoid layout thrashing. 
- **Accessibility:** Respect `prefers-reduced-motion`. If enabled, show the static poster frame (1.5s state) with a static graph.

## Acceptance criteria
- [ ] **Loop Duration:** Exactly 8 seconds. Seamless transition from end to start.
- [ ] **Visual Clarity:** The 'flat temperature' during the 'melting' phase is the most prominent visual feature. A viewer should immediately understand that heat is entering but temp is not rising.
- [ ] **Type:** Syne and IBM Plex Sans are correctly loaded and applied. No system fonts.
- [ ] **Poster Frame:** At 1.5s, the image is legible and compelling as a static thumbnail. The text 'HEAT IN' and the melting block are visible.
- [ ] **Code:** Single HTML file. No external assets except Google Fonts. No console errors.
- [ ] **No Clichés:** No fire emojis, no ice cubes, no generic 'battery' icons. The PCM is an abstract geometric block.
- [ ] **Responsive:** Scales correctly to fit a 16:9 container without cropping critical elements.

## Type pairing
Syne + IBM Plex Sans
