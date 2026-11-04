## Concept
Create an immersive editorial experience for 'Archivum' that reimagines digital reading through the lens of analog microfilm technology. The central metaphor is the 'Microfilm Reel Focus': users scroll through a vertical stream of text that behaves like a physical 16mm film reel passing through a reader. Information is only legible when it passes through a fixed 'optical focus gate' in the center of the viewport. This forces a deliberate, rhythmic reading pace, transforming passive scrolling into an active mechanical interaction. The design avoids nostalgic 'paper' clichés in favor of the cold, precise, and industrial aesthetic of archival microfilm readers: high contrast, digital grain, and mechanical precision.

## Palette
- **Background:** `#0A0A0A` (Deep Black) - Represents the darkroom and the unlit film.
- **Ink/Text:** `#F5F5F0` (Off-White) - Represents the film stock and printed text.
- **Accent:** `#88CCEE` (Cyan) - Represents the scanner light, focus indicators, and UI elements.
- **Usage:** The background is solid black. Text is off-white. All interactive elements, borders, and focus indicators use the cyan accent. No other colors are permitted. Avoid gradients; use flat colors with opacity for depth.

## Type
- **Display/UI:** 'Space Grotesk' (Google Fonts). Use for the 'ARCHIVUM' logo, header metadata, and section markers. Style: Uppercase, Bold, Letter-spacing: 0.1em. Color: #F5F5F0 or #88CCEE.
- **Body:** 'Courier Prime' (Google Fonts). Use for all editorial content. Style: Regular weight, monospaced. This font choice reinforces the 'typewritten archive' feel. Color: #F5F5F0.
- **Hierarchy:** The body text should be large enough to be readable when focused (min 18px). Headers within the text stream should be smaller but distinct, perhaps using a different weight or color (cyan) to denote section breaks.

## Layout
- **Fixed Header:** A thin bar at the top (height: 60px) containing the 'ARCHIVUM' logo on the left and 'REEL 01 // STATUS: ACTIVE' on the right. Border-bottom: 1px solid #88CCEE.
- **Main Viewport:** Takes up the remaining screen height. Overflow: hidden. The content scrolls within this container.
- **Film Strip:** A central column (max-width: 800px) containing the text. This column has 'sprocket rails' on both sides: vertical strips of black squares with white borders, spaced evenly, that move with the text.
- **Focus Gate:** A fixed, centered horizontal band (height: 20vh) with a cyan border (1px solid #88CCEE) and a subtle inner glow. This band does not move. It acts as the 'window' through which the text is viewed.
- **Frame Breaks:** Between text sections, insert a horizontal cyan line spanning the width of the film strip to simulate the perforation or frame break of a film reel.

## Motion
- **Scroll-Driven Focus:** As the user scrolls, calculate the distance of each text block from the center of the viewport. Apply CSS filters dynamically:
  - **Center (0-10% distance):** `blur(0px) contrast(1.2) brightness(1.1)`. Sharp and bright.
  - **Mid (10-30% distance):** `blur(3px) contrast(1.0) brightness(0.9)`. Soft.
  - **Edge (>30% distance):** `blur(10px) contrast(0.7) brightness(0.6)`. Blurred and dim.
  - Use `transition: filter 0.1s ease-out` for smooth snapping.
- **Entrance Animation:** On load, the film strip slides in from the right with a heavy `blur(20px)` and `opacity: 0`, settling into place over 1 second. The sprockets rotate (simulated by moving the background position of the sprocket pattern).
- **Ambient Grain:** A full-screen overlay with a noise texture (SVG or CSS) at 5% opacity. Animate the `background-position` randomly every 100ms to create a flickering film grain effect.
- **Mechanical Jitter:** Every 3-5 seconds, apply a brief `transform: translate(1px, 1px)` to the film strip for 100ms to simulate the mechanical jitter of the reel advancing.
- **Scanline:** A subtle horizontal line (1px cyan, opacity 0.3) moves slowly down the focus gate area, simulating the scanning beam.

## Constraints
- **Single File:** All HTML, CSS, and JS must be in one file.
- **No Libraries:** Use vanilla JS. No React, Vue, or GSAP. Google Fonts are allowed.
- **Performance:** Use `will-change: filter, transform` on animated elements. Throttle scroll events if necessary.
- **Accessibility:** Ensure text is readable when focused. Provide a 'Skip Animation' or 'Static View' toggle for users who prefer reduced motion.
- **No Dashboard UI:** Avoid cards, modals, or typical web app patterns. The interface should feel like a specialized machine, not a website.
- **Color Strictness:** Stick to the three defined colors. No shadows, no gradients, no other hues.

## Acceptance criteria
- [ ] The page loads with a black background and cyan-accented header.
- [ ] Scrolling causes the text to move vertically while the 'Focus Gate' remains stationary.
- [ ] Text outside the center is visibly blurred and dimmed; text in the center is sharp and bright.
- [ ] The blur effect transitions smoothly as text enters and exits the focus zone.
- [ ] Sprocket holes on the sides of the text strip move in sync with the text.
- [ ] A subtle grain overlay is visible and flickers.
- [ ] The 'ARCHIVUM' logo and 'REEL 01' text are visible and styled correctly.
- [ ] The experience feels mechanical and precise, not like a standard web page.
- [ ] No external JS libraries are used (only Google Fonts CSS).
- [ ] The code is contained in a single HTML file.

## Type pairing
Display: Space Grotesk (UI/Headers) + Body: Courier Prime (Text)
