# Hydraulic Relay Lockout

Create a high-fidelity UI animation of a mechanical safety lock engaging. 

**Visuals:**
- Central element: A matte silver cylindrical relay pin sliding into a bright red (`#D90429`) housing.
- Background: Deep charcoal (`#1A1A1A`) with faint, blurred technical grid lines.
- Typography: Monospace, all-caps, white text: "ENGAGE RELAY".
- Status Indicator: A small LED light above the mechanism.

**Motion & Physics:**
1. **Approach:** The silver pin slides in from the right with slight overshoot (spring damping).
2. **Lock:** As it hits the housing, it compresses slightly (squash effect) and snaps into place with a distinct `click` audio cue.
3. **Feedback:** Immediately after the snap, the LED shifts from dim amber to bright solid green.
4. **Rest:** The mechanism holds still, with a very subtle ambient vibration (0.5px) to imply live voltage.

**Constraints:**
- No gradients on the metal; use flat shading with hard highlights.
- Motion must feel heavy and precise, not floaty.
