## Concept
OXIDE YIELD is a 2D game kit designed for environmental storytelling through material decay. The core fantasy is 'industrial erosion': assets that tell a story of time and neglect. The kit is not just static images but a dynamic system where a single 'oxidation level' parameter controls the visual state of all assets, from clean steel to advanced corrosion. This allows developers to easily integrate decay into gameplay mechanics (e.g., health bars rusting as damage is taken, or props aging over time).

## Palette
- Base Metal: #5C5C5C (Clean steel, neutral gray)
- Rust Primary: #B25D25 (Mid-stage oxidation, earthy orange)
- Rust Highlight: #D48A52 (Flaking edges, lighter orange)
- Dust/Residue: #E6CBAF (Light beige, settled particles)
- Background/UI: #2B2D2F (Dark industrial gray, high contrast)
- Accent Glow: #FF5722 (Used sparingly for interactive states)

## Type
- Display: Anton (Bold, condensed, industrial feel)
- Body: IBM Plex Sans (Clean, technical, readable for labels and UI text)
- Monospace: IBM Plex Mono (For coordinate displays or technical data if needed)

## Layout
- Viewer: A grid-based filmstrip viewer. Assets are displayed in a 4x4 grid (16 slots). Each slot shows a sprite at 64x64px. Gap: 16px. Padding: 24px.
- Controls: A large horizontal timeline slider at the bottom of the viewport. Label: 'Oxidation Level'. Range: 0-100. Step: 1. Thumb size: 24px.
- Header: Title 'OXIDE YIELD' in Anton, subtitle 'Rust & Corrosion Kit' in IBM Plex Sans. Height: 80px. Sticky position.
- Download Section: Two prominent buttons: 'Download PNG Atlas' and 'Download SVG UI'. Placed in the top-right corner of the header or a dedicated toolbar.
- Mobile Layout: Grid becomes 2 columns. Slider is sticky bottom. Header is compact.

## Motion
- Entrance: A rust texture wipe animation reveals the clean metal UI from left to right. Duration: 1.2s. Easing: cubic-bezier(0.4, 0, 0.2, 1).
- Ambient: Dust particles (#E6CBAF) settle slowly on the bottom edge of the viewport, simulating accumulation. Max 50 particles. Velocity: 0.5px/frame. Oscillation: Sine wave, amplitude 2px.
- Interaction: Dragging the timeline slider triggers a real-time morph of all sprite textures. The transition should be smooth, showing the progression of rust layers. Flaking edges should appear as oxidation increases. Add a subtle 'heat shimmer' distortion on metal surfaces when oxidation < 20%.
- Hover: Sprite slots scale up by 1.05x on hover with a box-shadow glow.

## Pack type
2D Game Kit (Sprites, Props, UI, VFX).

## Style bible
- Materials: Metal must show bevels and light interaction. Rust must be structured, not noisy. Use distinct layers: base metal, mid-rust, flaking edges, dust residue.
- Edge Language: Sharp, industrial edges. Bevels on all metal surfaces. Rust flakes should have irregular but geometric shapes.
- Light: Top-down lighting. Highlights on top edges, shadows on bottom edges.
- Silhouette Rules: All assets must be readable at 32-64px. Avoid thin lines. Use bold shapes.
- Cohesion: All assets share the same rust pattern logic and color palette. The oxidation level affects all assets uniformly.
- Procedural Generation: Use noise functions (Perlin or Simplex) to determine rust patch locations, ensuring no two sprites look identically decayed unless intended.

## Inventory
- Player: 1 idle sprite, 1 walk cycle (4 frames), 1 hazard reaction sprite (3 items).
- Hazards: 2 rusted spike traps, 1 corroded steam vent (3 items).
- Props: 4 industrial crates (varying decay levels), 2 broken pipes (6 items).
- UI: 2 health bars (clean vs. corroded), 1 inventory slot frame (3 items).
- VFX: 2 dust puff sprites, 1 rust flake shower (3 items).
Total: 16 items.

## Download
- PNG Atlas: A 4x4 grid of 64x64px sprites, representing the current oxidation level. Transparent background. Filename: oxide_yield_atlas_[level].png.
- SVG UI: Vector outlines of the UI elements (health bars, inventory slot) with current rust colors applied. Filename: oxide_yield_ui_[level].svg.

## Viewer
- Filmstrip Grid: 4x4 layout displaying all 16 assets.
- Timeline Slider: Controls oxidation level (0-100). Updates all sprites in real-time.
- Poster Frame: At 1.5s, the viewer should display a 'poster' view: the atlas grid with the hero player sprite highlighted, showing the full range of oxidation.

## Constraints
- No stick figures, no emoji, no primitive cubes/spheres.
- No external asset CDNs. All assets must be generated procedurally or embedded as base64.
- Use Canvas2D for rendering and manipulation.
- Ensure high quality: bevels, material honesty, readable silhouettes.
- Avoid 'grunge' noise overlays; use structured flake patterns.
- Single file HTML/CSS/JS.
- Accessibility: WCAG 2.1 AA compliant contrast ratios.

## Acceptance criteria
- [ ] The viewer displays all 16 assets in a 4x4 grid.
- [ ] The timeline slider controls the oxidation level of all assets in real-time.
- [ ] The oxidation transition shows distinct layers: clean steel, mid-rust, flaking edges.
- [ ] The entrance animation reveals the UI with a rust wipe.
- [ ] Dust particles settle on the bottom edge.
- [ ] The 'Download PNG Atlas' button generates a valid 4x4 sprite sheet.
- [ ] The 'Download SVG UI' button generates a valid SVG file.
- [ ] All assets are readable at 32-64px.
- [ ] The color palette matches the specified hex codes.
- [ ] The type pairing is Anton and IBM Plex Sans.
- [ ] The layout is responsive on desktop and mobile.
- [ ] Performance remains above 30fps during slider interaction on mid-range devices.
- [ ] No console errors on load or interaction.

## Type pairing
Anton (Display) + IBM Plex Sans (Body)
