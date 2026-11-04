Build a single-file HTML asset studio for 'AIR DRIVE', a 2D industrial machinery kit. The core deliverable is a production-grade sprite pack featuring pistons, valves, gauges, and pipes. 

**Visual Style & Materials:**
Use a strict industrial palette: Deep Slate (#2C3E50) for shadows and structural steel, Brushed Silver (#95A5A6) for main bodies, Hazard Red (#E74C3C) for accents/seals, and Brass Gold (#F1C40F) for fittings. 
- **Bevel Honesty:** Every metal surface must have a distinct highlight and shadow edge to convey volume at 32-64px. No flat colors.
- **Silhouette:** Mechanical, rigid, and heavy. Avoid organic curves. 
- **Lighting:** Top-left directional light source. Specular highlights on brass and steel.

**Inventory (Production Set):**
1. **Hero Piston:** 8-frame reciprocation cycle (Idle -> Compress -> Fire -> Retract). 64x64px per frame.
2. **Valves:** 3 variants (Gate, Ball, Check) with open/closed states. 32x32px.
3. **Gauges:** 2 variants (Pressure, Flow) with animated needle overlays. 32x32px.
4. **Pipes:** Straight, Elbow, T-Junction, Cross. 32x32px tiles.
5. **VFX:** Steam puff (4 frames), Spark burst (3 frames), Shockwave ring (3 frames).
6. **UI Plates:** 3 industrial panels with rivets and warning stripes.

**Viewer UX:**
- **Filmstrip:** Horizontal scrollable strip showing all frames of the selected asset.
- **Orbit/Grid:** Toggle between 'Atlas Grid' (all assets) and 'Focus View' (single asset with controls).
- **Interaction:** Clicking the Hero Piston triggers the 'Fire' animation sequence + Steam VFX. Hovering valves triggers steam release.
- **Poster Frame:** At 1.5s, display the full atlas grid with the Hero Piston in mid-fire.

**Downloads:**
- **PNG Atlas:** Single image with JSON metadata for frame coordinates.
- **SVG Pack:** Individual SVG files for each static asset (pipes, valves, UI).
- **GLB:** Optional simple extruded 3D preview of the piston (Three.js CDN allowed for export only).

**Constraints:**
- No stick figures, no emoji, no primitive cubes as hero.
- No Kenney-style flat minimalism; must have material depth.
- No marketing landing page; this is a tool/studio.
- Use Canvas2D for rendering the sprite animations and VFX.
- Font: Black Ops One for headers, Open Sans for UI labels.

**Layout & Responsiveness:**
- **Desktop:** Fixed header, left sidebar for categories, central canvas, bottom filmstrip.
- **Mobile:** Sidebar collapses into a hamburger menu. Canvas scales to fit width. Filmstrip becomes a horizontal swipeable carousel.
- **Breakpoints:** <768px triggers mobile layout adjustments.

**Acceptance Criteria:**
- [ ] Assets render with correct material gradients.
- [ ] Animations trigger on interaction.
- [ ] Downloads generate valid files.
- [ ] Single-file HTML/CSS/JS structure.
