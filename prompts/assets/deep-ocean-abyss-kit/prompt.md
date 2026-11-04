Build a single-file HTML Asset Studio for 'Abyssal Trench Kit', a cohesive 2D game kit. The deliverable is a high-fidelity viewer and download generator, not a landing page. 

**Pack Type**: 2D Game Kit (Player, Enemies, Props, UI, VFX).
**Style Bible**: 'Dark Abyssal Glow'. Silhouettes are organic, fluid, and non-cartoonish. Use deep void blacks (#020B14) as base, with bioluminescent accents in Cyan (#00FFFF) and Deep Ocean Blue (#0077BE). No hard outlines; use glow and gradient falloff for definition. Materials feel wet, translucent, and pressurized.

**Inventory (16 Items Total)**:
1. **Player**: Submersible 'Nautilus-X' (Idle, Move, Boost frames - 3 states).
2. **Enemies**: 3 Bioluminescent Jellyfish variants (Pulse, Drift, Attack - 3 states each).
3. **Hazards**: 2 Spiky Sea Urchins (Static, Rotating).
4. **Props**: 3 Debris pieces (Broken hull, Rock, Coral fragment).
5. **UI**: Sonar Radar Plate, Depth Meter, Health Bar (segmented).
6. **VFX**: Bubble Trail, Light Beam, Impact Flash.

**Viewer UX**: 
- Main Canvas: Displays the 'Poster Frame' at 1.5s (Atlas Grid view with hero submersible centered).
- Filmstrip: Horizontal scroll for animation frames.
- Kit Grid: Toggle to view all 16 items in a categorized grid.
- Interaction: Clicking an item triggers a 'Sonar Ping' effect (expanding cyan ring) and highlights the item's metadata.

**Downloads**: 
- Generate a single PNG Atlas (2048x2048) containing all sprites with padding.
- Generate an SVG file for UI elements only.
- Provide a JSON manifest mapping sprite names to atlas coordinates.

**Technical Constraints**: 
- Use Canvas 2D for rendering the viewer and generating the atlas.
- No external image assets; all sprites must be procedurally drawn or embedded as base64 SVG paths within the JS.
- Font: Exo 2 for headers, Lato for body/UI.
- Background: Radial gradient from #051923 to #020B14.
- Ensure sprites are readable at 64px game size.

**Motion**: 
- Entrance: Items fade in with a slight upward drift and cyan glow pulse.
- Ambient: Jellyfish sprites pulse opacity slightly in the viewer.
- Interaction: Sonar ping on click.

**Layout & Responsiveness**: 
- **Desktop**: Split layout with a fixed left sidebar (250px) for controls and a flexible main canvas area. Sidebar contains categorized lists and export buttons. 
- **Mobile**: Stacked layout. Sidebar collapses into a bottom navigation bar or a hamburger menu overlay. Main canvas takes full width. Touch targets must be at least 44x44px. 
- **Grid Logic**: CSS Grid for the Kit View, Flexbox for the Filmstrip. Ensure no horizontal scrolling on the main body; only internal containers scroll.

**Additional Motion Details**: 
- **Hover States**: Non-interactive elements (background gradients) remain static. Interactive items scale to 1.05x with a transition duration of 200ms ease-out. 
- **Loading State**: A subtle 'scanning' line animation moves vertically across the canvas while assets are procedurally generated.
- **Export Feedback**: When a download is triggered, show a toast notification with a cyan border that slides in from the right, stays for 3s, then fades out.

**Acceptance Criteria**: 
- [ ] Single HTML file contains all CSS, JS, and procedural asset definitions.
- [ ] No external network requests for images or fonts (use system fallbacks if web fonts fail, but prefer embedded base64 or CDN links if allowed by constraints, otherwise stick to strict no-external-assets rule).
- [ ] Atlas generation is synchronous and does not freeze the UI for more than 100ms.
- [ ] All 16 items are visible and selectable.
- [ ] Sonar effect is smooth and does not leak memory (clean up canvas layers).

**Deliverable**: single-file HTML/CSS/JS.
