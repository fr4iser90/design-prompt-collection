# Knife Edge Facet Refraction — Extended Brief

**Concept:**
'Apex Steel' makes knives for professionals who care about the cut. The design metaphor is *light*—because a sharp edge is defined by how it reflects light. If the light glints, the edge is sharp. If it scatters, it's dull. The design isolates this moment of reflection.

**Art Direction:**
- **Atmosphere:** Void. Deep black background. The knife floats in nothingness, emphasizing its precision.
- **Materiality:** Polished steel. The only colors are greys and whites. The UI should look like it's made of the same material as the knife—smooth, reflective, hard.
- **Lighting:** Single-source, directional light. High contrast. Shadows are absolute black.

**Typography:**
- **Display:** 'Didot' or 'Playfair Display' (but very thin/light weight). Used for the brand name and product names. The serifs echo the fine points of the blade.
- **Body:** 'Lato' or 'Open Sans' (Light weight). Clean, modern, and readable. Not too geometric, to balance the sharpness of the headings.

**Layout:**
- **Desktop:** Centered hero. The knife is angled diagonally across the screen. Text is aligned to the left, tight against the blade. Product grid is a simple 2-column layout with ample whitespace.
- **Mobile:** The knife fills the screen. Text overlays with a subtle black gradient backdrop for readability.

**Motion Brief:**
1.  **Entrance:** The knife slides in from the right, and the light flare sweeps across the edge.
2.  **Ambient:** A very slow, subtle rotation of the light source, causing the highlight to breathe.
3.  **Interaction:** Mouse move controls the light angle. As the user moves the mouse, the specular highlight on the blade follows, creating a 'living' metallic effect. Clicking a product zooms into the edge.

**Constraints Checklist:**
- [ ] No wood textures.
- [ ] No colorful accents.
- [ ] Performance: Ensure the light/reflection effect is optimized (CSS `transform` or lightweight canvas).
- [ ] Contrast: White text on black is high contrast, but ensure font weight is not too thin (min 300) for legibility.

**Acceptance Criteria:**
The page feels sharp, cold, and expensive. The user can almost 'feel' the edge through the visual tension of the light and the dark void.
