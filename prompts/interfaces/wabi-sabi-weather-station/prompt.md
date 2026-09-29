Build a single-page React weather station interface titled 'Mono no Aware' that visualizes meteorological data through material decay rather than standard charts. The primary task is to display current conditions (temperature, humidity, precipitation, UV index) for a specific location (default: Kyoto) while rendering the UI elements as if they are physical objects being acted upon by those very conditions. 

**Visual Language & Texture System:**
The background is not flat. It is a procedural `#F0F0EA` (Washi Paper) texture. 
1. **Humidity Effect:** If humidity > 80%, apply a CSS `filter: blur()` that increases slightly on text edges and simulate 'ink bleed' by expanding the text-shadow or using an SVG displacement map on the typography. The paper texture should appear damp (slightly darker #E0E0DA tint). 
2. **UV/Sun Effect:** If UV index > 5, the `#5B4F46` (Sumi Ink) text must appear 'bleached'—reduce opacity and shift hue towards a warm gray. The background paper should show 'sun cracks' (thin, jagged white lines) generated via SVG noise. 
3. **Rain Effect:** If precipitation > 0mm, the wood-grain texture (visible in the sidebar or headers) must appear wet (higher contrast, darker #3A322C) and glossy. 

**Typography:**
Use 'Kaisei Decol' for all data values (large, heavy, serif-like but rough). Use 'Kosugi Maru' for labels and secondary info (rounded, gentle). 
- Data values are not just numbers; they are 'stamped' onto the screen. Use `mix-blend-mode: multiply` to ensure they interact with the background texture. 
- Reject clean vector icons. Use hand-drawn, irregular SVG paths for sun, cloud, rain, wind. These icons must show 'water damage' (faded edges) if rain is present.

**Layout Structure:**
- **Header:** Left-aligned brand 'Mono no Aware' in small Kosugi Maru. Right-aligned current date and location. 
- **Main View (The 'Sheet'):** A large central area representing a single sheet of paper. 
  - Top-left: Current Temperature (huge, Kaisei Decol). 
  - Top-right: Condition Icon (hand-drawn, stamped). 
  - Center: A horizontal timeline of the next 24 hours. Instead of a line chart, this is a 'strip' of paper. Each hour is a segment. 
    - If an hour has rain, that segment of the paper strip is torn or stained. 
    - If an hour is sunny, that segment is bleached white. 
    - If an hour is windy, the paper edge of that segment curls up (CSS 3D transform).
- **Sidebar (The 'Wood'):** A narrow vertical panel on the right. Background is dark wood grain (#5B4F46 with texture). Displays secondary metrics (Pressure, Wind Speed) in white/cream text. This panel represents the 'house' protecting the paper. 

**Interactions:**
- **Hover:** When hovering over an hour segment on the timeline, the paper texture under the cursor 'curls' slightly (rotateX) and the data value pops out (translateZ). The wood panel highlights the corresponding hour. 
- **Click:** Selecting an hour freezes the 'decay' effect for that moment and shows a detailed tooltip styled like a folded note (with a shadow indicating thickness). 

**Technical Constraints:**
- Use Tailwind CSS for layout. 
- Use Framer Motion for the curling/bleaching animations. 
- Use SVG filters for the ink bleed and paper texture. 
- No purple gradients, no glassmorphism, no standard Material Design cards. 
- The 'decay' must be reactive to mock data changes. Include a 'Simulate Weather' control (hidden in footer or small toggle) to manually trigger Rain, Sun, Humidity, and Calm states to demonstrate the texture changes. 
- Ensure accessibility: Text must remain readable even when 'bleached' (add a subtle dark backing if opacity drops below 0.6). 
- Single file HTML/React implementation.
