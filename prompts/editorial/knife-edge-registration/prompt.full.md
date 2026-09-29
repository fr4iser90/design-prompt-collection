## Concept
'The Edge' is an interactive editorial experience for 'Steel & Stone', a high-end culinary knife care manual. The core thesis is that sharpness is not just a physical property of steel, but a state of precision and alignment. The interface mechanizes this concept by using the vertical scroll axis as a 'honing rod'. 

Unlike traditional editorial sites that scroll passively, this site requires the user to 'work' for clarity. Fast scrolling results in a 'dull' interface: misaligned text, visual noise, and sparks. Slow, deliberate scrolling results in a 'sharp' interface: perfectly aligned columns, crisp typography, and calm. This creates a tactile, physical relationship between the user's input and the visual output, reinforcing the brand's focus on craft and precision.

The aesthetic is strictly industrial and clinical. We reject the 'rustic farmhouse' or 'butcher block' tropes common in food design. Instead, we embrace the cold, reflective nature of polished steel, the void of dark space, and the precision of Swiss typography. The design feels like a technical manual or a blueprint for a precision instrument.

## Palette
- **Background (Void/Stone):** `#0A0A0A`. A deep, near-black charcoal. This represents the unpolished stone or the void before the edge is honed. It provides maximum contrast for the text and allows the 'steel' accents to pop.
- **Ink (Text/Steel):** `#E6E6E6`. An off-white, slightly cool grey. This is the primary text color, representing the polished surface of the blade. It is softer than pure white (#FFFFFF) to reduce eye strain during long reading sessions but maintains high contrast.
- **Accent (Spine/Spark):** `#8D99AE`. A cool, metallic steel-blue. This color is used exclusively for the central 'blade spine', interactive elements, particle effects, and technical annotations. It serves as the visual anchor for the 'sharpness' mechanic.

## Type
- **Display Font:** 'Neue Haas Grotesk Display'. Used for all headings, chapter titles, and pull-quotes. This font embodies Swiss precision, neutrality, and authority. Its tight tracking and geometric forms reinforce the 'industrial' theme. Use bold weights for maximum impact.
- **Body/Mono Font:** 'Space Mono'. Used for all body text, captions, footnotes, and technical data. The monospaced nature evokes a laboratory log, a workshop manual, or code. It provides a rhythmic, grid-like structure to the text, making it easy to align and read. 
- **Hierarchy:** 
  - H1: 4rem-6rem, tight line-height (0.9), uppercase.
  - H2: 2.5rem-3rem, tight line-height (1.1), uppercase.
  - Body: 1rem-1.2rem, line-height 1.6, normal weight.
  - Annotations: 0.8rem, uppercase, letter-spacing 0.05em, color #8D99AE.

## Layout
- **Structure:** A full-viewport-height (100vh) section-based layout. Each section represents a 'chapter' or 'step' in the manual.
- **The Spine:** A central vertical line (2px width, color #8D99AE) runs through the center of the viewport. This is the 'blade spine'. It is fixed in position relative to the viewport, not the content.
- **Columns:** Two content columns, left and right, separated by the spine. 
  - Desktop: Each column takes up 40% of the width, with 10% padding on each side of the spine.
  - Mobile: The spine remains central. Columns may stack vertically, but the alignment mechanic still applies (e.g., text blocks shift horizontally relative to the center line).
- **Grid:** A strict 12-column grid is implied but not visible. All elements align to this grid. 
- **Spacing:** Generous whitespace. The 'void' is as important as the content. Use large margins between sections (100vh) to create a sense of breathing room and page-turning rhythm.
- **Scroll Snap:** Use `scroll-snap-type: y mandatory` on the main scroll container. Each section has `scroll-snap-align: start`. This forces the user to stop at each 'page', reinforcing the manual/book metaphor.

## Motion
- **Entrance Animation:** 
  - On load, the left column slides in from `translateX(-100%)` and the right column from `translateX(100%)`. 
  - Use a cubic-bezier easing function that simulates heavy inertia (e.g., `cubic-bezier(0.19, 1, 0.22, 1)`). 
  - The columns should overshoot their final 'dull' position slightly before settling. 
  - Initial state is 'dull': columns are offset from the center spine by 20px-40px.
- **Scroll Velocity Mechanic:**
  - Track scroll velocity using `requestAnimationFrame` and `window.scrollY`.
  - **Fast Scroll (Dull):** If velocity > 50px/frame, apply `transform: translateX(±30px)` to the columns (away from center). Apply a slight `filter: blur(1px)` to the text. Generate 'spark' particles at the intersection of the columns and the spine.
  - **Slow Scroll (Sharp):** If velocity < 50px/frame, ease the columns back to `translateX(0)`. Remove blur. Stop particle generation.
  - The transition between states should be smooth but mechanical, using a spring-like easing for the alignment.
- **Particle System:**
  - Use a `<canvas>` overlay or DOM elements for sparks.
  - Sparks are small circles (2px-4px) with colors #E6E6E6 and #8D99AE.
  - They emit from the central spine at the Y-position of the scroll.
  - They have random initial velocities (outward and downward) and fade out over 0.5-1 second.
  - Gravity should be applied to simulate physical sparks.
- **Ambient Light:**
  - A pseudo-element or gradient overlay on the central spine.
  - Every 10 seconds, animate a `background-position` or `transform: translateY()` to move a specular highlight from top to bottom.
  - Duration: 2 seconds. Easing: linear.
  - This simulates light catching a polished edge.

## Constraints
- **Stack:** Single-file HTML/CSS/JS. No external libraries (no GSAP, no Three.js, no React).
- **Performance:** Use `will-change: transform` on animated elements. Use `requestAnimationFrame` for all JS animations. Avoid layout thrashing.
- **Responsiveness:** The design must work on mobile and desktop. On mobile, the 'spine' mechanic should still be visible and functional, even if the layout stacks.
- **Accessibility:** 
  - Respect `prefers-reduced-motion`. If enabled, disable particle effects and force columns to remain aligned (no dull state).
  - Ensure text contrast is high enough for readability.
  - Provide semantic HTML structure (header, main, section, article).
- **No Clichés:** Do not use wood textures, serif fonts, or warm earth tones. Do not use drop shadows or glassmorphism. Keep it flat, sharp, and industrial.

## Acceptance criteria
- [ ] **Visual:** Background is #0A0A0A, text is #E6E6E6, spine is #8D99AE.
- [ ] **Typography:** Headings use Neue Haas Grotesk Display (or similar sans-serif), body uses Space Mono (or similar monospace).
- [ ] **Layout:** Two-column layout with a central vertical spine. Scroll snap is active.
- [ ] **Interaction:** Fast scrolling causes columns to separate and sparks to appear. Slow scrolling causes columns to align and sparks to stop.
- [ ] **Entrance:** Columns slide in from left/right with inertia on load.
- [ ] **Ambient:** A light streak travels down the spine every 10 seconds.
- [ ] **Code:** Single HTML file. No external dependencies. JS handles velocity detection and particle generation.
- [ ] **Responsive:** Layout adapts to mobile viewports without breaking the spine mechanic.
- [ ] **Accessibility:** `prefers-reduced-motion` disables animations and forces alignment.
