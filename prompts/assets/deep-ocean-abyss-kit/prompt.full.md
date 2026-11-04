## Concept
Create a single-file HTML Asset Studio for 'Abyssal Trench Kit', a production-ready 2D game asset pack. The kit focuses on a cohesive 'Dark Abyssal Glow' visual language, featuring a submersible player, bioluminescent enemies, environmental hazards, debris, and UI elements. The studio must allow users to view the assets in a filmstrip or grid, interact with them via sonar effects, and download a generated PNG atlas and SVG UI pack. The aesthetic is serious, atmospheric, and non-cartoonish, avoiding cute fish in favor of abstract, glowing organic forms.

## Palette
- **Void Black**: #020B14 (Background, deep shadows)
- **Abyss Blue**: #051923 (Mid-tone background gradient)
- **Deep Ocean**: #0077BE (Primary structural color for submersible/props)
- **Bioluminescent Cyan**: #00FFFF (Accents, UI highlights, enemy glow)
- **Teal Glow**: #00CED1 (Secondary glow, VFX, health bars)

## Type
- **Display**: Exo 2 (Bold, technical, sci-fi feel for headers and item names)
- **Body**: Lato (Clean, readable for descriptions and UI labels)
- **Usage**: Headers in Exo 2 uppercase with letter-spacing. Body text in Lato regular. Avoid generic sans-serifs like Arial or Roboto.

## Layout
- **Header**: Title 'ABYSSAL TRENCH KIT' in Exo 2, centered, with a subtle cyan underline glow.
- **Main Viewer**: 
  - Default view: 'Poster Frame' showing the atlas grid with the Submersible hero centered.
  - Toggle buttons: 'Filmstrip' (horizontal scroll of animation frames), 'Kit Grid' (categorized grid of all 16 items).
- **Sidebar/Controls**: 
  - Item list with icons.
  - Download buttons: 'Export PNG Atlas', 'Export SVG UI', 'Download Manifest'.
- **Footer**: Small text indicating 'Procedurally Generated Assets'.

## Motion
- **Entrance**: On load, items in the viewer fade in from black with a slight upward translation (translateY) and a cyan glow pulse (box-shadow or canvas shadowBlur).
- **Ambient**: Bioluminescent enemies (Jellyfish) in the viewer pulse their opacity and glow intensity sinusoidally (0.8 to 1.0 opacity, 2s cycle).
- **Interaction**: Clicking any item triggers a 'Sonar Ping' effect: a cyan ring expands from the click point, fading out over 0.5s. The selected item highlights with a brighter glow.
- **Hover**: Items scale up slightly (1.05x) and increase glow intensity.

## Constraints
- **No External Assets**: All sprites must be drawn procedurally on Canvas or defined as SVG paths in JavaScript. No external image URLs.
- **Readability**: Sprites must be clearly distinguishable at 64x64px game resolution.
- **Cohesion**: All items must share the 'Dark Abyssal Glow' style: soft edges, gradient fills, no hard black outlines, consistent light source (top-down or center-out).
- **Performance**: Viewer must run at 60fps. Atlas generation should be efficient.
- **File Size**: Keep HTML file under 500KB if possible (minify JS/CSS).

## Acceptance criteria
- [ ] **Pack Type**: Clearly identified as a 2D Game Kit with Player, Enemies, Hazards, Props, UI, VFX.
- [ ] **Style Bible**: Visuals adhere to 'Dark Abyssal Glow' (no cartoon styles, correct palette usage).
- [ ] **Inventory**: Exactly 16 items implemented: 1 Submersible (3 states), 3 Jellyfish (3 states each), 2 Urchins, 3 Debris, 3 UI elements, 3 VFX.
- [ ] **Viewer UX**: Filmstrip and Kit Grid views functional. Poster frame displays correctly at 1.5s.
- [ ] **Downloads**: 'Export PNG Atlas' generates a valid 2048x2048 PNG with all sprites. 'Export SVG UI' generates valid SVG for UI elements.
- [ ] **Motion**: Sonar ping effect triggers on click. Ambient pulse visible on enemies.
- [ ] **Typography**: Exo 2 and Lato used correctly.
- [ ] **No Clichés**: No stick figures, no emoji, no primitive cubes/spheres as heroes, no Kenney-style flat colors without glow/depth.

## Pack type
2D Game Kit (Player, Enemies, Hazards, Props, UI, VFX)

## Style bible
- **Materials**: Wet, translucent, pressurized. Use radial gradients for glow effects. No flat colors.
- **Edge Language**: Soft, blurred edges for bioluminescence. Sharp, metallic edges for submersible/props.
- **Light**: Center-out or top-down glow. Shadows are deep blue/black, not gray.
- **Silhouette**: Organic, fluid shapes for creatures. Angular, technical shapes for submersible/UI.
- **Hex Roles**: #020B14 (Void), #0077BE (Structure), #00FFFF (Energy/Glow).

## Inventory
1. **Player**: Submersible 'Nautilus-X' (Idle, Move, Boost) - 3 frames.
2. **Enemies**: Jellyfish Alpha, Beta, Gamma (Pulse, Drift, Attack) - 9 frames total.
3. **Hazards**: Sea Urchin Static, Sea Urchin Rotating - 2 items.
4. **Props**: Broken Hull, Rock Fragment, Coral Shard - 3 items.
5. **UI**: Sonar Radar, Depth Meter, Health Bar - 3 items.
6. **VFX**: Bubble Trail, Light Beam, Impact Flash - 3 items.
Total: 16 unique asset types.

## Download
- **PNG Atlas**: 2048x2048px, RGBA, containing all 16 asset types (with animation frames tiled).
- **SVG UI**: Vector file containing Sonar, Depth Meter, Health Bar.
- **JSON Manifest**: Maps asset names to atlas coordinates (x, y, w, h).

## Viewer
- **Poster Frame**: Default view showing atlas grid with hero centered.
- **Filmstrip**: Horizontal scroll for animation sequences.
- **Kit Grid**: Categorized grid view of all assets.
- **Interaction**: Click to select, Sonar Ping effect, Hover to highlight.

## Detailed Layout Specifications
- **Desktop View**: 
  - **Sidebar**: Fixed width of 280px on the left. Background #051923 with a 1px right border of #0077BE at 20% opacity. Contains a scrollable list of asset categories. Each category header is Exo 2, 14px, uppercase, color #00FFFF. Items are Lato, 12px, color #FFFFFF. Active item has a background of #0077BE at 10% opacity and a left border of 3px solid #00FFFF.
  - **Main Content**: Flex-grow 1. Contains the Canvas element. The Canvas should maintain a 16:9 aspect ratio or fill the available space with a max-width of 1200px. 
  - **Controls Bar**: Fixed at the bottom of the sidebar or top of the main content. Buttons are pill-shaped, background transparent, border 1px solid #0077BE, text #00FFFF. Hover state: background #0077BE, text #020B14.
- **Mobile View**: 
  - **Header**: Sticky top. Title centered. Hamburger menu icon on the right.
  - **Menu Overlay**: Slides in from the left. Full height. Background #020B14. 
  - **Canvas**: Full width, height calculated to maintain aspect ratio or fixed height of 60vh.
  - **Bottom Nav**: Fixed bottom bar with 'Grid', 'Filmstrip', 'Export' icons. Icons are SVG paths, color #00FFFF. Active icon has a glow effect.

## Extended Motion & Interaction
- **Sonar Ping**: When an item is clicked, a ring expands from the center of the item. The ring is a stroke of #00FFFF, width 2px, fading from opacity 1 to 0 over 600ms. Simultaneously, the item's glow intensity increases by 50% for 300ms.
- **Filmstrip Scroll**: Smooth scroll behavior. Snap points on each frame. When a frame is centered, it scales to 1.1x and others scale to 0.9x.
- **Atlas Generation**: Show a progress bar in the export button. The bar fills from left to right with a gradient from #0077BE to #00FFFF. 
- **Error Handling**: If canvas rendering fails, show a red toast notification with text 'Render Error'.

## Technical Implementation Notes
- Use `requestAnimationFrame` for all animations to ensure 60fps.
- Store asset definitions in a JSON-like object within the JS.
- Use `OffscreenCanvas` if available for atlas generation to avoid blocking the main thread.
- Ensure touch events are handled correctly for mobile (prevent default scroll on canvas drag if in filmstrip mode).
- **Deliverable**: single-file HTML/CSS/JS.

## Type pairing
Exo 2 + Lato
