## Concept
Reconstruct the tactile experience of a cyanotype architectural print on a digital screen. The central thesis is that reading speed is a physical variable in a chemical process. The user is not just scrolling; they are controlling the ink transfer rate. Too fast, and the ink smears (illegibility). Too slow, and the ink bleeds into the paper fibers (halos). The goal is to find the "perfect transfer" zone where the technical drawings and text are crisp and legible, rewarding mindful, paced reading.

## Palette
- **Substrate (Background):** `#002F5F` (Deep Cyanotype Blue). This is the primary canvas color.
- **Ink (Text/Lines):** `#F0F4F8` (Off-White/Cyanotype Highlight). Used for all primary text and drawing lines.
- **Secondary Ink (Accents/Labels):** `#1E3A5F` (Lighter Blue). Used for secondary text, captions, and background structural elements to create depth without breaking the monochromatic cyanotype feel.
- **Grain/Noise:** Low-opacity white/black noise overlay to simulate paper texture.

## Type
- **Display/Labels:** "Architects Daughter". This font mimics hand-drawn technical annotations. Use it for chapter titles, plate numbers, and marginalia. It should feel like it was written by an architect's hand.
- **Body/Technical:** "Space Mono". Use this for all body copy, technical specifications, and data tables. The monospaced nature reinforces the technical/blueprint aesthetic.
- **Hierarchy:** Large, hand-drawn titles for section breaks. Dense, monospaced body text for the content. Pull quotes should be rendered in "Architects Daughter" with larger stroke weight, appearing as if written over the technical drawings.

## Layout
- **Structure:** A vertical, single-column scroll layout that mimics a long-form print folio. Each section is a "Plate".
- **Margins:** Wide, consistent margins that evoke print layout. Use a sticky left rail for chapter navigation, styled as registration marks (crosshairs) with small text labels.
- **Desktop Specifics:** The left rail is fixed at 200px width. The main content area is centered with a max-width of 720px. The right margin is reserved for marginalia notes that float alongside the text.
- **Mobile Specifics:** The left rail becomes a fixed top bar with 40px height. The main content fills the screen width with 24px padding. Marginalia is appended to the end of each plate section in a smaller font size.
- **Content Blocks:**
  - **Plate Header:** Large hand-drawn title, plate number, and date.
  - **Technical Drawing:** SVG line art of architectural elements (e.g., trusses, facades, sections). These should be white lines on the blue background.
  - **Body Text:** Dense paragraphs in Space Mono. 
  - **Marginalia:** Small, hand-drawn notes or sketches in the margins, using Architects Daughter.
- **No Cards:** Do not use card-based layouts. Content should flow continuously like a printed page.

## Motion
- **Entrance (Chemical Reaction):** On page load, the main title and first plate elements should animate from 0 opacity to 1 over 1.5 seconds. The effect should simulate ink soaking into paper: start with slight blur and low opacity, then sharpen and brighten as the "reaction" completes.
- **Scroll Velocity (The Core Mechanic):**
  - **Smudge (Fast Scroll):** When scroll velocity exceeds 120px/s, apply a horizontal blur filter to all text and SVG elements. The blur intensity should scale with velocity. This simulates ink dragging across the page.
  - **Bleed (Slow Scroll):** When scroll velocity is below 20px/s, apply a soft, radial glow (halo) around text edges. This simulates ink soaking into porous paper. The glow should increase in intensity the longer the user stays in the slow zone.
  - **Perfect Transfer (Ideal Scroll):** Between 40-80px/s, no filters are applied. Text is crisp, high-contrast, and legible.
- **Ambient (Light Table):** The paper grain texture should shift subtly based on cursor position. As the mouse moves, the noise overlay should translate slightly in the opposite direction, mimicking the physical movement of a sheet on a light table.

## Constraints
- **Performance:** Use CSS filters for text blur/glow where possible for performance. If using Canvas for grain, ensure it is optimized (e.g., pre-rendered noise texture with CSS background-position animation).
- **No Fake Newspaper:** Do not use dense, multi-column broadsheet layouts. This is a technical folio, not a newspaper.
- **No SaaS Aesthetics:** No rounded corners, no drop shadows, no gradients (except for the ink bleed effect). The look must be flat and print-like.
- **Readability:** The smudge/bleed effects must not make the content permanently illegible. The user must be able to recover readability by adjusting their scroll speed.
- **No Emoji:** Use SVG icons or hand-drawn symbols for any UI elements.

## Acceptance criteria
- [ ] **Scroll Velocity Mechanic:** Fast scrolling (>120px/s) visibly blurs text (smudge). Slow scrolling (<20px/s) visibly creates halos (bleed). Moderate scrolling (40-80px/s) results in crisp text.
- [ ] **Typography:** "Architects Daughter" is used for titles/labels. "Space Mono" is used for body text. No system fonts are used.
- [ ] **Color Palette:** Background is #002F5F. Text is #F0F4F8. Secondary elements are #1E3A5F. No other colors are used.
- [ ] **Entrance Animation:** Content fades in with a "bleed" effect over 1.5s on load.
- [ ] **Ambient Interaction:** Paper grain texture shifts with cursor movement.
- [ ] **Layout:** Single-column vertical scroll with wide margins. Sticky registration marks on the left.
- [ ] **No Cards/Modals:** Content is presented as continuous print-like blocks, not cards.
- [ ] **Performance:** Scroll effects do not cause jank or frame drops on standard hardware.
- [ ] **Readability:** User can easily find the "perfect transfer" speed to read content clearly.
- [ ] **Responsive Design:** Layout adapts correctly to mobile viewports with adjusted scroll velocity thresholds.
