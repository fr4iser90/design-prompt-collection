## Concept
Tsutsumu is a gift registry interface that reimagines privacy as a tactile, craft-based skill. Inspired by the Japanese tradition of Furoshiki (cloth wrapping), the interface allows users to 'wrap' their gift messages. The complexity of the virtual knot determines the privacy level: a simple bow is public, while a tight double knot encrypts the message. This approach replaces abstract security metaphors (padlocks, checkboxes) with physical, intuitive actions. The design is 'Cultural-Hybrid', blending contemporary minimalist UI with traditional textile aesthetics.

## Primary task
The user's primary task is to compose a gift message and 'wrap' it by manipulating the virtual cloth. They must choose a privacy level by tying a specific knot configuration. The interface must provide immediate visual feedback on the tension and state of the cloth.

## States
1. **Default/Empty:** A flat, unwrapped cloth (Washi Paper color) sits in the center. The message input field is empty. The 'Recipient' field is empty.
2. **Editing:** The user types a message. The cloth remains flat. The text appears in Kosugi Maru font on a virtual 'tag' attached to the cloth.
3. **Tying (Interaction):** The user drags the corners of the cloth. The cloth deforms based on physics. Tension lines appear in Indigo (#004B87) when stretched.
4. **Tied (Public):** The user drags two adjacent corners to meet. A simple bow forms. The message tag remains visible. The knot icon in the registry list shows a loose bow.
5. **Tied (Private):** The user drags all four corners to the center. A complex double knot forms. The cloth becomes opaque. The message tag is hidden. The knot icon in the registry list shows a tight square. An Indigo pattern emerges on the knot.
6. **Error:** If the user attempts to untie a private knot without the correct key (password), the cloth shakes violently, and an error message appears in Sumi Ink (#4A3B32).

## Palette
- **Background:** Washi Paper (#E8D8C3) - Warm, textured off-white.
- **Ink:** Sumi Ink (#4A3B32) - Deep brown-black for text and UI chrome.
- **Accent:** Indigo (#004B87) - Used for interactive states, tension lines, and encryption indicators.
- **Secondary:** Light Gray (#F5F5F5) for input fields and subtle dividers.

## Type
- **Headings:** 'Kaisei Decol' - Expressive, modern serif. Used for the brand name 'Tsutsumu' and section headers.
- **Body:** 'Kosugi Maru' - Rounded, friendly sans-serif. Used for messages, labels, and input text.
- **Hierarchy:** Clear distinction between the brand voice (Kaisei) and the user's voice (Kosugi). Avoid system fonts.

## Layout
- **Header:** Fixed top bar. 'Tsutsumu' wordmark on the left. Minimal navigation (e.g., 'My Gifts', 'Settings') on the right.
- **Main Stage:** Central canvas area (60% width) for the cloth simulation. The cloth is centered vertically and horizontally.
- **Sidebar/Panel:** Right side (30% width) or bottom bar for controls. Contains 'Message Input', 'Recipient Name', and 'Privacy Key' (for private knots).
- **Registry List:** Below the main stage or in a separate view. Displays wrapped gifts as small knot icons. Simple knots are loose; double knots are tight.
- **Density:** Calm and spacious. No dashboard widgets. Focus on the single task of wrapping.

## Motion
- **Physics:** Implement a 2D cloth simulation using Verlet integration. Corners are draggable vertices. Edges are springs.
- **Tension:** When dragged, the cloth stretches. Indigo lines highlight high-tension areas.
- **Ambient:** Idle unwrapped gifts flutter gently. Use a low-frequency sine wave to displace vertices slightly, simulating a breeze.
- **Knotting:** When corners meet within a threshold, animate them snapping into a knot configuration. The transition should feel like tightening fabric, with easing that mimics friction.
- **Error:** Shake animation on the cloth container. Opacity flash of the error message.

## Constraints
- **Single File:** All HTML, CSS, and JS in one file.
- **No Heavy Libraries:** Use vanilla JS for physics. Canvas API for rendering. No Three.js or heavy 3D engines.
- **Touch Support:** Ensure drag interactions work on touch devices.
- **No Generic Icons:** Do not use padlock, lock, or shield icons. Use the knot visuals themselves.
- **Performance:** Maintain 60fps for the cloth simulation. Optimize vertex count (e.g., 10x10 grid for the cloth).
- **Accessibility:** Ensure keyboard navigation for inputs. Provide alt text for knot states.

## Acceptance criteria
- [ ] **Visuals:** Palette uses #E8D8C3, #4A3B32, #004B87. Fonts are Kaisei Decol and Kosugi Maru.
- [ ] **Interaction:** User can drag cloth corners. Cloth deforms realistically.
- [ ] **States:** 
    - [ ] Simple knot (2 corners) = Public message visible.
    - [ ] Double knot (4 corners) = Private message hidden.
    - [ ] Error state triggers on incorrect key attempt.
- [ ] **Physics:** Cloth has tension and ambient flutter. No static images.
- [ ] **UI:** No padlock icons. Knot visuals indicate privacy. Layout is clean and focused.
- [ ] **Deliverable:** Single HTML file runs without external dependencies (except fonts).
