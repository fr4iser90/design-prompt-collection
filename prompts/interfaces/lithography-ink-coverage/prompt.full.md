## Concept
The 'Plate & Press' Ink Calculator is a utilitarian web tool for print shops to estimate ink usage and predict visual artifacts like dot gain and set-off. The design language mimics industrial control panels: flat, high-contrast, precise. The core value proposition is the visual feedback loop; users don't just see numbers, they see the simulated physical behavior of ink on paper, including bleed and opacity shifts, directly linked to cost calculations. The interface should feel like a piece of heavy machinery, devoid of unnecessary digital fluff, emphasizing precision and mechanical reliability.

## Primary task
Adjust CMYK density sliders to simulate print output. Observe the canvas for visual artifacts (bleed, grain) and the sidebar for real-time cost/quality metrics. Identify when ink coverage exceeds safe limits (300%+). The user should feel a direct correlation between the physical act of dragging a slider and the visual change on the 'paper' canvas, reinforcing the tactile nature of print production.

## States
1. **Default**: All sliders at 0%. Canvas is pure white. Cost is $0.00. Quality is 'Blank'. The UI is static and ready for input.
2. **Active Interaction**: User drags a slider. Canvas updates with corresponding CMYK color. 'Bleed' effect is visible (adjacent colors slightly affected). Cost updates dynamically. The 'wet' blur effect is active during drag.
3. **High Density Warning**: Total ink coverage exceeds 300%. A red (#ff0000) banner appears above the canvas: 'WARNING: SET-OFF RISK'. The canvas may show slight pooling effects (darker noise). The warning banner should slide down smoothly.
4. **Error State**: Input fields (if editable) or slider values out of bounds. Container border flashes #ff0000. This state should be transient, clearing once valid input is restored.

## Palette
- **Background**: #f5f5f5 (Light Gray - Paper/Panel Base)
- **Ink/Text**: #1a1a1a (Near Black - Primary Text/Borders)
- **Accent Danger**: #ff0000 (Red - Warnings, Set-off risk)
- **Cyan**: #00ffff (CMYK C)
- **Magenta**: #ff00ff (CMYK M - implied by context, use #ff0000 for UI elements if needed, but canvas uses true CMYK)
- **Yellow**: #ffff00 (CMYK Y)
- **Black**: #000000 (CMYK K)
- **Paper White**: #ffffff (Canvas Background)

## Type
- **Display**: Bebas Neue. Used for slider labels (C, M, Y, K), main title, and large metric numbers. Uppercase. Letter-spacing: 0.1em. This font choice reinforces the industrial, stencil-like aesthetic.
- **Body**: Source Sans Pro. Used for descriptions, cost details, and footer info. Weight 400 and 600. Clean and legible for data-heavy sections.
- **Hierarchy**: Title (48px), Slider Labels (32px), Metrics (24px), Body (14px). Ensure high contrast between text and background for readability in low-light print shop environments.

## Layout
- **Grid**: 12-column flexible grid.
- **Header**: Fixed top bar. Logo 'PLATE & PRESS' left-aligned. Status right-aligned. Height 60px. Border-bottom 1px solid #1a1a1a.
- **Main Container**: Split 60/40. 
  - **Left (Canvas)**: Aspect ratio 4:3. Border 1px solid #1a1a1a. Background #ffffff. Contains the HTML5 Canvas element. The canvas should be responsive, scaling to fit the container while maintaining pixel integrity.
  - **Right (Controls)**: Padding 24px. Contains 4 slider groups. Each group has a label, a range input, and a numeric display. Below sliders, a 'Summary' block with Cost and Quality. The sliders should be styled with a thick track and a rectangular thumb to mimic physical faders.
- **Footer**: Simple text, 'Estimates only. Not a proof.' Height 40px. Border-top 1px solid #1a1a1a.

## Motion
- **Entrance**: 
  - Control Panel: `transform: translateX(100%)` to `translateX(0)` over 400ms, `cubic-bezier(0.2, 0.8, 0.2, 1)`. This creates a sense of the panel sliding into place like a drawer.
  - Canvas: `opacity: 0` to `1` over 600ms, `ease-in-out`. Simulates the paper being placed on the press.
- **Interaction**: 
  - Slider Drag: As user drags, apply a `filter: blur(0.5px)` to the canvas context temporarily to simulate wet ink, removing it on `mouseup`/`change`. If dragging rapidly, increase blur to 2px temporarily.
  - Ink Bleed: When C slider increases, M and Y values in the rendering logic increase by 5% of C value to simulate channel bleed. This visual change should be immediate and perceptible.
  - Warning Banner: Slides down from the top of the canvas container when triggered.
- **Ambient**: None. The tool is static unless acted upon. No idle animations. This reinforces the 'machine' metaphor where nothing moves unless operated.

## Constraints
- **No Decorative Gradients**: Flat colors only. Gradients are associated with digital 'softness' which contradicts the industrial theme.
- **No Rounded Corners**: `border-radius: 0` globally. Sharp edges imply precision and mechanical construction.
- **No Shadows**: Use borders for separation. Shadows imply depth and floating elements, which are not appropriate for a flat control panel.
- **No System Fonts**: Explicitly import Bebas Neue and Source Sans Pro. Do not use Inter, Roboto, or Arial.
- **Performance**: Canvas must use `requestAnimationFrame` only when state changes. Do not redraw on every mousemove if value hasn't changed. Use offscreen canvases for noise generation to optimize rendering.
- **Accessibility**: Sliders must have `aria-label`. Canvas must have `role='img'` with `aria-label` describing current color state. Ensure color contrast ratios meet WCAG AA standards.
- **Color Accuracy**: Use CSS `mix-blend-mode: multiply` on canvas layers if using multiple canvases, or handle color math in JS for single canvas. Ensure CMYK to RGB conversion is accurate for screen display.
- **Mobile Responsiveness**: On screens < 768px, stack the layout vertically. Canvas on top, controls on bottom. Adjust font sizes and padding for touch interfaces.

## Acceptance criteria
- [ ] Layout is strictly 60/40 split with no overflow on 1200px viewport.
- [ ] Fonts are Bebas Neue and Source Sans Pro; no Inter/Arial.
- [ ] Canvas renders white by default and updates with CMYK colors on slider change.
- [ ] 'Bleed' effect is visible: increasing one channel slightly affects adjacent channel visual density.
- [ ] Warning banner appears in #ff0000 when total ink > 300%.
- [ ] Entrance animations match specified timings and easing.
- [ ] No `box-shadow` or `border-radius` used in CSS.
- [ ] Cost and Quality metrics update in real-time.
- [ ] Hairline borders (#1a1a1a) separate all major UI sections.
- [ ] Mobile layout stacks correctly without breaking functionality.
- [ ] Single-file HTML/CSS/JS deliverable.

Deliverable: single-file HTML/CSS/JS.

## Type pairing
Bebas Neue (Display) + Source Sans Pro (Body)
