Build a high-fidelity WebGL scene using React Three Fiber (R3F) and Three.js. The hero is a 3D scientific bubble trap (borosilicate glass) centered in the viewport. Use MeshPhysicalMaterial for the glass with transmission: 1.0, roughness: 0.05, thickness: 0.5, and ior: 1.47. Implement a custom shader or geometry trick to simulate a 'liquid level' inside the trap. When the liquid level is 0, the glass is empty. As the user scrubs the slider, a secondary mesh (the liquid) rises inside the glass, changing the visual refraction and caustics.

Lighting: Use a single hard DirectionalLight (key light) with castShadow enabled. The light color should be #e6e1d6 (warm white) to contrast with the cold glass. Add a subtle AmbientLight (#0f1419) to lift shadows slightly. The background is a solid #0f1419.

Interaction: A single slider control (UI overlay) labeled 'LIQUID LEVEL' (0-100%). This slider drives the Y-scale or Y-position of the inner liquid mesh. As the level rises, the refractive index visual depth increases, and caustics on the 'floor' (a subtle plane below the trap) become more pronounced and distorted.

Camera: Perspective camera, fov 45, positioned at [0, 2, 5], looking at [0, 0, 0]. Enable OrbitControls but restrict polar angle to [Math.PI / 4, Math.PI / 2.5] to keep the view slightly from above, emphasizing the liquid surface.

Motion: On load, animate the key light position from left to right over 3 seconds to reveal the glass form. The glass trap itself rotates slowly around the Y-axis (0.005 rad/frame).

Constraints: Do not use SaaS chrome. The UI slider should be minimal, monospace (IBM Plex Mono), white text on transparent background, positioned bottom-left. No purple glows. No particle systems. The glass must look physically accurate, not like a plastic toy. Use transmissionMap or thicknessMap if possible for better refraction accuracy.

Deliverable: single-file HTML/CSS/JS.
