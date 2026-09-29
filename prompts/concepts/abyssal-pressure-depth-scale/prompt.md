# Abyssal Pressure Depth Scale

Create a vertical scrolling interface representing ocean depth (0m to 10,000m).

**Visual Rules:**
1. **Background:** Gradient from surface cyan (#005f73) to abyssal black (#001219). As user scrolls down, background darkens and light refraction caustics fade.
2. **UI Compression:** Text and container boxes must visually 'compress' vertically (scaleY < 1) and slightly blur as 'depth' increases, simulating pressure. At 10,000m, elements are nearly crushed but remain legible.
3. **Glass Material:** All UI cards are made of thick, distorted glass (refraction index high). Edges should catch a faint, distant bioluminescent glow (#0a9396).
4. **Data Overlay:** Display real-time simulated depth, pressure (bar), and temperature. Use monospace font (IBM Plex Mono) for data, crisp sans-serif for labels.

**Deliverable:** A single-page HTML/CSS/JS scroll-driven experience.
