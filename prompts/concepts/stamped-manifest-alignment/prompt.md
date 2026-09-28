# Stamped Manifest Alignment

**Concept**: A 'paperless' workflow that embraces the imperfection of physical paperwork. Users drag a rubber stamp icon over a document field. When released, it stamps a red 'APPROVED' mark with realistic ink bleed, grain, and slight rotation error.

**Visual Rules**:
1. **The Paper**: Background is off-white (`#F4F4F0`) with subtle noise and fiber texture. Not pure white.
2. **The Stamp**: A red (`#C41E3A`) circular or rectangular seal. Text inside: 'VERIFIED', 'PASSED', or 'APPROVED'.
3. **The Interaction**: Drag to position. On release (mouse up), the stamp 'hits' the paper. 
4. **The Ink Effect**: The stamp doesn't appear instantly. It expands slightly (squash) then settles. The edges of the ink are rough, not vector-crisp. Use SVG filters (`feTurbulence` + `feDisplacementMap`) for ink bleed.
5. **Rotation**: The stamp lands at a slight random angle (±5 degrees), never perfectly aligned.

**Deliverable**: Interactive HTML/CSS/SVG component. Focus on the SVG filter for the ink texture.
