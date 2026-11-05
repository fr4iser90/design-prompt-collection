## Concept
A visceral, high-tension hero animation simulating the moment a printing press platen strikes paper. It translates the physical weight of industrial typography into digital motion. The aesthetic is 'Editorial Print' — monumental, rigid, and high-contrast, avoiding soft, fluid, or 'AI-generated' smoothness in favor of mechanical impact. The goal is to evoke the tactile sensation of heavy ink on rough paper through digital means. The animation should feel heavy, deliberate, and precise, mirroring the mechanics of a letterpress.

## Scene sheet
1. **The Drop (0.0s - 0.8s)**: The stage is white paper (#F5F5F5). A massive, bold 'A' (Bodoni Moda, #1A1A1A) enters from the top edge, falling rapidly. The motion is accelerated, mimicking gravity. The background remains static to emphasize the object's movement. There should be no anticipation movement; the drop begins instantly.
2. **The Impact (0.8s - 1.2s)**: The 'A' collides with the visual baseline. This triggers a camera shake effect (container jitter) and a visual 'ink bleed' — a red (#E63946) smear appears on the right serif, simulating excess ink from the pressure. The shake should feel violent but brief, decaying exponentially. The ink smear should expand slightly as if spreading under pressure.
3. **The Settle (1.2s - 2.5s)**: The shake decays to zero. The ink smear stabilizes. The sub-headline 'IMPACT' (Archivo Narrow, #1A1A1A) fades in below the glyph, spaced widely. The settling motion should feel like dust clearing. The blur-to-sharp effect on the text adds a cinematic quality.
4. **The Hold (2.5s - 4.0s)**: The composition holds as a static poster. Then fades to black/white reset. The hold allows the viewer to appreciate the composition. The fade-out is linear and clean, preparing for the next loop iteration.

## Poster frame
At ~1.5s, the 'A' is centered, slightly tilted (-2deg), with the red ink smear fully visible on the right leg. The word 'IMPACT' is visible below. The background is textured paper white. This frame must be legible and striking as a standalone image. It should look like a high-end editorial spread. The contrast between the black ink, red accent, and white paper must be sharp.

## Palette
- **Paper**: #F5F5F5 (Background, high brightness)
- **Ink**: #1A1A1A (Primary Type, high contrast)
- **Accent**: #E63946 (Ink Smear, high saturation, used sparingly)

## Type
- **Display**: 'Bodoni Moda' (900 weight). Serif, high contrast between thick and thin strokes. Essential for the 'print' aesthetic. The tilt of -2deg adds dynamism.
- **Body**: 'Archivo Narrow' (400/700). Sans-serif, condensed, clean. Used for 'IMPACT' and any small credits. Tracking should be wide (0.1em or more).
- **Hierarchy**: The 'A' is the hero (20vw+). 'IMPACT' is secondary (1.5rem - 2rem). Ensure clear visual hierarchy.

## Frame
- **Aspect**: Full-bleed viewport (100vw x 100vh).
- **Texture**: Apply a subtle noise/grain overlay to the background to prevent flat digital look. Use CSS `url('data:image/svg+xml...')` or `mix-blend-mode: multiply` with a noise SVG. The noise should be static, not animated.
- **Layout**: Center-aligned. Flexbox or Grid centering. Ensure safe areas on mobile devices. Use `env(safe-area-inset-bottom)` for iOS.

## Motion
- **Physics**: Simulate weight. The drop must accelerate. The impact must feel sudden (sharp keyframes). Use easing functions that mimic physical acceleration and deceleration.
- **Shake**: Use `transform: translate()` with random or predefined jitter values for 0.4s post-impact. The amplitude should decay exponentially.
- **Ink Bleed**: Use an SVG path or CSS clip-path animation to expand the red smear slightly upon impact, then hold. The expansion should be subtle, not cartoonish.
- **Slow-Mo**: Implement a time-scale variable in JS. When the user holds the mouse, multiply delta time by 0.1. When released, return to 1.0. Ensure the animation state is preserved correctly during slow-mo.

## Constraints
- **No Frameworks**: Vanilla HTML/CSS/JS only.
- **No External Assets**: Embed fonts via Google Fonts link, embed noise as SVG string. No external images.
- **Performance**: Use `transform` and `opacity` for animations. Avoid animating `top`/`left` to prevent layout thrashing. Use `will-change` sparingly.
- **Accessibility**: Respect `prefers-reduced-motion`. If enabled, show the Poster Frame immediately without animation. Provide aria-labels.
- **No UI Clutter**: No buttons, no nav, no footer. Just the motion piece. The interaction should be implicit.

## Acceptance criteria
- [ ] 'A' falls from top to center in ~0.8s with accelerating ease.
- [ ] Canvas shakes visibly on impact (0.8s mark).
- [ ] Red ink smear appears on 'A' right serif at impact.
- [ ] 'IMPACT' text fades in after shake settles.
- [ ] Click resets animation.
- [ ] Hold slows animation to ~10% speed.
- [ ] Poster frame at 1.5s is stable and readable.
- [ ] No Inter/Roboto/Arial used.
- [ ] Single-file HTML/CSS/JS deliverable.
- [ ] Responsive layout works on mobile and desktop.
- [ ] Noise texture is subtle and static.
- [ ] Code is clean, commented, and modular.

## Type pairing
Bodoni Moda (Display) + Archivo Narrow (Body)
