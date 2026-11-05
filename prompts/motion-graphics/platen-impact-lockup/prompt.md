Build a single-file HTML/CSS/JS motion graphic titled 'Platen Impact Lockup'.

1. Visual Style:
- Background: #F5F5F5 with a subtle, static SVG noise filter or CSS radial-gradient to simulate paper grain. The grain should be fine (1-2px) and low opacity (0.05) to avoid visual noise interference.
- Type: Use 'Bodoni Moda' for the main character 'A' (weight 900, italic slightly tilted -2deg). Use 'Archivo Narrow' for secondary text.
- Color Palette: Ink Black #1A1A1A, Paper White #F5F5F5, Impact Red #E63946.
- Layout: Full-bleed, centered. No navigation bars or UI chrome. Desktop layout centers vertically and horizontally using Flexbox. Mobile layout maintains centering but adjusts font sizes via clamp to prevent overflow. Ensure safe area insets are respected on iOS devices.

2. Animation Sequence (4s Loop):
- Phase 1 (0.0s - 0.8s): The large 'A' starts at `translateY(-100vh)` and moves to `translateY(0)` using `cubic-bezier(0.5, 0, 0.75, 0)` (accelerating fall). Ensure the starting position is fully off-screen. The motion should mimic gravity, gaining speed as it descends.
- Phase 2 (0.8s - 1.2s): Impact. The 'A' hits the baseline. Trigger a 'shake' animation on the container: rapid small translations (x: -5px, y: 5px) decaying to zero over 0.4s. Simultaneously, a red ink smear SVG path appears on the right serif of the 'A', scaling up slightly from 0.8 to 1.0 scale. The shake should feel violent but brief, simulating mechanical recoil.
- Phase 3 (1.2s - 2.5s): Settling. The ink smear opacity fades from 1.0 to 0.85. The word 'IMPACT' in Archivo Narrow, uppercase, tracking-wide, fades in below the 'A' from opacity 0 to 1. Add a slight blur-to-sharp effect on 'IMPACT' for realism, simulating focus adjustment.
- Phase 4 (2.5s - 4.0s): Hold. Static composition. Then fade out everything to reset. The fade-out should be linear over 0.5s before the loop restarts. This hold allows the viewer to appreciate the final composition.

3. Interaction:
- Click anywhere: Reset animation to 0s immediately. Provide visual feedback via a subtle flash or scale pulse if possible, though primarily functional.
- Hold mouse down: Slow down animation timeScale to 0.1 (slow motion). Visual cue: cursor changes to 'wait'. This allows users to inspect the impact frame.
- Release: Resume normal speed. Ensure smooth transition back to 1.0 speed without jumping.

4. Technical Constraints:
- Use `requestAnimationFrame` for smooth control over the timeline if JS-driven, or precise CSS keyframes with `animation-play-state` manipulation for the slow-mo effect. JS-driven is preferred for precise time-scaling.
- Ensure the 'Poster Frame' at ~1.5s is stable and readable. This frame must look like a high-end editorial spread.
- No external libraries (no GSAP). Use vanilla JS/CSS.
- Responsive: Scale the 'A' font-size using `clamp(10rem, 20vw, 30rem)`. Ensure text remains legible on small screens.
- Accessibility: Respect `prefers-reduced-motion`. If enabled, show the Poster Frame immediately without animation. Provide aria-labels for screen readers describing the motion.
- Deliverable: single-file HTML/CSS/JS.
