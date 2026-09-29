# Rail & Knob — Extended Brief

**Concept:**
'Rail & Knob' is a brand focused on the tactile experience of opening and closing cabinets. Their hardware is designed to be felt, not just seen. The website hero replicates this physical interaction digitally: the user 'feels' the weight and snap of the hardware through drag mechanics.

**Palette:**
- **Background:** Deep Charcoal (#111111) to make the steel pop.
- **Rail:** Matte Black (#222222) with a subtle texture (noise filter).
- **Knobs:** Brushed Steel. Gradient from #aaaaaa to #ffffff with a sharp specular highlight line to simulate anisotropic reflection.
- **Text:** White (#ffffff) for primary, Grey (#888888) for secondary.

**Type Pairing:**
- **Display:** 'Oswald' or 'Bebas Neue' (Uppercase, bold). Industrial and strong.
- **Body:** 'Roboto Mono' (Light). Technical and precise.

**Layout Desktop:**
1. **Hero:** The rail is centered horizontally, vertically centered in the viewport.
2. **Knobs:** 4 knobs spaced evenly. 
3. **Info Panel:** Below the rail, centered text updates dynamically based on the active knob.
4. **Scroll Indicator:** Subtle arrow at the bottom.

**Layout Mobile:**
1. **Hero:** Rail is smaller, knobs are larger for touch targets.
2. **Interaction:** Swipe left/right to move the 'active' knob. 

**Motion Brief:**
- **Entrance:** Knobs drop from above onto the rail with a heavy 'clunk' sound (optional audio) or visual impact shake.
- **Ambient:** Subtle light sweep across the brushed steel knobs every 10 seconds (CSS animation on background-position).
- **Interaction:** 
  - Drag: Knob follows cursor with 80% fidelity (lag). 
  - Snap: When released within 20px of a stop, knob animates to exact center with cubic-bezier(0.68, -0.55, 0.265, 1.55) (back-out easing).
  - Click: Clicking a knob (without drag) triggers a 'spec' modal or expands the info panel.

**Constraints Checklist:**
- [ ] No purple glow. High contrast only.
- [ ] Touch support is critical for mobile.
- [ ] Performance: Use transform3d for dragging to ensure GPU acceleration.
- [ ] Accessibility: Keyboard arrows should also move the 'active' selection.

**Acceptance Criteria:**
The drag feels heavy and premium. The snap is satisfying. The connection between the physical object (knob) and the digital content (product info) is immediate and intuitive.
