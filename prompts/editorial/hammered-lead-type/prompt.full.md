## Concept
**Foundry & Flaw** is a digital homage to the physical craft of letterpress and metal type casting. The core metaphor is that typography is not just visual information, but physical mass. The layout behaves like a printing press bed where 'lead' (text) is dropped into 'furniture' (grid lines). The design embraces imperfections—slight misalignments, heavy shadows, and metallic textures—to reject the sterile perfection of digital UI. The brand is **Matrix Quarterly**, a journal for typographers and designers who appreciate the weight of words. The experience should feel tactile, heavy, and industrial, evoking the smell of ink and the sound of metal striking paper.

## Palette
The palette is strictly monochromatic, mimicking the materials of a foundry:
- **#050505 (Press Bed):** The background. Deep, absolute black. Represents the void or the machine. No gradients allowed here.
- **#c0c0c0 (Lead Type):** Primary text color. A cool, metallic grey. Not white. It should feel cold and hard. This color is used for all main headings and body text.
- **#2a2a2a (Furniture/Spacing):** The grid lines and structural elements. Darker than the text, lighter than the background. Represents the metal bars that hold type in place. These lines are crucial for the grid structure.
- **#8a8a8a (Ink Residue/Secondary):** Used for captions, footnotes, and inactive states. Provides hierarchy without breaking the monochromatic scheme.
- **#FFFFFF (Molten/Spark):** Used only for interaction highlights (the 'heat' of re-casting) and particle effects. Never used for static text.

## Type
- **Display Font:** **Bodoni Moda**. Chosen for its extreme contrast between thick and thin strokes. This mimics the sharp, precise cuts of metal type punches. Use `font-weight: 400` or `700` only. Do not use italics for emphasis; use size or tracking instead. The font should feel sharp and aggressive.
- **Body Font:** **IBM Plex Mono**. Monospace is essential to convey the 'mechanical' nature of the grid. It aligns perfectly with the column structure, reinforcing the 'casting' metaphor. Ensure line-height is generous (1.6) for readability.
- **Tracking:** Tighten tracking on headlines (-0.02em) to make them feel dense and solid. Loosen tracking on body text (0.02em) for readability and to mimic the spacing of cast characters.
- **Hierarchy:** H1 is massive (clamp(3rem, 5vw, 6rem)). H2 is medium (clamp(2rem, 3vw, 3rem)). Body text is 1rem. Captions are 0.875rem.

## Layout
- **Grid:** A strict 12-column grid. The gutters are not empty space; they are filled with vertical lines of **#2a2a2a** that are 1px wide but have a 3D bevel effect (using `box-shadow` or `border` tricks) to look like raised metal bars. On mobile, the grid collapses to a single column, but the horizontal separators remain visible.
- **Hero Section:** The title 'FOUNDRY & FLAW' occupies the top 40vh. It is centered. The text has a `text-shadow: 0 4px 8px rgba(0,0,0,0.6)` to lift it off the page. The hero should feel like a massive block of metal dropped onto the page.
- **Content Blocks:** Articles are presented as 'casts'. Each paragraph block has a slight `background-color: #0a0a0a` (slightly lighter than bg) to look like an impression in the paper. Padding should be generous to allow the 'impression' to breathe.
- **Sticky Rail:** A left-side sticky rail shows the current 'chapter' or 'column number' in #8a8a8a, monospace, small font. It acts as the 'index' of the press. This rail should stick to the viewport on scroll but hide on mobile devices to maximize content width.
- **Footer:** Minimalist footer with copyright and social links in #8a8a8a. No decorative elements.

## Motion
1. **The Drop (Entrance):** 
   - Headlines animate from `translateY(-100px)` to `translateY(0)` with a bounce easing: `cubic-bezier(0.34, 1.56, 0.64, 1)`.
   - Duration: 0.8s.
   - Simultaneously, the 'furniture' lines below the headline vibrate: `animation: vibrate 0.3s linear` (keyframes: `translateY(0) -> translateY(1px) -> translateY(-1px) -> translateY(0)`).
   - Shadow expands from `0 0 0` to `0 4px 8px` during the drop. This creates a sense of weight and impact.

2. **Re-casting (Interaction):**
   - On click of any body paragraph:
     - Apply a `filter: blur(1px) contrast(1.5)` for 0.1s.
     - Change color to #fff for 0.1s.
     - Spawn 3-5 small white particles (divs) from the click coordinates, animating `translateY(-20px)` and `opacity: 0` over 0.5s.
     - Return to normal state over 0.3s. The interaction should feel like the metal is heating up and cooling down rapidly.

3. **Ambient Vibration:**
   - The grid lines have a keyframe animation `hum` that changes `opacity` from 0.8 to 1.0 over 4s, infinite, ease-in-out. This suggests the machine is running. The effect should be barely noticeable, adding a layer of subconscious life to the static layout.

## Constraints
- **No Gradients:** Except for the subtle bevel on grid lines. No background gradients. The design must rely on flat colors and shadows for depth.
- **No Rounded Corners:** Everything is rectangular. `border-radius: 0`. This reinforces the industrial, mechanical aesthetic.
- **Performance:** The vibration and particle effects must be GPU-accelerated (`transform`, `opacity`). Avoid layout thrashing. Use `will-change` sparingly.
- **Accessibility:** Respect `prefers-reduced-motion`. If enabled, disable all entrance animations, vibrations, and particles. Text should still be readable and the layout should remain intact.
- **Contrast:** Ensure #c0c0c0 on #050505 meets WCAG AAA standards (it does). Secondary text #8a8a8a on #050505 meets WCAG AA.
- **Responsiveness:** The layout must be fully responsive. On mobile, the 12-column grid collapses to a single column. The sticky rail is hidden. The hero text size adjusts via clamp().

## Acceptance criteria
- [ ] Background is exactly #050505.
- [ ] Headlines use Bodoni Moda and drop with a bounce animation on load.
- [ ] Grid lines are visible (#2a2a2a) and vibrate when headlines land.
- [ ] Clicking body text triggers a color flash (#fff) and particle effect.
- [ ] No rounded corners are present anywhere in the UI.
- [ ] Body text uses IBM Plex Mono.
- [ ] `prefers-reduced-motion` disables all animations.
- [ ] The 'furniture' lines have a 3D bevel effect (light/dark borders).
- [ ] Layout is responsive and functional on mobile and desktop.
- [ ] Deliverable is a single-file HTML/CSS/JS.
