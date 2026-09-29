Build a single-screen environmental monitoring interface for 'Verdigris OS' that functions as an oxidative data excavation tool. The core concept is that data is buried under the weight of time, represented by a living copper oxidation simulation. The user does not just view data; they excavate it by scrubbing the timeline, which acts as a polishing agent.

**Visual & Layout Architecture**
The interface must avoid standard dashboard 'widget soup'. Instead, use a dense, calm layout with distinct panels separated by hairlines rather than cards. 
1. **The Main Canvas (The Copper Plate):** Occupies 75% of the viewport. This is not a static background but a reactive canvas. It starts as a bright, metallic copper surface (#8b5a2b) that slowly darkens to a matte, oxidized state (#0d1b1a) over a 5-second entrance animation. 
2. **The Oxide Layer:** Over time, organic green bloom patches (#7ab8a0 with varying opacity) grow in empty space on the canvas. This is the 'noise' or 'decay' of the system. 
3. **The Data Layer:** Underneath the oxide, crisp, white (#e6f0eb) data lines and points exist. They are invisible when covered by thick oxide. 
4. **Chrome & Controls:** A minimal top bar with the 'Verdigris OS' wordmark (Space Mono) and a bottom timeline scrubber. No marketing heroes. No floating cards unless they wrap an interactive unit (e.g., a specific sensor node being inspected).

**Interaction Mechanics (The Polish)**
- **Cursor as Polishing Agent:** When the user moves their mouse/touch over the canvas, it does not highlight; it *removes* oxide. Implement a radial gradient mask on the canvas context where the cursor position clears the green bloom, revealing the sharp white data lines underneath.
- **Reversion:** As soon as the cursor moves away, the oxide slowly re-grows over the cleared area (2-3 second fade-in), simulating the natural re-oxidation of copper. 
- **Timeline Scrubbing:** Dragging the bottom timeline acts as a global 'polish' for that specific time slice, clearing the oxide across the entire width to reveal the data state for that moment. 
- **Selection:** Clicking a revealed data point locks the oxide away for that specific node and opens a detail panel (hairline-separated) showing precise metrics.

**Technical Constraints & States**
- **Canvas Rendering:** Use HTML5 Canvas or WebGL for the oxide simulation. The oxide should feel organic, not pixelated. Use noise functions for the bloom growth.
- **States:** 
  - *Default:* High oxide coverage, data hidden. 
  - *Active/Polishing:* Cursor interaction reveals data. 
  - *Selected:* Node locked open, oxide suppressed locally. 
  - *Empty:* If no data exists for a range, the oxide remains thick and unresponsive (dead zone).
  - *Error:* A sharp red (#d9534f) crack appears in the copper texture if data stream is lost.
- **Typography:** Use Space Mono for all data values, timestamps, and chrome labels. Use IBM Plex Sans for any descriptive text or panel headers. Do not use Inter or system-ui.
- **Color Palette:** Strictly adhere to the oxidized copper theme. Background #0d1b1a, Oxide #2e4a46 to #7ab8a0, Data Ink #e6f0eb, Raw Copper #8b5a2b.
- **Performance:** The oxidation simulation must run at 60fps. Limit particle count for the bloom to 500 active patches. Use requestAnimationFrame. 

**Deliverable**
A single HTML file containing the CSS, JS, and Canvas setup. The code must be self-contained. No external assets. The interface must feel tactile, heavy, and reactive. The 'polish' effect must be immediate and satisfying, contrasting the slow decay of the ambient oxidation.
