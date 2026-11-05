Build 'Ink Bleed Circuit', a playable Canvas 2D puzzle game. Core mechanic: Draw a path between nodes using wet ink. The ink is not static; it simulates capillary action, spreading outward into a procedural paper texture. The player must time their drawing and use the 'Dry' action to freeze the ink before it bleeds into the 'Waste Zone' (edges) or disconnects from a node.

**Visual Style:** Industrial minimalism. Background is a high-contrast paper texture (light #f1faee). Ink is deep red (#e63946). UI elements are stark black (#1a1a1a). Use Space Grotesk for titles and IBM Plex Mono for HUD.

**Implementation Details:**
1. **Canvas Setup:** Fullscreen canvas. Create a `paperTexture` array (Uint8Array) representing fiber density. High density = less bleed; low density = more bleed.
2. **Ink Simulation:** Use a cellular automaton or simple diffusion algorithm. `wetInk` pixels spread to neighbors based on `paperTexture` values and a global `wetness` timer. 
3. **Drawing:** `pointerdown`/`pointermove` adds `wetInk` to the canvas buffer. 
4. **Drying Mechanic:** Pressing `Spacebar` triggers a 'Dry' event. All currently wet ink pixels convert to 'solid' state. Solid ink does not spread. 
5. **Win/Lose:** 
   - **Win:** Connect Source Node to Target Node with a continuous solid ink path. 
   - **Lose:** Ink touches the Canvas Edge (Waste Zone) OR Timer expires before connection.
6. **Feedback:** 
   - **Drawing:** Small ripple effect around cursor.
   - **Bleeding:** Subtle darkening of surrounding paper texture.
   - **Dry:** Flash effect on connected nodes.
   - **Fail:** Red glitch effect on waste zone edges.

**Layout & Responsiveness:**
- **Desktop:** Fullscreen canvas with HUD overlay in top-left (Timer, Level) and bottom-center (Dry Button hint). Mouse cursor changes to crosshair.
- **Mobile:** Canvas fills viewport. HUD scales down. A large, semi-transparent 'DRY' button appears at bottom-center for touch interaction. Touch targets must be min 44px.
- **Orientation:** Support both portrait and landscape. Recalculate node positions on resize to maintain relative distance.

**Motions & Animations:**
- **Ink Flow:** Smooth interpolation for pointer drawing to prevent jagged lines. 
- **Bleed Animation:** Diffusion steps occur every 2-3 frames to save performance, creating a pulsing organic spread.
- **Dry Snap:** Instant visual change from translucent red to opaque red with a 100ms white flash overlay.
- **Win State:** Solid path glows teal (#2a9d8f) with a traveling light pulse from Source to Target.

**Constraints:** No external libraries. Use `requestAnimationFrame`. Keep logic in a single file. Ensure touch and mouse support. The game must be winnable in under 10 seconds per level if played optimally.

**Acceptance Criteria:**
- [ ] Single-file HTML/CSS/JS deliverable.
- [ ] Paper texture is procedural and visible.
- [ ] Ink bleeds realistically based on texture density.
- [ ] 'Dry' action freezes ink instantly.
- [ ] Win/Lose states trigger correctly with visual feedback.
- [ ] Responsive layout works on mobile and desktop.
- [ ] No console errors during gameplay.
