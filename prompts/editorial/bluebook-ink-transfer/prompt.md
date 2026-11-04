Deliverable: single-file HTML/CSS/JS.

Build a high-fidelity digital reconstruction of a cyanotype architectural folio titled "Blueprint Quarterly." The core mechanic treats scroll velocity as a physical variable in a chemical ink transfer process. The background is a deep cyanotype blue (#002F5F) with a subtle, reactive paper grain texture. Text and technical drawings are rendered in white (#F0F4F8) and lighter blue (#1E3A5F).

Typography: Use "Architects Daughter" for all hand-drawn labels, captions, and chapter markers to evoke technical drafting. Use "Space Mono" for the body text and technical specifications. Do not use Inter, Roboto, or system fonts.

Layout: A single-column vertical scroll structure that mimics a long-form print folio. Each section represents a "plate" or page spread. Include sticky chapter indicators on the left margin that resemble registration marks.

Desktop Layout: The main content column is centered with a max-width of 720px. The left margin (200px wide) contains the sticky registration mark navigation. The right margin is empty space for marginalia. The viewport height is divided into distinct "plates" with ample vertical whitespace between them to simulate page breaks.

Mobile Layout: The sticky left rail collapses into a fixed top bar with minimal registration icons. The main content column expands to fill the width with 24px side padding. Marginalia moves to the bottom of each plate section. Touch scroll velocity mapping must be tuned for finger swipes, which are naturally faster than mouse wheels; adjust thresholds accordingly (e.g., Smudge > 150px/s, Bleed < 10px/s).

Interaction & Physics:
1. Scroll Velocity Mapping: Calculate the user's scroll velocity (pixels per second).
   - Ideal Range (40-80 px/s): Ink transfer is perfect. Text is sharp, high-contrast white. Technical drawings are crisp.
   - Fast Scroll (>120 px/s): Simulate "smudge." Apply a horizontal blur filter (CSS `filter: blur()` or canvas displacement) to text and images. The faster the scroll, the more illegible the content becomes, mimicking ink dragging across wet paper.
   - Slow Scroll (<20 px/s): Simulate "bleed." If the user stops or moves too slowly, apply a radial glow or halo effect around text edges (CSS `text-shadow` with large spread or canvas glow), simulating ink soaking into porous paper.

2. Entrance Animation: On load, the main title and first plate should animate as if the chemical reaction is occurring. White lines should "bleed" into the blue background over 1.5 seconds, starting from low opacity and sharp edges, settling into the final state.

3. Ambient Interaction: The paper grain texture should shift subtly based on cursor position (parallax effect), mimicking the physical movement of a sheet on a light table. Use a noise overlay that moves inversely to the cursor.

Visual Details:
- No drop shadows or box shadows. Use color contrast and blur for depth.
- Technical drawings should be SVG line art with stroke-dasharray animations to simulate drawing.
- Include "registration marks" (crosshairs) at the corners of the viewport that subtly rotate or shift with scroll.

Constraints:
- No SaaS-style cards or modals.
- No purple gradients or neon glows.
- No emoji.
- Ensure the smudge/bleed effect does not crash performance; use CSS filters for text and requestAnimationFrame for canvas-based grain if needed.
- The experience must be readable if the user scrolls at a moderate, human pace.

Acceptance Criteria:
- Scroll velocity mechanics must be responsive and smooth.
- Typography must strictly adhere to the specified fonts.
- Color palette must remain monochromatic cyanotype.
- Layout must be responsive from 320px to 1920px width.
