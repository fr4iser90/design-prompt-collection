## Concept
Create an immersive editorial experience titled 'Vellum Dust Settling' for the brand 'Codex & Loom'. The concept reimagines digital reading as a physical act of manuscript conservation. The primary interaction is 'breath speed': the user's scroll velocity acts as a wind force. Fast scrolling blows away dust particles, revealing crisp, legible text. Slow scrolling allows dust to settle, obscuring the text with a soft blur. This mechanic forces the reader to find a rhythmic, calm pace ('breath') to maintain legibility, turning reading into a mindful ritual. The aesthetic is archival, tactile, and quiet, avoiding any SaaS or modern web app tropes.

## Palette
- **Background:** `#F5F2EB` (Vellum). A warm, off-white base with a subtle, high-frequency noise texture to simulate paper grain.
- **Ink:** `#3E362E` (Deep Charcoal). Used for all body text and headings. High contrast against the vellum background.
- **Dust/Accent:** `#8C7B6C` (Warm Taupe) and `#D4C5B3` (Light Dust). These colors are used for the particle system. The particles should have varying opacity and size to create depth.
- **UI Elements:** None. The design is chrome-less. Any interactive cues must be integrated into the content or the particle behavior itself.

## Type
- **Display:** 'Cormorant Garamond'. Use for the main title, chapter headings, and pull quotes. Large sizes (e.g., 4rem+ for title, 2.5rem for headings). Tight kerning (-0.02em) to mimic typeset manuscripts. Italic style for pull quotes.
- **Body:** 'Lora'. Use for the main essay text. Size 1.125rem, line-height 1.8. This font is chosen for its readability in long-form digital contexts while maintaining a serif, literary feel.
- **Hierarchy:** Clear visual hierarchy through size and weight, not color or background boxes. Whitespace is the primary separator between sections.

## Layout
- **Structure:** Single-column, long-form essay. Max-width 720px, centered horizontally.
- **Vertical Rhythm:** Generous spacing between paragraphs (1.5em) and chapters (4-6em). No horizontal rules or dividers.
- **Pull Quotes:** Break the column width slightly (e.g., max-width 800px) to create visual interest. Use large, italicized Cormorant Garamond.
- **No Chrome:** No navigation bar, no footer, no sidebars. The page is a continuous scroll. The only 'UI' is the particle system overlay.
- **Responsiveness:** On mobile, reduce max-width to 90% and adjust font sizes for readability. The particle system should scale down in particle count for performance.

## Motion
- **Entrance:** The title 'Vellum Dust Settling' assembles from floating dust particles. Particles converge to the letter positions, then disperse slightly to reveal the solid text behind them. This takes ~2 seconds.
- **Ambient:** Dust particles drift slowly downward with slight horizontal turbulence (sine wave or Perlin noise). This creates a sense of stillness and age.
- **Interaction (Wind):** 
  - Calculate scroll velocity (`deltaY / deltaTime`).
  - **Fast Scroll:** Apply a strong upward/leftward force vector to particles. Push them out of the viewport. Reduce particle opacity rapidly. Decrease the blur effect on the text layer.
  - **Slow Scroll:** Reduce wind force. Allow gravity to pull particles down. Increase particle opacity and size slightly as they 'settle'. Increase the blur effect on the text layer (CSS `backdrop-filter` or canvas blur).
  - **Breath Speed:** The optimal reading speed is where the dust is present but not obscuring. This creates a feedback loop where the user adjusts their scroll speed to maintain clarity.

## Constraints
- **Stack:** Single-file HTML/CSS/JS. No external libraries (no Three.js, no GSAP, no physics engines).
- **Performance:** Use `requestAnimationFrame` for the particle loop. Cull particles that leave the viewport. Limit particle count to ~200-300 for desktop, ~100 for mobile.
- **Accessibility:** Respect `prefers-reduced-motion`. If enabled, disable the particle system and show static text. Ensure text contrast meets WCAG AA standards.
- **No AI Defaults:** Avoid purple glows, cream/terracotta combos, broadsheet columns, pill buttons, or multi-layer shadows. The design must feel like a physical object, not a web app.
- **Legibility:** The dust effect must not make the text unreadable. The blur should be subtle (max 2-3px) and only apply when the user is scrolling very slowly. The 'breath' speed should be intuitive and forgiving.

## Acceptance criteria
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
- [ ] Mobile layout adjusts particle count and font sizes appropriately.
- [ ] No visual artifacts or tearing during rapid scroll changes.
- [ ] The noise texture on the background is subtle and does not interfere with text readability.
