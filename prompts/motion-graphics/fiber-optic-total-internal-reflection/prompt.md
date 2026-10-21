Build a 16:9 motion-graphics timeline (6s loop) visualizing Total Internal Reflection in fiber optics for brand 'LumenCore'.

**Visual Style:**
High-contrast technical diagram. Background #000000. Fiber core is a horizontal band (height 120px) centered vertically, filled with #00E5FF at 10% opacity, bordered by #FFFFFF 2px lines. Cladding is the outer region, subtly darker or transparent. Light beam is a solid #00E5FF line with a #7C4DFF glow shadow (blur 10px).

**Typography:**
Use 'Syne' (Bold/ExtraBold) for title cards and labels. Use 'Space Mono' for technical data (angle, signal strength). NEVER use Inter, Roboto, Arial, or system-ui. Text must be crisp, white (#FFFFFF) or cyan (#00E5FF).

**Timeline Beats (6s Loop):**
0.0–1.0s (Setup): Fiber core unspools from left to right. Title 'LIGHT GUIDING PRINCIPLES' fades in top-left using Syne. A light beam enters from the left edge at a 45-degree angle relative to the normal.
1.0–3.0s (Mechanism): The beam hits the top cladding boundary. It reflects perfectly (angle of incidence = angle of reflection). It zig-zags down to the bottom boundary, then up again. The path is a continuous polyline. Label 'CORE' and 'CLADDING' appear near the boundaries using Space Mono. Highlight the 'Critical Angle' concept with a dashed line and label if space permits.
3.0–4.5s (Payoff): The beam exits the right edge. A 'Signal Strength: 100%' badge appears in Syne. The beam intensity remains constant.
4.5–6.0s (Hold/Reset): The diagram holds static for 1.5s. Then, the beam fades out, and the fiber retracts slightly to prepare for the loop restart.

**Interaction:**
Implement a drag interaction on the fiber core. If the user drags the right side of the fiber down/up to create a sharp bend (>42 degrees curvature), the light beam must 'leak' out of the core at the bend point. The leaked light should fade to transparent #7C4DFF. The 'Signal Strength' badge should drop to <100% and turn red (#FF0055) during leakage. On release, the fiber springs back to straight, and signal restores to 100%.

**Technical Constraints:**
Single HTML file. Use CSS for layout and basic animations. Use SVG or Canvas for the light path and fiber geometry to ensure crisp lines. Use requestAnimationFrame for the interaction loop. Ensure the poster frame at 1.5s shows the beam mid-bounce with clear labels. No external JS libraries. No purple-glow SaaS aesthetics; keep it technical and precise.
