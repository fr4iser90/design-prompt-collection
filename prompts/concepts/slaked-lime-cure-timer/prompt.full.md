# Slaked Lime Cure Timer — Extended Brief

## Concept
In masonry and architecture, the 'cure' of lime mortar is a slow, almost invisible process of carbonation. This concept translates that temporal materiality into a UI status indicator. Instead of a generic loading spinner, the user watches a material 'become' stone.

## Material Palette
- **Wet State (0%)**: `#8A8A85` (Dark, saturated grey), `#4A4A45` (Shadow depth). Texture: High-noise, porous, uneven.
- **Mid State (50%)**: `#B5B5B0` (Chalky grey), `#D0D0CB`. Texture: Cracking, matte, dry-touch.
- **Cured State (100%)**: `#F5F5F0` (Bright white), `#E0E0DB` (Cool highlight). Texture: Smooth, dense, subtle grain.

## Visual Art Direction
- **Object Honesty**: The component should look like a physical sample mounted on a wall or held in a lab. No drop shadows, just ambient occlusion at the edges of the sample.
- **Lighting**: Simulate diffuse, north-facing light. The 'wet' state should have slight specular highlights (gloss), while the 'cured' state is fully matte.
- **Typography**: Use a technical sans-serif (e.g., Space Mono or IBM Plex Mono) for the timer digits. The font should be small and unobtrusive, placed in a corner or below the sample.

## Interaction & Motion
- **Idle**: A very slow, subtle opacity pulse on the texture noise to simulate 'breathing' or chemical activity.
- **Hover**: Reveals a 'cross-section' tooltip showing the internal density gradient (darker core, lighter surface).
- **Progression**: 
  - 0–30%: Rapid drying (loss of gloss).
  - 30–70%: Slow color shift (grey to white).
  - 70–100%: Texture smoothing (noise fade-out, sharp edges emerge).

## Technical Implementation
- Use `backdrop-filter` or `mix-blend-mode: multiply` to overlay noise textures on a base color.
- Animate `filter: grayscale()` and `contrast()` to simulate the drying process.
- SVG mask for the 'cracking' effect in the mid-state.

## Acceptance Criteria
- The component must clearly communicate progress without a percentage bar.
- The 'cured' state must feel solid and finished, contrasting with the 'wet' state's ambiguity.
- No UI chrome (buttons, borders) should distract from the material sample itself.
