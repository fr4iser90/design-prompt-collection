# Tunnel Ventilation Baffle

Create an interactive simulation of a tunnel ventilation baffle for 'AeroTunnel'.

**Visual Rules:**
- **Background:** Deep tunnel black (#0d0d0d) with a subtle grid perspective floor.
- **Baffles:** Brushed steel rectangles (#333333) with sharp edges. No rounded corners.
- **Airflow:** Represented by thin, fast-moving cyan lines (#00f2ea) that behave like particles.

**Interaction & Motion:**
1. **Airflow Generation:** Cyan lines flow horizontally across the screen. Speed is constant.
2. **Baffle Rotation:** The user can drag a slider or rotate a control to change the baffle angle (0° to 90°).
3. **Deflection:** As airflow hits the baffle, the lines deflect based on the angle. 
   - At 0° (parallel): Lines pass through quickly.
   - At 45°: Lines deflect sharply downward/upward.
   - At 90° (perpendicular): Lines hit and dissipate/scatter (turbulence).
4. **Tension:** Add a visual "stress" indicator on the baffle hinge. If deflection is high (90°), the hinge glows faint red (#ff0055) to indicate mechanical stress.

**Deliverable:** A single HTML/Canvas or SVG animation showing the baffle and airflow. Interactive slider for angle.
