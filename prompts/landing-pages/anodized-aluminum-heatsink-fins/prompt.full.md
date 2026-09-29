# Thermal Flow — Extended Brief

**Concept:**
'Alpine Cooling' is a premium audio equipment brand that emphasizes silent operation and thermal efficiency. The website must convey the feeling of 'cold power'—high performance without noise or heat buildup. The visual metaphor is the physical heatsink: a dense array of aluminum fins designed to dissipate heat into the air.

**Palette:**
- **Primary:** Matte Aluminum (#c0c0c0 to #888888 gradient for shading).
- **Background:** Cool White (#f5f5f5) to mimic a sterile lab environment.
- **Accent:** Thermal Orange (#ff6b00) used sparingly for 'Active' or 'High Power' states.
- **Text:** Charcoal (#333333) for body, Pure Black (#000000) for headings.

**Type Pairing:**
- **Display:** 'Inter' or 'Helvetica Neue' (Bold, uppercase, tight tracking). Conveys precision engineering.
- **Body:** 'Roboto Mono' or 'Source Code Pro' (Light, wide tracking). Conveys technical data and specs.

**Layout Desktop:**
1. **Hero:** Full-width canvas or high-res image of heatsink fins. The camera angle is low, looking up at the fins to emphasize height and density. 
2. **Interaction:** Mouse movement creates a 'wind field'. Fins near the cursor tilt away slightly (3-5 degrees), easing back with spring physics. 
3. **Content:** Overlay a 'Frosted Glass' panel on the right side containing product name and a single 'Configure' button. 
4. **Features Section:** Three-column grid below the fold. Each feature is illustrated with a simple line diagram of airflow (blue arrows) passing through gray fins.

**Layout Mobile:**
1. **Hero:** Centered image of a single fin cluster. Swipe to rotate the cluster 360 degrees.
2. **Content:** Stacked vertically. The 'frosted glass' effect is replaced by solid white cards with subtle shadows.

**Motion Brief:**
- **Entrance:** Fins rise from the bottom of the screen with a staggered delay (10ms per fin).
- **Ambient:** Subtle, slow breathing of the specular highlights (opacity pulse) to simulate light reflection shifting slightly.
- **Interaction:** Hover triggers the 'wind' tilt. Click triggers a 'heat' pulse (orange glow at the base of the fins that dissipates upwards).

**Constraints Checklist:**
- [ ] No purple or blue neon glows.
- [ ] No heavy drop shadows; use ambient occlusion for depth.
- [ ] Images must be optimized (WebP) to ensure smooth 60fps interaction.
- [ ] Reduced motion preference: Disable wind simulation, show static image.

**Acceptance Criteria:**
The user immediately understands the product is about cooling and precision. The interaction feels tactile and weighty, not floaty. The brand 'Alpine Cooling' feels premium and industrial.
