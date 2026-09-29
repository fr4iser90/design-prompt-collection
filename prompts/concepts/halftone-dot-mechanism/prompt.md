# Halftone Dot Mechanism

Build an interactive editorial layout where the primary visual is a black-and-white photo rendered entirely as a dynamic halftone screen. 

**Visual Rules:**
- Base background: `#f4f4f0` (newsprint white).
- Typography: Heavy grotesque sans-serif (e.g., Helvetica Now Display or similar) in `#1a1a1a`.
- The image is not a static bitmap but a grid of circles. 
- **Interaction:** Hovering over a headline rotates the halftone angle of the adjacent image section from 15° to 45° and increases the dot size (simulating 'dot gain').
- **Motion:** Smooth transition on rotation (300ms ease-out). 
- Include visible 'crop marks' and 'registration marks' in `#ff3366` (spot color) at the corners of the image area.
