## Concept
**Ink Bleed Circuit** is a spatial logic puzzle where the medium itself is the obstacle. Inspired by industrial printing and capillary action, the player draws conductive paths using liquid ink on a textured paper surface. The ink naturally spreads into the paper fibers, making precise lines difficult. The core tension is between the desire to draw quickly and the risk of over-saturation causing the ink to bleed off-course or into waste zones. The player must strategically 'dry' the ink to lock in successful segments before continuing.

## Core loop
1. **Identify:** Locate Source and Target nodes on the paper.
2. **Draw:** Drag pointer to apply wet ink toward the target.
3. **Monitor:** Watch the ink bleed into the paper grain; adjust path to counteract drift.
4. **Dry:** Press `Spacebar` to freeze current ink state, creating a solid conductive path.
5. **Connect:** Repeat until Source and Target are linked by solid ink.
6. **Score:** Game ends on success (score based on time/ink used) or failure (waste zone touch/time out).

## Input
- **Pointer Down/Move:** Draws wet ink. The speed of drawing affects the volume of ink applied. Fast strokes deposit less ink; slow strokes pool more.
- **Pointer Up:** Stops drawing. Ink continues to bleed passively.
- **Spacebar (or Tap Button):** Triggers 'Dry' action. Converts all wet ink on canvas to solid state immediately. Has a short cooldown (0.5s) to prevent spamming.
- **R Key:** Restarts current level.
- **Touch Support:** On mobile, dragging draws ink. A dedicated 'DRY' button at the bottom center triggers the dry action. Multi-touch is disabled to prevent accidental inputs.

## Fail / win
- **Win Condition:** A continuous path of *solid* ink connects the Source Node (black circle) to the Target Node (black circle). 
- **Fail Condition 1 (Waste Zone):** Any ink (wet or solid) touches the outer 10% margin of the canvas. This represents ink bleeding off the page.
- **Fail Condition 2 (Timeout):** A global timer (e.g., 30 seconds) expires before the connection is made.
- **Fail Condition 3 (Disconnect):** If a solid path is broken by erasing or if the final connection is made with *wet* ink that later bleeds into a waste zone, the run fails.

## Entities
- **Player:** Cursor/Touch point. Emits ink.
- **Source Node:** Fixed circle at random position. Emits a faint pulse.
- **Target Node:** Fixed circle at random position. Emits a faint pulse.
- **Wet Ink:** Dynamic fluid simulation. Color: #e63946 with alpha varying by density. Spreads based on paper texture.
- **Solid Ink:** Static pixels. Color: #e63946 (opaque). Conducts electricity visually (glows slightly when connected).
- **Paper Texture:** Procedural noise map defining fiber direction and density. Affects bleed rate. High density areas resist bleed; low density areas absorb quickly.
- **Waste Zone:** Invisible boundary at canvas edges. Touching it triggers failure.

## Feel
- **Tactile:** The drawing should feel viscous. Use a slight lag or smoothing on the pointer trail to simulate ink flow.
- **Fluid:** The bleeding effect should be organic, not pixelated. Use Gaussian blur or simple diffusion for the wet ink layer.
- **Snap:** The 'Dry' action should feel instant and decisive. Add a subtle 'flash' or 'shimmer' on the solidified ink.
- **Audio:** Optional. Low-frequency hum for wet ink, sharp click for dry, harsh noise for fail.

## Palette
- **Paper:** #f1faee (Off-white, high brightness for contrast)
- **Ink:** #e63946 (Vibrant red, distinct from black)
- **UI/Text:** #1a1a1a (Near-black, industrial)
- **Success:** #2a9d8f (Teal, for connected nodes)

## Type
- **Title/HUD:** Space Grotesk (Bold, geometric, technical feel).
- **Data/Stats:** IBM Plex Mono (Monospaced, for timer and score, reinforcing the industrial/logic theme).

## Layout & Responsiveness
- **Desktop:** Fullscreen canvas. HUD elements (Timer, Level, Score) are positioned absolutely in the top-left corner. The 'Dry' instruction is centered at the bottom. Mouse cursor is a custom crosshair.
- **Mobile:** Canvas fills the viewport. HUD scales down to fit smaller screens. A large, semi-transparent circular 'DRY' button is fixed at the bottom-center of the screen, ensuring a minimum touch target of 44x44 pixels. Touch events prevent default scrolling behavior.
- **Orientation Handling:** The game must support both portrait and landscape modes. On resize or orientation change, the canvas dimensions update, and the procedural paper texture regenerates. Node positions are recalculated to maintain relative spacing within the new bounds.

## Motions & Animations
- **Ink Flow:** Implement linear interpolation (lerp) for the drawing path to ensure smooth curves even at high pointer speeds. 
- **Bleed Animation:** The diffusion simulation should run on a separate tick (e.g., every 3rd frame) to optimize performance. This creates a subtle, pulsing organic spread rather than a constant jitter.
- **Dry Snap:** When the 'Dry' action is triggered, all wet ink pixels instantly convert to solid. Apply a 100ms white flash overlay on the canvas to emphasize the state change.
- **Win State:** Upon successful connection, the solid ink path glows with a teal (#2a9d8f) hue. A light pulse travels from the Source Node to the Target Node along the path, confirming connectivity.
- **Fail State:** If the waste zone is touched, the edges of the canvas flash red (#e63946) with a glitch effect. The screen shakes slightly for 200ms.

## Constraints
- **Single File:** All HTML, CSS, and JS in one file.
- **No Libraries:** Pure Vanilla JS and Canvas 2D API.
- **Performance:** Maintain 60fps. Optimize ink simulation by only updating 'wet' pixels or using a low-res buffer for diffusion.
- **Responsive:** Must work on mobile (touch) and desktop (mouse).
- **No Assets:** Generate paper texture and nodes procedurally.

## Acceptance criteria
- [ ] Game loads with a title screen and 'Start' button.
- [ ] Drawing creates a visible red ink trail.
- [ ] Ink spreads outward from the trail after pointer stops moving.
- [ ] Pressing Spacebar stops the spreading and solidifies the ink.
- [ ] Connecting Source to Target with solid ink triggers a 'Win' state.
- [ ] Touching the screen edge with ink triggers a 'Fail' state.
- [ ] Timer counts down; hitting 0 triggers 'Fail'.
- [ ] 'R' key restarts the level.
- [ ] No console errors.
- [ ] Visuals match the specified palette and typography.
- [ ] Layout adapts correctly to mobile and desktop viewports.
- [ ] Touch controls (drawing and dry button) function correctly on mobile devices.
- [ ] Deliverable is a single-file HTML/CSS/JS.

## Motion
- entrance: Ink drop falls into center of paper texture, rippling outward.
- ambient: Paper fibers subtly absorb static ink residue over time.
- interaction: Dragging cursor creates a wet ink trail that bleeds sideways based on paper grain direction.
