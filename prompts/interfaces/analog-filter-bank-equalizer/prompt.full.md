## Concept
An 'Analog Filter Bank Equalizer' interface for audio post-production. The metaphor is physical rack-mounted studio gear: precise, tactile, and devoid of digital fluff. The user interacts with a 'Resonance Rail' of capacitor dials to shape a live frequency response curve displayed in an oscilloscope-style viewport. The aesthetic is high-contrast, industrial, and minimal, relying on stark black, white, and analog amber (#D4AF37) to convey precision and warmth.

## Primary task
The user's primary task is to carve a specific notch or boost in the frequency spectrum by dragging 'Capacitor Dials' along a horizontal rail. This interaction must feel physical and immediate, with the frequency curve responding in real-time with smooth, organic motion and subtle noise simulation.

## States
- **Default:** The interface is static. The curve is flat (0dB). Dials are idle (dark grey #444). 
- **Hover:** Dials slightly brighten. The cursor changes to a 'grab' icon. 
- **Active/Drag:** The dial glows amber (#D4AF37). The curve updates live. A 'ripple' effect distorts the curve near the dial. 
- **Snap:** When a dial aligns with a standard frequency (e.g., 1kHz), it snaps. A vertical white line flashes at that position. 
- **Empty:** No filters active. Flat curve. 
- **Error:** If a filter is set to an extreme value (simulated), the dial flashes red (#FF3333) and the curve segment turns red. 

## Palette
- **Background:** #121212 (Deep Black) 
- **Panel/Oscilloscope:** #181818 (Dark Grey) 
- **Grid/Hairlines:** #333333 (Medium Grey) 
- **Ink/Curve:** #FFFFFF (Pure White) 
- **Accent/Active:** #D4AF37 (Analog Amber) 
- **Error:** #FF3333 (Red) 

## Type
- **Display/Labels:** 'Space Mono' (Google Fonts). Use for the brand 'SonicShape', frequency markers (Hz), and section labels. Weight: 400 or 700. Size: 12px-16px. 
- **Body/Data:** 'JetBrains Mono' (Google Fonts). Use for numerical readouts (e.g., dB values, frequency values). Weight: 400. Size: 10px-14px. 
- **Rule:** No system fonts. No Inter/Roboto. All text must be monospaced to reinforce the 'engineering' aesthetic.

## Layout
- **Viewport:** Full screen, fixed height for the oscilloscope (60% of viewport height), flexible for the rail (40%). 
- **Chrome:** Top bar (50px height) with 'SonicShape' wordmark (left) and a 'Bypass' toggle (right). Hairline bottom border. 
- **Oscilloscope:** Main area. Dark background (#181818). Faint grid lines (#333333) every 100px horizontally and vertically. 
- **Resonance Rail:** Bottom area. A horizontal track with 5 dials. The track itself is a thin line (#333). Dials are circular (40px diameter). 
- **Density:** High density of information, but low visual clutter. Use whitespace and hairlines to separate. No cards, no rounded containers. 
- **Desktop Layout:** The top chrome is fixed at 50px. The oscilloscope canvas fills the remaining vertical space above the 120px high rail. The rail is centered horizontally. 
- **Mobile Layout:** On screens narrower than 768px, the rail becomes horizontally scrollable if the 5 dials do not fit with adequate padding. The oscilloscope canvas scales to fit the width. The top chrome reduces to 40px. 

## Motion
- **Entrance:** On load, the frequency curve draws itself from left to right over 1.5 seconds, like an oscilloscope sweep. It settles into a flat line. 
- **Ambient:** The curve has a subtle 'breathing' effect (1-2px vertical noise) when idle, simulating analog signal noise. 
- **Interaction:** 
  - **Drag:** The curve updates instantly. A 'ripple' distortion wave propagates from the dial's position along the curve. 
  - **Snap:** When snapping, the dial's glow pulses once. A vertical white line flashes at the snap position for 200ms. 
  - **Release:** The dial's glow fades back to dark grey over 300ms if not selected.

## Constraints
- **No Glassmorphism:** No backdrop-filter, no blur on panels. 
- **No Rounded Corners:** All panels are rectangular. Only dials are circular. 
- **No Shadows:** Use borders and color contrast for depth. No drop-shadows on text or panels. 
- **No Marketing:** No hero sections, no CTAs, no 'Features' lists. This is a tool. 
- **Canvas Performance:** The curve must redraw at 60fps. Use `requestAnimationFrame`. Optimize the noise generation (pre-render noise texture if necessary). 
- **Responsiveness:** On mobile, the rail allows horizontal scroll. The oscilloscope scales to fit width. 
- **Technical:** Vanilla JS only. No external libraries. Single file deliverable. 
- **Accessibility:** High contrast ratios. Keyboard navigation for dials (arrow keys to move frequency). 

## Acceptance criteria
- [ ] The interface loads with the curve animating left-to-right. 
- [ ] The 'SonicShape' brand is visible in Space Mono. 
- [ ] There are exactly 5 dials on the rail. 
- [ ] Dragging a dial updates the curve in real-time. 
- [ ] The curve is smooth (bezier/spline), not jagged. 
- [ ] Dials glow amber (#D4AF37) when active. 
- [ ] Snapping triggers a vertical white line flash. 
- [ ] The background is #121212. The curve is #FFFFFF. 
- [ ] No purple colors are used. 
- [ ] No rounded buttons or cards are present. 
- [ ] The 'Bypass' toggle works (flattens the curve). 
- [ ] The interface feels 'cold' and 'precise' (monospaced, high contrast). 
- [ ] Mobile layout allows horizontal scrolling of the rail if needed. 
- [ ] Error state flashes red correctly. 
- [ ] Deliverable is a single-file HTML/CSS/JS.

## Type pairing
Space Mono (Display/Labels) + JetBrains Mono (Body/Data)
