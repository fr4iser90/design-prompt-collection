## Concept
Create a single-file HTML asset studio named 'BIOSPHERE 09'. This is a 3D environment pack focused on miniature ecosystems. The hero asset is a glass terrarium containing complex, morphing plant life. The user can interact with a 'Growth Stage' slider to animate the plants from seed to mature, showcasing vertex displacement and morph targets. The goal is to provide a high-quality, downloadable 3D asset pack for game developers and designers.

## Palette
- Deep Forest Green: #2e4d33 (Primary foliage, shadows)
- Sage Green: #8fbc8f (Mid-tone leaves, moss)
- Pale Mint: #e0f0d0 (Highlights, new growth, fog tint)
- Charcoal: #1a1a1a (UI background, text)
- White: #ffffff (UI text, highlights)

## Type
- Display: Playfair Display (Serif, elegant, for titles and section headers)
- Body: Lato (Sans-serif, clean, for UI controls, labels, and descriptions)
- Monospace: Courier New (For technical stats like triangle count, texture size)

## Layout
- Full-screen 3D canvas with a transparent UI overlay.
- Top-left: 'BIOSPHERE 09' title in Playfair Display, large, white.
- Bottom-center: Control panel with 'Growth Stage' slider, 'Download GLB' button, and view toggles (Wireframe, Material, Lighting).
- Right-side: Asset info panel showing current mesh details, material properties, and texture maps.
- The 3D scene is centered, with the terrarium as the focal point. Camera starts at a 45-degree angle, orbitable.
- Desktop: Fixed left sidebar for controls, main canvas takes remaining width. Right panel for stats.
- Mobile: Canvas full screen. Controls in a collapsible bottom sheet. Stats hidden behind a toggle icon.

## Motion
- Entrance: The glass vessel fades in from opacity 0 to 1 over 1 second. Fog particles swirl into existence inside the vessel.
- Ambient: Leaves sway gently using a sine wave vertex shader. Light particles drift slowly around the scene.
- Interaction: The 'Growth Stage' slider (0-100%) drives the morphing of plant geometry. At 0%, plants are small buds. At 100%, they are fully unfurled with vines extending. The animation should be smooth and interpolated.
- UI Motion: Buttons have a subtle scale-up on hover. Slider thumb has a glow effect when active. Panels slide in/out with cubic-bezier easing.
- Parallax: Background stars or dust particles move slightly opposite to mouse movement for depth.

## Constraints
- Use Three.js via CDN (r150+).
- No external asset CDNs for textures; generate textures procedurally or use data URIs.
- Materials must be MeshPhysicalMaterial for glass (transmission, thickness, roughness) and MeshStandardMaterial for plants/rocks.
- Plants must use alpha-tested leaf atlases for performance.
- Glass must have bevels and thickness to look realistic.
- No primitive cubes or spheres as hero elements.
- Export must be .glb using GLTFExporter.
- Code must be self-contained in one HTML file.
- Performance: Keep draw calls low. Use instancing for rocks if possible.

## Acceptance criteria
- [ ] The 3D terrarium renders with realistic glass refraction and internal fog.
- [ ] The 'Growth Stage' slider smoothly animates plant geometry from seed to mature.
- [ ] Plants have varied species (ferns, moss, flowers) with alpha-tested leaves.
- [ ] Rocks have moss textures and normal maps.
- [ ] The 'Download GLB' button successfully exports the current scene state.
- [ ] The UI uses Playfair Display and Lato correctly.
- [ ] The scene loads in under 3 seconds on a standard connection.
- [ ] Wireframe/Material/Lighting toggles work correctly.
- [ ] No console errors on load.
- [ ] The glass vessel has a visible bevel and thickness.
- [ ] Responsive layout works on mobile and desktop.
- [ ] Poster frame capture works correctly.

## Pack type
3D Hero Mesh Family (Environment)

## Style bible
- Materials: Filmic PBR. Glass uses transmission and thickness. Plants use subsurface scattering approximation. Rocks use roughness and normal maps for moss.
- Edge Language: Organic, soft edges for plants. Sharp, beveled edges for glass. Rough, irregular edges for rocks.
- Light: Soft studio HDRI. Key light from top-left, fill from bottom-right. Rim light for glass highlights.
- Silhouette Rules: Plants must have complex, non-repetitive silhouettes. Glass vessel must be distinct from background.

## Inventory
- 1 Glass Terrarium Vessel (complex geometry, beveled)
- 5 Plant Species (Fern, Moss, Flower, Vine, Bud) with morph targets
- 3 Rock Types (Moss-covered, Bare, Pebble)
- 1 Fog Particle System
- 1 Leaf Atlas Texture (procedurally generated or data URI)
- 1 Normal Map for Rocks
- 1 Roughness Map for Glass

## Download
- Format: .glb (Binary glTF)
- Contents: All meshes, materials, textures, and animations.
- Method: Three.js GLTFExporter.
- Button: 'Download GLB' in UI.

## Viewer
- Orbit Controls: Rotate, zoom, pan.
- Growth Slider: 0-100% morphing.
- View Toggles: Wireframe, Material, Lighting.
- Poster Frame: Capture canvas at 1.5s growth stage.
- Info Panel: Show mesh stats, material properties.
- Deliverable: single-file HTML/CSS/JS.
