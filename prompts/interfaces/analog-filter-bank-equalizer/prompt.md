Build a single-page, high-precision audio equalizer interface using HTML, CSS, and JavaScript (Canvas2D for the curve). The design must evoke high-end studio hardware: stark, mechanical, and utilitarian. No marketing chrome, no glassmorphism, no rounded corners on panels. The background is deep black (#121212). The primary UI is a horizontal 'Resonance Rail' spanning the viewport width, positioned in the lower half. Above it sits the 'Oscilloscope' area: a dark panel (#181818) with a hairline grid (#333333). The frequency response curve is drawn in bright white (#FFFFFF) with a subtle glow. 

**Typography:** Use 'Space Mono' for all labels, frequency markers, and the brand 'SonicShape' in the top-left chrome. Use 'JetBrains Mono' for any numerical data readouts. Font sizes must be small, precise, and monospaced. 

**Controls:** The 'Resonance Rail' contains 5 interactive 'Capacitor Dials'. These are not standard sliders. They are circular, metallic-looking knobs (using CSS gradients or simple SVG) that sit on the rail. 
- **Default State:** Dials are dark grey (#444) with a white indicator line. 
- **Active/Selected State:** When a dial is clicked or dragged, it glows with the analog amber accent (#D4AF37). The glow should be a box-shadow with a slight blur, simulating a lit indicator. 
- **Empty State:** The curve is flat. No dials are active. 
- **Error State:** If a filter value exceeds a safe threshold (simulated), the dial flashes red (#FF3333) and the curve segment turns red.

**Interaction:** 
1. **Drag:** Clicking and dragging a dial horizontally moves it along the rail. This changes the center frequency of that band. 
2. **Curve Update:** As the dial moves, the white curve in the Oscilloscope updates in real-time. The curve should look like a smooth, organic wave, not a jagged line. Use Catmull-Rom splines or bezier curves for smoothness. 
3. **Ripple Effect:** When dragging, add a subtle 'ripple' or wave distortion to the curve near the dial's position to simulate physical resonance. 
4. **Snapping:** If a dial comes within 5px of a standard EQ frequency (e.g., 100Hz, 1kHz, 10kHz), it snaps to it. Trigger a visual 'click' effect: a vertical white line flashes briefly at that frequency, and the dial's glow pulses.

**Visual Details:** 
- The Oscilloscope area should have a faint, animated noise texture overlay (CSS opacity or canvas pixel manipulation) to simulate analog signal noise. 
- The 'SonicShape' brand is small, top-left, white text. 
- No shadows on panels. Use hairline borders (#333) to separate sections. 
- The entire interface should feel 'cold' and 'precise' until interacted with, then 'warm' (amber glow). 

**Technical Constraints:** 
- Use Canvas2D for the curve rendering. 
- Use CSS variables for colors. 
- Ensure the curve redraws efficiently on requestAnimationFrame. 
- No external libraries for the core logic; vanilla JS preferred for the canvas logic. 
- The layout is fixed height for the oscilloscope, flexible for the rail. 
- Mobile responsiveness: The rail should allow horizontal scroll if necessary, but the curve must scale. 

**Acceptance:** 
- [ ] Curve draws on load (left-to-right animation). 
- [ ] Dials glow amber on drag. 
- [ ] Curve updates smoothly with drag. 
- [ ] Snap effect triggers vertical line flash. 
- [ ] Typography is strictly Space Mono/JetBrains Mono. 
- [ ] No purple, no glassmorphism, no rounded buttons.

**Layout Specifics:**
- **Desktop:** Full viewport width. Top chrome 50px. Oscilloscope takes remaining height minus rail. Rail height 120px. 
- **Mobile:** Chrome 40px. Oscilloscope min-height 300px. Rail scrolls horizontally if screen < 600px. Dials remain 40px diameter. 
- **Grid:** Oscilloscope grid lines every 100px. Frequency markers at 20Hz, 100Hz, 1kHz, 10kHz, 20kHz.

**Motions:**
- **Load:** Curve sweeps left to right (1.5s). 
- **Idle:** Subtle 1px vertical noise jitter on curve. 
- **Drag:** Immediate curve update. Ripple wave propagates 200ms. 
- **Snap:** Vertical line flash 200ms. Dial glow pulse 300ms.

**Constraints:**
- No external JS libs. 
- Single file HTML/CSS/JS. 
- High contrast only. 
- No rounded panels.

**Deliverable:** single-file HTML/CSS/JS.
