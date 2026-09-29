Build a playable Canvas 2D rhythm-timing game called 'Syncthron Drive'. The core mechanic is mechanical precision: two driver gears rotate at different speeds. The player controls a third 'slider' gear positioned below. The goal is to click (or press Space) to slide the gear up into the mesh exactly when the teeth of the driver gears align with the slider's teeth.

**Visuals & Layout:**
- Background: Deep industrial slate (#2C3E50).
- Gears: Draw using Canvas paths. Driver gears are static in position but rotate. The slider gear moves vertically.
- Teeth: Must be clearly defined polygons. Use #ECF0F1 for gear bodies and #E67E22 for the active engagement zone highlight.
- HUD: Top center shows current Output RPM in large Bungee font. Bottom center shows 'Click to Engage' hint in Space Mono.

**Mechanics:**
1. **Rotation:** Driver Gear A rotates at speed S. Driver Gear B rotates at speed S * 1.5. They are offset by a phase angle.
2. **Alignment:** A 'success window' exists when the angular position of both drivers allows the slider's teeth to mesh without collision. This window is narrow (e.g., 15 degrees).
3. **Input:** On click/space, the slider gear animates upward over 100ms.
4. **Check:** At the moment the slider reaches the mesh point, check the current rotation angle of the drivers.
   - If within window: 'Clunk' sound (synthesized), screen shake (low intensity), slider locks, Output RPM increases by 500. New driver speed increases slightly.
   - If outside window: 'Grind' sound (noise burst), screen shake (high intensity), red flash overlay, Game Over.
5. **Win:** Reach 5000 RPM. Show 'Drive Complete' screen with final score.

**Constraints:**
- Single HTML file. No external assets except Google Fonts (Bungee, Space Mono).
- Use requestAnimationFrame for smooth rotation.
- Implement a simple state machine: 'Menu', 'Playing', 'GameOver', 'Win'.
- Ensure the visual alignment is intuitive; the teeth must look like they are physically interlocking.
- Do not use Inter, Roboto, or Arial. Use Bungee for headers and Space Mono for HUD numbers.
