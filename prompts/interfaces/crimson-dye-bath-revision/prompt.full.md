## Concept
The interface is a digital analog of a textile dyeing vat. It facilitates the decision-making process for fabric color revisions by visualizing the 'process' of dyeing rather than just a static before/after comparison. The metaphor is immersion: the longer the 'time' (slider value), the deeper the color. The brand 'Cinnabar & Co.' suggests tradition and craftsmanship. The UI should feel like a workbench, not a SaaS dashboard. The design language is 'Industrial Minimalism'—sharp edges, raw materials, and functional clarity. Every element serves the purpose of evaluating the dye result. There is no decorative fluff; the texture of the fabric and the color of the dye are the primary visual elements.

## Primary task
The user compares a raw fabric sample against its dyed counterpart. They adjust the 'Immersion Time' slider to simulate different dye levels. Once satisfied, they either 'Set Color' (accept the revision) or 'Bleach' (reject and reset). The interface must provide immediate visual feedback for every interaction, reinforcing the physical metaphor of the dye bath. The user should feel a sense of control and precision, akin to a master dyer adjusting a recipe.

## States
1. **Default**: Slider at 0%. Left pane shows raw fabric. Right pane shows raw fabric with a subtle, faint crimson tint or a 'Dye Bath' icon indicating readiness. The UI is calm and static.
2. **Active**: Slider > 0%. Right pane shows the fabric with increasing crimson overlay intensity. The overlay must respect the fabric's texture (using blend modes). The slider thumb moves smoothly, and the color deepens progressively.
3. **Empty**: No fabric loaded. Both panes show a dashed border with 'Upload Fabric' prompt. Slider and buttons are disabled (opacity 0.5, pointer-events none). The background is a lighter shade of paper white to indicate inactivity.
4. **Error**: User clicks 'Set Color' with slider at 0%. A small, red, sans-serif error message 'No dye applied' appears below the button for 2 seconds. The button shakes slightly (translateX ±2px) to indicate rejection.
5. **Success**: After 'Set Color', the right pane locks, the slider disables, and a small 'Revision Accepted' badge appears in the top-right. The badge is a crimson circle with a white checkmark, fading in over 300ms.

## Palette
- **Background**: #F5F5F0 (Paper white, slight warmth). This color should feel like unbleached cotton.
- **Ink**: #1A1A1A (Deep charcoal for text). High contrast for readability.
- **Accent**: #8B0000 (Cinnabar/Crimson for active states, dye, primary button). This is the focal color.
- **Muted**: #D3D3D3 (Light gray for inactive borders, slider track, secondary text). Used for structural lines and disabled states.
- **Flash**: #FFFFFF (Pure white for the bleach effect).

## Type
- **Display**: Cormorant Garamond, weight 600. Used for 'Cinnabar & Co.', 'Raw', 'Dyed', and large status messages. It should feel elegant but grounded. Font size for brand: 24px. Section headers: 18px.
- **Body/UI**: IBM Plex Sans, weight 400 and 500. Used for slider labels ('Immersion Time'), button text ('Set Color', 'Bleach'), and error messages. It provides technical clarity. Font size for labels: 14px. Buttons: 16px.

## Layout
- **Grid**: Vertical split screen. Left 50%, Right 50%. 
- **Header**: Fixed top bar, height 60px. Brand name left-aligned with 24px padding. Status/Revision ID right-aligned with 24px padding. Background matches page background.
- **Main Area**: Two equal-height panels. The fabric images fill the panels using object-fit: cover. A 1px vertical divider in #D3D3D3 separates the panes.
- **Controls**: Centered below the split. A horizontal slider spanning ~60% of the width. Below the slider, two buttons side-by-side with 16px gap. Total control area height: 120px.
- **Spacing**: Generous padding. No overlapping elements. The split line is a 1px hairline in #D3D3D3.

## Motion
1. **Entrance**: The left pane (raw fabric) slides in from the left. The right pane fades in with a 'Dye Bath' icon placeholder.
2. **Ambient**: As the slider moves, the fabric texture in the right pane should appear to 'wet' or shift slightly, implying the dye is soaking in. This can be achieved by subtly animating the background-position of a noise overlay or adjusting the blend-mode opacity smoothly.
3. **Interaction**: 
   - 'Set Color': Button scales down to 0.95x and returns quickly (150ms), simulating a stamp or press. 
   - 'Bleach': Right pane flashes white (#FFFFFF) for 200ms, then the slider animates back to 0% over 300ms.
   - Slider Thumb: Moves smoothly with a slight ease-out. No jitter. Hover state scales thumb to 1.1x.

## Constraints
- No shadows. Use borders and background color changes for depth.
- No rounded corners on the main panels (sharp, industrial). Buttons can have slight rounding (2px) or be sharp.
- The dye effect must be visible over the fabric texture. Do not use a solid color block.
- The interface must work on desktop and tablet. Mobile: stack panes vertically.
- No external images required for the UI itself, only for the fabric sample (use a placeholder if needed).
- Performance: Use CSS transforms and opacity for animations. Avoid heavy JS loops for the slider effect.
- Accessibility: All interactive elements must be keyboard navigable. Focus states must be visible (2px solid #1A1A1A).

## Acceptance criteria
- [ ] Layout is a strict 50/50 vertical split on desktop.
- [ ] Layout stacks vertically on mobile (<768px).
- [ ] Slider controls the opacity/saturation of a crimson overlay on the right pane.
- [ ] Overlay uses blend mode to show fabric texture.
- [ ] 'Set Color' button triggers a scale-down animation.
- [ ] 'Bleach' button triggers a white flash and resets slider to 0.
- [ ] Error state shows if 'Set Color' is clicked at 0% immersion.
- [ ] Typography matches Cormorant Garamond (Display) and IBM Plex Sans (Body).
- [ ] Colors match the hex codes provided exactly.
- [ ] No dashboard widgets, no marketing hero, no card grids.
- [ ] Single-file HTML/CSS/JS deliverable.
- [ ] No external dependencies.
