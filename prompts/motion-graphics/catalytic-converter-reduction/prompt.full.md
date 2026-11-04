## Concept
"The Honeycomb Reduction" is a 8-second looping motion graphics explainer for the fictional automotive emissions brand **FlowCore**. The piece visualizes the invisible chemical process of a catalytic converter, focusing on the mechanical precision of the honeycomb lattice. Unlike generic "green earth" animations, this brief emphasizes the industrial, chemical reality: toxic molecules (NOx, CO) entering a structured grid and being forcibly reduced to clean gases (N2, CO2) through catalyst interaction. The tone is urgent, precise, and satisfyingly rhythmic.

## Beat Sheet
**Total Duration:** 8.0 seconds (Looping)
**Aspect Ratio:** 16:9 (1920x1080 logical resolution)

1.  **0.0s – 2.0s: The Problem (Toxic Rush)**
    *   **Visual:** Dark void. A dense stream of jagged, red (#FF3366) particles labeled "NOx" and "CO" rushes from the left edge toward the center. The particles move with slight turbulence (sine-wave jitter).
    *   **Structure:** The central honeycomb lattice is dark (#121212 with subtle #333 borders), appearing inert and cold.
    *   **Text:** Bottom-left corner, Syne Bold: "TOXIC INPUT". Small IBM Plex Mono label: "NOx / CO".
    *   **Motion:** Linear acceleration of particles toward the grid.

2.  **2.0s – 5.0s: The Mechanism (Catalytic Snap)**
    *   **Visual:** Particles collide with the front face of the honeycomb. As they enter specific hexagonal cells, "Catalyst Nodes" (small circles at hex centers) flash bright white, then transition to Neon Green (#00FF9D).
    *   **Action:** The red particles visually "split." The main body of the particle changes color from Red to Green. A smaller red dot (representing Oxygen) detaches and fades out rapidly into the background. This "split" should be a sharp, 0.2s scale-down and fade, mimicking a bond break.
    *   **Text:** Center-top, IBM Plex Mono: "CATALYTIC REDUCTION". 
    *   **Motion:** Rhythmic pulsing of the catalyst nodes. The flow speed of particles slows slightly as they navigate the "maze" of the honeycomb, then accelerates upon exit.

3.  **5.0s – 8.0s: The Payoff (Clean Exit)**
    *   **Visual:** The now-green (#00FF9D) particles exit the right side of the honeycomb at high velocity. They are labeled "N2" and "CO2".
    *   **Structure:** The honeycomb retains a steady, low-intensity green ambient glow, indicating active efficiency.
    *   **Text:** Bottom-right corner, Syne Bold: "CLEAN OUTPUT". Small IBM Plex Mono label: "N2 / CO2".
    *   **Motion:** High-speed linear exit. The background remains dark to maximize contrast.
    *   **Loop:** At 8.0s, the screen clears or fades to black instantly, resetting to 0.0s state.

## Poster Frame
**Timestamp:** 1.5s
**Description:** The frame captures the "Toxic Rush" phase. The red particles are mid-flight, clearly visible against the dark background. The honeycomb structure is fully defined but unlit. The text "TOXIC INPUT" is fully opaque and legible in the bottom-left. The composition is balanced, with the honeycomb centered and the red stream creating a diagonal leading line from left to center. This frame must be visually striking and readable as a static thumbnail.

## Palette
*   **Background/Inert Metal:** `#121212` (Deep Charcoal) - Used for the void and the unlit honeycomb structure.
*   **Active/Clean:** `#00FF9D` (Neon Green) - Used for clean gases (N2, CO2), active catalyst nodes, and the "Payoff" phase.
*   **Toxic/High-Energy:** `#FF3366` (Hot Pink/Red) - Used for toxic inputs (NOx, CO), bond breaks, and the "Problem" phase.
*   **Text/Labels:** `#FFFFFF` (White) for primary text, `#888888` (Grey) for secondary data labels.

## Type
*   **Display:** **Syne** (Bold/ExtraBold). Used for "TOXIC INPUT", "CLEAN OUTPUT", and the brand name "FlowCore" if included. Syne's geometric, slightly quirky character fits the "industrial-modern" vibe.
*   **Body/Data:** **IBM Plex Mono**. Used for chemical formulas (NOx, CO2), timing markers, and technical labels. The monospace font reinforces the "engineering/data" aesthetic.
*   **Constraint:** Do not use Inter, Roboto, Arial, or system-ui fonts.

## Frame
*   **Resolution:** 1920x1080 (16:9).
*   **Safe Zones:** Keep all critical text and the central honeycomb structure within the central 80% of the frame to avoid cropping issues on mobile/social.
*   **Depth:** Use CSS `perspective` or Canvas 2D scaling to create a sense of depth. The honeycomb should appear to recede into the distance, with particles scaling down as they enter the "back" of the grid and scaling up as they exit the "front" (or vice versa, depending on camera angle—prefer a slight top-down angle for clarity).

## Motion
*   **Particle Physics:** Simple linear interpolation (lerp) for position. Add a sine-wave offset to Y-position to simulate gas turbulence. Velocity should vary: fast entry, slow interaction, fast exit.
*   **Catalyst Pulse:** Use a sharp `scale` transform (1.0 -> 1.5 -> 1.0) and `opacity` flash (0.0 -> 1.0 -> 0.8) for the catalyst nodes. This should feel like a "snap" or "pop," not a slow fade.
*   **Color Transition:** The transition from Red to Green for particles should be immediate upon "bond break," not a gradient blend. This emphasizes the chemical change.
*   **Looping:** The animation must loop seamlessly. Ensure the final frame (8.0s) matches the initial state (0.0s) or includes a quick fade-to-black transition if needed.

## Constraints
*   **Deliverable:** Single-file HTML/CSS/JS.
*   **No External Libraries:** Do not use GSAP, Three.js, or React. Use vanilla JS, CSS animations, or Canvas 2D API.
*   **Performance:** Optimize for 60fps. Limit particle count to ~50-100 active particles to maintain performance on mid-range devices.
*   **Accessibility:** Implement `prefers-reduced-motion` media query. When active, pause the animation at the 4.0s mark (mid-mechanism) and display a static poster frame with all text visible.
*   **No AI Clichés:** Avoid purple glows, blurry backgrounds, or generic "eco-friendly" leaf motifs. Stick to the industrial/chemical theme.

## Acceptance criteria
*   [ ] **File Structure:** Single HTML file containing all CSS and JS.
*   [ ] **Timing:** Animation loops exactly every 8.0 seconds.
*   [ ] **Poster Frame:** At 1.5s, the text "TOXIC INPUT" is fully visible and legible. The honeycomb structure is clearly defined.
*   [ ] **Color Accuracy:** Uses ONLY #121212, #00FF9D, #FF3366, and white/grey for text. No other colors.
*   [ ] **Typography:** Uses Syne for display text and IBM Plex Mono for data labels. No system fonts.
*   [ ] **Motion Quality:** Particle movement is smooth (60fps). Catalyst "snap" is distinct and rhythmic.
*   [ ] **Reduced Motion:** `prefers-reduced-motion` pauses the animation at 4.0s and displays a static, readable frame.
*   [ ] **Visual Clarity:** The distinction between "Toxic" (Red) and "Clean" (Green) is immediate and obvious.
*   [ ] **No Clutter:** No unnecessary UI elements, buttons, or navigation. Pure motion graphics.

## Type pairing
Syne + IBM Plex Mono
