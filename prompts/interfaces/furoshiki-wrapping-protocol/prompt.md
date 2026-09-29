Build a single-file HTML/CSS/JS interface for 'Tsutsumu', a gift registry tool where privacy is controlled by the complexity of a virtual knot. The core mechanic is a canvas-based cloth simulation representing a Furoshiki (Japanese wrapping cloth). 

**Visual Identity:**
Use a palette of Washi Paper (#E8D8C3) for the background, Sumi Ink (#4A3B32) for primary text and UI chrome, and Indigo (#004B87) for interactive states and encryption indicators. Typography must use 'Kaisei Decol' for headings (expressive, serif-like but modern) and 'Kosugi Maru' for body text (rounded, approachable). Avoid generic sans-serifs like Inter or Roboto. The aesthetic is 'Cultural-Hybrid': clean, contemporary UI chrome wrapping a tactile, traditional craft mechanic.

**Core Interaction (The Knot):**
The central view is a square cloth element. Users can drag the four corners of the cloth. 
1. **Simple Knot (Public):** Dragging two adjacent corners to meet creates a simple bow. The message remains visible. The cloth texture is light, semi-transparent.
2. **Double Knot (Encrypted):** Dragging all four corners to the center creates a complex, tight knot. The cloth becomes opaque, and the underlying message is hidden behind the fabric layers. A subtle Indigo glow or pattern emerges on the knot to signify encryption.

**Physics & Motion:**
Implement a lightweight Verlet integration or spring-mass system for the cloth. 
- **Tension:** When corners are pulled, the cloth should stretch and warp realistically. 
- **Ambient:** Idle unwrapped gifts should have a subtle 'breeze' effect (low-frequency sine wave displacement on vertices).
- **State Change:** When a knot is 'tied' (corners within a threshold distance), animate the vertices snapping into the knot configuration. The transition should feel like tightening fabric, not a digital snap.

**UI Layout:**
- **Header:** Minimal. 'Tsutsumu' wordmark in Kaisei Decol. No navigation clutter.
- **Main Stage:** The cloth simulation takes up 60% of the viewport. 
- **Control Panel:** A side panel or bottom bar for 'Message Input' and 'Recipient'. 
- **State Indicators:** Do NOT use padlock icons. Use the visual state of the knot itself. A 'Simple Knot' icon in the list view is a loose bow; 'Double Knot' is a tight square.

**States to Implement:**
1. **Default:** Empty cloth, ready for input. Message field is empty.
2. **Editing:** User types message. Cloth is flat.
3. **Tying:** User drags corners. Physics active.
4. **Tied (Public):** Simple knot. Message visible in a small 'tag' attached to the knot.
5. **Tied (Private):** Double knot. Message hidden. Only a 'Sealed' label is visible.
6. **Error:** If the user tries to 'untie' a private knot without the correct 'key' (simulated by a password field), show a shake animation and an error message in Sumi Ink.

**Technical Constraints:**
- Single HTML file. 
- Use vanilla JS for physics (no heavy libraries like Three.js unless necessary for 3D cloth; 2D canvas is preferred for performance and simplicity).
- CSS for layout and typography.
- No external assets except Google Fonts for Kaisei Decol and Kosugi Maru.
- Ensure touch support for dragging corners.

**Deliverable:** Single-file HTML/CSS/JS.
