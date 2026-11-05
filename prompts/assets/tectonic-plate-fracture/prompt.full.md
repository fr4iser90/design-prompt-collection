## Concept
GEO-SHIFT is a 2D production asset pack focused on geological violence. It provides developers with a cohesive visual language for cracked earth, magma fissures, and seismic UI indicators. The thesis is 'Dynamic Fracture': static assets that imply motion and heat through realistic shading and hard-edge geometry. This is not a cartoon lava pack; it is a realistic, industrial-grade tileset for top-down or side-scrolling games.

## Palette
- **Base Rock**: #5D4037 (Primary surface color, matte finish)
- **Magma Core**: #FF5722 (High-intensity heat source, emissive)
- **Deep Shadow**: #3E2723 (Crack depths, occlusion)
- **Highlight**: #D7CCC8 (Rock edge bevels, minimal usage)
- **UI Accent**: #FF5722 (Used sparingly for active states)

## Type
- **Display**: Oswald (Bold, condensed). Used for pack title, section headers, and asset names.
- **Body**: Source Code Pro (Regular/Medium). Used for metadata, download buttons, and technical specs.
- **Hierarchy**: Clear separation between 'Asset Name' (Oswald) and 'Specs/Format' (Source Code Pro).

## Layout
- **Header**: Fixed top bar with GEO-SHIFT logo (Oswald) and global actions (Download Atlas, Settings).
- **Sidebar (Left)**: Inventory list. Grouped by category (Tiles, Fissures, UI). Each item shows a thumbnail, name, and frame count.
- **Main Viewport (Center)**: Large Canvas area. Displays the selected asset at 4x zoom. Includes a toggle for 'Pixel Grid' and 'Background' (Transparent/Checkerboard).
- **Inspector (Right)**: Details for the selected asset. Shows dimensions, color palette, and export options (PNG, SVG).
- **Footer**: Status bar showing current selection and export status.

## Motion
- **Entrance**: Assets slide into the filmstrip from the right with a 'heavy' easing function (cubic-bezier(0.25, 1, 0.5, 1)) to simulate weight.
- **Ambient**: Magma elements in the viewer pulse with an uneven rhythm (randomized opacity/brightness) to simulate unstable heat.
- **Interaction**: Hovering over a tile triggers a 'shake' effect (translateX/Y jitter) and visually expands the crack width in the preview. Clicking selects the asset with a sharp 'snap' animation.

## Constraints
- **No External Assets**: All graphics must be generated via Canvas API or embedded SVG paths. No image URLs.
- **Performance**: Maintain 60fps during hover effects. Use requestAnimationFrame for animations.
- **Export**: PNG must be transparent. SVG must be clean vector paths (no rasterized blobs).
- **Style**: Strictly avoid 'cartoon' styles. No black outlines. Use shading for depth. Silhouettes must be readable at 32px.
- **Code**: Single HTML file. CSS and JS embedded. No build steps.

## Acceptance criteria
- [ ] Pack title 'GEO-SHIFT' is visible in Oswald.
- [ ] Inventory contains at least 12 distinct assets (4 tiles, 3 fissures, 5 UI).
- [ ] Viewer displays assets at 4x zoom with pixel grid toggle.
- [ ] Hovering over an asset triggers a shake effect and crack expansion.
- [ ] 'Download PNG' button generates a transparent PNG file.
- [ ] 'Download SVG' button generates a valid SVG file.
- [ ] 'Download Atlas' button generates a sprite sheet PNG.
- [ ] Colors match the specified hex codes (#5D4037, #FF5722, #3E2723).
- [ ] No external image CDNs are used.
- [ ] Layout is responsive and functional on desktop.

## Pack type
2D Game Kit (Tileset & UI)

## Style bible
- **Materials**: Matte rock, emissive magma.
- **Edge Language**: Hard, jagged bevels. Light source top-left.
- **Light**: Realistic thermal gradients. No soft glows; use sharp color transitions.
- **Silhouette**: High contrast between rock and crack. Readable at 32-64px.

## Inventory
- **Tiles**: 4x4 grid of cracked earth (varying severity).
- **Fissures**: 3x3 animation set (idle, pulse, erupt).
- **UI**: 5 elements (seismic gauge, crack indicator, warning plate, etc.).
- **Total**: 12+ distinct assets.

## Download
- **PNG**: Transparent background, 1x scale.
- **SVG**: Vector paths for cracks and UI.
- **Atlas**: Combined sprite sheet PNG.

## Viewer
- **Filmstrip**: Horizontal scroll of thumbnails.
- **Main Canvas**: 4x zoom, pixel grid toggle.
- **Poster Frame**: Capture current view at 1.5s intervals.

## Detailed Layout & Responsiveness
The application must adhere to a strict responsive design framework. On desktop viewports (width > 1024px), the layout utilizes a CSS Grid with three distinct columns: a fixed-width Sidebar (250px) for inventory navigation, a flexible Main Viewport that consumes remaining space, and a fixed-width Inspector panel (300px) for asset details. The Header must be sticky at the top, containing the GEO-SHIFT branding and global action buttons. On tablet viewports (768px - 1024px), the Inspector should collapse into a drawer accessible via a toggle button. On mobile viewports (< 768px), the layout stacks vertically: Header, Main Viewport, then a tabbed interface for Inventory and Inspector. Touch targets for all interactive elements must be minimum 44x44 pixels to ensure usability. The filmstrip component must support native horizontal scrolling with momentum on touch devices, while maintaining a custom scrollbar style on desktop.

## Motion & Interaction Physics
Motion design is critical to the 'geological' theme. Entrance animations for assets in the filmstrip should stagger by 50ms per item, sliding in from the right with a cubic-bezier(0.25, 1, 0.5, 1) easing to simulate heavy, settling weight. When an asset is selected, the main canvas should flash briefly (opacity 0.8 to 1.0 over 100ms) to confirm selection. Hovering over a tile in the filmstrip triggers a 'micro-earthquake' effect: a random translateX and translateY jitter of 1-2px at 10Hz, combined with a scale-up to 1.05x. In the main viewer, hovering over the rendered asset should dynamically increase the stroke width of crack lines by 10% to simulate stress. The magma elements must pulse using a sine wave function modulating opacity between 0.7 and 1.0 over a 2-second cycle, with random phase offsets for each fissure to avoid synchronized, artificial-looking patterns. All animations must use requestAnimationFrame for smooth 60fps performance.

## Technical Implementation Details
The core rendering engine relies on the HTML5 Canvas API. All assets are procedurally generated using JavaScript functions that draw paths, fills, and gradients. No external image files are permitted. The 'Download Atlas' function must iterate through all generated assets, draw them onto a single off-screen canvas in a grid layout, and convert it to a PNG data URL for download. The 'Download SVG' function must reconstruct the asset's vector paths into an SVG string, ensuring that gradients are defined in <defs> and paths are optimized for size. The 'Poster Frame' mode captures the current canvas state every 1.5 seconds, storing the last 10 frames in a temporary buffer, accessible via a gallery view for previewing animation sequences. Code must be modular, with separate functions for asset generation, UI rendering, and event handling. Comments must explain complex mathematical operations used for procedural generation.

## Deliverable
single-file HTML/CSS/JS.

## Type pairing
Oswald (Display) + Source Code Pro (Body)
