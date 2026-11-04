Build a single-file HTML asset studio for 'ABYSS LURE', a 2D bioluminescent creature pack. The core visual thesis is 'Light as Subject': creatures are nearly invisible against pure black (#000000), defined entirely by their own bioluminescence and sharp silhouettes at 64px. 

**Pack Type**: 2D Sprite/Atlas Kit.
**Style Bible**: Fleshy, dark bodies (#1A1A1A) with high-contrast edges. Photophores glow in Cyan (#00FFFF) and Magenta (#FF0055). No outlines; use light falloff to define form. Silhouettes must be stark and readable at 32-64px. Avoid generic fish shapes; use anglerfish anatomy (large mouths, jagged teeth, illicium).
**Inventory**: 
1. Hero Angler: Idle (4 frames), Walk/Swim (8 frames), Strike (6 frames). 
2. Props: 4 Lure variants (different glow patterns), 2 Teeth clusters, 1 Eye highlight.
3. VFX: 3 Bubble trails, 2 Light pulses.
4. UI: 1 Health bar plate, 1 Pause icon.
Total: 1 production set.

**Viewer UX**: 
- Main Canvas: Dark void. Cursor acts as the light source. Moving the cursor drags the creature's gaze and illuminates nearby sprites. 
- Filmstrip: Horizontal scroll of all frames with labels. 
- Poster Frame: Auto-captures a 'hero shot' at 1.5s showing the atlas grid + bevel hero.
- Controls: Toggle 'Light Mode' (cursor light vs. static glow), 'Show Grid' (pixel grid overlay), 'Export PNG' (downloads atlas), 'Export SVG' (downloads vector outlines of silhouettes).

**Technical Constraints**: 
- Use Canvas 2D API for rendering. 
- No external asset CDNs; generate all graphics procedurally or via embedded base64 data URIs. 
- Type pairing: Anton (headers) + Lato (UI/body). 
- Ensure high-quality bevels on UI elements. 
- The interaction must feel fluid; light falloff should be smooth (radial gradient). 
- Download formats must be functional: PNG atlas (transparent background) and SVG (black silhouettes with colored glow layers).

**Acceptance Criteria**: 
- [ ] Creature silhouette is readable at 64px without outlines.
- [ ] Cursor movement dynamically affects lighting/gaze.
- [ ] PNG download contains all frames in a grid.
- [ ] SVG download contains vector paths.
- [ ] No stick figures or primitive shapes; anatomical correctness.
- [ ] Colors match palette: #000000, #00FFFF, #1A1A1A, #FF0055.

**Layout Details**: 
- **Desktop**: Sidebar fixed right (300px), Main Canvas flex-grow, Bottom Filmstrip fixed height (120px). 
- **Mobile**: Sidebar collapses into a bottom sheet drawer. Filmstrip becomes a horizontal scrollable carousel. Touch events replace cursor tracking for light source.

**Motions**: 
- **Idle**: Subtle breathing sine wave on body mass. 
- **Lure**: Illicium sways with damped oscillation. 
- **UI**: Buttons have 200ms ease-out hover states with cyan glow intensification. 
- **Export**: Flash effect on canvas before download trigger.

**Constraints**: 
- Single file only. 
- No external images. 
- 60fps target. 
- Accessible contrast for UI text.

**Deliverable**: single-file HTML/CSS/JS.
