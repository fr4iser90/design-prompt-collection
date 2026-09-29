Build a high-end editorial reading experience for 'Atmosphere Quarterly' using a 'Barometric Essay' metaphor. The core mechanic is a fixed, sticky analog pressure gauge (SVG/Canvas) that acts as the primary progress indicator, replacing standard scroll bars. 

**Visual Identity & Palette:**
- Background: Deep atmospheric dark `#001219` (near-black teal). This must feel like deep ocean or high-altitude night, not generic black.
- Primary Ink/Text: `#94D2BD` (Mint/Pale Cyan). Use this for body text to maintain high contrast but avoid harsh white-on-black glare.
- Accent/Alert: `#FFB703` (Amber/Safety Yellow). Use sparingly for the gauge needle, red-zone markers, and critical data points.
- Typography: Display font is `Space Grotesk` (monospace-esque, technical, industrial) for headers, gauge labels, and UI chrome. Body font is `Source Serif Pro` (classic, readable) for the essay content. Do NOT use Inter, Roboto, or system-ui.

**Layout Structure:**
- The layout is a single-column long-form essay centered on the screen.
- **The Gauge:** A fixed-position SVG gauge in the top-right corner (desktop) or top-center (mobile). It features a semi-circular arc (180 degrees). 
  - Scale: 0 to 100 PSI. 
  - Zones: Green (0-40), Yellow (40-70), Red (70-100).
  - Needle: A thin, sharp line in `#FFB703` with a pivot point.
  - Tick marks: Precise, hairline strokes in `#94D2BD` (low opacity) for minor ticks, solid for major ticks.
- **Content Flow:** Standard editorial spacing (max-width 65ch for readability). Use large drop caps for the first letter of the essay. 
- **Pull Quotes:** Styled as 'Data Logs' or 'Pressure Readings'. Use `Space Grotesk`, larger size, and a left border in `#FFB703`.

**Mechanics & Interaction:**
1. **Scroll-Driven Pressure:** Map the document scroll percentage (0-100%) to the gauge needle rotation (-90deg to +90deg). 
2. **Narrative Tension (The 'Storm'):** As scroll progress increases, subtly adjust the CSS variables for the text body:
   - Increase font-weight of body text slightly (e.g., from 400 to 500).
   - Reduce letter-spacing (tighten tracking) to simulate 'compression' or 'pressure'.
   - Shift text color from `#94D2BD` towards a slightly brighter/whiter tone as intensity peaks, or add a subtle `text-shadow` glow in `#FFB703` for high-intensity sections.
3. **Pull-Quote Spike:** When the user hovers over a pull-quote, the gauge needle must instantly snap/jump to the 'Red Zone' (70-100 PSI) with a spring animation, then return to its scroll-based position when hover ends. This creates a 'spike' in perceived tension.
4. **Ambient Effect:** Implement a subtle canvas overlay at the edges of the viewport that simulates 'hissing air' or 'static noise' using low-opacity, fast-moving particles or noise textures. Intensity of this noise should correlate with the gauge pressure (higher pressure = more noise/visibility).

**Technical Constraints:**
- Use `requestAnimationFrame` for smooth needle movement with inertia/easing. Do not use linear mapping; add a slight 'lag' or 'bounce' to the needle to mimic a physical analog instrument.
- Ensure the gauge SVG is scalable and crisp on Retina displays.
- Responsive: On mobile, the gauge becomes smaller and moves to the top center, fixed over the header. The ambient noise effect should be disabled or minimized on mobile to save battery/performance.
- Accessibility: Provide a `prefers-reduced-motion` fallback that disables the needle animation and ambient noise, showing a static progress bar instead.
- Code Structure: Single HTML file with embedded CSS and JS. Use vanilla JS for scroll tracking and SVG manipulation.
- No external libraries except Google Fonts for Space Grotesk and Source Serif Pro.

**Content Placeholder:**
- Title: 'The Thermodynamics of Silence'
- Byline: 'By Dr. Aris Thorne'
- Body: Lorem ipsum paragraphs that discuss climate systems, using technical metaphors. Include 3 distinct pull quotes marked with `blockquote` tags.
- Footer: 'Atmosphere Quarterly • Issue 42 • Pressure Log'
