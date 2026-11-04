Build a single-file HTML Asset Studio for 'SHADOW & INK', a 2D Monochrome Noir Detective game kit. The interface must embody the noir aesthetic: deep blacks, stark whites, and selective crimson accents. Use Playfair Display for headers and Source Sans Pro for UI text. The core deliverable is a cohesive set of 12-15 game assets rendered as high-fidelity SVG silhouettes with internal detail lines, not simple shapes.

**Asset Inventory:**
1. **Player (Detective):** 3 states (Idle, Walk, Investigate). 4 frames each. Silhouette must show trench coat, fedora, and cigarette smoke. Internal lines define folds and structure.
2. **Props (Clues):** 4 items (Magnifying Glass, Cigarette Butt, Blood Stain, Torn Letter). High contrast, sharp edges.
3. **Environment (Atmosphere):** 3 elements (Rain Overlay, Streetlamp Glow, Venetian Blind Shadow).
4. **UI Elements:** 2 items (Dialogue Box, Inventory Slot). Sharp, angular, noir typography.

**Visual Style Bible:**
- **Palette:** Pure Black (#000000), Pure White (#ffffff), and Crimson (#d32f2f) for interactive/highlight states only.
- **Silhouette:** Strong, readable shapes at 64x64px. No gradients. Use negative space and internal line weight to define form.
- **Lighting:** Hard shadows. Light sources are implied by white highlights on black forms.
- **Texture:** Subtle film grain overlay on the viewer canvas, not baked into the SVGs.

**Viewer UX:**
- **Layout:** Grid view of all assets. Clicking an asset opens a 'Filmstrip' modal showing animation frames.
- **Interaction:** Hovering over 'Clue' props reveals a red glow or internal detail. Hovering over UI elements shows a 'selected' state.
- **Ambient:** CSS-animated rain streaks falling in the background of the viewer.
- **Poster Frame:** At 1.5s, display a static 'poster' view of the Detective in a dramatic pose with rain.

**Technical Constraints:**
- All assets must be generated as inline SVGs within the HTML.
- Provide 'Download SVG' and 'Download PNG Atlas' buttons for each asset group.
- No external images. All art is code-generated SVG paths.
- Ensure high contrast ratios for accessibility.
- Use Canvas API for the PNG Atlas generation (drawing SVGs to canvas, then exporting).

**Code Structure:**
- Use vanilla JS for interactivity.
- CSS variables for the noir palette.
- Modular SVG generation functions for each asset type.

**Desktop/Mobile Layout:**
- **Desktop:** A 3-column grid for asset categories. The header is fixed at the top with a backdrop blur. The modal viewer takes up 80% of the viewport width, centered, with a dark overlay.
- **Mobile:** A single-column stack. The header collapses into a hamburger menu. The modal viewer becomes full-screen with swipe gestures for filmstrip navigation. Touch targets are minimum 44x44px.

**Motions:**
- **Entrance:** Staggered fade-in for asset cards (0.1s delay per card). The title 'SHADOW & INK' types out character by character.
- **Hover:** Asset cards lift 4px with a subtle drop shadow. Clue assets pulse their red accent opacity from 0.8 to 1.0.
- **Modal:** Slides up from the bottom with a cubic-bezier ease-out. The filmstrip scrolls horizontally with inertia.
- **Ambient:** Rain streaks move at varying speeds (parallax effect). The streetlamp glow flickers randomly using CSS keyframes with irregular timing.

**Constraints:**
- **Performance:** Limit total DOM nodes to under 500. Use `will-change` sparingly on animated elements.
- **Accessibility:** All buttons must have `aria-label`. Focus states must be visible (white outline). Screen readers should announce asset names and frame counts.
- **Browser Support:** Must work in latest Chrome, Firefox, Safari, and Edge. No polyfills allowed.
- **File Size:** The final HTML file should be under 200KB uncompressed.

**Acceptance Criteria:**
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

**Deliverable:** single-file HTML/CSS/JS.
