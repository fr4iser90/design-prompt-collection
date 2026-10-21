## Concept
A precise, technical explainer loop for 'LumenCore' demonstrating Total Internal Reflection. The aesthetic is 'Neon Blueprint': pure black background, crisp white geometry, and electric cyan light paths. The focus is on the physics of light confinement within the fiber core versus cladding. It avoids generic network metaphors in favor of geometric wave propagation.

## Beat sheet
**0.0–1.0s (Setup):**
- **Visual:** The fiber optic cable (two parallel white lines defining the core) unspools horizontally from left to right. 
- **Type:** Title 'LIGHT GUIDING PRINCIPLES' in Syne ExtraBold fades in at top-left. Subtitle 'Total Internal Reflection' in Space Mono appears below it.
- **Action:** A light beam (cyan line) enters the left edge of the core at a 45-degree angle.

**1.0–3.0s (Mechanism):**
- **Visual:** The beam strikes the top cladding boundary. It reflects perfectly, traveling to the bottom boundary, then back up. This creates a zig-zag path.
- **Type:** Labels 'CORE' and 'CLADDING' fade in near the respective regions using Space Mono. A dashed line indicates the 'Normal' at the first reflection point.
- **Motion:** The beam path animates smoothly. A subtle glow (#7C4DFF) pulses slightly on the cladding boundaries upon impact to signify reflection energy.

**3.0–4.5s (Payoff):**
- **Visual:** The beam exits the right side of the fiber. 
- **Type:** A badge 'SIGNAL: 100%' appears in Syne Bold, colored cyan (#00E5FF). 
- **Motion:** The beam intensity remains constant, demonstrating lossless transmission.

**4.5–6.0s (Hold & Reset):**
- **Visual:** The entire diagram holds static for 1.5s (Poster Frame window). 
- **Action:** The beam fades out, and the fiber lines retract slightly to the left, resetting for the next loop iteration.

## Poster frame
At **1.5s**, the screen shows:
- The fiber core spanning the center 80% of the width.
- The light beam mid-bounce, hitting the top cladding boundary.
- The 'CORE' label clearly visible inside the core band.
- The 'CLADDING' label visible in the outer region.
- Title 'LIGHT GUIDING PRINCIPLES' fully opaque in the top-left.
- Background is pure #000000.

## Palette
- **Background:** #000000 (Void Black)
- **Ink/Structure:** #FFFFFF (Pure White) for fiber boundaries and text.
- **Accent/Light:** #00E5FF (Electric Cyan) for the light beam and core fill.
- **Secondary/Glow:** #7C4DFF (Deep Violet) for glow effects and leakage indicators.
- **Alert:** #FF0055 (Neon Red) for signal loss during interaction.

## Type
- **Display:** 'Syne' (ExtraBold/Bold). Used for the main title and signal strength badges. Must be large and impactful.
- **Mono:** 'Space Mono'. Used for labels ('CORE', 'CLADDING'), subtitles, and technical data. Provides a technical, engineering feel.
- **Constraint:** Do NOT use Inter, Roboto, Arial, Helvetica, or system-ui. Ensure web-font loading or fallback to generic monospace/sans-serif that preserves the geometric vibe.

## Frame
- **Aspect Ratio:** 16:9.
- **Layout:** Centered horizontal fiber diagram. Title in top-left quadrant. Labels near the diagram elements. Signal badge in bottom-right or near the exit point.
- **Margins:** Generous black margins to emphasize the 'blueprint' isolation.

## Motion
- **Entrance:** Linear unspooling of the fiber lines (0.5s ease-out). Beam injection is instantaneous upon fiber completion.
- **Ambient:** The light beam path is drawn progressively. Reflection points have a small radial glow pulse (scale 1.0 to 1.2) on impact.
- **Interaction:** Dragging the right end of the fiber bends the SVG path. If the bend angle exceeds the critical angle (simulated as >42deg curvature), the beam path breaks, and a 'leak' particle effect (fading cyan dots) emits from the bend. Signal badge updates dynamically.
- **Loop:** Smooth fade-out and reset to ensure seamless looping.

## Constraints
- **No External Libraries:** Use vanilla JS, CSS, and SVG/Canvas.
- **No SaaS Aesthetics:** Avoid rounded corners on UI elements, soft shadows, or purple gradients. Keep lines sharp and 1-2px.
- **Readability:** Text must be legible at 100% zoom. Contrast ratio > 4.5:1.
- **Performance:** 60fps animation. Use `transform` and `opacity` for animations where possible.
- **Reduced Motion:** If `prefers-reduced-motion` is set, show the static Poster Frame at 1.5s without animation.

## Acceptance criteria
- [ ] Title 'LIGHT GUIDING PRINCIPLES' is visible in Syne font.
- [ ] Fiber core and cladding are clearly distinguished by white lines and labels.
- [ ] Light beam zig-zags inside the core without touching the cladding lines during the 'Mechanism' beat.
- [ ] Signal badge shows '100%' in cyan during normal operation.
- [ ] Dragging the fiber causes visible bending and light leakage (red signal drop) if angle is sharp.
- [ ] Animation loops seamlessly every 6 seconds.
- [ ] No forbidden fonts (Inter, Roboto, Arial) are used.
- [ ] Background is pure #000000.

## Type pairing
Syne + Space Mono
