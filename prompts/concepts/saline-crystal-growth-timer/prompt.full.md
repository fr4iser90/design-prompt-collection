# Saline Crystal Growth Timer — Extended

## Concept
Time as a state change from liquid to solid. The metaphor is 'preservation' and 'structure'. Instead of a circular progress bar, the 'progress' is the occupation of space by crystalline matter. The beauty lies in the geometric complexity of the growth pattern.

## Palette
- **Liquid:** `#e0e7ff` (Light Indigo) - Clear, pale, indicating dilute saline solution.
- **Crystal Core:** `#6366f1` (Vivid Indigo) - The active growth front.
- **Crystal Solid:** `#1e1b4b` (Deep Indigo/Black) - The fully formed, dense crystal structure.
- **Background:** `#ffffff` or very light gray, to emphasize the blue tones.

## Typography
- **Timer Digits:** `Space Mono` or `JetBrains Mono`. Bold, centered over the liquid area. Should appear to 'float' on the surface.
- **Labels:** `Inter` (avoid if possible, use `Roboto Slab` for a harder edge) - Small, uppercase, tracking-wide.

## Layout
- **Desktop:** Centered composition. The 'tank' is a perfect circle or square. Digits overlay the center. Controls (Pause/Reset/Agitate) are minimal icons at the bottom.
- **Mobile:** Full-screen tank. Digits are large. Touch anywhere to 'agitate' (create ripples that disrupt crystal formation locally).

## Motion Brief
1. **Entrance:** Liquid settles (ripple effect). First crystals nucleate at corners/edges.
2. **Ambient:** Slow, continuous growth. Facets catch 'light' (gradient shifts) to show 3D depth.
3. **Interaction:** 
   - **Agitate:** Mouse drag creates temporary liquid turbulence. Crystals near the cursor stop growing or shatter (small particle effect).
   - **Complete:** When timer hits 0, the screen flashes white (flash freeze) and the structure locks into a static, high-contrast image.

## Constraints
- Avoid messy, chaotic growth. Use algorithmic constraints (e.g., L-systems or reaction-diffusion) to keep it geometric and beautiful.
- No green/biohazard vibes. Keep it 'clean' and 'pharmaceutical'.
- Performance: Must handle complex geometry without lag.

## Acceptance Criteria
- The visual connection between 'time passing' and 'crystal growing' is clear.
- The 'agitate' interaction provides satisfying feedback.
- The final state looks like a finished object/art, not just a stopped animation.
