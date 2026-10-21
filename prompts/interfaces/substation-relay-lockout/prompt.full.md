## Concept
IsolatorOS is a specialized interface for high-voltage grid maintenance, designed to prevent accidental execution of critical infrastructure commands. It adopts a strict utility/safety aesthetic, drawing from industrial control panels, hazard signage, and mechanical relay systems. The core philosophy is 'deliberate action,' where digital interactions mimic the physical resistance and confirmation required in real-world safety protocols. The design rejects modern web trends like soft shadows, rounded corners, and pastel colors, favoring high-contrast, hard-edged, and monochromatic elements punctuated by safety colors. The interface is intended for use by trained technicians in controlled environments, where precision and clarity are paramount. The visual language is inspired by mid-century industrial design, with a focus on functionality and durability. The interface should feel like a piece of hardware, not software, with tactile feedback and robust visual indicators.

## Primary task
The sole primary task is to trip a circuit breaker. This is achieved through a two-step physical interaction: 1. Hold the main toggle switch to 'Arm' the system. 2. Release the toggle to 'Trip' the circuit. This mechanic prevents accidental clicks and ensures the user is fully engaged in the dangerous operation. The system must provide continuous feedback during the hold phase, indicating progress toward the armed state. The hold duration required to arm the system is 3 seconds. If the user releases the toggle before 3 seconds, the system resets to IDLE and displays an 'ERROR: HOLD TOO SHORT' message. If the user holds the toggle for 3 seconds, the system enters the ARMED state. Releasing the toggle in the ARMED state triggers the TRIPPED state. The system then remains in the TRIPPED state until the user clicks a 'RESET' button, which returns the system to IDLE. The RESET button is only visible in the TRIPPED state. The primary task is designed to be intuitive yet secure, requiring conscious effort to execute.

## States
- IDLE: System is safe. Status LED blinks slowly (1Hz). Toggle is in the 'Off' position. Background is static. Telemetry data updates normally. Log entries are appended for system checks.
- ARMING: User is holding the toggle. LED blinks rapidly (4Hz). Screen border flashes yellow. A progress bar fills within the toggle button. The progress bar is segmented into 10 blocks, each lighting up as the hold time increases. The border flash frequency increases from 2Hz to 4Hz as the hold time approaches 3 seconds. The toggle switch appears to be 'pressed' down, with a darker border and a slight inward shift.
- ARMED: System is ready to trip. LED is solid yellow. Border is solid yellow. Toggle is held down. The progress bar is fully lit. The system is ready for the release action. The toggle switch is in the 'down' position, with a bright yellow border.
- TRIPPED: Circuit is broken. Red alert state. Status LED is solid red. Error message displayed. Screen shakes briefly. The toggle switch returns to the 'Off' position. The RESET button appears below the toggle. The log entry 'BREAKER OPENED' is appended. The telemetry data shows zero current.
- ERROR: Invalid interaction (e.g., releasing toggle too early). Red flash, reset to IDLE. Error log entry created. The status LED flashes red once. The border flashes red once. The message 'ERROR: HOLD TOO SHORT' is displayed in red text below the toggle. The system returns to IDLE after 2 seconds.

## Palette
- Background: #111111 (Deep Black) - Provides high contrast for warnings.
- Warning/Active: #FFCC00 (Hazard Yellow) - Used for armed states, hazard stripes, and active indicators.
- Critical/Error: #E63946 (Alert Red) - Used for tripped states, errors, and critical alerts.
- Text/Labels: #F4F1EA (Off-White) - Ensures readability against dark backgrounds.
- Borders: #333333 (Dark Gray) - Used for panel outlines.
- Grid Lines: #222222 - Used for the background grid pattern.
- Inactive Text: #666666 - Used for disabled or secondary information.

## Type
- Headers: DIN Condensed Bold. Used for section titles and status indicators. Must be uppercase. Letter-spacing: 0.05em. Font-size: 24px for main headers, 18px for sub-headers.
- Body/Labels: IBM Plex Mono. Used for all data, labels, and instructions. Monospace ensures alignment and a technical feel. Font-size: 14px for labels, 16px for data. Line-height: 1.5 for readability.
- Log Entries: IBM Plex Mono, 12px, color #888888. Timestamps in bold.

## Layout
- Desktop: Single-column focus within a max-width container. The main toggle is centered and prominent. Panels use hairline borders (1px solid #333) instead of cards. Hazard stripes (diagonal black/yellow) used as decorative borders or background elements for warning zones. Dense but calm. No unnecessary whitespace. Information is grouped logically with clear labels. Vertical status rails on sides. The left rail is 200px wide, the right rail is 200px wide, and the main panel is 600px wide. The total width is 1000px, centered in the viewport. The main panel has a padding of 40px. The toggle switch is centered horizontally and vertically within the main panel. The status LED is centered above the toggle. The progress bar is centered below the toggle. The RESET button is centered below the progress bar, hidden by default.
- Mobile: Vertical rails collapse to bottom ticker. Main panel expands. Toggle scales down but remains large enough for touch. Hazard stripes adapt orientation. The main panel takes up 90% of the screen width. The toggle switch is 150px wide and 80px high. The status LED is 20px in diameter. The progress bar is 150px wide. The log ticker is 40px high, scrolling horizontally. The telemetry data is displayed in a single line at the top, with a font-size of 12px. The hazard stripes on the panel borders are 10px thick.

## Motion
- Entrance: Hazard stripes wipe horizontally from left to right, revealing the control panel. Accompanied by a 'clunk' sound cue (if audio is implemented). Duration: 1.5s. The wipe effect uses a clip-path animation. The hazard stripes are implemented as a repeating-linear-gradient background. The wipe reveals the main panel content, including the toggle, LED, and progress bar.
- Ambient: Status LED pulses. 1Hz in IDLE, 4Hz in ARMED. Sharp transitions, no easing on blink. The LED uses a CSS keyframe animation for the blink effect. The opacity transitions from 1 to 0 instantly, then back to 1 after a short delay. The border flash effect uses a CSS animation that changes the border color from #333333 to #FFCC00 and back. The frequency of the flash increases as the hold time approaches the trip threshold.
- Interaction: Toggle switch has visual 'resistance' and 'overshoot' when flipped. Holding the toggle causes the screen border to flash yellow at increasing frequency. Release triggers the trip animation. Screen shake on trip. The toggle switch uses a spring physics simulation for the thumb movement. When pressed, the toggle moves down by 5px. When released, it springs back up with a slight overshoot. The screen shake effect is implemented using a CSS animation that translates the main container by random amounts in the X and Y directions for 300ms. The shake intensity decreases over time.

## Constraints
- No generic dashboard cards.
- No marketing heroes.
- No emoji.
- No soft shadows.
- No purple/blue gradients.
- Must be a single-file HTML/CSS/JS deliverable.
- Must enforce the hold-to-arm mechanic.
- Keyboard accessible (Spacebar).
- No external JS libraries.
- No rounded corners.
- No box-shadows.
- No gradients except hazard stripes.
- Fonts must be loaded via Google Fonts CDN.
- No audio files; use Web Audio API for synthesized clicks if needed.
- No dark mode toggle.
- The code must be self-contained and modular.
- The state machine logic must be separated from the UI rendering logic.
- The CSS must use variables for colors and fonts.
- The JS must handle touch and mouse events uniformly.
- The interface must perform well on low-end devices.
- The hazard stripes must be implemented using CSS repeating-linear-gradient.
- The toggle switch must have a clear visual distinction between pressed and released states.
- The status LED must be at least 20px in diameter.
- The progress bar must be clearly segmented.
- The log entries must be monospaced.
- The telemetry data must update in real-time.
- The interface must be responsive.
- The hazard stripes must be oriented diagonally.
- The overall design must feel robust and reliable.

## Acceptance criteria
- [ ] Interface loads with hazard stripe entrance animation.
- [ ] Toggle requires hold to arm, release to trip.
- [ ] Status LED changes blink rate based on state (1Hz idle, 4Hz armed).
- [ ] Screen border flashes yellow when armed.
- [ ] Tripping the circuit displays a red alert state.
- [ ] Fonts are DIN Condensed Bold and IBM Plex Mono.
- [ ] Colors match the specified palette exactly.
- [ ] No generic UI components (cards, pills, etc.).
- [ ] Single HTML file with embedded CSS/JS.
- [ ] Mobile layout adapts correctly.
- [ ] Keyboard navigation works.
- [ ] No console errors.
- [ ] Hold duration of 3 seconds is enforced.
- [ ] Error state triggers on early release.
- [ ] RESET button appears only in TRIPPED state.
- [ ] Telemetry data updates every 500ms.
- [ ] Log entries include timestamps.
- [ ] Progress bar segments light up sequentially.
- [ ] Screen shake effect triggers on trip.
- [ ] Hazard stripes are diagonal.
- [ ] No rounded corners anywhere.
- [ ] No box-shadows anywhere.
- [ ] Fonts load correctly from CDN.
- [ ] Touch targets are at least 44x44px.
- [ ] Layout is responsive on mobile.
- [ ] State machine transitions are smooth and correct.
- [ ] Visual feedback is clear for each state.
- [ ] Code is well-commented and modular.
- [ ] Performance is optimized for low-end devices.
- [ ] Accessibility is implemented via keyboard.
- [ ] No external libraries are used.
- [ ] The interface feels like a physical control panel.
- [ ] The design is strictly utility/safety infrastructure.
- [ ] The primary task is clearly defined and enforced.
- [ ] The aesthetic is consistent throughout.
- [ ] The layout is dense but calm.
- [ ] The motion design is crisp and mechanical.
- [ ] The colors are high-contrast and readable.
- [ ] The typography is technical and precise.
- [ ] The overall experience is secure and deliberate.
