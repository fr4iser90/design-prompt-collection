Build a single-file HTML asset studio for the 'Volcanic Geothermal Kit' (MAGMA CORE). This is a 2D game kit, not a landing page. The interface must display a cohesive production set: 3 animated lava flow tiles (4-frame loop, 64px), 2 ash cloud sprite sheets (6 frames, 128px), 1 heat-distortion mask (static, 256px), 1 player character sprite (idle/walk, 48px), 1 hazard prop (geyser, 64px), and 1 UI plate (health bar with lava fill, 200x32px). 

Visual Style: Dark industrial aesthetic. Background #111827. Lava uses #EF4444 core with #F97316 edges. No flat colors; use gradients and noise to simulate heat and viscosity. Silhouettes must be readable at 32px. 

Viewer UX: Implement a filmstrip viewer for animated assets. Clicking a sprite sheet plays the animation loop. A 'Poster Frame' mode displays the atlas grid at 1.5s intervals. Include a 'Heat Shimmer' toggle that applies a CSS filter or canvas distortion to the lava tiles to demonstrate the heat-distortion mask usage. 

Downloads: Provide two buttons: 'Download PNG Atlas' (generates a sprite sheet of all assets) and 'Download SVG' (vector outlines of UI and static props). Use Canvas API to render the atlas dynamically. 

Constraints: No external image CDNs. All assets must be drawn via Canvas 2D or SVG inline. No stick figures. No primitive cubes. The UI must use Bebas Neue for headers and Courier Prime for data/labels. Ensure the lava flow tiles are tileable (left/right edges match). The ash clouds must have alpha transparency. The heat-distortion mask should be a grayscale gradient map. 

Interaction: Hovering over a tile shows its dimensions and frame count. Clicking the 'Erupt' button triggers a full-screen canvas overlay with particle effects (embers, ash) that fade out after 3 seconds. The studio chrome should feel heavy and industrial, with beveled edges on UI elements. 

Layout & Responsiveness: On desktop, use a 3-column grid for asset categories with a fixed sidebar for controls. On mobile, collapse the sidebar into a bottom navigation bar and stack the asset grid into a single column. Ensure all interactive elements have a minimum touch target of 44x44px. The filmstrip viewer should support horizontal swipe gestures on touch devices. 

Motion Details: Entrance animations should stagger asset cards fading in from the bottom with a slight upward translation (translateY(20px) to 0) over 300ms with ease-out cubic-bezier. The 'Erupt' particle system should use additive blending for embers to create a glowing effect against the dark background. Smoke plumes should drift slowly using CSS keyframes with varying opacity and blur filters to simulate depth. 

Acceptance Criteria: The file must load instantly without external network requests for images. The 'Download PNG' function must correctly composite all frames into a single image file with transparent background where applicable. The 'Heat Shimmer' effect must be toggleable without causing layout shifts. All text must remain legible against the dark background with sufficient contrast ratios (WCAG AA). The code must be self-contained in a single HTML file with embedded CSS and JavaScript.
