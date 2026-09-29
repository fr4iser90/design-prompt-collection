## Concept
Create a weather interface that rejects the sterile, vector-based aesthetic of modern weather apps. The core concept is 'Mono no Aware'—the pathos of things—where data is not displayed but *experienced* through the material degradation of the interface itself. The UI is a physical artifact (paper, wood, ink) that reacts to the weather conditions it reports. Rain makes it wet and heavy; sun bleaches it and cracks it; humidity makes the ink bleed. This creates a visceral, tactile connection to the meteorological data.

## Primary task
Display current weather conditions and a 24-hour forecast for a selected location (default: Kyoto) using a reactive material design system. The user must be able to interpret temperature, precipitation, humidity, and UV index through visual texture changes and spatial layout, not just numerical readouts. The interface must remain functional and readable despite the heavy textural overlays.

## States
1.  **Default (Clear/Calm):** Paper is crisp `#F0F0EA`, ink is sharp `#5B4F46`, wood is dry. No blurring. 
2.  **Rainy:** Background paper darkens slightly. Ink edges soften/bleed. Wood grain becomes glossy/darker. Rain icons are 'stamped' with water-damaged edges. 
3.  **Humid (>80%):** Text glyphs exhibit a 'bleed' effect (SVG displacement filter). Paper texture appears damp. 
4.  **Sunny/High UV:** Ink colors fade/bleach towards white. Paper background develops 'sun cracks' (jagged white lines). 
5.  **Empty State:** If no location is selected, the interface shows a blank, folded piece of paper with a prompt in Kosugi Maru: 'Choose a place to unfold.' 
6.  **Error State:** If data fails to load, the paper 'tears' down the middle, revealing a dark void behind it with the error message in stark white.

## Palette
-   **Background (Paper):** `#F0F0EA` (Washi White) - Base layer, changes tone based on moisture.
-   **Ink/Text:** `#5B4F46` (Sumi Ink) - Primary data color, fades with UV.
-   **Accent (Seal/Alert):** `#8C1944` (Vermilion) - Used for extreme weather alerts or selected states, applied as a 'stamp' texture.
-   **Wood/Structure:** `#3A322C` (Dark Cedar) - Sidebar background, becomes darker/glossier when wet.
-   **Void/Error:** `#1A1A1A` - Background behind torn paper.

## Type
-   **Display:** 'Kaisei Decol' (Google Fonts). Use for all numerical data (Temp, mm/h, %). Weight: Regular. Style: Should appear stamped or brushed on. Use `mix-blend-mode: multiply` to interact with paper texture.
-   **Body/UI:** 'Kosugi Maru' (Google Fonts). Use for labels (Humidity, Pressure), location names, and instructions. Weight: Regular. Rounded, gentle, legible.
-   **Hierarchy:** Temperature is the largest element (6rem+). Condition icons are large but secondary to temp. Labels are small (0.875rem) and muted.

## Layout
-   **Chrome:** Minimal. No top navigation bar. Brand 'Mono no Aware' is small, top-left. 
-   **Main Canvas:** A large central rectangle representing a sheet of paper. 
    -   **Top Zone:** Current Temp (Left), Condition Icon (Right). 
    -   **Middle Zone:** The 24-hour timeline. This is a horizontal strip of 'paper'. Each hour is a segment. The visual state of each segment reflects that hour's weather (bleached, torn, wet, curled). 
    -   **Bottom Zone:** Detailed metrics for the selected hour (if any) or current day summary. Styled as footnotes.
-   **Sidebar:** Fixed right panel (width: 200px). Dark wood texture. Contains secondary data (Wind, Pressure) in vertical text or stacked small blocks. This panel acts as the 'frame' for the paper.
-   **Control Panel:** A small, discreet toggle at the bottom-center to switch between 'Live Data' and 'Simulation Mode'. In Simulation Mode, sliders allow manual control of Rain, UV, Humidity to demonstrate texture changes.

## Motion
-   **Entrance:** Elements do not slide in. They 'soak in'. Opacity fades from 0 to 1 over 1.5s with a slight blur that clears up, mimicking ink drying on paper. 
-   **Ambient (Humidity):** If humidity > 80%, apply a continuous, very slow, subtle 'wobble' to the text-shadow or a low-frequency SVG turbulence filter to simulate ink spreading in moisture. 
-   **Interaction (Curl):** Hovering over a timeline segment causes it to rotateX(-5deg) and lift (translateY(-4px)) with a soft shadow, revealing the wood texture behind the 'paper' segment. 
-   **Transition (Weather Change):** When switching from Clear to Rain, the transition should take 1s. The paper darkens, the ink blurs, and the wood glosses up simultaneously. 

## Constraints
-   **No Vector Cleanliness:** Icons must be irregular, hand-drawn SVGs. 
-   **No Glassmorphism:** Do not use backdrop-blur for cards. Use paper textures. 
-   **Readability:** Despite the decay effects, text must meet WCAG AA contrast ratios. If 'bleaching' reduces contrast, add a subtle white text-shadow or darken the paper background locally.
-   **Performance:** Use CSS transforms and filters for effects. Avoid heavy JavaScript-driven canvas rendering for the static textures; use SVG patterns or CSS `background-image` with data URIs for noise.
-   **Single Task:** Do not include search bars, settings, or maps. Just the weather data and the material response.

## Acceptance criteria
-   [ ] Interface displays Temperature, Humidity, Precipitation, and UV Index for a default location.
-   [ ] 'Kaisei Decol' and 'Kosugi Maru' fonts are loaded and applied correctly.
-   [ ] Background texture is visible and not a solid color.
-   [ ] **Rain Simulation:** When rain is simulated, the paper background darkens and ink edges blur/bleed.
-   [ ] **Sun Simulation:** When UV is simulated, text opacity decreases and 'crack' patterns appear in the background.
-   [ ] **Humidity Simulation:** When humidity > 80%, a displacement/blur effect is visible on text.
-   [ ] **Interaction:** Hovering over a timeline segment causes a 'curl' effect (3D rotation).
-   [ ] **Wood Panel:** Sidebar has a wood texture that changes gloss/darkness based on precipitation.
-   [ ] **Icons:** Weather icons are hand-drawn style SVGs, not standard lucide/heroicons.
-   [ ] **No Purple/Glow:** No purple gradients, no neon glows, no standard SaaS aesthetics.
-   [ ] **Responsive:** Layout collapses gracefully on mobile (sidebar moves to bottom or becomes a header strip).
-   [ ] **Code:** Single HTML file with React/Tailwind/Framer Motion via CDN. No build step required.
