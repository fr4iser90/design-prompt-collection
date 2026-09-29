## Concept
'Hot Plate' is a digital editorial experience for the culinary publication 'Service'. It captures the ephemeral, high-temperature atmosphere of a professional kitchen pass. The central interaction is the 'Steam Reveal': the interface begins obscured by simulated steam, which dissipates through radial clearing and user-driven condensation to reveal a meticulously typeset fine-dining menu. The design rejects rustic farmhouse tropes in favor of industrial precision, steel, and heat. The experience is designed to slow the user down, forcing them to engage with the content through the metaphorical clearing of steam.

## Palette
- **Deep Charcoal (#1a1a1a):** Primary background and text color. Represents the dark, focused environment of the dining room. Used for main body text and primary UI elements.
- **Cool Mist (#e0e0e0):** Used for the steam overlay, secondary text, and subtle borders. Represents the vapor and clarity. This color is also used for inactive navigation states.
- **Steel Blue (#4a90e2):** Interactive accent color. Used for hover states, active navigation, and pairing notes. Represents cold steel utensils and precise temperature control. Use sparingly to maintain high contrast.

## Type
- **Display:** Didot. Use for dish names, section headers, and the 'Service' brand mark. High contrast, sharp serifs. Weight: Regular to Bold. Ensure fallback to a similar high-contrast serif if Didot is unavailable, but prioritize web-font loading.
- **Body:** Montserrat. Use for descriptions, prices, navigation, and footer. Clean, geometric sans-serif. Weight: Light to Medium. Use tracking (letter-spacing) of 0.05em for uppercase navigation items.
- **Hierarchy:** Dish names should be significantly larger (3rem+) than descriptions (1rem). Use letter-spacing to enhance the 'airiness' of the menu. Line-height for body text should be 1.6 for readability.

## Layout
- **Structure:** Single-column, centered content flow with a sticky right-hand chapter rail. The rail displays course names in small caps, tracking the user's scroll position. On mobile devices (<768px), the rail is hidden, and a top progress bar indicates scroll depth.
- **Grid:** Use a flexible vertical rhythm. Each menu item is a block with consistent padding (min 4rem vertical spacing). Avoid dense multi-column newspaper layouts. Max-width of content column is 800px.
- **Hero:** No traditional hero image. The 'hero' is the steam clearing animation revealing the first course. The top padding should be sufficient to allow the radial wipe to feel centered.
- **Footer:** Minimal. Contains the 'Clear Steam' accessibility toggle and copyright info in Montserrat Light. Background remains Deep Charcoal.

## Motion
1. **Entrance (Radial Wipe):**
   - State: Full-screen overlay, #e0e0e0, opacity 0.95, blur 4px.
   - Action: On load, animate a radial gradient mask expanding from 50% 50% to 150% radius over 1.5s.
   - Easing: ease-out-quart.
   - Result: Content is fully visible and sharp. The transition should feel like a physical curtain lifting.

2. **Ambient Vapor:**
   - State: Canvas overlay above content, below UI controls. Pointer-events: none.
   - Action: Generate 50-100 semi-transparent white particles rising from the bottom viewport edge.
   - Behavior: Particles drift upward with slight horizontal noise (sine wave). Opacity fades as they rise. Velocity is slow (0.5-1px per frame).
   - Interaction: Scroll velocity increases particle transparency (reducing visual noise). Idle state restores full vapor density over 2 seconds.

3. **Condensation (Hover):**
   - Trigger: Mouseover on `.dish-name`.
   - Action:
     a. Steam opacity over that specific text block drops to 0 instantly (or within 200ms).
     b. Spawn 5-10 small SVG water droplets on the text bounding box. Randomize size (2-5px) and position.
     c. Animate droplets rolling off the bottom edge of the text block, fading out. Use gravity simulation for realistic movement.
     d. Reveal hidden `.dish-details` (price, pairing) with a fade-in-up transition (translateY 10px to 0).
   - Exit: Mouseout reverses the reveal (details fade out), steam opacity returns to 0.8 with a slight blur over 500ms.

## Constraints
- **No Rustic Elements:** Ban wood textures, kraft paper, handwritten fonts, or earthy tones. The aesthetic is modern, cold, and industrial.
- **No SaaS Patterns:** No 'Get Started' buttons, no 3-column feature grids, no testimonial carousels, no rounded pill buttons.
- **Performance:** Steam animations must use `transform` and `opacity` only. Avoid layout thrashing. Canvas particles should be capped at 100 instances. Use `requestAnimationFrame` for smooth animation loops.
- **Accessibility:** Provide a global toggle to disable all motion and steam effects for users with vestibular disorders. Ensure color contrast ratios meet WCAG AA when steam is cleared. Focus states must be visible (Steel Blue outline).
- **Browser Support:** Target modern browsers (Chrome, Firefox, Safari). Use feature detection for SVG filters. If SVG filters are not supported, fallback to simple opacity changes for condensation.
- **Responsiveness:** Ensure the radial wipe scales correctly on different aspect ratios. The chapter rail must not overlap content on smaller screens.

## Acceptance criteria
- [ ] Page load initiates a 1.5s radial steam clear animation from center.
- [ ] Ambient vapor particles rise from the bottom of the screen continuously.
- [ ] Hovering a dish name triggers a water droplet animation and reveals price/pairing.
- [ ] Typography uses Didot for headings and Montserrat for body; no system fonts.
- [ ] Color palette strictly uses #1a1a1a, #e0e0e0, #4a90e2.
- [ ] Sticky chapter rail tracks scroll position correctly on desktop.
- [ ] 'Clear Steam' accessibility toggle functions correctly and disables all animations.
- [ ] No emoji, pill buttons, or multi-layer shadows are present.
- [ ] Text remains legible during ambient vapor state (contrast check).
- [ ] Mobile layout collapses rail into progress indicator.

## Deliverable
Single-file HTML/CSS/JS.

## Type pairing
Didot + Montserrat
