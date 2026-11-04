## Concept
Create a high-end, single-file HTML asset studio for the 'Clockwork Automata Kit'. This is a production-grade 2D sprite pack designed for steampunk and industrial-themed games. The core value proposition is 'Articulated Precision': every sprite must demonstrate logical mechanical movement, material weight, and clear silhouette readability at game resolutions (32-64px). The studio itself should feel like a blueprint viewer or a machinist's workbench, emphasizing technical accuracy and craft. Avoid generic steampunk tropes (goggles, top hats) in favor of pure mechanical elegance (brass plates, pistons, gears, steam).

## Palette
- **Background**: #1A1A1A (Deep Charcoal) - Provides high contrast for brass and steel.
- **Grid/UI Lines**: #2F4F4F (Dark Slate) - Subtle, technical grid background.
- **Primary Metal**: #B87333 (Brass) - Used for highlights, active states, and main automaton body.
- **Secondary Metal**: #C0C0C0 (Silver) - Used for joints, rivets, and inactive UI elements.
- **Accent/Warning**: #8B0000 (Dark Red) - For error states or critical UI indicators (use sparingly).
- **Text**: #E0E0E0 (Off-White) for body, #B87333 for headers.
- **Shadows**: #000000 with 40-60% opacity for bevels.

## Type
- **Headers**: 'Cinzel', serif. Weight 700. Uppercase. Letter-spacing 0.05em. Evokes engraved plaques and classical engineering.
- **Body/Data**: 'IBM Plex Mono', monospace. Weight 400/500. Used for frame counts, coordinates, FPS, and technical labels. Ensures alignment and a 'code/blueprint' feel.
- **Hierarchy**: H1 (Kit Title) > H2 (Section: Inventory, Viewer, Downloads) > H3 (Sprite Name) > Data Labels (Frame 1/8, FPS: 12).

## Layout
- **Container**: Max-width 1200px, centered. Border: 2px solid #B87333 with corner 'rivet' decorations (CSS pseudo-elements).
- **Header**: Title 'CLOCKWORK AUTOMATA KIT' in Cinzel. Subtitle: '2D Production Pack v1.0'.
- **Main Grid**: 2 columns (30% / 70%).
  - **Left Column (Inventory)**: Vertical scrollable list. Each item is a 'card' with a small thumbnail (static frame), name, and frame count. Hover effect: Border glows #B87333. Click selects sprite.
  - **Right Column (Viewer)**:
    - **Top**: Large Canvas (800x600) displaying the selected sprite animation. Background: Dark grid.
    - **Middle**: Controls bar. Buttons: Play/Pause, Step Forward/Back, FPS Slider (6-12), Loop Toggle.
    - **Bottom**: Metadata panel. Shows current frame index, total frames, dimensions, and file size estimate.
- **Footer**: Download buttons. 'Export PNG Atlas' (brass button), 'Export SVG' (silver button). Links to 'Style Guide' (modal).

## Motion
- **Entrance**: On load, the main container scales from 0.9 to 1.0 with a 'gear interlock' sound/visual effect (CSS animation of two gear icons rotating into place). The inventory list items fade in sequentially (staggered delay 50ms).
- **Ambient**: The UI border has a subtle 'ticking' animation. Small gear icons in the corners rotate slowly (1deg per second) to simulate a running machine.
- **Interaction**: 
  - Hovering over an inventory item: Thumbnail scales up 1.05x, border color shifts to #B87333.
  - Clicking a sprite: Preview canvas flashes briefly (white overlay, 100ms fade). The sprite animation starts immediately.
  - Changing FPS: Smooth transition of animation speed. No stuttering.
  - Download Button: On click, button depresses (transform: translateY(2px)), then shows a 'Generating...' spinner (CSS gear rotation) before triggering the download.

## Constraints
- **No External Assets**: All sprites must be generated via Canvas API or embedded SVGs. No image URLs.
- **Quality Bar**: Sprites must have bevels (light/dark edges) to simulate 3D form. No flat, single-color shapes. Silhouettes must be readable at 64px.
- **Animation Logic**: Walk cycles must show weight shift. Idle cycles must have subtle breathing/movement. Strike cycles must show anticipation and follow-through.
- **Performance**: Use requestAnimationFrame for the preview loop. Optimize canvas drawing (clearRect, drawImage).
- **Responsiveness**: On mobile, stack columns. Viewer canvas scales to fit width. Inventory becomes horizontal scroll.
- **No Clichés**: No stick figures. No 'simple shapes'. No generic 'goggles' or 'top hats' unless part of a specific prop. Focus on mechanical articulation.

## Acceptance criteria
- [ ] **Visual Fidelity**: Sprites exhibit clear bevels (highlights/shadows) and material distinction (brass vs. steel vs. copper).
- [ ] **Animation Quality**: Walk cycle shows leg alternation and body bob. Idle cycle shows subtle movement. Strike cycle has clear impact frame.
- [ ] **UI Functionality**: Clicking an inventory item updates the preview canvas. FPS slider changes animation speed in real-time. Play/Pause works.
- [ ] **Downloads**: 'Export PNG Atlas' generates a valid PNG file containing the current sprite sheet. 'Export SVG' generates a valid SVG file.
- [ ] **Typography**: Cinzel and IBM Plex Mono are loaded and applied correctly. No default browser fonts.
- [ ] **Layout**: 2-column layout on desktop, stacked on mobile. No horizontal scrolling on body.
- [ ] **Motion**: Entrance animation plays. Border gears tick. Hover states are visible.
- [ ] **Code Quality**: Single HTML file. No external CSS/JS files (except fonts). Clean, commented code. No console errors.
- [ ] **Asset Count**: Inventory displays at least 1 Hero, 3 Props, and 2 VFX items.

## Pack type
2D Sprite Pack (Atlas)

## Style bible
- **Materials**: Brushed Brass (#B87333), Oxidized Copper (#8B4513), Polished Steel (#C0C0C0), Dark Iron (#2F4F4F).
- **Lighting**: Top-Left Light Source. Highlights on top/left edges. Shadows on bottom/right edges.
- **Silhouette**: Bold, clear outlines. Internal details (rivets, panels) must not break the outer silhouette at small sizes.
- **Articulation**: Visible joints (hinges, pistons). Movement must follow mechanical logic (e.g., knee bends forward, not backward).
- **Color Palette**: Limited to 5-6 colors per sprite to maintain cohesion and readability.

## Inventory
- **Hero Automaton**: 1 Character. States: Idle (8 frames), Walk (8 frames), Strike (6 frames), Repair (4 frames). Total: 26 frames.
- **Props**: 
  1. Large Gear (Static)
  2. Small Gear (Static)
  3. Steam Pipe (Static)
  4. Pressure Valve (Static)
  5. Lever (2 states: Up/Down)
  6. Rivet Plate (Static)
- **VFX**: 
  1. Steam Puff (4 frames)
  2. Spark Burst (4 frames)
  3. Smoke Trail (4 frames)
  4. Gear Rotation (8 frames)

## Download
- **PNG Atlas**: Composite image of all frames for the selected sprite. Transparent background. 64x64px per frame.
- **SVG Sprite**: Vector representation of the current frame. Scalable, editable.
- **JSON Metadata**: Optional, but if implemented, includes frame coordinates and dimensions.

## Viewer
- **Filmstrip**: Vertical list on left. Thumbnails show Frame 1 of each cycle.
- **Preview Canvas**: Large, centered. Shows animation loop. Pixel-perfect rendering.
- **Controls**: Play/Pause, Step, FPS Slider, Loop Toggle.
- **Poster Frame**: At ~1.5s, the viewer should display a 'poster' view (static grid of all frames) if the user pauses or selects 'Atlas View'.
- **Zoom**: Optional zoom in/out for pixel inspection.

## Extended Layout & Responsive Behavior
The desktop layout utilizes a CSS Grid with `grid-template-columns: 320px 1fr` to ensure the inventory panel remains fixed-width while the viewer expands. On screens narrower than 768px, the grid collapses to a single column. The inventory list transforms from a vertical scrollable list into a horizontal scrollable strip with `overflow-x: auto` and `scroll-snap-type: x mandatory` for touch-friendly navigation. The preview canvas must maintain its aspect ratio using `width: 100%; height: auto;` and `object-fit: contain`. Padding on mobile should be reduced to 16px to maximize screen real estate. The header text should scale down using `clamp(1.5rem, 5vw, 2.5rem)` to prevent overflow. The footer download buttons should stack vertically on mobile for easier thumb access.

## Detailed Motion Specifications
The 'ticking' animation for the border gears should use `animation: tick 1s steps(12) infinite` to simulate a mechanical second hand, creating a rhythmic, non-smooth motion that reinforces the clockwork theme. The entrance animation for the main container should use `cubic-bezier(0.175, 0.885, 0.32, 1.275)` for a slight overshoot effect, mimicking the snap of a gear locking into place. Inventory items should have a `transition: all 0.3s ease-out` property. When a sprite is selected, the active inventory card should have a `box-shadow: 0 0 10px rgba(184, 115, 51, 0.5)` to indicate focus. The FPS slider should have a custom thumb styled as a small brass knob. When dragging the slider, the animation speed should update immediately without restarting the loop, achieved by adjusting the `deltaTime` calculation in the `requestAnimationFrame` loop. The 'Generating...' spinner for downloads should be a CSS-only gear rotation (`animation: spin 2s linear infinite`) centered within the button, replacing the text temporarily.

## Technical Constraints & Performance
All JavaScript must be contained within a single `<script>` tag at the end of the `<body>`. Use ES6+ features (const, let, arrow functions, classes) for cleaner code. The sprite generation logic should be modular: create a `SpriteGenerator` class that handles the procedural drawing of each frame. Cache generated frames in an array to avoid redundant drawing during playback. The canvas context should be configured with `ctx.imageSmoothingEnabled = false` to ensure pixel-perfect scaling. Memory usage should be monitored; if the sprite count exceeds 100 frames, consider lazy-loading frames or using offscreen canvases. The download function must use `canvas.toDataURL('image/png')` and create a temporary `<a>` element to trigger the download, ensuring cross-browser compatibility. SVG export should serialize the current frame's path data into a valid SVG string with proper XML namespaces. Ensure no global variable pollution by wrapping the code in an IIFE or using modules.

## Acceptance Criteria Addendum
- [ ] **Responsive Layout**: Verify that the layout switches to single-column on mobile devices (<768px) and that the inventory becomes horizontally scrollable without breaking the layout.
- [ ] **Motion Smoothness**: Ensure that the FPS slider adjustment does not cause stuttering or frame drops in the preview animation.
- [ ] **Download Integrity**: Test that the downloaded PNG atlas opens correctly in image viewers and that the SVG file is valid and editable in vector software.
- [ ] **Accessibility**: Ensure that all interactive elements (buttons, sliders) have appropriate `aria-labels` and that the color contrast meets WCAG AA standards for text readability.
- [ ] **Error Handling**: Implement basic error handling for canvas operations and download triggers to prevent silent failures.
- [ ] **Code Structure**: The code should be well-commented, explaining the procedural generation logic and animation loop mechanics.

Deliverable: single-file HTML/CSS/JS.

## Type pairing
Cinzel + IBM Plex Mono
