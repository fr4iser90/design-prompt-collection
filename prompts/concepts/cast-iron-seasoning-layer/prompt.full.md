# Cast Iron Seasoning Layer — Extended

**Concept:**
De-mystify the 'black magic' of cast iron seasoning by visualizing it as a material science process. This is not a rustic farmhouse aesthetic; it is a sterile, high-precision culinary lab. The focus is on the transformation of liquid oil into solid polymer through heat.

**Palette:**
- `#1A1A1A` (Deep Charcoal): Background, raw iron base.
- `#3D3D3D` (Slate Grey): Metallic highlights, UI elements.
- `#8B5A2B` (Burnt Amber): Fresh oil, un-cured polymer.
- `#E0E0E0` (Steel White): Text, specular highlights, steam.

**Typography:**
- Headings: 'Helvetica Now Display' or 'Akzidenz-Grotesk' – tight tracking, uppercase, medium weight.
- Data: 'JetBrains Mono' – for temperature readings and thickness metrics (microns).

**Layout:**
- Desktop: Split view. Left: The interactive cross-section (50% width). Right: Control panel and data readouts (50% width). 
- Mobile: Stack vertically. The cross-section becomes a horizontal swipeable timeline of seasoning stages.

**Motion Brief:**
1. **Entrance:** Raw iron surface rises from bottom. Steam wisps appear from the top edge.
2. **Ambient:** Slow, subtle breathing glow on the iron pores. 
3. **Interaction:** 
   - Hovering over the iron reveals a magnified lens showing the porous texture.
   - Dragging the 'Temperature' slider applies a wash of oil. 
   - As temp > 375°F, the oil 'cures': color shifts from amber to dark brown, opacity increases, and a hard shine appears.
   - Repeated cycles add distinct thin layers, visible under a 'Microscope' toggle.

**Constraints:**
- No rustic textures (no wood, no wheat, no burlap).
- No purple or neon colors.
- The 'shiny' look must be realistic specular reflection, not a fake CSS gloss.
- Keep the UI minimal; the star is the material change.

**Acceptance Criteria:**
- The transition from liquid to solid polymer is visually distinct.
- The 'steam' effect is subtle and atmospheric, not cartoonish.
- Typography is legible and technical.
- Runs at 60fps.
