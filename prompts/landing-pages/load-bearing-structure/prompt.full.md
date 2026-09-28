# Load Bearing Structure — Extended

## Concept
This design treats the website as a technical document. It celebrates the beauty of engineering precision. The 'blueprint' motif is not just visual skin; it informs the layout, the grid, and the interactions. Every element feels 'measured' and 'verified.'

## Palette
- **Blueprint:** #003366 (Deep Cyan-Blue) — The standard blueprint background.
- **Ink:** #ffffff (White) — For all primary line work, text, and diagrams.
- **Highlight:** #ff9900 (Safety Orange) — Used for emphasis, active states, and critical data points. Provides high contrast against blue.
- **Annotation:** #e0e0e0 (Light Grey) for secondary text and non-critical lines.

## Typography
- **Body:** 'Helvetica Neue' (Regular/Light). Neutral, clean, doesn't distract from the diagrams.
- **Annotations:** 'Consolas' or 'Courier New' (Monospace). Small, precise, technical.
- **Headings:** 'Helvetica Neue' (Bold/Uppercase). Strong, structural.

## Layout Structure
1. **Hero:** A large, animated SVG diagram of a steel truss. White lines draw themselves on load. Key joints are marked with orange dots. Text overlays the diagram with a 'measured' spacing feel.
2. **Projects Grid:** Thumbnails are line-art drawings of buildings/structures. 
   - *Default:* White lines on blue.
   - *Hover:* Background darkens; specific structural elements (e.g., load-bearing walls) glow orange. Annotations appear (e.g., "Tensile Strength: 500MPa").
3. **Process:** A timeline represented as a horizontal beam with 'load' markers for each phase.

## Motion Brief
- **Entrance:** The hero diagram 'draws' itself (stroke animation) over 2 seconds. Annotations fade in sequentially.
- **Interaction:** Hovering a project card triggers a 'highlight' effect where the load-bearing elements turn orange. A tooltip appears with technical specs in monospace.
- **Scroll:** Smooth, mechanical scrolling. No bouncy or elastic effects. Sections align to a strict grid.

## Constraints
- No gradients or shadows. Use line weight and color contrast for hierarchy.
- Diagrams must be scalable SVGs.
- Typography must be crisp and legible at small sizes.
- Mobile: Diagrams simplify; annotations hide behind 'tap-to-reveal' interactions.

## Acceptance Criteria
- The design communicates precision and expertise.
- The blueprint aesthetic is modern, not dated.
- Interactions feel like manipulating a technical tool.
