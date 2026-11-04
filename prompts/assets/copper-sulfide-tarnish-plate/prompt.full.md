## Concept
Create a 'Copper Sulfide Tarnish Plate' asset studio. This is a 3D hero mesh family pack featuring weathered copper plates with embossed heraldry. The unique selling point is the time-based surface degradation system: tarnish is not a static texture but a dynamic shader-driven state that progresses from fresh copper to sulfide black to verdigris green. The studio allows users to inspect these plates in 3D, scrub through time to see weathering, and download production-ready GLB files and SVG masks.

## Palette
Primary: Fresh Copper #b87333.
Secondary: Copper Oxide Brown #7a4f2a.
Tertiary: Verdigris Green #4a6b5d.
Accent: Sulfide Black #1a1a1a (for deep tarnish).
UI Background: Dark Slate #2c3e50.
Text: Off-White #ecf0f1.

## Type
Headings: Cinzel (serif, engraved feel, uppercase).
Body/UI: Lato (sans-serif, clean, legible at small sizes).
Ensure high contrast for UI controls against the dark 3D viewport background.

## Layout
Full-screen 3D viewport. Overlay UI panel on the right (300px wide) containing:
1. Title: 'Copper Sulfide Tarnish Plate'.
2. Time Slider: Horizontal range input labeled 'Years of Exposure (0-100)'.
3. Mesh Selector: Dropdown or buttons to switch between Plate A, B, C.
4. Download Buttons: 'Export GLB' and 'Export SVG Mask'.
5. Info Panel: Brief description of the current material state.

## Motion
Entrance: On load, the camera zooms in slightly. The tarnish effect animates from 0% to 15% over 3 seconds to demonstrate the effect.
Ambient: Slow auto-rotation of the mesh (0.2 deg/frame) when idle.
Interaction: Dragging the time slider updates the shader uniform `uTimeProgress` in real-time. The material color and roughness interpolate smoothly. Hovering over download buttons triggers a subtle glow.

## Constraints
- Use Three.js r150+ via CDN.
- No external texture images; generate all textures procedurally using Canvas API or ShaderMaterial noise functions.
- GLB export must include embedded textures.
- SVG mask must be vector-based, not rasterized.
- Performance: Maintain 60fps on mid-range devices. Use low-poly geometry (max 5k triangles per mesh).
- No stick figures, emoji, or primitive cubes as hero meshes.

## Acceptance criteria
1. Viewer loads a 3D copper plate with embossed details.
2. Time slider changes the color from copper to green/black realistically.
3. 'Export GLB' downloads a valid .glb file containing the mesh and textures.
4. 'Export SVG' downloads a valid .svg file representing the tarnish mask.
5. UI uses Cinzel and Lato fonts correctly.
6. No console errors on load or interaction.
7. Meshes are distinct (Shield, Gear, Crest) and not identical copies.
8. Tarnish progression is smooth and non-linear (edges tarnish first).

## Pack type
3D Hero Mesh Family

## Style bible
Materials: PBR Copper with dynamic roughness/metallic based on tarnish level. Edge language: Chamfered rims, soft embossed faces. Light: Studio HDRI, key light at 45 degrees.

## Inventory
6 Mesh Variants (3 motifs x 2 sizes), 3 Procedural Tarnish Maps, 3 UI Backing Plates.

## Download
GLB (PBR baked), SVG (Vector Mask).

## Viewer
Orbit controls, Time-slider for degradation, Mesh selector, Download buttons.

## Detailed Layout Specifications
Desktop Viewport: The 3D canvas fills the entire window. The UI panel is fixed to the right edge, 320px wide, with a semi-transparent dark background (rgba(44, 62, 80, 0.85)) and backdrop-filter blur. It contains a header with the title in Cinzel, followed by the time slider with a custom thumb styled as a copper coin. Below are three toggle buttons for Mesh Selection (Shield, Gear, Crest) and two primary action buttons for Export. Mobile Viewport: The 3D canvas takes the top 60% of the screen. The UI panel becomes a bottom sheet occupying the remaining 40%, with a drag handle. Controls are stacked vertically with increased padding for touch accessibility. The time slider is full-width. Export buttons are fixed at the bottom of the sheet.

## Advanced Motion & Interaction
Entrance Animation: The scene fades in from black over 0.5s. The camera starts at position (0, 0, 5) and moves to (0, 0, 3) using a smoothstep easing function. Simultaneously, the `uTimeProgress` uniform animates from 0.0 to 0.15 over 3 seconds, visually demonstrating how tarnish begins at the plate edges. Ambient Motion: When no user interaction occurs for 5 seconds, the camera slowly orbits the center at 0.2 degrees per frame. Interaction Feedback: Hovering over the 'Export GLB' button increases the emissive intensity of the 3D mesh slightly. Clicking triggers a brief scale-down effect on the button. Slider Dragging: Updating the slider updates the shader uniform immediately, causing real-time color shifts from #b87333 to #4a6b5d. The roughness map also updates, making tarnished areas appear more matte.

## Technical Constraints & Performance
- Single-file HTML/CSS/JS. All CSS and JS must be inline within the HTML file.
- Three.js r150+ loaded via CDN (unpkg or cdnjs).
- No external image assets. All textures (Albedo, Normal, Roughness, Metallic) must be generated procedurally using Canvas API or WebGL ShaderMaterials.
- GLB export must use THREE.GLTFExporter and include embedded textures.
- SVG mask generation must create vector paths representing the tarnish regions, not rasterized images.
- Performance: Maintain 60fps on mid-range devices. Use low-poly geometry (max 5k triangles per mesh). Use instancing if multiple plates are shown.
- No stick figures, emoji, or primitive cubes as hero meshes. All meshes must be authored with proper topology.
- Ensure cross-browser compatibility (Chrome, Firefox, Safari).

## Extended Acceptance Criteria
1. Viewer loads a 3D copper plate with embossed details visible.
2. Time slider changes the color from copper to green/black realistically and smoothly.
3. 'Export GLB' downloads a valid .glb file containing the mesh and textures that can be opened in Blender/Unity.
4. 'Export SVG' downloads a valid .svg file representing the tarnish mask that opens in Illustrator.
5. UI uses Cinzel for headings and Lato for body text correctly.
6. No console errors on load or interaction.
7. Meshes are distinct (Shield, Gear, Crest) and not identical copies.
8. Tarnish progression is smooth and non-linear (edges tarnish first).
9. Mobile layout is functional and touch-friendly.
10. All assets are contained within a single HTML file.

Deliverable: single-file HTML/CSS/JS.

## Type pairing
Cinzel + Lato
