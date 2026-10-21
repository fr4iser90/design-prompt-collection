## Concept
An industrial-explainer motion graphic for AquaFlux, visualizing the core mechanic of Reverse Osmosis: pressure-driven separation of salt ions from water molecules via a semi-permeable membrane. The visual language is precise, clean, and technical, avoiding generic 'tech blue' gradients in favor of a distinct teal/amber palette that highlights the separation process. The animation is a timed 8s loop, structured as a problem-mechanism-payoff narrative.

## Beat sheet
- **0.0s–1.5s (Problem)**: The feed side (left) fills with a mixture of water molecules (cyan circles) and salt ions (amber irregular polygons). They drift randomly. The pressure gauge (bottom-left) is at 0 PSI. Title card 'FEED PRESSURE' fades in.
- **1.5s–3.0s (Mechanism)**: The pressure gauge needle sweeps rapidly to 80 PSI (amber highlight). The feed side molecules accelerate toward the central membrane. Water molecules pass through the membrane pores. Salt ions collide with the membrane and bounce off violently, demonstrating rejection.
- **3.0s–5.0s (Payoff)**: Pure water flows smoothly to the permeate side (right). Brine (high ion concentration) is diverted downward as reject stream. Labels 'PERMEATE FLOW' and 'BRINE DISPOSAL' appear. The membrane ripples subtly as water passes through.
- **5.0s–8.0s (Lockup)**: The diagram fades to 50% opacity. The AquaFlux logo scales up in the center. The metric '99.8% REJECTION' appears below the logo. The scene holds for 1s before looping.

## Poster frame
At **1.5s**, the frame must show:
- The membrane cross-section clearly in the center.
- The pressure gauge needle at approximately 40 PSI (mid-sweep).
- Salt ions approaching the membrane from the left.
- Title 'FEED PRESSURE' visible in Syne font.
- Background grid visible but subtle.
- Readable at 1200x630 resolution with high contrast between amber ions and teal background.

## Palette
- **Background**: #0A2A24 (Deep Teal) - Primary canvas.
- **Grid/Structure**: #1A4A44 (Lighter Teal) - Subtle engineering grid.
- **Water Molecules**: #00B4D8 (Cyan) - High visibility, cool tone.
- **Salt Ions**: #FFD166 (Amber) - High contrast, warm tone for rejection.
- **Text/UI**: #E0F2F1 (Off-White) - Clean, legible text and labels.
- **Membrane**: #E0F2F1 (Dashed line) - Central structural element.

## Type
- **Display/Title**: Syne (Bold, 700) - Used for 'FEED PRESSURE', AquaFlux logo, and '99.8% REJECTION'. Geometric, modern, industrial.
- **Body/Labels**: IBM Plex Sans (Regular, 400) - Used for 'PERMEATE FLOW', 'BRINE DISPOSAL', gauge numbers. Technical, monospace-adjacent clarity.
- **Sizes**: Titles 24-32px, Labels 14-16px, Logo 48px.

## Frame
- **Aspect Ratio**: 16:9 (1920x1080 or 1200x630 for poster).
- **Layout**: 
  - Left 40%: Feed Side (Saltwater).
  - Center 20%: Membrane (Vertical dashed line).
  - Right 40%: Permeate Side (Fresh Water).
  - Bottom-Left: Pressure Gauge (Analog dial).
  - Center (Lockup): AquaFlux Logo.

## Motion
- **Ion Drift**: Random walk simulation (noise-based) for initial state.
- **Ion Bounce**: Elastic collision simulation. Ions hit membrane, squash slightly, then rebound with ease-out.
- **Water Flow**: Smooth, laminar flow through membrane pores. No turbulence.
- **Gauge Sweep**: Fast acceleration to 80 PSI (ease-in-out), then hold.
- **Membrane Ripple**: Subtle vertical wave distortion on the membrane line when water passes.
- **Loop**: Seamless reset. Fade-out of lockup, reset of particles.

## Constraints
- No WebGL required; CSS/SVG/JS rAF is sufficient.
- No generic 'tech' gradients; use flat colors with subtle shadows for depth.
- No emoji or cartoonish icons; use geometric shapes (circles, polygons).
- Text must be legible against the dark background (high contrast).
- Animation must be smooth at 60fps; avoid jank.
- Reduced-motion preference: Show static poster frame at 1.5s.

## Acceptance criteria
- [ ] 8s loop duration, seamless transition.
- [ ] Poster frame at 1.5s is readable and shows key elements (membrane, gauge, ions).
- [ ] Salt ions bounce off membrane; water passes through.
- [ ] Pressure gauge needle sweeps to 80 PSI.
- [ ] AquaFlux logo and '99.8% REJECTION' appear in lockup.
- [ ] Palette strictly uses #0A2A24, #E0F2F1, #00B4D8, #FFD166.
- [ ] Typography uses Syne and IBM Plex Sans.
- [ ] No external libraries (no React, no GSAP) unless CDN-linked for simple easing.

## Layout & Responsiveness Details
- **Desktop View**: The 16:9 canvas should be centered within the viewport. The diagram elements (feed side, membrane, permeate side) should occupy the central 80% of the width, leaving 10% padding on each side for breathing room. The pressure gauge should be anchored to the bottom-left corner of the diagram area, not the viewport, to maintain relative positioning during scaling.
- **Mobile View**: For screens narrower than 768px, consider stacking the layout vertically if horizontal compression makes labels unreadable. However, prioritize maintaining the left-to-right flow of the RO process. If vertical stacking is used, the Feed Side becomes the top section, Membrane the middle, and Permeate the bottom. Typography sizes should scale down by 20% to prevent overflow. Touch interactions are not required, but hover states on labels (if any) should be disabled on touch devices.
- **Grid System**: Use a 12-column grid for alignment. The membrane should align with the center columns (6-7). The gauge should align with the first 3 columns. Text labels should align with the grid lines for a structured, engineering look.

## Additional Motion Nuances
- **Particle Density**: Start with 50 water molecules and 20 salt ions in the feed side. As pressure increases, the velocity of all particles increases. The number of particles passing through the membrane should correlate with the gauge reading (higher pressure = more flow).
- **Collision Effects**: When a salt ion hits the membrane, add a small 'spark' or 'ripple' effect at the collision point using a temporary SVG circle that expands and fades out. This emphasizes the rejection mechanism.
- **Gauge Precision**: The gauge needle should not just jump to 80 PSI. It should accelerate smoothly, perhaps overshooting slightly to 82 PSI before settling at 80 PSI, using a spring physics simulation for realism.
- **Text Animation**: Labels like 'PERMEATE FLOW' should not just appear; they should slide in from the direction of the flow (right for permeate, left/down for brine) to reinforce the directionality of the process.

## Technical Implementation Notes
- **Performance**: Use `requestAnimationFrame` for the main loop. Batch DOM updates where possible. Use CSS transforms (`translate3d`) for particle movement to leverage GPU acceleration.
- **State Management**: Keep a simple state object tracking `currentTime`, `pressure`, and `particlePositions`. Reset this state at the end of the 8s loop.
- **Accessibility**: Ensure all text has a contrast ratio of at least 4.5:1 against the background. Provide a static image fallback for users with `prefers-reduced-motion` enabled.
- **File Structure**: All CSS should be in a `<style>` tag in the head. All JS in a `<script>` tag at the end of the body. No external assets except Google Fonts for Syne and IBM Plex Sans.

## Deliverable
Deliverable: single-file HTML/CSS/JS.

## Type pairing
Syne + IBM Plex Sans
