## Concept
Create an interactive editorial piece titled 'Extruded Narrative' for the imprint 'Die & Dough'. The narrative explores the engineering of pasta, but the medium itself is the message: the text layout physically behaves like dough being extruded through a brass die. The user scrolls through a vertical narrative where typography stretches, thins, and vibrates, simulating the mechanical tension of industrial pasta production. This is not a rustic, hand-crafted look; it is precise, metallic, and engineered. The experience should feel like reading a technical manual for a machine that produces art.

## Palette
- **Background:** #EDF2F4 (Cool Steel White) - Clean, sterile, industrial. This is the primary canvas.
- **Ink:** #2B2D42 (Deep Charcoal) - High contrast for readability. Used for all body text and main headlines.
- **Accent:** #D4A373 (Brass Gold) - Used for headlines, the 'Die' icon, active states, and pull-quote borders. This color should feel metallic and warm against the cool background.
- **Secondary:** #8D99AE (Steel Gray) - Used for secondary text, borders, inactive UI elements, and subtle dividers. This color provides depth without competing with the ink.

## Type
- **Headlines:** Bodoni Moda. Use high weight (700-900) for impact. The high contrast of the serif mimics the sharp edges of a die. Headlines should be large and commanding.
- **Body:** Fira Code. Monospaced to suggest technical precision and engineering specs. This font choice reinforces the 'engineering' aspect of the pasta process.
- **Hierarchy:** Clear distinction between the 'Die' (brand/header) and the 'Dough' (content). Pull-quotes should be larger, using Bodoni Moda, breaking the monospace rhythm of the body text. The pull-quotes act as visual anchors in the vertical flow.

## Layout
- **Vertical Strands:** The core layout consists of vertical columns of text. These strands should be visually distinct, perhaps with a subtle border or shadow to suggest depth and separation.
- **Spaghetti Mode (Default):** Thin columns (max-width: 40ch), high line-height (1.8), and significant vertical spacing between paragraphs. This mode emphasizes the 'stretching' aspect of the extrusion process.
- **Rigatoni Mode (Toggle):** Wider columns (max-width: 60ch), tighter line-height (1.4), and a grid-like arrangement. This mode emphasizes the 'structure' and 'shape' of the final product.
- **Scroll Effect:** As the user scrolls down, the text strands should visually 'stretch'. Implement this by increasing `letter-spacing` or `line-height` dynamically via JS scroll listeners, or using CSS `scaleY` transforms on the container. The text should feel like it is being pulled taut. The effect should be subtle but noticeable, creating a sense of physical tension.
- **Header:** 'Die & Dough' logo should be fixed or sticky, styled like a metal stamp or die. It should be prominent but not overwhelming. Use the brass accent for the logo text or border.

## Motion
1. **Entrance (Punch):** Headlines animate in with a 'punch' effect. Scale from 0.9 to 1.0 with a cubic-bezier ease-out. Add a temporary box-shadow or text-shadow that expands and fades, simulating the impact of a stamp. The animation should feel heavy and mechanical, with a slight overshoot.
2. **Ambient (Vibration):** Apply a continuous, subtle `translateY` jitter to the text strands. Use a CSS animation with a small amplitude (1-2px) and a slow duration (0.5s-1s) to mimic machine vibration. The jitter should be rhythmic and consistent, not chaotic.
3. **Interaction (Die Toggle):** A fixed button with a brass accent. Clicking it toggles a class on the body (`.mode-rigatoni`). CSS transitions handle the width, padding, and line-height changes. The 'Die' icon should rotate or change shape slightly to indicate state. The transition should be smooth and deliberate, reflecting the mechanical nature of the process.

## Constraints
- **No Rustic Elements:** No hand-drawn fonts, no paper textures, no earthy tones beyond the brass accent. The aesthetic must be strictly industrial and precise.
- **Performance:** Scroll animations must be optimized (use `requestAnimationFrame` or CSS `will-change`). Avoid layout thrashing by batching DOM reads and writes.
- **Accessibility:** Ensure color contrast meets WCAG AA. Provide a `prefers-reduced-motion` media query to disable jitter and punch animations. Ensure the 'Die' toggle is keyboard accessible.
- **Single File:** All CSS and JS must be inline within the HTML file. No external dependencies except for Google Fonts.
- **Responsive:** The layout must adapt to mobile screens. On mobile, the 'strands' may collapse into a single column, but the stretch and toggle effects should still function.

## Acceptance criteria
- [ ] The page loads with the 'Die & Dough' header and the essay content in 'Spaghetti Mode'.
- [ ] Headlines animate in with a distinct 'punch' effect (scale + shadow).
- [ ] Text strands exhibit a subtle vertical jitter animation.
- [ ] Scrolling down causes the text to visually stretch (increased spacing/height).
- [ ] Clicking the 'Die' icon toggles the layout to 'Rigatoni Mode' (wider, tighter text).
- [ ] Clicking the 'Die' icon again returns to 'Spaghetti Mode'.
- [ ] The palette strictly uses #EDF2F4, #2B2D42, #D4A373, #8D99AE.
- [ ] Fonts are Bodoni Moda and Fira Code.
- [ ] The code is contained in a single HTML file.
- [ ] `prefers-reduced-motion` disables animations.
- [ ] The layout is responsive and functions on mobile devices.
- [ ] The 'Die' toggle is keyboard accessible.
