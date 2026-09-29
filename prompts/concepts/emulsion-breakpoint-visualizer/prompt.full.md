# Emulsion Breakpoint Visualizer — Extended

**Concept:**
Visualize the fragile physics of culinary emulsions. This is a scientific study of how oil and water can be forced together through mechanical energy. The aesthetic is laboratory-clean, focusing on the micro-structure of sauces.

**Palette:**
- `#2C2C2C` (Matte Black): Background, bowl interior. Absorbs light.
- `#F5F5F0` (Off-White): Water phase, text.
- `#8C9E7A` (Sage Green): Stable emulsion color (suggesting herbs/freshness).
- `#D4AF37` (Gold): Oil phase, highlights.

**Typography:**
- Headings: 'Futura' or 'Geometric Sans' – clean lines, scientific feel.
- Labels: Small, uppercase, tracked out.

**Layout:**
- Desktop: Centered canvas (60% width) for the simulation. Controls on the right in a slim vertical panel.
- Mobile: Canvas top (square aspect ratio). Controls bottom in a horizontal row.

**Motion Brief:**
1. **Entrance:** Particles disperse from the center.
2. **Ambient:** Constant, slow rotation of the mixture. Particles jitter slightly based on 'temperature'.
3. **Interaction:**
   - Increase Agitation: Particles spin faster, get smaller, and mix. Color becomes uniform (creamy).
   - Decrease Agitation: Particles slow down, start to cluster. 
   - Break Point: If 'Fat Ratio' > 'Agitation Capacity', particles merge rapidly. The simulation 'breaks' – distinct layers form, and the color separates back into Gold and White.
   - Feedback: A 'Stability Index' number updates in real-time.

**Constraints:**
- No cartoonish splashes. The fluid motion must be smooth and viscous.
- No rustic kitchen elements.
- The 'broken' state should look unappealing (separated, oily) to reinforce the culinary lesson.
- Performance: Use Canvas/WebGL for particle system if possible.

**Acceptance Criteria:**
- The distinction between 'stable' and 'broken' is visually immediate.
- The particle physics feel believable (merging, bouncing).
- The color blending is smooth, not pixelated.
- The UI is minimal and does not obstruct the view.
