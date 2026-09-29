Build a single-file HTML/CSS/JS editorial experience titled 'Extruded Narrative' for the brand 'Die & Dough'. The core concept is a long-form essay on pasta engineering where the layout physically mimics the extrusion process. The visual language must be industrial precision, avoiding rustic farmhouse aesthetics. Use a strict palette: Background #EDF2F4 (cool steel white), Ink #2B2D42 (deep charcoal), Accent #D4A373 (brass/gold), and Secondary #8D99AE (steel gray). Typography must use Bodoni Moda for headlines (high contrast, sharp serifs) and Fira Code for body text (monospaced, technical).

**Layout Structure & Physics**
The main content area is divided into vertical 'strands' of text. Initially, these strands are thin (spaghetti-like). As the user scrolls down, the strands must visually stretch and thin out, simulating the tension of dough being pulled through a die. Use CSS `transform: scaleY()` and `letter-spacing` or `line-height` adjustments driven by scroll position to achieve this 'stretching' effect. The text should feel like it is being pulled taut. The header 'Die & Dough' should be fixed or sticky, styled like a metal stamp or die, using the brass accent. The essay content should be structured with clear pull-quotes that break the vertical strands, acting as 'knots' in the dough.

**Motion & Interaction**
1. **Entrance:** Headlines must 'punch' through the page surface. Use a keyframe animation that scales the text from 0.8 to 1.0 with a slight overshoot and a shadow effect that mimics a metallic stamp or punch. This should feel heavy and mechanical.
2. **Ambient:** Apply a subtle, continuous vertical jitter (translateY ±1px) to the text strands to mimic the vibration of an industrial extruder. This should be slow and rhythmic, not chaotic. Use a CSS animation with a small amplitude and a duration of 0.5s-1s.
3. **Interaction:** Include a fixed 'Die' icon in the bottom-right corner. Clicking this toggles the layout mode. 
   - **Spaghetti Mode (Default):** Thin columns (max-width: 40ch), high line-height (1.8), and significant vertical spacing between paragraphs.
   - **Rigatoni Mode (Toggle):** Shorter, wider blocks of text (max-width: 60ch) with tighter line-heights (1.4) and a grid-like structure. 
   The transition between modes should be smooth, using CSS transitions on width, height, padding, and line-height. The 'Die' icon should rotate or change shape slightly to indicate state.

**Content Hierarchy & Details**
The brand 'Die & Dough' should be prominent but integrated into the mechanical aesthetic. The essay content should be structured with clear pull-quotes that break the vertical strands, acting as 'knots' in the dough. These pull-quotes should use Bodoni Moda and be larger than the body text. The background should remain clean and sterile. Ensure that the vertical strands are visually distinct, perhaps with a subtle border or shadow to suggest depth.

**Technical Constraints**
- **Performance:** Scroll animations must be optimized (use `requestAnimationFrame` or CSS `will-change`).
- **Accessibility:** Ensure color contrast meets WCAG AA. Provide a `prefers-reduced-motion` media query to disable jitter and punch animations.
- **Single File:** All CSS and JS must be inline within the HTML file.
- **No Rustic Elements:** No hand-drawn fonts, no paper textures, no earthy tones beyond the brass accent.

**Deliverable:** single-file HTML/CSS/JS.
