## Concept
'Condensation Index' is an editorial experience for 'Vapor & Vine', a beverage pairing annual. The central metaphor is the condensation on a chilled glass. The user's cursor acts as a cloth, wiping away the fog to reveal the content beneath. This creates a tactile, interactive reading experience that mirrors the act of looking through a cold window or glass. The aesthetic is 'clinical hospitality'—cold, precise, and elegant, avoiding rustic or cozy tropes.

## Palette
- **Background:** #0B132B (Deep Midnight) - Represents the dark interior of a wine cellar or the void behind the glass.
- **Ink:** #F7F7F7 (Pure White) - For primary text, ensuring high contrast against the dark background.
- **Accent:** #5BC0BE (Chilled Teal) - Used for highlights, active states, and droplet reflections. Evokes cold water and ice.
- **Surface:** #1C2541 (Dark Slate) - For secondary backgrounds, cards, or footer elements. Provides depth without warmth.

## Type
- **Display:** Playfair Display. Used for the masthead, section titles, and pull quotes. The serif elegance contrasts with the technical nature of the content.
- **Body/Data:** Source Code Pro. Used for all metadata, pairing notes, temperatures, and small labels. This reinforces the 'scientific' or 'technical' aspect of the beverage craft.
- **Hierarchy:** 
  - H1: Playfair Display, 72px, #F7F7F7.
  - H2: Playfair Display, 48px, #F7F7F7.
  - Body: Source Code Pro, 16px, #F7F7F7 (opacity 0.8).
  - Data Labels: Source Code Pro, 12px, #5BC0BE.

## Layout
- **Hero:** Full viewport. The fog layer is densest here. The masthead 'Vapor & Vine' and issue title 'The Cold Pour' are centered. The user must interact to reveal them fully.
- **Chapter 1: The Science of Chill:** A two-column layout. Left: Large serif text explaining condensation. Right: A monospace data table with temperatures and dew points. The fog is moderately dense.
- **Chapter 2: Pairing Index:** A grid of 'pairing cards'. Each card is initially obscured by fog. Hovering or moving the mouse over a card reveals the pairing details (e.g., 'Gin & Tonic / Yuzu Foam'). The cards should have a subtle border in #1C2541.
- **Chapter 3: The Ritual:** A full-width pull-quote section. Large serif text. The fog is thinner here to allow for easier reading, but ambient droplets continue to slide down.
- **Footer:** Simple, monospace contact info. The fog clears completely at the bottom of the page.

## Motion
- **Entrance:** On page load, the fog layer starts at 100% opacity and dissipates over 2 seconds, revealing the hero content. 
- **Ambient:** Water droplets form randomly on the fog layer and slide down the screen. If a droplet passes over text, it should slightly distort or blur the text beneath it (using canvas distortion or SVG filters).
- **Interaction:** 
  - **Wipe:** Cursor movement 'wipes' away the fog in its path. The wipe should have a soft edge (gradient mask) to look like a cloth wiping glass.
  - **Rebuild:** When the cursor stops moving, the fog slowly regenerates in the cleared areas. The speed of regeneration should be slow enough to allow reading but fast enough to maintain the metaphor.
  - **Velocity:** Rapid cursor movement clears the fog faster and more broadly. Slow movement allows condensation to rebuild more quickly.

## Constraints
- **Performance:** Use HTML5 Canvas for the fog layer. Limit particle count to ensure 60fps. Use `requestAnimationFrame` for the animation loop.
- **Responsiveness:** On mobile, use touch events for the wipe. The fog should be less dense on small screens to ensure readability. The layout should stack vertically.
- **Accessibility:** Ensure text has sufficient contrast when the fog is thin. Provide a 'Clear All' button or auto-clear after a timeout for users who cannot interact with the mouse.
- **No External Libraries:** Write vanilla JS for the fog logic. Do not use heavy physics engines.
- **No Warm Tones:** Strictly adhere to the cold palette. No oranges, reds, or creams.

## Acceptance criteria
- [ ] The page loads with a dense fog layer that dissipates over 2 seconds.
- [ ] Cursor movement wipes away the fog, revealing the content beneath.
- [ ] The fog regenerates slowly when the cursor stops moving.
- [ ] Water droplets form and slide down the screen, distorting text they pass over.
- [ ] Typography uses Playfair Display for headlines and Source Code Pro for body/data.
- [ ] The color palette is strictly #0B132B, #5BC0BE, #1C2541, #F7F7F7.
- [ ] The layout is responsive and readable on mobile devices.
- [ ] There are no external libraries used for the fog effect.
- [ ] The aesthetic is cold and clinical, not rustic or cozy.
- [ ] Performance remains smooth (60fps) on desktop and mobile.
