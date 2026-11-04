## Concept
Create a visceral, technical visualization of karst sinkhole formation. The core thesis is "Geological Honesty": stripping away the romanticized greenery of nature to reveal the stark, brutal geometry of subsurface voids. This is not a game; it is a simulation tool for Geolift Systems, designed to demonstrate the sudden, catastrophic nature of limestone collapse. The visual language is industrial, minimal, and high-contrast, relying on the interplay of light and shadow within a deep, voxel-based shaft.

## Palette
Strictly adhere to a tri-color system to maintain visual cohesion and technical clarity:
-   **Background/Void:** `#1a1a1a` (Near-black). Used for the scene background, deep shadows, and empty space.
-   **Surface/Limestone:** `#e0e0e0` (Light Grey). Used for the voxel material, UI text, and dust particles. This represents the solid rock.
-   **Stress/Accent:** `#ff6b6b` (Vibrant Red-Orange). Used exclusively for interaction highlights, structural stress indicators, and the initial collapse trigger. This color must never be used for static elements.

## Type
-   **Display:** `Syne` (Variable Font). Use `font-weight: 700` for the title "KARST COLLAPSE" and section headers. Uppercase, wide letter-spacing (`0.1em`). Color: `#e0e0e0`.
-   **Body/Data:** `JetBrains Mono`. Use `font-weight: 400` for all numerical data, coordinates, and status updates. Color: `#e0e0e0` with `opacity: 0.7` for secondary info.
-   **Layout:** Minimalist overlay. No containers. Text floats directly over the 3D canvas. Position the main title in the top-left, data readouts in the bottom-left. Ensure text is legible against the moving background by adding a subtle `text-shadow: 0 0 10px #1a1a1a`.

## Layout
The entire viewport is the canvas. No HTML structure beyond the canvas element and the UI overlay. 
-   **Canvas:** Full screen (`width: 100vw`, `height: 100vh`). 
-   **UI Overlay:** Absolute positioning. 
    -   Top-Left: Title "KARST COLLAPSE" and subtitle "SUBSURFACE SIMULATION v1.0".
    -   Bottom-Left: Data panel showing "DEPTH: [value]m", "VOXELS REMOVED: [count]", "STRESS: [LOW/HIGH]".
    -   Bottom-Right: Instructions "CLICK TO COLLAPSE | DRAG TO ORBIT" in small, monospace font.

## Motion
1.  **Entrance Sequence (3s):** 
    -   Start camera at position `(0, 0, 0)` inside the voxel grid.
    -   Simultaneously, remove the central 5x5x5 voxel block.
    -   Animate camera position to `(20, 15, 20)` looking at `(0, 0, 0)` using a smooth easing function (e.g., `easeInOutCubic`).
    -   Dust particles fade in from opacity 0 to 0.4.
2.  **Ambient Motion:**
    -   Dust motes (`Points`) drift slowly upwards and sideways within the shaft area. Use a sine wave function for lateral movement to simulate air currents.
    -   Subtle camera sway (0.5 degrees) if idle for >5 seconds to indicate system activity.
3.  **Interaction Motion:**
    -   **Hover:** When the raycaster intersects a voxel, change its material color to `#ff6b6b` instantly.
    -   **Click:** Trigger a "collapse" animation. The clicked voxel and its 6 immediate neighbors (up, down, left, right, front, back) are removed from the `InstancedMesh` count. 
    -   **Physics:** Simulated gravity. Removed voxels should not just vanish; they should fall into the void by updating their Y-position in the animation loop until they are below the visible area, then reset or fade out. This creates a sense of weight and destruction.

## Constraints
-   **Stack:** Three.js (r150+), vanilla JavaScript, HTML5, CSS3. No React, no Vue, no build steps.
-   **Performance:** Must run at 60fps. Use `InstancedMesh` for all voxels. Limit total voxels to 131,072 (64x64x32) max. Use `frustumCulled = true`.
-   **Lighting:** One `DirectionalLight` (color `#ffffff`, intensity 1.5) casting shadows. One `AmbientLight` (color `#1a1a1a`, intensity 0.5) to fill shadows slightly but keep contrast high. No point lights unless simulating a flashlight (optional).
-   **No External Assets:** All textures must be generated procedurally or via shader code. No image files.
-   **No "SaaS" UI:** No rounded buttons, no drop shadows on UI elements, no glassmorphism. The UI must feel like a terminal or technical readout.

## Acceptance criteria
-   [ ] Scene renders a voxel grid of limestone-colored blocks.
-   [ ] Camera starts inside the geometry and pulls back smoothly on load.
-   [ ] Clicking a voxel causes it and neighbors to fall/collapse, revealing deeper layers.
-   [ ] Hovering over a voxel highlights it in `#ff6b6b`.
-   [ ] Dust particles are visible and drift slowly.
-   [ ] UI text uses `Syne` and `JetBrains Mono` correctly.
-   [ ] Color palette is strictly `#1a1a1a`, `#e0e0e0`, `#ff6b6b`.
-   [ ] No external images or models are loaded.
-   [ ] Code is contained in a single HTML file.
-   [ ] Performance remains stable during rapid clicking (no memory leaks).

## Type pairing
Syne + JetBrains Mono
