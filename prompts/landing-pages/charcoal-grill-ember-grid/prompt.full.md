# Charcoal Grill Ember Grid — Extended

## Concept
This design captures the controlled chaos of professional grilling. It avoids the cliché 'rustic BBQ' aesthetic (wood, checkered cloths) in favor of the industrial precision of modern steel grills. The core metaphor is the 'grate' as a filter: you look through the steel to see the heat source. The interaction mimics adjusting air vents—opening them up reveals more intense heat (glowing embers).

## Palette
- **Base:** Deep Charcoal (#1a1a1a), representing the cold steel and soot.
- **Accent:** Ember Orange (#ff4500) fading to Deep Red (#8b0000) for the heat core.
- **Text:** Off-White (#f0f0f0) for high contrast against the dark background.
- **Secondary:** Steel Grey (#4a4a4a) for grid lines and UI elements.

## Typography
- **Display:** A heavy, geometric sans-serif (e.g., 'Monument Extended' or 'Archivo Black') to convey structural strength. All-caps, tight tracking.
- **Body:** A clean, readable sans-serif (e.g., 'Inter' or 'Helvetica Neue') in light weights to maintain legibility against the dark, textured background.

## Layout
- **Hero:** Full viewport height. The 'grate' covers 60% of the screen. Headline sits centrally or aligned left, interacting with the grid.
- **Content Sections:** Use 'grill mark' dividers (diagonal CSS gradients) between sections. Product cards should look like 'cuts' of meat—rectangular, sharp edges, dark backgrounds with minimal highlights.
- **Footer:** Minimal, dark, with subtle ember glow at the very bottom edge.

## Motion Brief
1. **Entrance:** The grate fades in, followed by a slow 'ignition' sweep of orange glow across the screen from bottom to top, then settles into the ember state.
2. **Ambient:** Smoke particles (CSS or canvas) rise slowly from the bottom, with slight horizontal drift. Ember glow pulses gently (1-2% opacity change) to simulate breathing heat.
3. **Interaction:** 
   - **Hover:** When the cursor moves over the grate, the grid cells under the cursor illuminate. The glow is radial, strongest at the center of the cell, fading out.
   - **Scroll:** Parallax effect on the smoke particles.

## Constraints
- **No Wood:** Avoid any wood grain textures.
- **No Fire:** Embers are glowing coals, not open flames. No dancing fire animations.
- **Performance:** Use CSS radial-gradients for the glow effect to ensure performance, not heavy canvas rendering unless necessary for smoke.
- **Accessibility:** Ensure text contrast remains high even when ember glow is active behind it (use text-shadow or backdrop-filter if needed).

## Acceptance Criteria
- The grate must look like steel, not plastic.
- Ember glow must react instantly to mouse movement.
- Smoke must be subtle, not obscuring content.
- No rustic clichés (plaid, wood, cartoon flames).
