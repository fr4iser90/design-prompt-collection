Build a single-file HTML asset studio for 'OXIDE YIELD', a 2D game kit focused on material honesty through procedural rust layering. The core feature is an interactive oxidation timeline slider that morphs all kit assets from clean steel to advanced corrosion in real-time. The visual language is industrial decay: structured flake patterns, distinct oxidation layers (iron oxide, patina, dust), and bevelled metal edges. Avoid generic grunge noise; use geometric flaking and layered color shifts.

Inventory (16 items total):
- Player: 1 idle sprite, 1 walk cycle (4 frames), 1 hazard reaction sprite (all @64px, layered rust states).
- Hazards: 2 rusted spike traps, 1 corroded steam vent.
- Props: 4 industrial crates (varying decay levels), 2 broken pipes.
- UI: 2 health bars (clean vs. corroded), 1 inventory slot frame.
- VFX: 2 dust puff sprites, 1 rust flake shower.

Viewer UX: A filmstrip layout displaying all assets in a grid. A prominent horizontal timeline slider at the bottom controls the 'oxidation level' (0% to 100%). As the slider moves, all sprites update their texture layers: clean steel (#5C5C5C) transitions to mid-rust (#B25D25) to deep corrosion (#D48A52) with flaking edges. Ambient dust particles settle on the bottom edge. Entrance animation: A rust wipe reveals the clean metal UI.

Download: Provide buttons to download the current state as a PNG Atlas (sprite sheet) and an SVG file of the UI elements. The PNG should be a 4x4 grid of 64x64px sprites. The SVG should include the UI frames and hazard outlines.

Style Bible: Materials must show bevels and light interaction. Silhouettes must remain readable at 32-64px. Colors: Base Metal #5C5C5C, Rust Primary #B25D25, Rust Highlight #D48A52, Dust #E6CBAF, Background #2B2D2F. Type: Anton for headers, IBM Plex Sans for labels. No stick figures, no emoji, no primitive cubes. Use Canvas2D for rendering and manipulation. Ensure the kit is cohesive: all assets share the same rust pattern logic and color palette.

Layout & Responsiveness: On desktop, the viewer occupies the central 60% of the viewport, with the timeline slider fixed at the bottom (height: 80px). On mobile, the grid collapses to a 2x8 vertical scroll list, and the slider becomes a sticky footer element. Touch targets for the slider must be at least 44px high. The header remains sticky at the top with a backdrop-blur effect.

Motion Details: The entrance rust wipe uses a CSS mask-image animation lasting 1.2s with cubic-bezier(0.4, 0, 0.2, 1) easing. Dust particles are generated via JS, with 50 active particles max, drifting downwards at 0.5px/frame with slight horizontal sine-wave oscillation. Slider interaction triggers a 'shimmer' effect on the metal surfaces where oxidation is < 20%.

Constraints: All code must be inline. No external images. Fonts loaded via Google Fonts CDN. Performance target: 60fps during slider drag. Ensure accessibility: slider has aria-label 'Oxidation Level', buttons have clear text labels.

Acceptance Criteria: The single HTML file must run locally without errors. The PNG export must be transparent where appropriate. The SVG export must be valid XML. The rust patterns must look procedural, not tiled. The UI must not overlap the sprite grid on any screen size.
