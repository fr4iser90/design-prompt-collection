## Concept
Create an immersive, long-form editorial experience for a fictional publication, 'Atmosphere Quarterly'. The design metaphor is 'Barometric Pressure' as a proxy for narrative intensity. Unlike standard progress bars, the reading progress is visualized through a functional, aesthetic analog pressure gauge. As the user scrolls through the essay, the 'pressure' (needle position) increases, and the text itself undergoes subtle typographic compression (tighter tracking, heavier weight) to simulate the physical sensation of a storm front approaching. The aesthetic is industrial, precise, and atmospheric, avoiding generic SaaS or clean-minimalist tropes in favor of mechanical utility.

## Palette
- **Background (Void):** `#001219` (Deep Atmospheric Teal). This is the canvas. It should feel deep, not flat black.
- **Primary Ink (Body/Structure):** `#94D2BD` (Mint/Cyan). Used for body text, gauge ticks, and secondary UI elements. It provides a cool, clinical contrast against the dark background.
- **Alert/Needle (Accent):** `#FFB703` (Safety Amber). Used exclusively for the gauge needle, the 'Red Zone' background on the gauge, and hover states on pull quotes. This color represents danger/high pressure.
- **Muted/Structure:** `#1B4965` (Dark Blue-Teal). Use for borders, dividers, or inactive gauge zones.

## Type
- **Display/UI:** `Space Grotesk`. Use for the essay title, byline, gauge numbers, labels (PSI), and pull quotes. It is technical, slightly geometric, and monospaced in feel. Weight: 500-700.
- **Body:** `Source Serif Pro`. Use for the main essay text. It is classic, readable, and contrasts well with the technical UI. Weight: 400 (normal) shifting to 500/600 dynamically.
- **Hierarchy:** 
  - H1: 3.5rem, Space Grotesk, Uppercase, Tracking wide.
  - Body: 1.125rem, Source Serif Pro, Line-height 1.8 (initially).
  - Pull Quote: 1.5rem, Space Grotesk, Italic or Uppercase, Left-bordered.

## Layout
- **Container:** Centered column, max-width 700px for readability. Padding: 4rem top/bottom, 1.5rem sides.
- **The Gauge (Fixed Element):** 
  - Position: Fixed, Top 20px, Right 20px (Desktop). 
  - Size: 150px x 150px.
  - Structure: An SVG semi-circle. 
    - Outer ring: Stroke `#1B4965`, width 2px.
    - Zones: 
      - Green Zone (0-40): Stroke `#94D2BD` (opacity 0.3).
      - Yellow Zone (40-70): Stroke `#FFB703` (opacity 0.3).
      - Red Zone (70-100): Stroke `#FFB703` (opacity 0.8, maybe a subtle hatch pattern).
    - Needle: Line from center to edge, stroke `#FFB703`, width 3px, rounded cap. Pivot dot: `#001219` fill, `#FFB703` stroke.
    - Text: 'PSI' label at center bottom of the arc.
- **Ambient Overlay:** A full-screen `<canvas>` element with `pointer-events: none`, z-index -1 (behind text) or z-index 10 (with low opacity) depending on desired effect. Simulate 'static' or 'air flow'.

## Motion
1. **Needle Physics:** 
   - Do not snap the needle directly to scroll %. Use linear interpolation (lerp) or a spring physics simulation to give the needle 'inertia'. 
   - Formula: `currentAngle = currentAngle + (targetAngle - currentAngle) * 0.1` inside `requestAnimationFrame`.
   - Target Angle: Map scroll percentage (0-1) to -90deg to +90deg.
2. **Text Compression:** 
   - Map scroll percentage to CSS variables.
   - `--tracking`: Starts at `0em`, ends at `-0.05em`.
   - `--weight`: Starts at `400`, ends at `550`.
   - `--line-height`: Starts at `1.8`, ends at `1.6`.
   - Apply these variables to the `.essay-body` class.
3. **Pull-Quote Interaction:** 
   - On `mouseenter` of a `blockquote`: Set `targetAngle` to 100% (Red Zone) immediately, bypassing lerp for a 'spike' effect, then re-enable lerp on `mouseleave`.
   - Visual cue: The pull quote background briefly flashes `#FFB703` at 10% opacity.
4. **Ambient Noise:** 
   - Use a simple particle system or noise shader. 
   - Opacity of noise correlates with `currentAngle`. 
   - At 0 PSI: Opacity 0. 
   - At 100 PSI: Opacity 0.15.

## Constraints
- **No Scrollbars:** Hide the default scrollbar. The gauge is the only progress indicator.
- **Performance:** Use `will-change: transform` on the needle. Throttle scroll events or use IntersectionObserver where possible, but `requestAnimationFrame` is preferred for the needle.
- **Accessibility:** 
  - Include a hidden 'Skip to Content' link.
  - Ensure contrast ratios for text meet WCAG AA.
  - `prefers-reduced-motion`: Disable needle animation, ambient noise, and text compression. Show a simple static percentage text instead.
- **Browser Support:** Modern evergreen browsers. ES6+ JavaScript.
- **No Images:** Use CSS/SVG for all graphics. No external images except fonts.

## Acceptance criteria
- [ ] **Gauge Functionality:** The needle moves smoothly from -90 to +90 degrees as the user scrolls from top to bottom. It has visible inertia (does not snap instantly).
- [ ] **Text Dynamics:** As scroll progresses, the body text visibly becomes tighter (tracking) and slightly bolder. This change is gradual and not jarring.
- [ ] **Pull-Quote Spike:** Hovering over any pull quote causes the needle to jump to the red zone (right side) and return when hover ends.
- [ ] **Palette Adherence:** Only the specified hex codes (`#001219`, `#94D2BD`, `#FFB703`) are used for primary colors. No generic grays or blacks outside the palette.
- [ ] **Typography:** Space Grotesk is used for all UI/Headers, Source Serif Pro for body. No fallback fonts visible.
- [ ] **Ambient Effect:** A subtle noise/static effect is visible at the edges or background, intensifying with scroll.
- [ ] **Responsiveness:** On mobile, the gauge is fixed at the top center and does not obscure text. Text remains readable.
- [ ] **Code Quality:** Single HTML file. Clean, commented JS. No external libraries (jQuery, GSAP, etc.).
- [ ] **No Scrollbar:** The native browser scrollbar is hidden, but scrolling still works via mouse wheel/trackpad.
