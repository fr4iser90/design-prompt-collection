# Cyanotype Indexing System — Extended

## Concept
Prussix is a new standard for immutable data logging. The design metaphor is the **Cyanotype process**: a photographic technique that produces blueprints. In this digital interpretation, information exists in a 'latent' state (dark blue) until exposed to light (user interaction/verification), at which point it becomes permanent and white. This conveys trust, scientific precision, and the idea that truth is revealed, not just displayed.

## Art Direction
**Palette:**
- **Deep Prussian Blue**: `#003153` (Background, latent data)
- **Bleached White**: `#e6f2ff` (Revealed data, text, highlights)
- **Iron Rust Accent**: `#8b4513` (Used sparingly for 'error' or 'raw' states, contrasting the cool blue)
- **Grid Line**: `#4a90e2` (20% opacity, for structural guides)

**Typography:**
- **Display**: 'Space Grotesk' or 'IBM Plex Sans Condensed'. High contrast, tight tracking. Must feel like it was stenciled.
- **Body/Data**: 'IBM Plex Mono'. Used for all technical labels, timestamps, and hash IDs. Lowercase preferred for a modern, technical feel.

**Texture:**
- The background should not be flat. It needs a 'wash' effect—subtle variations in the blue density, mimicking uneven chemical application.
- Add a vignette effect that darkens the corners, focusing attention on the center 'exposed' area.

## Layout
**Desktop Hero:**
- Centered, large-scale typographic statement: "TRUTH REVEALED BY LIGHT."
- Surrounding the text are 4-5 rectangular 'latent' blocks. These contain blurred or dark-blue text that is illegible until hovered.
- A footer strip with scrolling hash IDs in monospace, moving slowly like a film advance.

**Mobile:**
- Stack the latent blocks vertically.
- Replace UV-cursor hover with tap-and-hold to 'expose' the content. Add a subtle 'developing' animation (fade-in with slight scale-up) after release.

## Motion Design
1. **Entrance**: The page loads as if being exposed to light—a white flash that quickly fades to deep blue, leaving the static grid visible.
2. **Interaction (UV Reveal)**:
   - Cursor position maps to a radial gradient mask.
   - Inside the mask, the `background-color` of text elements transitions from `#003153` to `#e6f2ff`.
   - Add a slight 'bleed' effect where the white text edges soften as they appear (using `text-shadow: 0 0 2px #e6f2ff`).
3. **Ambient**: The 'latent' blocks should have a very subtle, slow pulse in opacity (0.9 to 1.0) to suggest chemical activity.

## Constraints Checklist
- [ ] No gradients used for buttons or headers (flat color only).
- [ ] Cursor effect must work on touch devices (tap-to-reveal).
- [ ] Typography must remain legible at 14px minimum.
- [ ] No purple or neon colors.
- [ ] Performance: CSS masks preferred over heavy JS canvas for the reveal effect.

## Acceptance Criteria
- User can clearly see the 'before' (dark) and 'after' (white) states of data.
- The blue tone is consistent and deep (not sky blue).
- The layout feels like a physical document or blueprint, not a web app dashboard.
