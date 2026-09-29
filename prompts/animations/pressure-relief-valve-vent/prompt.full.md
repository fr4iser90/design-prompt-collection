# Pressure Relief Valve Vent — Extended

## Concept
This animation focuses on the physics of depressurization. It’s a moment of relief—literal and metaphorical. The tension comes from the anticipation of the hiss and the satisfaction of the needle dropping to safe levels. The aesthetic is 'steampunk utility' without the fantasy elements—strictly industrial, real-world hardware.

## Palette
- **Valve:** `#B5A642` (Dull, oxidized brass)
- **Steam:** `#FFFFFF` (Pure white, with gradient to transparent gray)
- **Background:** `#050505` (Near-black, cool tones)
- **Gauge Zones:** `#CC0000` (Danger), `#00CC00` (Safe)
- **Needle:** `#FFFFFF` (High contrast)

## Layout & Composition
- **Subject Position:** Left-center. The valve is the anchor.
- **Steam Direction:** Jets out to the right, filling the right 2/3rds of the frame with volumetric light.
- **Gauge:** Attached directly above the valve body, clearly legible.

## Motion Brief
1. **Pre-Vent:** The needle is pinned in the red. The valve is static. A subtle vibration (high freq, low amp) indicates stress.
2. **Ignition:** The valve cap lifts 5px. A thin, sharp line of steam appears (the 'hiss').
3. **Full Vent:** 
   - The steam jet expands rapidly into a turbulent cloud.
   - Use SVG filters or Canvas blur to create depth in the steam.
   - The gauge needle begins to sweep counter-clockwise. The speed of the needle should correlate with the density of the steam.
4. **Dissipation:** 
   - The steam jet thins out.
   - The needle slows down as it hits the green zone.
   - The steam clouds drift upward and fade out slowly.
5. **Reseat:** 
   - The valve cap drops back down.
   - The gauge needle settles. 
   - The vibration stops. Silence (visual static).

## Technical Constraints
- Steam particles should have varying opacity and size to create volume.
- Use a Gaussian blur on the steam edges to soften them against the black background.
- The brass texture should have specular highlights that react to the 'light' of the steam.

## Acceptance Criteria
- The steam must feel 'hot' and fast-moving initially, then cool and slow.
- The correlation between the steam flow and the gauge needle must be visually convincing.
- No green 'tech' glows; use physical lighting effects for the steam's brightness.
