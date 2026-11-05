Deliverable: single-file HTML/CSS/JS.

Build a high-fidelity instrument panel interface for an electrolysis cell simulation. The visual metaphor is strict industrial precision: no marketing chrome, no decorative gradients, no soft shadows. The background is deep charcoal (#1A1A1A). The primary accent is electric cyan (#00FFFF) representing stable flow, and the alert color is harsh magenta-red (#FF0055) representing pressure imbalance.

Typography must use Barlow Condensed for all labels and headers (uppercase, tracking 0.1em) and JetBrains Mono for all numerical readouts and data values. Do not use Inter, Roboto, or system fonts. Font loading must be optimized to prevent FOUC (Flash of Unstyled Content) by using `font-display: swap` and preloading critical font files.

The core interaction is a 'Current Load' slider. This slider directly controls the velocity of particle simulation. On the left side of the screen, H+ ions (cyan dots) flow rightward. On the right side, OH- ions (cyan dots) flow leftward. They meet at a central vertical line representing the semi-permeable membrane. Implement a canvas-based particle system. Ions should have slight vertical jitter but maintain horizontal momentum based on the slider value. When ions hit the membrane, they bounce or pass through depending on a simulated 'balance' state. If the user sets the load to a value that creates an imbalance (e.g., >80% load without sufficient cooling, or asymmetric input), the membrane line flashes #FF0055, and a 'Pressure Alert' text overlay appears in Barlow Condensed.

Layout: Split the screen into three vertical zones. Left: Input controls (Slider, Voltage Readout). Center: The Canvas Visualization (Membrane + Ions). Right: Output Data (Efficiency %, Temp, Flow Rate). Use hairline borders (#333) to separate zones. No cards. No rounded corners. Sharp, rectangular utility panels. 

Desktop Layout: Fixed 3-column grid (25% / 50% / 25%). Full viewport height (100vh). Ensure the canvas resizes dynamically via ResizeObserver to maintain pixel-perfect rendering on high-DPI displays. 
Mobile Layout: Stack vertically. Controls on top, Canvas in middle (fixed aspect ratio 16:9), Data at bottom. Hide non-essential readouts on small screens to maintain clarity. Ensure touch targets for sliders are at least 44px high for accessibility.

States to implement:
1. Default: Balanced flow, cyan membrane, steady particle velocity. Status shows 'NOMINAL'.
2. Selection: Hovering over the slider shows a tooltip with exact Amps. Focus states must be visible for keyboard navigation (2px solid #00FFFF outline).
3. Empty: If the simulation is paused, particles freeze, and the canvas dims to 50% opacity. Status shows 'IDLE'.
4. Error: If load exceeds 95%, the entire interface shifts to a red-tinted mode, and the 'Pressure Alert' persists until reset. Add a subtle screen shake effect on trigger (CSS keyframes, 200ms duration).

Ensure the particle physics feel weighty but responsive. Use requestAnimationFrame for smooth 60fps rendering. Implement delta-time calculation to ensure consistent speed across different refresh rates. The code must be self-contained in a single HTML file with embedded CSS and JS. No external libraries except Google Fonts for Barlow Condensed and JetBrains Mono. Include aria-labels for all interactive elements. Ensure WCAG AA contrast ratios are met for all text elements against the charcoal background.
