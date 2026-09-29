# Vellum Scribe Marginalia — Extended

**Concept:**
The brand 'Ink & Vellum' sells the restoration of old documents and the creation of new, hand-written certificates. The landing page should feel like opening a pristine, restored manuscript. It conveys expertise, patience, and the human touch in a digital world. The 'marginalia' is the key differentiator—it shows the human eye and hand at work, annotating the service details as if reviewing a proof.

**Palette:**
- `#FDFBF7` (Parchment White): Background.
- `#EAE0D5` (Aged Paper): Subtle borders, hover states, or alternating section backgrounds.
- `#1A1A1A` (Ink Black): Primary text.
- `#4A3B32` (Sepia Ink): Marginalia, accents, thin rules.

**Typography:**
- **Display:** 'Cormorant Garamond' (Regular & Italic). Large, elegant, with tight tracking for headings.
- **Body:** 'EB Garamond' (Regular). 18px base size, line-height 1.6. Highly legible at long form.
- **Marginalia:** A CSS-driven or SVG-based simulation of fine handwriting (or a very refined web font like 'Dancing Script' if used sparingly and cleanly, but SVG paths are better for 'authentic' ink weight). Color: `#4A3B32`.

**Layout:**
- **Hero:** No big image. Just a large, centered heading: "The Art of the Written Word." Below it, a subhead: "Restoration, calligraphy, and bespoke manuscripts for institutions and collectors." A single, thin horizontal rule separates the hero from the content.
- **Services Section:** Two-column layout. Left column: Service name (e.g., "Manuscript Restoration"). Right column: Description. In the right margin, a handwritten note points to a specific phrase, e.g., "Includes deacidification." The note is small, delicate.
- **Process Section:** A vertical timeline. Each step is a small paragraph. The 'timeline' is a thin, hand-drawn-looking line (SVG) running down the left margin, with ink-dot markers.
- **Footer:** Minimal. Contact info, small copyright. No social icons, no newsletter signup (too modern).

**Motion:**
- **Entrance:** Text fades in slowly (1s), with a slight downward drift (20px). No bounces. Feels like ink settling on paper.
- **Interaction:** Hovering over a service title reveals the associated marginalia note more clearly (slight opacity increase, no movement). The paper grain might subtly shift if the mouse moves across the screen (parallax on the background texture only, extremely subtle).

**Constraints Checklist:**
- [ ] No sans-serif fonts.
- [ ] No shadows that suggest 'floating cards'.
- [ ] Marginalia must look hand-drawn, not like a sticker.
- [ ] Background is warm white, not pure white (#FFFFFF).

**Acceptance Criteria:**
The page should feel like a printed program for a high-end auction house or a university archive. Trustworthy, quiet, and focused on the text.
