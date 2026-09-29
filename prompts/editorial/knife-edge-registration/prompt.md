Deliverable: single-file HTML/CSS/JS.

Build 'The Edge', an editorial culinary manual for 'Steel & Stone' that mechanizes the concept of sharpness. The design language is clinical, industrial, and precise—avoiding all rustic farmhouse or butcher-block clichés. The visual anchor is polished steel, negative space, and rigid geometry.

**Visual System:**
- **Palette:** Deep charcoal background (#0A0A0A) representing the void or unpolished stone. Primary text is off-white (#E6E6E6) for high contrast readability. Accent color is a cool, metallic steel-blue (#8D99AE) used for the central spine, interactive states, and particle effects.
- **Typography:** Use 'Neue Haas Grotesk Display' for all headings and pull-quotes to convey Swiss precision and authority. Use 'Space Mono' for body text, captions, and technical annotations to evoke a laboratory or workshop manual aesthetic. Do not use Inter, Roboto, or system fonts.
- **Layout:** A strict two-column layout separated by a central vertical 'blade spine' (a 2px line in #8D99AE). The spine runs the full height of the viewport. Content is divided into 'chapters' or 'steps' that fill the viewport height (100vh sections). 

**Core Interaction Mechanic (The Honing Rod):**
- The vertical scroll axis functions as a honing rod. 
- **State 1 (Misaligned):** On initial load and during fast scrolling, the left and right text columns are offset horizontally from the center spine. The left column shifts left, the right column shifts right, creating a 'blunt' or 'dull' visual state. The text may appear slightly blurred or distorted via CSS filters to reinforce this.
- **State 2 (Aligned/Honed):** As the user scrolls slowly (low velocity), the columns snap into perfect alignment with the central spine. The text becomes crisp, sharp, and centered. This transition should feel mechanical and weighted, not floaty.
- **Velocity Detection:** Implement JavaScript to track scroll velocity. 
  - If velocity > threshold (e.g., 50px/frame): Trigger 'dull' state. Columns separate. Generate 'spark' particles (small, bright #E6E6E6 or #8D99AE dots) emitting from the central spine where the columns meet. These particles should have gravity and fade out quickly.
  - If velocity < threshold: Trigger 'sharp' state. Columns ease back to center alignment. Remove blur/distortion. Stop spark generation.

**Motion & Ambience:**
- **Entrance:** On page load, the two columns slide in from the left and right edges of the screen with heavy inertia (ease-out cubic), overshooting slightly before settling into their initial 'dull' (misaligned) state. 
- **Ambient Light:** Every 10 seconds, a specular highlight (a gradient overlay or pseudo-element) travels down the central spine from top to bottom, simulating light catching a polished steel edge. This should be subtle and not distract from reading.
- **Scroll Rhythm:** Use `scroll-snap-type: y mandatory` on the main container to enforce chapter-by-chapter reading. Each section is a 'spread'.

**Content Structure:**
- **Hero Section:** Large, bold typography 'THE EDGE' centered. Subtitle: 'A Manual for Steel & Stone'. The spine is visible but inactive until scroll begins.
- **Chapter Sections:** Each section contains a heading (Neue Haas), a body paragraph (Space Mono), and a technical annotation (Space Mono, smaller, #8D99AE). The content should discuss knife care, sharpening angles, or steel types. 
- **Pull-Quotes:** Use large, impactful quotes from the text that span across the spine when aligned, breaking the column structure to emphasize the 'sharpness' of the idea.

**Technical Constraints:**
- Use vanilla JavaScript for scroll velocity detection and particle generation. 
- Use CSS `transform: translateX()` for column movement to ensure GPU acceleration. 
- Use `requestAnimationFrame` for the particle system and ambient light animation.
- Ensure the layout is responsive: on mobile, the spine remains central, but columns may stack or adjust width to maintain readability while preserving the alignment mechanic.
- No external libraries (no GSAP, no Three.js). Pure HTML/CSS/JS.
- Accessibility: Ensure text contrast meets WCAG AA standards. Provide a 'reduce motion' media query that disables particle effects and forces columns to remain aligned.
