Deliverable: single-file HTML/CSS/JS.

Build an editorial experience for 'Codex & Loom' that simulates manuscript conservation through a physics-based dust particle system. The core mechanic is 'breath speed': scroll velocity directly controls the visibility of the text. Fast scrolling acts as a strong wind, blowing dust particles out of the viewport to reveal sharp, legible text. Slow scrolling allows dust to settle on the text surface, creating a blurred, obscured effect that forces the user to find the optimal 'breath' rhythm for reading.

**Visual Style & Palette:**
- Background: `#F5F2EB` (Vellum/Off-white) with a subtle, non-repeating noise texture to simulate paper grain.
- Ink/Text: `#3E362E` (Deep Charcoal/Brown) for high contrast body text.
- Accent/Dust: `#8C7B6C` (Warm Taupe) and `#D4C5B3` (Light Dust) for particles.
- Typography: Use 'Cormorant Garamond' for all display headings (large, elegant, serif) and 'Lora' for body text (readable, serif). Ensure kerning is tight for headings to mimic typeset manuscripts.

**Layout Structure:**
- A single-column, long-form essay layout. Max-width 720px, centered.
- No sidebars, no navigation bars, no footers. The focus is entirely on the reading flow.
- Chapters are separated by generous whitespace (vertical rhythm) rather than horizontal rules.
- Pull quotes should be large, italicized Cormorant Garamond, breaking the column width slightly to create visual interest.
- **Desktop Layout:** Maintain the 720px max-width. Ensure ample padding on left/right for larger screens to keep the text block centered and breathable. The canvas overlay must sit above the text but below any potential (though non-existent) UI chrome.
- **Mobile Layout:** Reduce max-width to 90% of the viewport. Adjust font sizes: Title to 2.5rem, Body to 1rem. Reduce particle count to ~100 to maintain 60fps on mobile devices. Ensure touch scrolling triggers the wind mechanic accurately without jitter.

**Particle System Mechanics:**
- Implement a canvas overlay covering the entire viewport.
- Generate ~200-300 dust particles. Each particle has a position (x, y), velocity (vx, vy), size, and opacity.
- **Ambient State:** Particles drift slowly downward with slight horizontal turbulence (Perlin noise or simple sine wave variation).
- **Wind Force (Scroll Interaction):** Calculate scroll velocity (`deltaY / deltaTime`). 
  - If velocity > threshold (fast scroll), apply a strong upward/leftward force vector to particles, pushing them out of the frame. Reduce particle opacity rapidly.
  - If velocity < threshold (slow scroll), reduce wind force. Allow gravity to pull particles down. Increase particle opacity and size slightly as they 'settle'.
  - **Blur Effect:** Apply a CSS `backdrop-filter: blur()` or a canvas-based blur to the text layer underneath the particles when particle density/opacity is high. As particles are blown away, the blur decreases to 0.
- **Entrance Animation:** On load, the main title 'Vellum Dust Settling' should not just fade in. Instead, generate particles that converge to form the shape of the letters, then disperse slightly to reveal the solid text behind them.

**Technical Constraints:**
- Use vanilla JavaScript for the particle system. No external physics libraries.
- Optimize for performance: use `requestAnimationFrame`. Cull particles that leave the viewport.
- Ensure the text remains accessible: if the user prefers reduced motion, disable the particle system and show static text.
- The dust effect must not obscure the text to the point of illegibility unless the user intentionally scrolls very slowly. The 'breath' speed should be intuitive.
- No dashboard elements, no UI chrome. The interface is the content.
- **Acceptance Criteria:**
  - [ ] Single-file HTML/CSS/JS structure.
  - [ ] Palette uses `#F5F2EB`, `#3E362E`, `#8C7B6C`, `#D4C5B3` with correct roles.
  - [ ] Typography uses 'Cormorant Garamond' for display and 'Lora' for body.
  - [ ] Particle system is implemented in vanilla JS with ~200-300 particles.
  - [ ] Scroll velocity controls wind force: fast scroll blows dust away, slow scroll lets it settle.
  - [ ] Text blur effect is linked to particle density/opacity.
  - [ ] Entrance animation assembles title from particles.
  - [ ] `prefers-reduced-motion` disables particles and shows static text.
  - [ ] No external libraries or frameworks used.
  - [ ] Layout is single-column, max-width 720px, no chrome.
  - [ ] Performance is smooth (60fps) on desktop.
