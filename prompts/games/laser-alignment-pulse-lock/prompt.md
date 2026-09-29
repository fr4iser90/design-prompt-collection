Build a single-file HTML5 Canvas 2D game titled "Laser Alignment Pulse Lock". The visual style is high-contrast sci-fi minimalism: pure black background (#000000), white UI text, and neon cyan (#00FFFF) or magenta (#FF00FF) for active energy. 

**Core Mechanic:** The player controls a fixed laser emitter at the bottom center. A crystal lattice floats at the top center. The lattice vibrates horizontally and changes opacity/color intensity based on a sine wave (the "resonance pulse"). The player must click (Left Mouse) to fire a laser beam. 

**Timing Logic:** 
1. Calculate the lattice's current phase `t` using `Math.sin(time * frequency)`. 
2. The "Lock Zone" is when the sine value is between -0.1 and 0.1 (center of the wave). 
3. If the click occurs while in the Lock Zone: The laser beam turns solid white, passes through the crystal, and the crystal stabilizes (turns green/solid). Score +1. 
4. If the click occurs outside the Lock Zone: The laser beam turns red, hits the side of the crystal, and triggers a "Shatter" state. 

**Game Loop:** 
- Start with 3 lives. 
- Each successful lock increases the lattice's vibration frequency (speed) for the next round. 
- Game Over when lives reach 0. 
- Win condition: Successfully stabilize 5 crystals in a row. 

**Visuals & Juice:** 
- **Lattice:** Draw as a geometric hexagon or diamond shape. Animate its scale slightly with the pulse. 
- **Laser:** Draw a line from bottom to top. If successful, animate a "chromatic aberration" effect (offset cyan/red channels) for 200ms. 
- **Fail:** If missed, shake the canvas slightly and explode the crystal into small white triangles. 
- **HUD:** Top left: "LIVES: 3", "SCORE: 0", "LEVEL: 1". Use Space Mono font. 

**Technical Constraints:** 
- Use `requestAnimationFrame` for the game loop. 
- Handle mouse clicks via `addEventListener('mousedown')`. 
- No external assets. All graphics drawn via Canvas API. 
- Ensure the timing window feels fair but tight (approx 100-150ms window at start, shrinking as speed increases). 
- Reset game state on "Game Over" screen click. 
- Code must be self-contained in one HTML file with embedded CSS and JS.
