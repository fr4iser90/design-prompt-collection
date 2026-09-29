# Fermentation Clock Timer — Extended Brief

## Concept
Fermentation is an invisible process made visible through time and bubbles. This concept leverages that visibility to create a compelling hero section. Instead of static images of jars, we use a dynamic, real-time visualization of a fermenting jar. The bubbles are not just decorative; they are a data visualization of the 'liveness' of the culture. This conveys the brand's focus on science, patience, and living food.

## Palette
- **Base:** `#1A1A1A` (Near Black) – Evokes the dark interior of a fermentation chamber.
- **Accent 1:** `#FFBF00` (Amber) – Bubbles, highlights, active states.
- **Accent 2:** `#333333` (Dark Gray) – Container outlines, secondary text.
- **Neutral:** `#F5F5F5` (Off-White) – Main text.

## Typography
- **Display:** *Space Mono* or *Courier Prime*. Monospace for data/timer.
- **Body:** *Inter* or *Helvetica*. Clean, readable.
- **Rule:** The timer should look like a lab instrument, not a playful clock.

## Layout & Structure
- **Hero:** Centered 'jar' element. 
    - The jar is an SVG or CSS shape with a glass effect.
    - Inside, bubbles rise continuously.
    - Overlaid on the jar: A digital timer (e.g., "Day 3, Hour 14") that counts up in real-time.
    - Text to the left/right: "Patience is an ingredient." + CTA.
- **Features Section:** Grid of features, each with a small bubble animation that triggers on hover.
- **Product Section:** Simple cards. Each card has a 'start' button that, when clicked, 'starts' a small jar animation on the card.

## Motion Brief
- **Entrance:** The jar fades in, then bubbles start rising.
- **Ambient:** Continuous bubble rise. Bubbles should have slight randomness in speed and path.
- **Interaction:** Hovering over the jar increases the bubble speed slightly (simulating 'agitation' or 'heat').

## Constraints
- No cartoonish yeast faces.
- The bubbles must look natural, not like video game particles.
- The timer must be legible against the dark background.

## Acceptance Criteria
- The bubble animation must be smooth and performant (use Canvas or requestAnimationFrame).
- The 'living' feel of the animation must be subtle, not distracting.
- The brand feels scientific, patient, and artisanal.
