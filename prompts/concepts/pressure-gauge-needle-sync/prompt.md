# Pressure Gauge Needle Sync

**Concept**: A mechanical control panel with 3 analog pressure gauges. They are not just static; they are physically connected. When one needle hits the red zone, the others react via 'sympathetic vibration' and steam release.

**Visual Rules**:
1. **The Gauges**: Circular, metallic rims (`#B0C4DE` gradient), dark faces (`#333333`). White tick marks. Red zone from 80-100%.
2. **The Needles**: Thin, red (`#FF4500`) or bright white. They should not move smoothly; they should 'twitch' and settle, simulating mechanical inertia and friction.
3. **The Sync**: If Gauge A spikes, Gauge B and C vibrate in sympathy (opposite phase or random jitter).
4. **Steam Effect**: When a gauge enters the red zone, emit a particle steam effect from the top vent of the gauge. The steam should blur the background slightly.
5. **Shake**: On critical pressure (>95%), the entire container div shakes with a high-frequency, low-amplitude tremble.

**Deliverable**: Interactive HTML/JS/CSS component. Use SVG for gauges and Canvas or DOM particles for steam.
