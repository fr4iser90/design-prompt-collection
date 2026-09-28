# Hazard Tape Peel Reveal

**Concept**: A 'danger' overlay made of realistic yellow/black diagonal hazard tape that physically peels back to reveal the 'safe' content beneath. 

**Visual Rules**:
1. **The Overlay**: Diagonal stripes (#FFD700 / #000000), 45-degree angle. Add subtle noise/grain to the yellow to simulate vinyl texture.
2. **The Peel**: Triggered by mouse drag or click. The tape doesn't just disappear; it curls. Use SVG masks or CSS `clip-path` combined with 3D transforms (`rotateX`) to simulate the curling corner.
3. **Adhesive Effect**: As it peels, a thin, slightly transparent glue line remains on the background for a second before fading.
4. **Typography**: The text under the tape is clean, white, sans-serif (e.g., IBM Plex Sans). The tape itself has stamped text: 'DANGER', 'HIGH VOLTAGE', or 'DO NOT ENTER' in monospace.
5. **Physics**: The peel should have 'snap-back' tension. If you release the drag mid-way, it should try to snap back to flat unless past 50%.

**Deliverable**: A single HTML file with the interactive peel component. No external libraries if possible; use CSS transforms and JS for drag logic.
