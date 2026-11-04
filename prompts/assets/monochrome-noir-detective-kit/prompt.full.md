## Concept
Create a single-file HTML Asset Studio named 'SHADOW & INK' that showcases a production-ready 2D game kit titled 'Monochrome Noir Detective'. The kit is designed for a narrative-driven, atmospheric game where visual storytelling relies on high-contrast silhouettes and selective color. The studio itself must feel like a noir film: dark, grainy, and dramatic, with a focus on the 'clue' mechanic where red accents reveal hidden details.

## Palette
- **Primary:** #000000 (Void/Shadow)
- **Secondary:** #ffffff (Light/Truth)
- **Accent:** #d32f2f (Danger/Clue/Interaction)
- **Grayscale:** #1a1a1a, #333333, #666666, #cccccc for depth and internal details.
- **Rule:** The accent color is ONLY used for interactive states, critical clues, or VFX highlights. Never use it for general UI chrome.

## Type
- **Headings:** 'Playfair Display' (Serif, elegant, dramatic). Used for the Studio Title and Asset Names.
- **Body/UI:** 'Source Sans Pro' (Clean, readable). Used for buttons, metadata, and descriptions.
- **Styling:** High letter-spacing for headers. Uppercase for UI labels. Strong contrast between text and background.

## Layout
- **Header:** Fixed top bar with 'SHADOW & INK' logo and 'Download All' button.
- **Main Grid:** A responsive grid displaying asset categories: 'Detective', 'Clues', 'Atmosphere', 'UI'.
- **Asset Cards:** Each card shows a preview of the asset. Hovering triggers a 'reveal' effect (e.g., rain intensifies, red glow appears).
- **Modal Viewer:** Clicking an asset opens a full-screen modal with a filmstrip of animation frames and a large preview canvas.
- **Background:** A subtle, animated CSS rain effect (vertical white lines falling) behind the grid.

## Motion
- **Entrance:** Film grain fade-in effect on page load.
- **Ambient:** Continuous rain streaks in the background. Subtle flicker on 'Streetlamp' assets.
- **Interaction:** 
  - Hover on 'Clue' assets: Red accent glow or internal detail reveal.
  - Click on 'Detective': Opens filmstrip modal.
  - Button hovers: Invert colors (White text on Black -> Black text on White).

## Constraints
- **No External Assets:** All graphics must be generated via SVG paths or Canvas drawing commands.
- **No Simple Shapes:** Do not use basic `<rect>` or `<circle>` for hero assets. Use complex `<path>` data to create detailed silhouettes.
- **Performance:** Optimize SVG paths. Use `viewBox` correctly.
- **Accessibility:** Ensure all interactive elements are keyboard navigable. High contrast text.
- **Export:** Must generate valid PNG atlases using Canvas API. Must download individual SVGs.

## Acceptance criteria
- [ ] **Pack type:** Clearly labeled as '2D Game Kit'.
- [ ] **Style bible:** Assets strictly adhere to high-contrast silhouette style with selective red accents.
- [ ] **Inventory:** Contains at least 12 distinct assets: 3 Detective states (with frames), 4 Clues, 3 Atmosphere elements, 2 UI elements.
- [ ] **Download:** 'Download SVG' and 'Download PNG Atlas' buttons work and produce valid files.
- [ ] **Viewer:** Filmstrip modal displays animation frames correctly. Hover effects reveal red accents on clues.
- [ ] **Visual Quality:** Silhouettes are readable at 64px. No 'stick figure' or 'primitive shape' placeholders. Internal line work is present.
- [ ] **Ambient:** Rain effect is visible and animated in the background.
- [ ] **Typography:** Playfair Display and Source Sans Pro are loaded and used correctly.
- [ ] **Code:** Single HTML file. No external dependencies other than Google Fonts.

## Pack type
2D Game Kit (Silhouette/Noir)

## Style bible
- **Aesthetic:** Film Noir, High Contrast, Graphic Novel.
- **Materials:** Ink on paper, hard shadows, no gradients.
- **Light:** Hard directional light implied by white highlights on black forms.
- **Silhouette:** Strong, recognizable shapes. Internal details via line weight variation.
- **Color Role:** Black/White for form, Red for narrative emphasis.

## Inventory
1. **Detective (Player):**
   - Idle (4 frames): Subtle breathing, cigarette smoke.
   - Walk (4 frames): Coat swaying, footsteps.
   - Investigate (4 frames): Leaning in, magnifying glass.
2. **Clues (Props):**
   - Magnifying Glass (Static)
   - Cigarette Butt (Static)
   - Blood Stain (Static, Red Accent)
   - Torn Letter (Static)
3. **Atmosphere (VFX/Env):**
   - Rain Overlay (Animated)
   - Streetlamp Glow (Animated Flicker)
   - Venetian Blind Shadow (Static)
4. **UI:**
   - Dialogue Box (Static)
   - Inventory Slot (Static)

## Download
- **SVG:** Individual SVG files for each asset.
- **PNG Atlas:** A single sprite sheet containing all assets, generated via Canvas.
- **JSON:** Metadata file describing asset names and frame counts.

## Viewer
- **Grid View:** Shows all assets in a clean, dark grid.
- **Filmstrip Modal:** For animated assets, shows a horizontal strip of frames.
- **Poster Frame:** A static 'hero' shot of the Detective in a dramatic pose, displayed on load or as a fallback.
- **Interaction:** Hovering over clues reveals red details. Clicking opens the modal.

## Desktop/Mobile Layout
- **Desktop:** A 3-column grid for asset categories. The header is fixed at the top with a backdrop blur. The modal viewer takes up 80% of the viewport width, centered, with a dark overlay. The filmstrip is horizontally scrollable with custom scrollbar styling.
- **Mobile:** A single-column stack. The header collapses into a hamburger menu. The modal viewer becomes full-screen with swipe gestures for filmstrip navigation. Touch targets are minimum 44x44px. The grid items expand to full width.

## Motions
- **Entrance:** Staggered fade-in for asset cards (0.1s delay per card). The title 'SHADOW & INK' types out character by character.
- **Hover:** Asset cards lift 4px with a subtle drop shadow. Clue assets pulse their red accent opacity from 0.8 to 1.0.
- **Modal:** Slides up from the bottom with a cubic-bezier ease-out. The filmstrip scrolls horizontally with inertia.
- **Ambient:** Rain streaks move at varying speeds (parallax effect). The streetlamp glow flickers randomly using CSS keyframes with irregular timing.

## Constraints
- **Performance:** Limit total DOM nodes to under 500. Use `will-change` sparingly on animated elements.
- **Accessibility:** All buttons must have `aria-label`. Focus states must be visible (white outline). Screen readers should announce asset names and frame counts.
- **Browser Support:** Must work in latest Chrome, Firefox, Safari, and Edge. No polyfills allowed.
- **File Size:** The final HTML file should be under 200KB uncompressed.

## Acceptance Criteria
- [ ] The HTML file runs without errors in the console.
- [ ] All 15 assets are visible and correctly rendered.
- [ ] The 'Download SVG' button triggers a valid SVG file download.
- [ ] The 'Download PNG Atlas' button triggers a valid PNG file download.
- [ ] The filmstrip modal displays all frames for animated assets.
- [ ] The rain effect is visible and does not obscure UI text.
- [ ] The red accent color is used only for interactive/clue elements.
- [ ] The layout is responsive and functional on mobile devices.
- [ ] The typography matches the specified fonts and styles.
- [ ] The code is clean, commented, and modular.

## Deliverable
single-file HTML/CSS/JS.
