Deliverable: single-file HTML/CSS/JS.

Build 'Condensation Index', an editorial landing page for 'Vapor & Vine', a beverage pairing annual. The core mechanic is a 'chilled glass' metaphor: the entire viewport is covered by a dynamic fog/condensation layer that obscures the content beneath. The user interacts with this layer via cursor movement, which acts as a 'wiper' to reveal the editorial content. This is not a rustic farmhouse aesthetic; it is clinical, cold, and precise, evoking high-end hospitality and industrial refrigeration.

**Visual Identity & Palette:**
Use a strict, cold palette. Background: #0B132B (Deep Midnight). Primary Text: #F7F7F7 (Pure White). Accent/Highlight: #5BC0BE (Chilled Teal). Secondary Surface: #1C2541 (Dark Slate). No warm tones. No cream. No terracotta. The mood is 'cold storage' meets 'high-end sommelier'.

**Typography:**
Headlines: Playfair Display (Serif). Use large, elegant weights (700/900) for section titles and pull quotes. It should feel like a classic magazine masthead but modernized.
Body/Data: Source Code Pro (Monospace). Use for all metadata, pairing notes, temperatures, and small labels. This creates a 'lab report' or 'technical spec' feel that contrasts with the organic serif.
Hierarchy: Clear editorial hierarchy. Large display type for the issue title, medium serif for article headers, monospace for all supporting data.

**The Fog Mechanic (Core Interaction):**
Implement a canvas-based fog effect that covers the main content area. 
1. **Generation:** The fog should be generated using noise or particle systems to simulate condensation on a cold surface. It should not be a static image.
2. **Interaction:** Track mouse/touch movement. When the cursor moves, it 'wipes' away the fog in its path. The wipe should have a soft edge (gradient mask) to look like a cloth wiping glass, not a hard eraser.
3. **Rebuild:** When the cursor stops moving, the fog slowly regenerates in the cleared areas. The speed of regeneration should be slow enough to allow reading but fast enough to maintain the metaphor.
4. **Ambient Motion:** Add subtle water droplets that form randomly and slide down the screen. If a droplet passes over text, it should slightly distort or blur the text beneath it (using SVG filters or CSS backdrop-filter if performance allows, or canvas distortion).

**Layout & Content:**
Structure the page as a long-scroll editorial spread.
1. **Hero:** Full-viewport fog. As the user moves the mouse, the 'Vapor & Vine' masthead and 'Issue 04: The Cold Pour' are revealed. 
2. **Chapter 1: The Science of Chill:** A section explaining the physics of condensation. Use monospace text for data points (e.g., 'Dew Point: 12°C'). The fog should be denser here to encourage interaction.
3. **Chapter 2: Pairing Index:** A grid of beverage pairings. Each card is initially obscured. Hovering or moving the mouse over a card reveals the pairing details (e.g., 'Gin & Tonic / Yuzu Foam'). 
4. **Chapter 3: The Ritual:** A pull-quote section. Large serif text. The fog should be thin here to allow easy reading, but droplets should still slide past.
5. **Footer:** Simple, monospace contact info. Fog clears completely at the bottom.

**Technical Constraints:**
- Use HTML5 Canvas for the fog layer. Overlay it absolutely over the content.
- Use CSS `mix-blend-mode` or alpha masking for the wipe effect.
- Ensure performance: limit particle count, use requestAnimationFrame.
- Responsive: On mobile, use touch events for the wipe. The fog should be less dense on small screens to ensure readability.
- No external libraries for the fog logic; write vanilla JS for the particle/noise system.
- Accessibility: Ensure text has sufficient contrast when the fog is thin. Provide a 'Clear All' button or auto-clear after a timeout for users who cannot interact with the mouse.

**Anti-Patterns:**
- Do not use purple gradients.
- Do not use rounded, soft 'SaaS' cards.
- Do not use emoji.
- Do not make the fog opaque enough to make text unreadable without interaction; it should be a semi-transparent veil.
- Do not use standard system fonts. Stick to Playfair and Source Code Pro.
