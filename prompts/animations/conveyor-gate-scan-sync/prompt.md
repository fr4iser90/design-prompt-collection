# Conveyor Gate Scan Sync

Create a looped animation of a package barcode being scanned on a logistics conveyor.

**Visuals:**
- Center: A 3D-style (isometric) cardboard box (`#D2B48C` or simplified gray `#888`) with a white label and black barcode.
- Overlay: A horizontal green laser line (`#00FF41`) that moves vertically across the barcode.
- UI Panel: To the right, a monospace text display showing "SCANNING..." then "ID: 8842-X [CONFIRMED]".
- Background: Dark industrial gray (`#333333`) with faint conveyor belt textures.

**Motion:**
1. **Cycle:** 
   - Box slides in from left.
   - Green laser scans top-to-bottom (0.5s).
   - Laser flashes bright white for 1 frame upon completion.
   - Text updates from "SCANNING..." to "CONFIRMED" with a snap effect.
   - Box slides out to right.
2. **Sound Design (Visualized):** A small waveform bar next to the text pulses during the scan.
3. **Timing:** 2-second total loop. Precise, robotic timing.

**Constraints:**
- The green must be phosphor green (#00FF41), glowing slightly.
- The box movement should have constant velocity (no easing) to mimic a motorized belt.
- Text font must be monospaced.
