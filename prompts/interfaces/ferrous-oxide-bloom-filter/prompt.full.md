## Concept
Verdigris OS is a metaphorical environmental monitoring tool where data is treated as physical material buried under time. The interface simulates a copper plate that naturally oxidizes (turns green/matte) when left alone. The user's primary task is 'excavation'—using interaction to polish away the oxidation and reveal the crisp, white data lines beneath. This transforms passive viewing into active, tactile discovery. The aesthetic rejects flat 'eco-green' clichés in favor of a realistic chemical reaction simulation.

## Primary task
The user's goal is to inspect historical environmental data points. 
1. **Locate:** The user sees a mostly oxidized canvas. 
2. **Excavate:** The user moves the cursor (or scrubs the timeline) to 'polish' the surface, revealing data lines. 
3. **Inspect:** The user clicks a revealed data point to lock the view and open a detailed metric panel. 
4. **Compare:** The user can scrub the timeline to 'polish' entire time slices, comparing oxidized states across dates.

## States
1. **Default (Oxidized):** The canvas is 80-90% covered in green bloom (#7ab8a0) over dark copper (#0d1b1a). Data is invisible. Ambient bloom grows slowly.
2. **Active (Polishing):** Cursor movement creates a radial 'clear' mask. The oxide opacity drops to 0% under the cursor, revealing #e6f0eb data lines. 
3. **Selected (Locked):** Clicking a node freezes the re-oxidation for that specific area. A side panel slides in (hairline border, no shadow) showing detailed metrics.
4. **Empty:** If a time range has no data, the oxide remains opaque and the cursor does not reveal lines. The cursor changes to a 'not-allowed' icon subtly.
5. **Error:** A distinct red crack (#d9534f) appears in the copper texture, breaking the organic flow, indicating data stream loss.

## Palette
- **Background/Copper Base:** #0d1b1a (Deep oxidized black-green)
- **Raw Copper:** #8b5a2b (Used only for the initial entrance animation and edge highlights)
- **Oxide/Bloom:** #2e4a46 to #7ab8a0 (Gradient range for the green oxidation patches)
- **Data Ink:** #e6f0eb (Crisp, off-white for lines and text)
- **Error:** #d9534f (Desaturated red for cracks)
- **UI Chrome:** #1a2b29 (Slightly lighter than background for panels)

## Type
- **Display/Chrome:** Space Mono. Used for the brand wordmark, timestamps, axis labels, and data values. Monospace reinforces the 'instrument' feel.
- **Body/Detail:** IBM Plex Sans. Used for panel headers, descriptive tooltips, and button labels. Clean, readable, but technical.
- **Hierarchy:** Data values are large (24px+). Labels are small (12px, uppercase, tracking-wide).

## Layout
- **Grid:** A 12-column implicit grid. 
- **Main Canvas:** Spans columns 1-9. Full height minus chrome.
- **Side Panel:** Spans columns 10-12. Hidden by default. Slides in on selection. 
- **Top Bar:** Fixed height 60px. Contains 'Verdigris OS' (left), Status Indicators (center), Settings (right). 
- **Timeline Scrubber:** Fixed height 80px at bottom. A horizontal slider that acts as a 'wiper' for the canvas.
- **Density:** High. Use hairlines (1px #2e4a46) to separate panels. No drop shadows. No rounded corners > 2px. 

## Motion
1. **Entrance:** The entire canvas starts as bright raw copper (#8b5a2b). Over 5 seconds, it darkens and develops texture, ending in the oxidized state. 
2. **Ambient Oxidation:** Green bloom patches grow organically in empty space using a noise-based particle system. Speed: Slow (1-2 pixels per second growth).
3. **Polishing (Interaction):** Cursor movement applies a radial gradient mask to the oxide layer. The transition from opaque to transparent is fast (100ms) for responsiveness. 
4. **Reversion:** When the cursor leaves, the oxide re-grows over the cleared area. Transition: Slow (2-3 seconds) to emphasize the 'natural' decay.
5. **Panel Slide:** Side panel slides in from right with ease-out cubic-bezier(0.2, 0.8, 0.2, 1).

## Constraints
- **No Widgets:** Do not use standard 'card' components. Use panels defined by hairlines.
- **No Marketing:** No hero section. The tool is the hero.
- **Canvas Performance:** Use off-screen canvas for the oxide texture generation to avoid re-painting the noise every frame. Only composite the mask on the main loop.
- **Accessibility:** Provide a 'High Contrast Mode' toggle that disables the oxide simulation and shows data lines with black background for readability.
- **Single File:** All CSS, JS, and HTML in one file. No external libraries except Google Fonts.
- **Browser Support:** Modern Chrome/Firefox/Safari. WebGL preferred for performance, but Canvas2D acceptable if optimized.

## Acceptance criteria
- [ ] Entrance animation successfully transitions from bright copper to oxidized matte over 5s.
- [ ] Cursor movement immediately reveals white data lines underneath the green oxide.
- [ ] Oxide re-grows slowly (2-3s) when cursor is away.
- [ ] Clicking a data point locks the view and opens a detail panel.
- [ ] Timeline scrubbing clears oxide across the entire width for that time slice.
- [ ] Typography uses Space Mono and IBM Plex Sans exclusively.
- [ ] Color palette strictly matches the hex codes provided.
- [ ] No 'dashboard widget soup' or floating cards without interactive purpose.
- [ ] Error state displays a red crack in the copper texture.
- [ ] Performance maintains 60fps during ambient oxidation growth.

## Type pairing
Space Mono + IBM Plex Sans
