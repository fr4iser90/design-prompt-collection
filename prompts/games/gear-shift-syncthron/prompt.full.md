## Concept
Syncthron Drive is a high-precision mechanical timing game. The player acts as a transmission engineer, manually engaging a sliding gear into a rotating dual-driver system. The fantasy is tactile mechanical satisfaction: the 'clunk' of a perfect shift versus the 'grind' of a failed engagement. The visual metaphor is physical alignment, not abstract musical notes.

## Core loop
1. Observe two driver gears rotating at different speeds.
2. Wait for the teeth to align with the stationary slider gear's position.
3. Click/Space to engage the slider.
4. If timed correctly, the gear locks, RPM increases, and difficulty ramps up.
5. If timed incorrectly, the gear grinds, causing immediate failure.
6. Repeat until 5000 RPM is reached or failure occurs.

## Input
- **Pointer Click / Spacebar:** Initiates the engagement sequence. The slider gear moves up to meet the drivers.
- **No other inputs.** The game is purely reactive to timing.

## Fail / win
- **Fail:** Clicking when the driver gears' teeth are not aligned with the slider's teeth. This results in a 'Grind' state: red screen flash, high-intensity shake, and a transition to the Game Over screen.
- **Win:** Successfully engaging the gear 10 times (or reaching 5000 RPM). Transitions to a 'Drive Complete' victory screen showing final RPM and time.
- **Score:** Final RPM achieved. Higher RPMs require tighter timing windows.

## Entities
1. **Driver Gear A:** Rotates clockwise at base speed. Visual: Steel gray (#ECF0F1) with dark outlines.
2. **Driver Gear B:** Rotates counter-clockwise at 1.5x base speed. Visual: Steel gray with orange accents.
3. **Slider Gear:** Starts at bottom. Moves up on input. Visual: Distinctive orange (#E67E22) body to indicate player control.
4. **Output Shaft:** Visual indicator at the center/top showing RPM via a spinning needle or digital readout.
5. **Particles:** Small sparks on successful engagement; debris on failure.

## Feel
- **Audio:** Use Web Audio API. Success = low-frequency 'thud' + metallic 'click'. Failure = white noise burst + low rumble.
- **Visual Juice:** 
  - **Success:** Screen shake (2px, 100ms), orange glow pulse on the engaged gear, RPM counter ticks up with a bounce.
  - **Failure:** Screen shake (10px, 300ms), red vignette flash, gears stop spinning abruptly.
  - **Ambient:** Subtle rotation blur on high-speed gears. The 'engagement window' should be visually hinted by a faint orange glow on the driver teeth when they are close to alignment.

## Palette
- **Background:** #2C3E50 (Deep Industrial Slate)
- **Primary Gear/Text:** #ECF0F1 (Cloud White)
- **Accent/Player:** #E67E22 (Carrot Orange)
- **Fail/Alert:** #C0392B (Pomegranate Red)

## Type
- **Display:** 'Bungee' for Title and 'Game Over'/'Win' states. Bold, blocky, mechanical.
- **Body/HUD:** 'Space Mono' for RPM counter, instructions, and scores. Monospaced for numerical stability.
- **Constraint:** Do not use Inter, Roboto, Arial, or system-ui.

## Constraints
- **Tech:** Single HTML file. Canvas 2D context.
- **Performance:** 60fps target. Optimize gear drawing (cache paths if possible, but simple polygon math is fine).
- **Responsiveness:** Canvas should scale to fit window while maintaining aspect ratio.
- **Code Structure:** Clean separation of Game Loop, Input Handling, and Rendering.

## Acceptance criteria
1. [ ] Game loads with a 'Start' screen using Bungee font.
2. [ ] Two driver gears rotate continuously at different speeds.
3. [ ] Clicking/Space moves the slider gear up.
4. [ ] If clicked during misalignment, game ends with red flash and 'Grind' message.
5. [ ] If clicked during alignment, RPM increases and game continues.
6. [ ] Difficulty increases (speed up) after each successful engagement.
7. [ ] Win condition triggers at 5000 RPM.
8. [ ] No external images; all graphics drawn via Canvas API.
9. [ ] Fonts are loaded from Google Fonts CDN (Bungee, Space Mono).
10. [ ] Screen shake and color flashes occur on success/fail.

## Type pairing
Bungee + Space Mono


## Motion
- entrance: Gears spin up from zero RPM with easing.
- ambient: Continuous rotation; engagement window pulses with orange glow.
- interaction: Click slides gear in; success locks with vibration/shake, failure triggers red grind flash.
