# Pressure Gauge Redline Fluctuation

**Intent**: Create a high-fidelity animation of a vintage-style industrial pressure gauge. The focus is on the tension between mechanical precision and danger.

**Visuals**:
- **Subject**: A circular brass-rimmed gauge with a white face and black monospace numerals (0–100).
- **Marker**: A thin, heavy red needle. A fixed red arc marks the 'DANGER' zone (80–100).
- **Background**: Deep charcoal (#1a1a1a) with subtle, out-of-focus piping in the periphery.
- **Lighting**: Harsh, top-down studio light creating a sharp specular highlight on the glass cover.

**Motion Logic**:
1. **Idle**: Needle rests at 45, with microscopic, realistic jitter (0.5px) simulating vibration.
2. **Stress**: Needle accelerates smoothly toward 85. The movement should feel weighted (easing-in), not linear.
3. **Violation**: As the needle crosses 80, it snaps slightly past 90, then oscillates rapidly (damped spring physics) before settling at 85.
4. **Alert**: A faint red glow pulses behind the needle only when above 80.

**Deliverable**: A seamless loop or interactive hover state where the needle responds to cursor proximity as 'pressure'.
