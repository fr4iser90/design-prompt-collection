## Concept
Create a high-fidelity 3D asset studio for the 'Magnetic Levitation Core' pack. This is not a generic floating object demo; it is a production-ready kit for sci-fi games or visualizations. The core fantasy is 'contained infinite energy'—artifacts that defy gravity through visible magnetic force. The studio must allow users to view, inspect, and download these assets. The primary deliverable is a single HTML file containing a Three.js viewer, a procedural mesh generator (or embedded GLB data), and a UI for selection and export. The experience should feel like a high-end industrial design tool, blending technical precision with sci-fi aesthetics. The interface should be minimalist yet information-dense, providing users with immediate access to technical specifications and export options without cluttering the visual field. The transition between artifacts should be seamless, with a quick fade-to-black or cross-dissolve effect to maintain immersion. The studio should also include a 'Reset View' button that animates the camera back to its default position, ensuring users can always return to the optimal viewing angle. The overall tone should be professional, futuristic, and precise, appealing to developers and designers looking for high-quality sci-fi assets.

## Palette
- **Deep Void (#000033)**: Background, unlit metal shadows, UI base. Creates depth and contrast for emissive elements. This color should be used for the main canvas background and the primary UI panels to establish a dark, immersive environment.
- **Ion Cyan (#00BFFF)**: Emissive energy, field lines, active UI states, selection highlights. Must be bright and saturated. This color is the primary accent, used for interactive elements, active states, and the energy cores of the artifacts.
- **Pure White (#FFFFFF)**: Text, specular highlights, UI borders, inactive icons. Provides crisp readability against the dark void. Use this for all primary text and high-contrast elements to ensure accessibility and clarity.
- **Supporting**: Use grayscale gradients for metallic reflections to ensure material honesty. Subtle shades of gray (#1a1a1a, #333333) can be used for secondary UI elements and dividers to create visual hierarchy without introducing new colors.

## Type
- **Display**: Rajdhani. Use for all headers, button labels, and artifact names. It has a technical, sci-fi aesthetic with sharp angles. Use Rajdhani Bold for main titles and Rajdhani Regular for secondary headers.
- **Body**: Open Sans. Use for descriptions, technical specs (poly count, material type), and tooltips. Clean and legible at small sizes. Use Open Sans Light for metadata and Open Sans Regular for body text.
- **Hierarchy**: Rajdhani Bold for titles, Rajdhani Regular for buttons, Open Sans Light for metadata. Ensure consistent font sizes and line heights across all UI elements to maintain a professional look.

## Layout
- **Main Viewport**: 70% of the screen, centered. Dark navy background. Orbit controls enabled (rotate, zoom, pan). Ensure the canvas resizes dynamically with the window. The viewport should be the dominant element, allowing users to focus on the 3D content.
- **Inventory Panel**: Bottom strip, 15% height. Horizontal scrollable list of 4 artifact thumbnails. Each thumbnail shows the mesh in a neutral pose. On mobile, this becomes a swipeable carousel. The thumbnails should be clickable, switching the main view to the selected artifact with a smooth transition.
- **Control Sidebar**: Right side, 15% width. Contains 'Download GLB', 'Toggle Wireframe', 'Disrupt Mode' toggle, and material sliders (if applicable). On mobile, this collapses into a bottom sheet triggered by a floating action button. The sidebar should include real-time telemetry data and export options.
- **Header**: Top bar with pack title 'MAGNETIS: Levitation Core' and version info. Fixed position with a subtle backdrop blur. The header should remain visible at all times, providing context and navigation.

## Motion
- **Entrance**: On load, the selected artifact floats up from the 'floor' (y=0) to its levitation height (y=1.5) with a smooth ease-out. Field lines fade in with a staggered delay. The entrance animation should feel weighty and deliberate, emphasizing the mass of the artifact.
- **Ambient**: The artifact rotates slowly on its Y-axis. The internal energy core pulses (emissive intensity oscillates). Magnetic field lines (procedural curves) pulse in opacity and scale. The ambient motion should be subtle and continuous, creating a sense of life and energy.
- **Interaction**: 'Disrupt Mode' (toggleable). When active, mouse movement near the artifact creates a repulsive force, causing the mesh to wobble and the field lines to distort chaotically. Releasing the mouse returns it to stable levitation with a spring-back animation. The disrupt effect should be visually striking, with chromatic aberration and particle effects.
- **UI Feedback**: Buttons should have a subtle glow on hover. Active states should be indicated by a cyan border. Transitions between UI states should be quick and snappy, providing immediate feedback to user actions.

## Constraints
- **No External Assets**: All geometry must be generated via Three.js primitives (TorusKnot, Sphere, Box) combined with CSG-like boolean operations or vertex manipulation, OR embedded as base64 GLB strings. No external image textures or model files. This ensures the file is self-contained and portable.
- **Material Honesty**: Use MeshStandardMaterial or MeshPhysicalMaterial. No flat colors. Metallic/Roughness maps must be procedural or vertex-based. Materials should react realistically to light, with proper reflections and refractions.
- **Performance**: Keep poly count under 5k per artifact for web compatibility. Use instancing for field lines if possible. Optimize the render loop to maintain 60fps on mid-range devices.
- **Export**: The 'Download GLB' button must use THREE.GLTFExporter to save the current scene's selected mesh with its animation clips. Ensure the exported file is compatible with standard 3D software.
- **Silhouette**: Artifacts must be distinct. No simple cubes or spheres as the primary hero shape. Each artifact should have a unique visual identity that is recognizable even at small sizes.

## Acceptance criteria
- [ ] Single HTML file loads without external asset dependencies (except Three.js CDN).
- [ ] Viewer displays 4 distinct artifacts: Toroidal Core, Spherical Node, Prism Shard, Ring Array.
- [ ] Artifacts are NOT simple primitives; they have authored detail (rings, conduits, facets).
- [ ] Materials are PBR (metallic/roughness/emissive) and look filmic under studio lighting.
- [ ] 'Download GLB' button successfully exports a .glb file of the selected artifact.
- [ ] 'Disrupt Mode' causes visible wobble/distortion in the mesh and field lines.
- [ ] UI uses Rajdhani and Open Sans fonts correctly.
- [ ] Color palette strictly adheres to #000033, #00BFFF, #FFFFFF.
- [ ] Poster frame at 1.5s shows a stable, levitating artifact with visible field lines.
- [ ] No stick figures, emoji, or placeholder cubes are present.
- [ ] Responsive layout works on mobile and desktop.

## Pack type
3D hero mesh family (Sci-Fi Artifacts)

## Style bible
- **Materials**: Brushed dark metal (high metallic, medium roughness) for shells. Emissive cyan (high emissive, low roughness) for energy cores. Translucent glass (transmission, low opacity) for containment fields. Use normal maps generated from vertex displacement to add surface detail.
- **Edge Language**: Sharp, beveled edges on metal parts. Smooth, continuous curves on energy fields. The contrast between sharp and smooth should be emphasized to highlight the technological nature of the artifacts.
- **Light**: Three-point studio lighting. Key light from top-left (white), fill light from bottom-right (cyan tint), rim light from behind (white). Adjust light intensity to ensure the emissive elements stand out without blowing out the highlights.
- **Silhouette Rules**: Distinct profiles. Toroidal = wide/flat. Spherical = round/compact. Prism = angular/tall. Ring = hollow/circular. Ensure each artifact has a unique shape that is easily distinguishable from the others.

## Inventory
- **Toroidal Core**: 1 mesh. 3k polys. Animated hover + pulse. Features internal gyroscope rings and external energy conduits.
- **Spherical Node**: 1 mesh. 2.5k polys. Animated hover + spin. Features a central emissive core surrounded by orbiting smaller spheres.
- **Prism Shard**: 1 mesh. 2k polys. Animated hover + float. Features jagged, faceted surfaces with an inner glow.
- **Ring Array**: 1 mesh. 4k polys. Animated hover + rotate. Features three concentric rings rotating on different axes.
- **Field Lines**: Procedural curve geometry, 500 lines per artifact. These lines should update dynamically based on the artifact's state.

## Download
- **Format**: GLB (binary glTF).
- **Contents**: Selected mesh + animation clips (hover, pulse) + materials.
- **Metadata**: Includes pack name, author, and license info in the GLB metadata. Ensure the metadata is correctly formatted for easy identification in other software.

## Viewer
- **Orbit**: Rotate, zoom, pan. Use OrbitControls with damping enabled for smooth movement.
- **Filmstrip**: Bottom panel for artifact selection. Thumbnails should be high-quality renders of each artifact.
- **Poster Frame**: At 1.5s, the viewer should be in a stable, well-lit state suitable for screenshots. The camera should be positioned to showcase the artifact's best features.
- **Controls**: Wireframe toggle, Disrupt mode, Download button. These controls should be easily accessible and clearly labeled.

## Deliverable
Single-file HTML/CSS/JS. All code must be contained within one HTML file. Use CDN links for Three.js and fonts. Ensure the file is self-contained and runs immediately in a modern browser. The code should be well-commented and organized, making it easy for other developers to understand and modify.

## Type pairing
Rajdhani + Open Sans
