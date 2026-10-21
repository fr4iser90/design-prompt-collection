## Concept
A broadcast-style timeline sequence for 'TerraSense Monitoring', an earthquake early warning system. The design language is 'Signal Warning': utility, safety, infrastructure. It avoids cliché screen-shaking effects in favor of precise data visualization. The core mechanic is the progression of seismic waves (P then S) leading to a definitive magnitude marker. The aesthetic is stark, high-contrast, and scientific, utilizing a black background, white trace, and orange alerts.

## Beat sheet
**Duration:** 8.0 seconds (looping)
**Aspect Ratio:** 16:9

1.  **0.0s – 2.0s: Monitoring State**
    *   **Visual:** A horizontal white line (#FFFFFF) spans the center of the black canvas. It is perfectly flat, representing no seismic activity. A faint grey grid (#333333) sits behind it. A small blinking cursor or pulse travels along the line to indicate 'live' status.
    *   **Text:** Top-left: 'MONITORING ACTIVE' in Gotham Condensed, White, 14px, uppercase. Bottom-right: Timestamp in Menlo, Grey (#808080), 12px, updating every 100ms.
    *   **Motion:** Linear progression of the recording head.

2.  **2.0s – 4.0s: P-Wave Arrival**
    *   **Visual:** A sharp, high-frequency, low-amplitude spike enters from the left and travels right. It looks like a jagged 'V' or 'W' shape. As it passes the center, the line jitters slightly but remains mostly stable.
    *   **Text:** Center-left: 'P-WAVE DETECTED' flashes in Orange (#FF6600), Gotham Condensed, 18px, uppercase. Fades out after 0.5s.
    *   **Motion:** The wave travels at constant speed. The spike is sharp and abrupt.

3.  **4.0s – 6.0s: S-Wave Arrival**
    *   **Visual:** A large, rolling, high-amplitude wave enters from the left. This is the destructive wave. The line oscillates violently up and down. The amplitude is 3x the P-wave.
    *   **Text:** Center-right: 'S-WAVE INCOMING' in large Orange (#FF6600), Gotham Condensed, 24px, uppercase. Stays visible until the marker drops.
    *   **Motion:** The wave is slower than the P-wave but larger. The oscillation is smooth but intense.

4.  **6.0s – 8.0s: Marker & Magnitude**
    *   **Visual:** At the peak of the S-wave, an orange pin marker (#FF6600) drops from the top of the screen to the exact peak coordinate. The trace amplitude begins to decay.
    *   **Text:** Center-right: 'MAG 5.2' appears in Menlo, White, 48px, bold. Location coordinates appear below it in Menlo, Grey, 14px.
    *   **Motion:** The pin drops with ease-in-out. The text fades in. The loop resets at 8.0s.

## Poster frame
**Time:** ~6.5s
**Visual:** The seismograph trace is at its highest amplitude (S-wave peak). The orange pin marker is anchored at the peak. The text 'MAG 5.2' is clearly visible in white Menlo font to the right of the pin. The background is black. The grid lines are faint. The composition is balanced with the pin slightly left of center and the text right of center.

## Palette
-   **Background:** #000000 (Pure Black)
-   **Trace/Grid:** #FFFFFF (White) for main line, #333333 (Dark Grey) for grid lines.
-   **Alerts/Marker:** #FF6600 (Safety Orange) for P/S wave alerts and the epicenter pin.
-   **Secondary Text:** #808080 (Medium Grey) for timestamps and coordinates.
-   **Primary Text:** #FFFFFF (White) for main labels and magnitude.

## Type
-   **Display/Labels:** 'Gotham Condensed' (or 'Barlow Condensed'). Uppercase, Bold. Used for status messages ('MONITORING ACTIVE', 'P-WAVE DETECTED').
-   **Data/Technical:** 'Menlo' (or 'Courier New'). Monospaced. Used for timestamps, coordinates, and magnitude numbers ('MAG 5.2').
-   **Constraint:** Never use Inter, Roboto, Arial, Helvetica, or system-ui.

## Frame
-   **Canvas:** 1920x1080 (16:9).
-   **Layout:** Minimalist. The seismograph line is the hero element, centered vertically. Text elements are anchored to corners or near the wave peaks. No borders, no UI chrome other than the data itself.
-   **Grid:** 3 horizontal grid lines at 25%, 50%, 75% height, color #333333, 1px stroke.

## Motion
-   **Trace Drawing:** Use SVG `stroke-dasharray` or Canvas `beginPath`/`lineTo` to animate the line drawing from left to right.
-   **Wave Generation:** Procedurally generate the P-wave (sharp, high freq) and S-wave (smooth, low freq, high amp) using sine/cosine functions or predefined path data.
-   **Marker Drop:** CSS `transform: translateY` with `cubic-bezier(0.25, 0.1, 0.25, 1)` for a realistic drop.
-   **Text Fade:** CSS `opacity` transitions for text appearance.
-   **Loop:** Reset all states at 8.0s. Ensure seamless transition from end to start.

## Constraints
-   **No Screen Shake:** Do not shake the entire viewport. Only the trace line should move.
-   **No Glow/Shadows:** Flat design only. No box-shadows, text-shadows, or blur filters.
-   **Performance:** Use `requestAnimationFrame` for Canvas or CSS animations for SVG. Keep FPS > 60.
-   **Accessibility:** Ensure high contrast between text and background. Provide `prefers-reduced-motion` fallback.

## Acceptance criteria
-   [ ] 8s loop duration is accurate.
-   [ ] P-wave and S-wave are visually distinct (sharp vs. rolling).
-   [ ] Marker drops precisely at the S-wave peak.
-   [ ] 'MAG 5.2' is legible and uses Menlo font.
-   [ ] No forbidden fonts (Inter, Roboto, Arial, system-ui) are used.
-   [ ] Background is pure black (#000000).
-   [ ] Poster frame at ~6.5s matches the description.
-   [ ] Clicking resets the animation.
-   [ ] Reduced motion shows static poster frame.
