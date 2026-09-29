## Concept
"The Vacuum Seal Protocol" is an editorial platform for molecular gastronomy that rejects the warm, rustic clichés of food media. Instead, it embraces the sterile, high-precision environment of a laboratory. The core interaction metaphor is the vacuum seal: as the user scrolls, the page feels like it is being compressed against a glass plane, pulling floating elements into sharp, airless alignment. The experience is visceral, tense, and clinically beautiful. The user should feel like they are observing a controlled experiment, not browsing a magazine.

## Palette
- **Deep Void (#0a0a0a):** The primary background color. Represents the vacuum chamber. Must be pure black, not dark gray. This creates the deepest possible contrast for the cyan accents.
- **Sterile White (#e0e0e0):** Primary text color, borders, and structural elements. Avoid pure white (#FFFFFF) to reduce eye strain and maintain a slightly metallic, steel-like feel. This color is used for all static text and non-interactive borders.
- **Cyan Pulse (#00f0ff):** Accent color. Used exclusively for interactive states, the "seal" progress indicator, and ambient pulses. Never use for body text. This color represents energy and precision.
- **No other colors.** No gradients, no shadows, no textures. The aesthetic is flat, sharp, and high-contrast. Any deviation from this palette breaks the immersion.

## Type
- **Headlines:** GT America Mono (or similar geometric monospace). Uppercase, weight 700, tracking -0.05em. Size: 48px on desktop, 32px on mobile. The headlines should feel like stamped labels.
- **Body Copy:** Space Mono. Weight 400. Size: 14px, line-height 1.6. Color: #e0e0e0. This font choice reinforces the technical, data-driven nature of the content.
- **Metadata/Captions:** Space Mono. Weight 300. Size: 12px, uppercase, tracking 0.1em. Color: #00f0ff for active states, #e0e0e0 for static. These elements provide context and scientific rigor.
- **Hierarchy:** Clear distinction between headlines, subheads, and body. Use whitespace to create rhythm, not decorative elements. The hierarchy should be obvious and logical, guiding the eye through the content efficiently.

## Layout
- **Grid:** 12-column grid on desktop. Main content spans columns 4-12. Left rail spans columns 1-3. This asymmetrical balance creates visual interest while maintaining structure.
- **Sticky Rail:** Left-hand rail contains the "Seal Status" progress bar (vertical, fills with Cyan Pulse) and chapter markers. Fixed position. The rail acts as a navigation aid and a visual anchor.
- **Content Flow:** Single-column long-form essays. Each section is separated by a "seal line"—a 1px horizontal rule in Cyan Pulse that animates in from left to right. This animation reinforces the vacuum seal metaphor.
- **Specimens:** Images are treated as scientific specimens. Perfect squares or 4:3 rectangles. 1px solid #e0e0e0 border. No rounded corners. Captions in monospace, aligned left. The images should feel like data points, not artistic expressions.
- **Footer:** Simple, centered. "Chef & Vacuum" branding in Space Mono, small caps. "Seal Integrity: 100%" indicator. The footer provides closure and reinforces the brand identity.

## Motion
- **Entrance (Pump Cycle):** Elements start blurred (blur(4px)) and scaled down (0.95). On scroll into view, they snap to sharp focus and full scale using `cubic-bezier(0.19, 1, 0.22, 1)`. Duration: 600ms. This motion simulates the sudden pressure change of a vacuum seal.
- **Ambient (Circulator Pulse):** Top and bottom viewport borders pulse with Cyan Pulse glow at 1Hz. Opacity oscillates between 0.2 and 0.8. Fixed position. This creates a subtle, rhythmic background element that enhances the lab atmosphere.
- **Interaction (Condensation):** Hovering over text/images darkens the background slightly and adds a 1px Cyan Pulse outline. Surrounding area gets `backdrop-filter: blur(2px)` to simulate condensation. This interaction provides immediate feedback and enhances the tactile feel of the interface.
- **Scroll Behavior:** Smooth scroll. No parallax. The motion is about compression and focus, not depth. The user should feel like they are moving through a controlled environment, not a dynamic landscape.

## Constraints
- **Stack:** Single-file HTML/CSS/JS. No build steps. This ensures simplicity and ease of deployment.
- **Libraries:** None. Vanilla JS and CSS only. Google Fonts allowed. This minimizes dependencies and potential points of failure.
- **Performance:** Use `IntersectionObserver` for scroll effects. Avoid layout thrashing. Use `transform` and `opacity` for animations. This ensures smooth performance on all devices.
- **Responsiveness:** On mobile (<768px), the sticky rail becomes a top progress bar. Pulse effect is simplified to a static bar. The layout adapts to smaller screens without losing functionality.
- **Accessibility:** WCAG AA contrast. `prefers-reduced-motion` disables all animations. This ensures the site is usable for all users, including those with motion sensitivities.
- **No Rustic Elements:** No wood, linen, earth tones, or serif fonts. This is a lab, not a kitchen. The aesthetic must remain strictly clinical and modern.

## Acceptance criteria
- [ ] Single HTML file with embedded CSS and JS.
- [ ] Palette strictly limited to #0a0a0a, #e0e0e0, #00f0ff.
- [ ] Typography uses Space Mono and GT America Mono (or similar).
- [ ] Sticky left rail with vertical progress bar fills with Cyan Pulse on scroll.
- [ ] Elements blur and scale down on load, then snap into focus on scroll.
- [ ] Viewport borders pulse with Cyan Pulse at 1Hz.
- [ ] Hovering over content adds a Cyan Pulse outline and condensation blur effect.
- [ ] Images are square/rectangular with 1px borders and monospace captions.
- [ ] No rustic, organic, or warm aesthetic elements.
- [ ] Responsive layout works on mobile.
- [ ] `prefers-reduced-motion` support implemented.
- [ ] All text is legible and meets contrast standards.
- [ ] The vacuum seal metaphor is consistently applied throughout the design.

## Type pairing
Space Mono + GT America Mono
