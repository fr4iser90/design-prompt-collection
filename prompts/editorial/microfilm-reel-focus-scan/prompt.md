Build a single-file HTML/CSS/JS editorial experience titled 'Microfilm Reel Focus' for the brand 'Archivum'. The core mechanic is a scroll-driven optical focus system that simulates reading a 16mm microfilm reel. The user must scroll to bring text into a fixed central 'focus gate' to read it; outside this zone, text is heavily blurred and distorted, mimicking the depth-of-field limitations of a microfilm reader.

**Visual Identity & Palette:**
Use a strict high-contrast palette: Background #0A0A0A (deep black), Text/Ink #F5F5F0 (off-white film stock), and Accent #88CCEE (cyan scanner light). Do not use gradients, shadows, or soft UI elements. The aesthetic is industrial, mechanical, and archival. Avoid 'old paper' textures; use digital noise/grain to simulate film emulsion.

**Typography:**
Load Google Fonts: 'Space Grotesk' for all UI elements, headers, and metadata (bold, uppercase, tracking-wide). Load 'Courier Prime' for the body text (regular weight, monospaced, legible). The body text must feel like typewritten archival records. Ensure high contrast between the cyan accent and the black background for interactive elements.

**Layout Structure:**
1. **Header:** Fixed top bar with 'ARCHIVUM' logo in Space Grotesk (left) and a 'REEL 01' indicator (right) in cyan. A thin cyan line separates the header from the content.
2. **The Reader Viewport:** The main content area is a full-viewport-height container. Inside, a vertical strip of text (the 'film') scrolls vertically. 
3. **The Focus Gate:** A fixed, centered horizontal band (approx. 20% of viewport height) that remains stationary while the text scrolls behind it. This band has a subtle cyan border and a slight inner glow (box-shadow: inset 0 0 10px #88CCEE). 
4. **Sprocket Rails:** On the left and right edges of the text strip, render vertical columns of square sprocket holes (black squares with white borders) that move with the text, reinforcing the film reel metaphor.

**Core Interaction (The Focus Mechanic):**
- Implement a scroll listener that calculates the distance of each text block from the center of the viewport.
- Apply dynamic CSS filters to text blocks based on this distance:
  - **Center (Focus Gate):** `filter: blur(0px) contrast(1.2) brightness(1.1)`. Text is sharp and bright.
  - **Near Center:** `filter: blur(2px) contrast(1.0) brightness(0.9)`. Slightly soft.
  - **Far from Center:** `filter: blur(8px) contrast(0.8) brightness(0.7)`. Heavily blurred and dimmed.
- Use `transition: filter 0.1s linear` for smooth snapping.
- The text content should be long-form editorial (e.g., 'The History of Analog Storage', 'Index of Lost Data'). Break it into distinct paragraphs or 'frames' separated by horizontal cyan lines (simulating film frame breaks).

**Ambient Effects:**
- **Grain Overlay:** Create a fixed, full-screen div with a repeating SVG noise pattern or CSS radial-gradient noise. Set `opacity: 0.05` and `pointer-events: none`. Animate its `background-position` randomly every 100ms to simulate film grain flicker.
- **Jitter:** Occasionally (every 3-5 seconds), apply a brief `transform: translateX(2px)` or `translateY(1px)` to the entire text container for 100ms to simulate mechanical jitter of the reel.
- **Scanline:** Add a subtle horizontal scanline effect using a repeating linear gradient over the focus gate area, moving slowly downwards.

**Deliverable:** single-file HTML/CSS/JS. No external libraries except Google Fonts. Ensure performance is optimized by using `will-change: filter, transform` on animated elements. The experience must feel like operating a physical machine: precise, slightly noisy, and requiring user effort to 'focus' on the information.
