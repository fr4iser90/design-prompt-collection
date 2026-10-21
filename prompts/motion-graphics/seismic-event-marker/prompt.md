Create a single HTML file containing a 16:9 motion-graphics timeline sequence (8s loop) for 'TerraSense Monitoring'. The aesthetic is utility/safety infrastructure: high contrast, precise, scientific, no decorative noise. Background is pure black (#000000). The primary visual element is a horizontal seismograph trace line drawn in white (#FFFFFF) across the center of the screen. 

**Typography Constraints:**
- Display/Labels: Use 'Gotham Condensed' (or a close alternative like 'Barlow Condensed' if Gotham is unavailable via CDN, but specify Gotham first). All caps, bold weight for status labels. Color: White (#FFFFFF) or Orange (#FF6600) for critical alerts.
- Data/Technical: Use 'Menlo' (or 'Courier New' as fallback) for timestamps, coordinates, and magnitude numbers. Monospaced, regular weight. Color: Grey (#808080) or White.
- NEVER use Inter, Roboto, Arial, Helvetica, or system-ui.

**Beat Sheet (8s Loop):**
1. **0.0s–2.0s (Monitoring):** The seismograph line is flat and stable. A blinking cursor or subtle pulse on the line indicates active recording. Text label 'MONITORING ACTIVE' appears in the top-left corner in Gotham Condensed, white, small size. Timestamp ticks in Menlo grey in the bottom-right.
2. **2.0s–4.0s (P-Wave):** A sharp, high-frequency, low-amplitude spike travels from left to right along the trace. As the spike passes the center, the text 'P-WAVE DETECTED' flashes briefly in orange (#FF6600) near the spike. The line returns to near-flat but with residual jitter.
3. **4.0s–6.0s (S-Wave):** A large, rolling, high-amplitude wave arrives from the left, significantly disrupting the flat line. The wave oscillates violently. Text 'S-WAVE INCOMING' appears in large orange Gotham Condensed letters, slightly offset from the wave peak. The background grid lines (faint grey #333333) may subtly shift to imply ground movement, but do NOT shake the entire viewport.
4. **6.0s–8.0s (Marker & Magnitude):** At the peak of the S-wave, an orange pin marker (#FF6600) drops from the top of the screen to the exact peak coordinate. Simultaneously, a large magnitude readout 'MAG 5.2' appears in the center-right in Menlo, white, large size. The trace stabilizes to a lower amplitude. The loop resets seamlessly at 8.0s.

**Visual Details:**
- The seismograph line should be drawn using SVG path or Canvas. If Canvas, ensure crisp rendering at high DPI.
- Include a faint horizontal grid (3 lines) behind the trace in #333333 to establish the baseline.
- The 'Pin' is a simple geometric shape: an inverted triangle or circle with a stem, filled #FF6600, stroke #FFFFFF.
- No shadows, no glows, no gradients. Flat, sharp, industrial.

**Interaction:**
- Clicking anywhere on the screen during the loop resets the animation to 0.0s immediately.
- Hovering over the trace does not trigger effects; the motion is purely time-based.

**Reduced Motion:**
- If `prefers-reduced-motion` is active, display the static poster frame: the trace at the S-wave peak with the marker and 'MAG 5.2' visible. No animation.
