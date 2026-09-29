# Tunnel Ventilation Baffle — Extended

## Concept
This concept visualizes the invisible force of air pressure against a physical barrier. It is a study in resistance and flow. The aesthetic is cold, clinical, and high-contrast. The "warning" aspect is the potential for mechanical failure under high stress.

## Palette
- **Void (#0d0d0d):** The tunnel space. Not pure black, but deep enough to make the cyan pop.
- **Steel (#333333):** The baffles. Use a gradient to simulate brushed metal reflection.
- **Airflow Cyan (#00f2ea):** High-energy, electric blue-green. Represents clean, forced air.
- **Stress Red (#ff0055):** Used only for the hinge glow when under load.

## Typography
- **Labels:** Roboto Condensed or similar narrow sans-serif. White, small, all-caps.
- **Data:** Monospace for angle and velocity values. Cyan.

## Layout
- **Full Screen:** The simulation takes up the majority of the viewport.
- **Control Panel:** A fixed bar at the bottom or side. Minimalist. Contains the angle slider and velocity readout.
- **Perspective:** Use CSS 3D transforms or Canvas projection to give the baffles depth. They should look like they are in a long tunnel.

## Motion Brief
1. **Ambient Airflow:** Particles spawn on the left and move right. They have slight vertical jitter to look like turbulent air.
2. **Baffle Interaction:**
   - **Rotation:** The baffle rotates around a central hinge axis. The rotation is smooth (eased).
   - **Collision:** Particles hitting the baffle change velocity vector. 
     - *Glancing hit:* Speed increases, angle changes slightly.
     - *Direct hit:* Speed decreases, particle scatters (random angle change), and opacity fades.
   - **Turbulence:** When particles scatter, add a small "vortex" effect (swirling motion) for a few frames.
3. **Stress Indicator:** The hinge is a small circle. As the angle approaches 90°, the circle's shadow/glow transitions from transparent to cyan to red. This should be a smooth interpolation, not a binary switch.

## Constraints Checklist
- [ ] No blurry, foggy effects. The air is represented by lines, not clouds.
- [ ] The baffle must look solid. It should obscure particles behind it.
- [ ] No soft UI elements. All controls should be sharp, rectangular, and industrial.
- [ ] Performance: Limit particle count to maintain 60fps.

## Acceptance Criteria
- The relationship between baffle angle and airflow deflection is immediately understandable.
- The visual weight of the baffle feels substantial.
- The stress indicator effectively communicates the "cost" of blocking the air.
