# Substation Relay Status Board

Create a utility interface for 'GridGuard' that simulates a physical electrical substation relay panel.

**Visual Rules:**
- **Background:** Matte charcoal (#1a1a1a) with subtle brushed metal texture.
- **Typography:** Strict monospace (e.g., IBM Plex Mono or similar) in all-caps. No serifs, no rounded sans.
- **Status Colors:** Only three states: Safe (White #f1faee), Warning (Amber #e9c46a), Critical (Red #e63946).
- **Hazard Elements:** Diagonal hazard stripes (black/yellow) appear only on critical alerts, not as decoration.

**Interaction & Motion:**
1. **Relay Click:** When a status changes, animate a small mechanical relay switch flipping with a snap (0.1s ease-out).
2. **LED Matrix:** Status indicators are dot-matrix LEDs. On update, pixels fill row-by-row with a slight flicker.
3. **Alert Pulse:** Critical alerts pulse the red border of the container at 1Hz (subtle, not strobing).

**Deliverable:** A single HTML/CSS/JS component showing 4 relay modules (Grid A, Grid B, Feeder 1, Feeder 2) that update randomly every 3-5 seconds.
