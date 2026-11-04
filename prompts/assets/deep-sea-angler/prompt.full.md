## Concept
Create 'ABYSS LURE', a high-fidelity 2D asset studio for a bioluminescent deep-sea creature kit. The design philosophy is 'Light as Subject': in the abyss, visibility is limited to the light produced by the creature itself. The studio interface must reflect this—dark, immersive, with the cursor acting as a dynamic light source that reveals the assets. The pack focuses on anglerfish anatomy, emphasizing jagged teeth, fleshy bodies, and glowing lures (illicium). This is not a generic fish kit; it is a horror-adjacent, atmospheric production set.

## Palette
- **Void**: #000000 (Background, negative space)
- **Flesh**: #1A1A1A (Body base, subtle shading)
- **Lure Glow**: #00FFFF (Primary bioluminescence, high intensity)
- **Danger**: #FF0055 (Secondary glow, teeth highlights, UI accents)
- **Chrome**: #333333 (UI borders, inactive states)

## Type
- **Display**: Anton (Bold, condensed, industrial feel for headers like 'ABYSS LURE', 'EXPORT')
- **Body**: Lato (Clean, readable for frame labels, coordinates, and instructions)
- **Usage**: Headers in uppercase, tight tracking. Body text in lowercase, generous line-height for readability against dark backgrounds.

## Layout
- **Main Stage**: Full-viewport Canvas. Black background. The creature is centered. 
- **Sidebar (Right)**: 300px width. Contains:
  - 'Light Control': Slider for glow intensity, toggle for cursor-follow.
  - 'Asset List': Scrollable list of frames (Idle, Walk, Strike, Props).
  - 'Export Panel': Buttons for 'Download PNG Atlas', 'Download SVG Silhouettes'.
- **Bottom Bar**: Filmstrip view of all 20+ frames. Clicking a frame highlights it in the main stage.
- **Header**: Top-left, 'ABYSS LURE' in Anton. Top-right, 'Status: Connected' with a pulsing cyan dot.
- **Mobile Adaptation**: Sidebar becomes a slide-up drawer triggered by a floating action button. Filmstrip remains at bottom but reduces height to 80px. Canvas takes full remaining space.

## Motion
- **Entrance**: On load, the screen is black. A single cyan pixel appears, then flickers on, illuminating the anglerfish's face. The rest of the body fades in as the light expands.
- **Ambient**: The lure (illicium) bobs gently on a sine wave, simulating water resistance. The body sways slightly.
- **Interaction**: 
  - Cursor movement: The light source follows the cursor. The creature's eye and head rotate to track the cursor. 
  - Hover: Hovering over a frame in the filmstrip highlights it with a cyan border.
  - Click: Clicking 'Export' triggers a brief flash of white light before the download starts.
- **UI Motion**: Sliders have smooth thumb transitions. Toggle switches have magnetic snap effects. 

## Constraints
- **No External Assets**: All graphics must be generated via Canvas 2D API or embedded base64. No image URLs.
- **Silhouette Readability**: At 64x64px, the creature must be recognizable without outlines. Use light falloff to define edges.
- **Performance**: Maintain 60fps during cursor tracking. Use requestAnimationFrame.
- **Download Functionality**: 
  - PNG: Must generate a valid atlas image (transparent background) containing all frames.
  - SVG: Must generate valid vector paths for the silhouettes.
- **Anatomy**: No stick figures. No primitive circles/squares as the hero. Use bezier curves for organic shapes.
- **Color Accuracy**: Strict adherence to the hex palette. No gradients that deviate from the cyan/magenta theme.

## Acceptance criteria
- [ ] **Visual**: Creature is barely visible without light; light source (cursor) reveals details.
- [ ] **Silhouette**: 64px render is clear and distinct from background.
- [ ] **Interaction**: Cursor movement smoothly drags the creature's gaze and light source.
- [ ] **Inventory**: Contains at least 4 Idle, 8 Walk, 6 Strike frames, plus props/VFX.
- [ ] **Download**: 'Download PNG' creates a valid file with all frames in a grid.
- [ ] **Download**: 'Download SVG' creates a valid vector file.
- [ ] **Type**: Anton and Lato are used correctly; no Inter/Roboto/Arial.
- [ ] **Code**: Single HTML file, no external dependencies except fonts (Google Fonts allowed).
- [ ] **Quality**: No stick figures, no primitive shapes, no generic fish. High-quality bevels on UI.
- [ ] **Performance**: No lag during cursor tracking.
- [ ] **Mobile**: Touch interactions work correctly for light source and UI navigation.

## Pack type
2D Sprite/Atlas Kit

## Style bible
- **Materials**: Fleshy, wet, dark. Subsurface scattering effect via radial gradients.
- **Edge Language**: Sharp, jagged teeth; smooth, organic body curves.
- **Light**: Point light source (cursor) with radial falloff. Ambient occlusion via dark shadows.
- **Silhouette**: Stark, high-contrast. Defined by light, not outlines.

## Inventory
- **Hero Angler**: 
  - Idle: 4 frames (breathing motion)
  - Walk/Swim: 8 frames (fin movement)
  - Strike: 6 frames (mouth open, lunge)
- **Props**: 
  - 4 Lure variants (different glow patterns)
  - 2 Teeth clusters
  - 1 Eye highlight
- **VFX**: 
  - 3 Bubble trails
  - 2 Light pulses
- **UI**: 
  - 1 Health bar plate
  - 1 Pause icon
- **Total**: 21 items.

## Download
- **PNG Atlas**: 512x512px canvas, transparent background, grid layout of all frames.
- **SVG Silhouettes**: Vector paths for body, teeth, and lure. Colored layers for glow.
- **JSON Metadata**: Frame names, dimensions, and animation timings.

## Viewer
- **Main Canvas**: Interactive light source.
- **Filmstrip**: Horizontal scroll of frames.
- **Poster Frame**: Auto-capture at 1.5s showing atlas grid + bevel hero.
- **Controls**: Light intensity, cursor-follow toggle, export buttons.

## Technical Implementation Details
- **Canvas Rendering**: Use `ctx.globalCompositeOperation = 'lighter'` for additive blending of glow effects. 
- **Procedural Generation**: Generate teeth using recursive fractal-like algorithms for jaggedness. Generate body shapes using Bezier curves with noise perturbation for organic irregularity.
- **Lighting Model**: Implement a simple inverse-square falloff for the cursor light. `intensity = 1 / (distance^2 + epsilon)`. Clamp intensity to prevent blowout.
- **Export Logic**: 
  - PNG: Create an offscreen canvas, draw all frames in a grid, convert to Blob, trigger download.
  - SVG: Construct SVG string with `<path>` elements for silhouettes and `<filter>` for glow. Trigger download.
- **Responsiveness**: Use CSS Grid for layout. Media queries for breakpoints at 768px and 480px. 
- **Accessibility**: Ensure all interactive elements have `aria-labels`. Provide keyboard navigation for filmstrip (arrow keys).

## Deliverable
single-file HTML/CSS/JS.

## Type pairing
Anton + Lato
