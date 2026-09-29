# Conveyor Gate Scan Sync — Extended

## Concept
This animation captures the rhythmic efficiency of automated logistics. It focuses on the synchronization between physical movement (the box) and digital verification (the scan). The aesthetic is "terminal green" meets "warehouse gray," creating a tense but orderly utility interface. Perfect for dashboards showing real-time throughput.

## Palette
- **Phosphor Green:** `#00FF41` (Laser and active text)
- **Belt Gray:** `#333333` (Background)
- **Box Brown/Gray:** `#998877` (Desaturated cardboard)
- **Label White:** `#F0F0F0`
- **Error Red:** `#FF3333` (Unused in happy path, but part of system)

## Typography
- **Font:** `Courier New` or `Space Mono`.
- **Style:** Uppercase, bold weight for IDs, regular for labels.
- **Color:** White for static labels, Green for status.

## Layout
- **Desktop:** Split screen. Left 60% is the 3D box scan. Right 40% is the data readout panel.
- **Mobile:** Stacked. Box on top, data readout below. Laser scan remains prominent.

## Motion Brief
1. **Entrance:** Box enters from X: -100% to X: 0% over 0.5s. Linear easing.
2. **Scan:** 
   - Green line moves Y: 0% to Y: 100% over 0.4s.
   - **Effect:** As the line passes the barcode bars, the bars should appear to "light up" or invert color briefly.
   - **Flash:** At the end of the scan, a white flash overlay on the box (opacity 0.8 -> 0) simulates the camera shutter.
3. **Data Update:** 
   - Text "SCANNING..." blinks off.
   - Text "ID: [RANDOM] CONFIRMED" slides in from right with a `steps(4)` easing for a digital tick feel.
4. **Exit:** Box slides out to X: 100% over 0.5s.
5. **Loop:** Reset after 0.2s pause.

## Constraints
- **Glow:** Use `box-shadow: 0 0 10px #00FF41` for the laser, but keep it subtle.
- **Precision:** The timing between the flash and the text update must be exact to feel synchronized.
- **Texture:** Add a subtle noise overlay to the background to simulate industrial dust.

## Acceptance Criteria
- The scan feels fast and efficient.
- The green glow is distinct against the dark background.
- The loop is seamless and hypnotic.
