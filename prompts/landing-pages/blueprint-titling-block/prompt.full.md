# Blueprint Titling Block — Extended

**Concept:**
'Draft & Scale' sells precision and adherence to standards. The landing page communicates this by adopting the visual language of the tools they use. Instead of a 'hero image' of a building, the hero is the 'sheet' itself. The content is organized as data fields, reinforcing the idea that their work is structured, verified, and accurate.

**Palette:**
- `#003366` (Blueprint Blue): Main background.
- `#FFFFFF` (Drafting White): All text, lines, and icons.
- `#0055AA` (Highlight Blue): Hover states, active fields.
- `#CCCCCC` (Fade Grey): Secondary text, inactive grid lines.

**Typography:**
- **Labels:** 'Architects Daughter' (or a similar handwritten style, used sparingly for small labels like "SCALE", "CLIENT"). All-caps.
- **Values/Content:** 'Roboto Condensed' (Light/Regular). Clean, readable, industrial.
- **Headlines:** 'Roboto Condensed' (Bold). Large, all-caps, integrated into the grid as a major field (e.g., "PROJECT: NEW LIBRARY").

**Layout:**
- **Hero:** A full-screen 'sheet'. The top left contains the 'Company Logo' (simple white text). The bottom right contains the 'Titling Block'. The center contains a large, abstract wireframe of a structure (SVG lines) that serves as the background visual.
- **Services:** A grid of 'fields'. Each service (e.g., "Seismic Analysis") is a cell in the grid. Hovering over a cell makes the border glow white and reveals a small icon (e.g., a seismograph wave).
- **Team:** A row of 'fields' containing initials (large, bold) and names (small, below). No photos. Just data.
- **Contact:** Form fields are styled as input boxes within the titling block grid. Labels are small, uppercase, handwritten-style.

**Motion:**
- **Entrance:** The grid lines draw themselves in (stroke-dashoffset animation) from the top-left corner to the bottom-right. Then the text fades in.
- **Interaction:** Hovering over a 'field' cell causes a subtle 'crosshair' (thin white lines) to appear, aligning the user's cursor with the center of the field. This mimics the drafting tool's crosshair.

**Constraints Checklist:**
- [ ] No rounded corners.
- [ ] No shadows.
- [ ] The grid must be perfectly aligned.
- [ ] The handwritten font must not be used for long paragraphs.

**Acceptance Criteria:**
The page should look like a digital document from a CAD system. It is professional, rigorous, and visually distinct from typical SaaS or creative portfolios.
