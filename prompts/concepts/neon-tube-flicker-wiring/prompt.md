# Neon Tube Flicker Wiring

**Concept**: Typography as illuminated neon tubing. Letters are defined by their outline (the glass tube). Light 'flows' through the tube to fill the letter shape. Imperfections like flickering and wiring delays add realism.

**Visual Rules**:
1.  **Base State**: Dark night background. Letters are dim, grey outlines (unlit glass).
2.  **Ignition**: When activated, a bright core color (pink/cyan) fills the letter from a specific start point (e.g., left to right).
3.  **Flicker**: Random, brief dropouts in brightness for specific letters to simulate a faulty transformer.
4.  **Glow**: Strong `text-shadow` or `box-shadow` to create the atmospheric neon glow. The glow should bleed onto the background.
5.  **Wiring**: Optional thin, dark lines connecting letters to suggest the electrical circuit.

**Deliverable**: HTML/CSS/JS demo. Use SVG paths for the letters to allow stroke-dasharray animation for the 'filling' effect. Use JS for random flicker logic.
