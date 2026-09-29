Build a high-end editorial web experience titled 'Hot Plate' for a fictional fine-dining publication named 'Service'. The core metaphor is the fleeting atmosphere of a kitchen pass: the page is initially obscured by a dense, simulated steam layer that must dissipate to reveal content. This is not a static menu; it is a kinetic, atmospheric artifact that prioritizes sensory immersion over traditional navigation patterns.

**Visual Identity & Typography:**
Use a stark, high-contrast palette: Deep Charcoal (#1a1a1a) for the background and primary text, Cool Mist (#e0e0e0) for the steam and secondary elements, and Steel Blue (#4a90e2) exclusively for interactive states and accents. Typography must be sharp and authoritative. Use Didot for all headings, dish names, and pull-quotes to evoke classic culinary elegance. Use Montserrat for body copy, descriptions, and navigation to provide modern readability. Do not use Inter, Roboto, or system fonts. Ensure letter-spacing is adjusted for Didot to prevent visual crowding at large sizes.

**Layout Structure:**
Avoid SaaS landing page patterns. The layout should feel like a spread in a high-end culinary journal. Use a centered column for the main menu content, with ample whitespace that breathes. The 'Service' brand logo should be prominent but understated in the top left, fixed in position. The menu items should be listed vertically with generous spacing, allowing each dish to have presence. Include a sticky chapter rail on the right side that tracks the current course (e.g., 'Amuse-Bouche', 'Main', 'Dessert'), styled with minimal lines and small caps. On mobile, the rail collapses into a subtle progress indicator at the top.

**The Steam Mechanic (Core Interaction):**
1. **Entrance Animation:** On page load, the entire viewport is covered in a thick, white/gray fog (opacity 0.95). Within 1.5 seconds, a radial wipe effect originates from the center of the screen, expanding outward to clear the fog, revealing the menu content beneath. This mimics the visual of a hot plate being set down and the steam clearing. Use ease-out-quart easing for a natural dissipation feel.
2. **Ambient Vapor:** Once the entrance animation completes, a subtle layer of animated vapor particles should drift slowly upward from the bottom of the viewport. These particles should be low-opacity and non-intrusive, creating a sense of warmth and atmosphere. If the user scrolls, the vapor intensity should slightly decrease to prioritize readability; if the user stops scrolling, the vapor slowly returns to full density.
3. **Hover Condensation:** When the user hovers over a dish name (Didot typeface), the steam directly above that text should 'condense'. Visually, this means the steam opacity drops to 0 in that specific area, and small, realistic water droplets appear on the 'surface' of the text container, rolling off the edges before disappearing. This reveals the price and pairing details hidden beneath the steam layer.

**Content Hierarchy:**
Each menu item consists of:
- Dish Name (Didot, Large, #1a1a1a)
- Description (Montserrat, Small, #4a90e2 on hover, otherwise faded #e0e0e0)
- Price (Montserrat, Small, aligned right, hidden until hover)
- Pairing Note (Montserrat, Italic, Small, appears with price)

**Technical Constraints:**
- Use CSS filters (blur, opacity) and canvas-based particle systems for the steam/vapor to ensure performance.
- The radial wipe must be smooth and use easing functions (ease-out-quart).
- The water droplet effect on hover should use SVG filters or canvas blending modes to look realistic, not cartoonish.
- Ensure accessibility: The text must be readable when the steam is cleared. Provide a 'Clear Steam' toggle in the footer for users who find the motion distracting.
- No emoji, no pill-shaped buttons, no multi-layer shadows. The aesthetic is clean, cold steel and hot steam.

**Acceptance Criteria:**
- Page loads with 95% opacity steam overlay.
- Radial wipe clears steam in <2s.
- Hovering a dish name reveals price/pairing and triggers droplet animation.
- Ambient vapor rises from bottom when idle.
- Typography is strictly Didot (headings) and Montserrat (body).
- Colors match hex codes exactly.
- No SaaS-style CTAs or hero sections.

**Deliverable:**
Single-file HTML/CSS/JS.
