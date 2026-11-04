Build a single-page HTML interface for 'Mold & Matter', an artisan cheese rind management tool. The core experience is a vertical timeline where users log environmental data (humidity, salt, temp). The visual centerpiece is a procedural noise texture on the background that represents the cheese rind. This texture must change density and color based on the logged data: starting as a light, sparse white noise and evolving into a dense, dark grey texture as the fermentation progresses. 

**Layout & Structure:**
- **Left Panel (Fixed):** Contains the 'Mold & Matter' wordmark (Cormorant Garamond, italic, #3D405B) and the data entry form. The form should be minimal, using hairline inputs. Fields: Date (auto-filled), Humidity (0-100%), Salt (0-5%), Notes (optional). A prominent 'Log Entry' button.
- **Right Panel (Scrollable/Canvas):** The timeline view. Each logged entry is a node on a vertical line. The background behind this panel is the Canvas element rendering the procedural noise. The noise should be generated using Simplex or Perlin noise, with frequency and amplitude mapped to the accumulated salt and humidity values.

**Visual Style:**
- **Palette:** Background #FDFBF7 (Off-white/Linen), Ink #3D405B (Dark Slate), Accent/Texture #8B7D6B (Warm Grey/Brown).
- **Typography:** Use Cormorant Garamond for headers and data values to evoke a classic, handwritten log feel. Use Public Sans for labels and UI controls for readability.
- **Texture:** The noise must not be static. It should have a slight 'breathing' animation (ambient motion) to simulate living mold. When a new entry is logged, a ripple effect should emanate from the new node, temporarily distorting the noise pattern before settling into the new density.

**Interactions:**
- **Logging:** Clicking 'Log Entry' adds a new node to the timeline. The canvas updates the noise parameters immediately. A ripple animation plays. The new node highlights with the accent color.
- **Scrolling:** Scrolling the timeline should not scroll the canvas background independently; they are linked. The noise texture should feel like a continuous surface being marked.
- **States:** 
  - *Empty:* The canvas is a light, low-frequency noise. The timeline shows a placeholder 'Begin Logging' in italic serif.
  - *Active:* Timeline shows entries. Noise is denser.
  - *Error:* If invalid data is entered (e.g., Humidity > 100), show a subtle red border on the input and a shake animation.

**Technical Constraints:**
- Use HTML5 Canvas for the noise rendering.
- Use a noise library (or implement a simple one) for procedural generation.
- Ensure the noise performance is optimized (e.g., render at lower resolution and scale up, or use Web Workers if complex).
- No external images; all textures must be procedural.
- Responsive: On mobile, the left panel becomes a sticky header or bottom drawer.

**Mobile Layout Specifics:**
On screens narrower than 768px, the fixed left panel collapses. The brand name moves to a sticky top bar with a subtle backdrop blur. The form is hidden behind a floating action button (FAB) in the bottom-right corner. Tapping the FAB slides up a bottom sheet containing the form inputs. The timeline occupies the full width, with nodes aligned to the left edge for easy thumb reach. The canvas remains fixed behind the content, but its resolution is halved to maintain 60fps on mobile devices.

**Motion Details:**
- **Noise Drift:** The noise seed offset should increment by 0.001 per frame, creating a slow, organic drift.
- **Ripple Physics:** The ripple should expand at a speed of 200px per second, fading out over 1.5 seconds. It should distort the noise amplitude by a factor of 3x at the wavefront.
- **Node Entry:** New timeline nodes should scale from 0.8 to 1.0 with a cubic-bezier(0.175, 0.885, 0.32, 1.275) easing function for a slight bounce.

**Acceptance Criteria:**
- The interface must load without external dependencies (no CDNs for JS libraries; inline noise implementation preferred).
- The noise texture must visibly change hue and density after 3 logged entries.
- The form must validate inputs before submission.
- The mobile drawer must be dismissible by swiping down or clicking outside.
- Deliverable: single-file HTML/CSS/JS.
