Deliverable: single-file HTML/CSS/JS.

Build a high-fidelity editorial experience for 'Ferrous Annual', a publication on industrial history. The core metaphor is oxidation: text begins as pristine, black stamped metal and decays into rust as the user scrolls, revealing underlying archival layers. This is not a static sepia theme; it is an interactive material simulation.

**Visual Identity & Palette**
Use a strict three-color palette to maintain object honesty:
- Background: #1a1a1a (Deep Charcoal, representing the void of the archive)
- Primary Ink: #b34a26 (Oxidized Iron, representing decay and history)
- Secondary/Metal: #8c8c8c (Cold Steel, representing the underlying structure)

Typography must be expressive. Use Oswald for all display headings (H1-H3) to evoke industrial signage and stamped metal. Use Source Serif Pro for body text to ensure readability and editorial weight. Do not use Inter, Roboto, or system-ui. The type should feel heavy and physical.

**Layout Structure**
Adopt a 'Folio' layout. The page should feel like a long-form essay or annual spread. 
- Header: Large, centered Oswald title 'THE IRON OXIDE ARCHIVE' with a subtitle 'Vol. 4: Decay & Memory'.
- Content: A single-column reading flow with generous whitespace. Margins should be wide (min 15% on desktop).
- Sticky Rail: A thin, vertical progress bar on the left edge, styled as a rusting metal strip, indicating scroll depth.
- Images: Use placeholder archival images (grayscale, high contrast) positioned absolutely behind text blocks. These are hidden by default and revealed via interaction.

**Core Mechanics: Oxidation & Reveal**
1. **Scroll-Driven Oxidation**: 
   - Implement a scroll listener that calculates the percentage of the viewport passed for each text block.
   - Apply a CSS `mask-image` or `clip-path` effect to the text color. As scroll depth increases, the text color transitions from #1a1a1a (black) to #b34a26 (rust) with a noise-based texture overlay to simulate flaking.
   - Use a CSS variable `--oxidation-level` (0 to 1) updated via JS. 
   - The transition should not be linear; it should feel organic, using a step-based or noise-driven easing function to mimic real corrosion.

2. **Hover-to-Polish**: 
   - When a user hovers over a paragraph or heading, the oxidation effect reverses locally.
   - The text returns to #1a1a1a (black) with a subtle 'shine' effect (a linear-gradient overlay moving across the text).
   - Simultaneously, reveal a hidden archival image behind the text block. This image should fade in from opacity 0 to 0.15, positioned absolutely behind the text, creating a 'palimpsest' effect where the history is literally underneath the words.
   - On mouse leave, the oxidation resumes, and the image fades out.

**Motion & Animation**
- **Entrance**: Headlines should animate in with a 'stamping' effect. Scale from 1.05 to 1.0 with a sharp ease-out, accompanied by a slight vertical drop (translateY) to mimic impact.
- **Ambient**: The background should have a very subtle, slow-moving noise texture (SVG filter or CSS background) to simulate grain, but keep it low opacity (0.05) to avoid distraction.
- **Interaction**: The 'polish' effect should have a 0.3s ease-in-out transition. The reveal of the background image should be slightly slower (0.5s) to create a sense of uncovering.

**Technical Constraints**
- Use vanilla JavaScript for scroll calculations. Do not use heavy libraries like GSAP unless necessary for complex masking; CSS variables and `requestAnimationFrame` are preferred for performance.
- Ensure the mask effect is performant. Use `will-change: mask-image` or `transform` where appropriate.
- The page must be responsive. On mobile, the oxidation effect should still work but may simplify to a color shift rather than complex masking to save performance.
- No external images; use CSS gradients or SVG data URIs for textures and placeholder images.

**Design Bar Rejection Criteria**
- Reject if the design looks like a standard blog with a brown filter.
- Reject if the typography is generic sans-serif.
- Reject if the scroll effect is linear and lacks texture/noise.
- Reject if the hover effect does not reveal a background layer.

**Implementation Details**
- Create a `.text-block` class for each paragraph/heading.
- Use `IntersectionObserver` to trigger the oxidation calculation only for visible elements.
- The 'rust' texture can be simulated using a CSS `background-image` with a radial-gradient noise pattern, masked by the text.
- Ensure accessibility: The text must remain readable even when oxidized. The rust color #b34a26 on #1a1a1a has sufficient contrast, but verify.
