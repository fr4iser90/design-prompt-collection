## Concept
Create a single-file HTML asset studio named 'PIXEL PULSE' that showcases a cohesive retro-futuristic 2D game kit. The kit is designed for arcade-style games with a heavy CRT aesthetic. The core fantasy is 'Arcade Cabinet in a Digital Void'. The studio serves as both a viewer and a download portal for developers. It must feel like a piece of hardware: tactile, glowing, and precise. The assets are not just sprites; they are 'states' of a digital system, including glitched variations and CRT-distorted overlays. The interface should evoke the feeling of interacting with a high-tech, slightly unstable terminal from a cyberpunk narrative.

## Palette
- **Void Black (#000000)**: Primary background, deep shadows, unlit pixels. Used for the main canvas background and UI containers.
- **Neon Magenta (#FF00FF)**: Primary accent, player highlights, active UI states, glow effects. Used for headers, active buttons, and player sprite outlines.
- **Cyan (#00FFFF)**: Secondary accent, environmental lighting, grid lines, inactive UI states. Used for borders, secondary text, and environment assets.
- **Phosphor Green (#00FF00)**: Used sparingly for 'system OK' indicators or specific hazard warnings. Reserved for status lights and success messages.
- **Static Grey (#333333)**: For UI chrome, borders, and inactive elements. Provides structure without competing with neon accents.
- **White (#FFFFFF)**: Core highlights, text, and scanline peaks. Used for main body text and high-intensity light sources.

## Type
- **Display**: 'Press Start 2P' (Google Fonts). Use for all headers, button labels, and asset titles. Must be uppercase, tight tracking. Font size should be responsive, scaling from 12px on mobile to 18px on desktop.
- **Body**: 'VT323' (Google Fonts). Use for descriptions, download info, and technical specs. Monospace, legible at small sizes. Font size 14px-16px.
- **Hierarchy**: Headers should glow slightly (text-shadow: 0 0 5px #FF00FF) in Magenta or Cyan. Body text should be static grey or white. Ensure clear visual distinction between interactive elements and static text.

## Layout
- **Container**: Full viewport, dark background. Central 'Cabinet' frame with rounded corners and a subtle inner shadow to simulate glass. The frame should have a 2px solid border in Static Grey.
- **Header**: Top bar with 'PIXEL PULSE' logo in Press Start 2P, glowing Magenta. Right-aligned 'Download' buttons. The header should have a bottom border in Cyan.
- **Main Stage**: Center 60% of screen. Displays the selected asset with CRT post-processing (scanlines, vignette, slight curvature via CSS/SVG filter). The stage should have a black background with a faint grid pattern.
- **Filmstrip**: Bottom 20% of screen. Horizontal scrollable list of asset thumbnails. Active thumbnail has a Cyan border glow. Thumbnails should be 64x64px with a 10px gap.
- **Sidebar (Optional)**: Left 15% for category filters (Player, Env, UI, VFX). Vertical list with Press Start 2P labels. On mobile, this becomes a dropdown.
- **Footer**: Small status bar showing 'SYSTEM ONLINE' in VT323, blinking cursor. Background Static Grey, text White.

## Motion
- **Entrance**: On load, simulate a CRT power-on: screen flashes white, then collapses to a horizontal line, then expands vertically. Scanlines fade in. This sequence should last 1.5 seconds.
- **Ambient**: Subtle chromatic aberration (RGB split) on the main preview, oscillating slightly. Occasional 'flicker' of the background grid. The flicker should be random but subtle, occurring every 5-10 seconds.
- **Interaction**: Hovering over filmstrip thumbnails causes them to scale up slightly and glow. Clicking a thumbnail swaps the main preview with a 'glitch' transition (pixel sort or horizontal tear). Clicking the 'Glitch' button triggers a heavy distortion effect on the current asset. The glitch effect should displace pixels horizontally based on their brightness value.

## Constraints
- **No External Assets**: All sprites and textures must be generated via Canvas API or embedded SVG data URIs. No image CDNs. This ensures the single-file constraint is met and assets are crisp.
- **Performance**: Use requestAnimationFrame for animations. Limit particle effects to <100 active elements. Optimize canvas drawing calls to avoid unnecessary repaints.
- **Responsiveness**: Layout must adapt to mobile (stack filmstrip vertically or hide sidebar). Use CSS media queries to adjust font sizes and layout structures.
- **Accessibility**: Ensure high contrast between text and background. Provide aria-labels for buttons. Support keyboard navigation for filmstrip and buttons.
- **Code Quality**: Single HTML file. Clean, commented CSS/JS. No build steps. Use modular functions for asset generation and UI logic.
- **Asset Fidelity**: Sprites must be crisp. Use `image-rendering: pixelated` in CSS. Base resolution 64x64px or 128x128px. Avoid anti-aliasing on sprite edges.

## Acceptance criteria
- [ ] Single HTML file loads without errors.
- [ ] 'PIXEL PULSE' header is visible in Press Start 2P.
- [ ] Main preview area displays a generated sprite with CRT scanline overlay.
- [ ] Filmstrip contains at least 8 distinct asset thumbnails.
- [ ] Clicking a thumbnail updates the main preview.
- [ ] 'Download PNG' button triggers a file download of the current sprite sheet.
- [ ] 'Download SVG' button triggers a file download of the vector assets.
- [ ] Glitch effect is triggered by a button click and lasts <1s.
- [ ] Colors match the specified palette (#000000, #FF00FF, #00FFFF).
- [ ] No external image URLs are used in the source code.
- [ ] Layout is responsive on mobile devices.
- [ ] Accessibility labels are present for all interactive elements.

## Pack type
2D Game Kit (Sprites, UI, VFX, Tiles)

## Style bible
- **Materials**: Digital phosphor, glass, static noise. No realistic textures. All surfaces should appear emissive or flat.
- **Edge Language**: Sharp, pixel-perfect edges. No anti-aliasing on sprite outlines. UI elements have 1px hard borders.
- **Light**: Emissive. Objects glow from within. Shadows are dark voids, not soft gradients. Use box-shadows for glow effects.
- **Silhouette**: High contrast. Player sprites must have distinct silhouettes against the grid. UI elements must be readable at 32px.
- **Hex Roles**: Magenta = Player/Action. Cyan = Environment/System. Black = Background/Empty. Green = Status/OK.

## Inventory
- **Player (4)**: Idle, Run, Jump, Glitch-State (corrupted pixels). Each sprite should be 64x64px.
- **Environment (4)**: Neon Grid Tile, Hazard Spike, Portal Frame, Data Block. These tiles should be seamless where applicable.
- **UI (4)**: Health Bar Frame, Score Counter, Pause Icon, Game Over Plate. These should be vector-based for scalability.
- **VFX (4)**: Scanline Overlay, Chromatic Aberration Mask, Glitch Tear, Power-Up Burst. These are overlays or particle systems.
- **Total**: 16 Assets.

## Download
- **PNG Atlas**: A single 512x512px sprite sheet containing all 16 assets in a 4x4 grid. Transparent background. Generated via Canvas.toDataURL.
- **SVG Sprite Sheet**: A single SVG file with each asset as a `<g>` group, preserving vector paths for UI elements. Generated via DOM manipulation.
- **JSON Manifest**: Optional, but recommended. Lists asset names, coordinates, and dimensions. Generated as a text blob.

## Viewer
- **Filmstrip**: Horizontal scroll at bottom. Thumbnails are 64x64px. Active item has Cyan glow. Scrollbar should be styled to match the theme.
- **Orbit/Preview**: Main area applies CSS filters for CRT effect. No 3D orbit needed (2D kit). The preview should be centered and scaled to fit.
- **Poster Frame**: At 1.5s, the viewer should display a 'System Ready' state with the Player Idle sprite and a blinking cursor, ready for interaction. This state should persist until user interaction.

## Technical Implementation Details
- **Canvas Rendering**: Use a main canvas for the preview and an off-screen canvas for generating the sprite sheet. Draw each asset procedurally using `fillRect` for pixels and `path` for shapes.
- **CRT Effect**: Apply CSS filters `contrast(1.2) brightness(1.1)` and a pseudo-element overlay for scanlines. Use `box-shadow` for the glow effect on the cabinet frame.
- **Glitch Effect**: Implement a pixel-sort algorithm in JS. Iterate through image data, sort pixels by brightness in horizontal slices, and redraw. Use `requestAnimationFrame` for smooth animation.
- **Download Logic**: For PNG, draw all assets to an off-screen canvas and use `toDataURL('image/png')`. For SVG, construct an SVG string with `<g>` tags for each asset and create a Blob URL for download.
- **State Management**: Use a simple state object to track the current asset, category, and UI state. Update the DOM based on state changes.
- **Error Handling**: Wrap canvas operations in try-catch blocks. Provide fallback UI if canvas is not supported.

## Deliverable
Deliverable: single-file HTML/CSS/JS.
