## Concept
**AIR DRIVE** is a high-fidelity 2D industrial machinery asset pack designed for side-scrolling platformers, factory simulators, or puzzle games. The fantasy is heavy, pressurized, mechanical power. The kit focuses on the interplay of steel, brass, and steam. The core mechanic is reciprocation: pistons that fire, valves that release, and gauges that react. The aesthetic is 'Blue-Collar Precision'—clean but worn, functional but beautiful.

## Palette
- **#2C3E50 (Deep Slate):** Primary shadow color, structural beams, dark recesses.
- **#95A5A6 (Brushed Silver):** Main body of pistons, pipes, and machine casings. Requires linear gradients to simulate brushed metal.
- **#E74C3C (Hazard Red):** Rubber seals, emergency buttons, warning stripes, piston heads.
- **#F1C40F (Brass Gold):** Fittings, bolts, gauge bezels, valve handles. High specular highlight.
- **#ECF0F1 (Steam White):** VFX particles, highlights on steel.
- **#7F8C8D (Mid-Gray):** Secondary shading, rivets, unlit surfaces.

## Type
- **Display:** 'Black Ops One' – Bold, stencil-like, industrial. Used for Pack Title, Section Headers, and Asset Names.
- **Body/UI:** 'Open Sans' – Clean, legible at small sizes. Used for frame counts, download buttons, and technical specs.
- **Hierarchy:** Title (48px, Black Ops One), Asset Name (24px, Black Ops One), Meta Data (14px, Open Sans, #7F8C8D).

## Layout
- **Header:** Fixed top bar with 'AIR DRIVE' logo (left), Pack Type badge (center), and Download buttons (right).
- **Main Stage:** Central Canvas (800x600) displaying the 'Focus View' or 'Atlas Grid'.
- **Control Panel:** Left sidebar (250px) listing asset categories (Pistons, Valves, Gauges, VFX, UI). Clicking a category filters the main stage.
- **Filmstrip:** Bottom bar (100px height) showing the current asset's frame sequence. Scrollable if >8 frames.
- **Footer:** Technical specs (Resolution, Frame Count, Format) and License info.

## Motion
- **Entrance:** On load, the Hero Piston slams down into the center stage with a 'shockwave' ripple effect (expanding ring of #95A5A6 fading out).
- **Ambient:** 
  - Gauge needles jitter slightly (±2 degrees) every 2 seconds to simulate pressure.
  - Subtle 'breathing' glow on Hazard Red elements (opacity 0.8 -> 1.0 -> 0.8 over 3s).
- **Interaction:**
  - **Click Piston:** Triggers 8-frame fire sequence. Steam VFX emits from exhaust ports. Screen shake (2px, 0.1s).
  - **Hover Valve:** Valve handle rotates 15 degrees. Small steam puff emits from the side.
  - **Hover Gauge:** Needle spikes to max pressure, then returns to idle.
  - **Hover Download Button:** Button background shifts from #2C3E50 to #E74C3C. Text becomes white.

## Constraints
- **No Stick Figures/Emoji:** All assets must be mechanically plausible.
- **No Flat Minimalism:** Must use gradients, bevels, and shading to convey material (steel vs. brass vs. rubber).
- **Silhouette Read:** At 32px, the piston must be clearly distinguishable from a pipe. Use thick outlines (#2C3E50) for all assets.
- **Single File:** All CSS, JS, and SVG/Canvas rendering logic must be in one HTML file.
- **No External Asset CDNs:** Do not link to external image files. Generate sprites via Canvas or embed SVGs.
- **Three.js:** Only allowed for optional GLB export preview, not for the main 2D viewer.

## Acceptance criteria
- [ ] **Pack Type:** Clearly labeled as '2D Industrial Machinery Kit'.
- [ ] **Style Bible:** Assets use #2C3E50, #95A5A6, #E74C3C, #F1C40F. Metal surfaces have gradients/bevels.
- [ ] **Inventory:** Includes at least 1 Hero Piston (8 frames), 3 Valves, 2 Gauges, 4 Pipe types, 3 VFX sets, 3 UI plates.
- [ ] **Downloads:** 'Download PNG Atlas' generates a valid PNG + JSON. 'Download SVG' generates a ZIP or individual SVGs.
- [ ] **Viewer:** Filmstrip shows all frames. Clicking a frame updates the main stage. 
- [ ] **Interaction:** Clicking the piston triggers animation + VFX. Hovering valves triggers VFX.
- [ ] **Poster Frame:** At 1.5s, the screen displays the full atlas grid or a dynamic hero shot.
- [ ] **Typography:** Uses Black Ops One and Open Sans. No Inter/Roboto/Arial.
- [ ] **Performance:** Animation runs at 60fps on Canvas. No memory leaks on repeated clicks.
- [ ] **Code Quality:** Clean, commented JS. No console errors.

## Pack type
2D Sprite Pack / Tileset / Atlas

## Style bible
- **Materials:** Brushed Steel (linear gradient #95A5A6 to #7F8C8D), Rubber (matte #E74C3C with dark shadow), Brass (radial gradient #F1C40F to #D4AC0D with white specular).
- **Edge Language:** Hard edges, chamfered corners, visible rivets/bolts. No soft blurs except for steam VFX.
- **Light:** Top-left key light. Strong shadows on bottom-right.
- **Silhouette:** Mechanical, rigid, heavy. Distinct shapes for pipes (cylindrical) vs pistons (rectangular with rod).

## Inventory
- **Hero Piston:** 8 frames (Idle, Compress, Fire, Retract, Loop). 64x64px.
- **Valves:** Gate, Ball, Check. Open/Closed states. 32x32px.
- **Gauges:** Pressure, Flow. Needle overlay. 32x32px.
- **Pipes:** Straight, Elbow, T-Junction, Cross. 32x32px.
- **VFX:** Steam Puff (4 frames), Spark (3 frames), Shockwave (3 frames).
- **UI:** 3 Panels (Warning, Control, Info). 64x32px.

## Download
- **PNG Atlas:** Single image (1024x1024) with JSON metadata for slicing.
- **SVG Pack:** Individual SVG files for static assets (pipes, valves, UI).
- **GLB:** Optional 3D preview of the piston (Three.js export).

## Viewer
- **Filmstrip:** Horizontal scroll at bottom. Shows current asset frames.
- **Grid/Orbit:** Toggle between 'Atlas Grid' (all assets) and 'Focus View' (single asset).
- **Poster Frame:** At 1.5s, display full atlas grid with Hero Piston in mid-fire.

## Layout & Responsiveness Details
- **Desktop Layout:** 
  - **Header:** Fixed position, z-index 100. Contains logo, pack badge, and download actions.
  - **Sidebar:** Fixed width 250px, scrollable if content overflows. Background #2C3E50.
  - **Main Stage:** Flexible width, centered canvas. Background #ECF0F1 with subtle grid pattern.
  - **Filmstrip:** Fixed height 100px, bottom aligned. Background #7F8C8D.
- **Mobile Layout:**
  - **Header:** Collapses logo and menu icon. Downloads move to a dropdown.
  - **Sidebar:** Hidden by default, slides in from left on hamburger click.
  - **Main Stage:** Full width, height adjusted to fit viewport minus header/filmstrip.
  - **Filmstrip:** Horizontal scroll with snap points for each frame.
- **Breakpoints:**
  - **<768px:** Mobile layout active. Font sizes reduced by 20%.
  - **>=768px:** Desktop layout active. Full sidebar visible.

## Additional Motion & Interaction Specs
- **Loading State:** Show a 'Pressurizing...' text with a filling gauge animation while assets generate.
- **Error Handling:** If download fails, show a red toast notification with 'Export Error' text.
- **Hover States:** All interactive elements must have a clear hover state (color shift or scale transform).
- **Active States:** Selected asset in sidebar must have a left border accent (#F1C40F).

## Deliverable
Single-file HTML/CSS/JS. No external dependencies except Google Fonts and optional Three.js CDN for GLB export.
