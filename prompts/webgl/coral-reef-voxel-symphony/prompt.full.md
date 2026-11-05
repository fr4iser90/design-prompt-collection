## Concept
Create an immersive underwater visualization where sound data is translated into a living coral reef. The "terrain" is not a static landscape but a dynamic, audio-reactive ecosystem. Low-frequency sounds cause coral polyps to grow, branch, and change color, simulating the biological response of reef organisms to environmental stimuli. The goal is to make data feel organic and spatial, avoiding traditional bar-chart metaphors.

## Palette
- **Background/Deep Water:** #051018 (Abyssal Blue) - Provides depth and contrast.
- **Accent/Cyan:** #00F0FF (Bioluminescent Cyan) - Used for low-intensity coral and light rays.
- **Accent/Coral:** #FF7E67 (Hot Coral) - Used for high-intensity coral and audio peaks.
- **Seabed:** #1A2B3C (Dark Slate) - Subtle, non-distracting base.

## Type
- **Display:** Syne (Bold, Uppercase) for the title "Reef Acoustic". Clean, geometric, and modern.
- **Body/Data:** Space Mono (Regular) for frequency readouts and technical details. Monospaced for alignment and technical feel.
- **Styling:** Text should be semi-transparent (opacity 0.7) to blend with the underwater atmosphere. Avoid heavy shadows or outlines.

## Layout
- **Canvas:** Full-screen WebGL canvas.
- **HUD:** Fixed position, bottom-left. Contains title and real-time frequency data (e.g., "Bass: 45Hz").
- **Camera:** Initial view is a low-angle shot looking up at the reef, emphasizing the height of the coral structures. Orbit controls allow user exploration.
- **Composition:** The reef should be centered but asymmetric, with taller structures on one side to create visual interest.

## Motion
- **Entrance:** The scene starts dark. A single volumetric light beam fades in from above, illuminating the static reef structure. This establishes the underwater atmosphere.
- **Ambient:** Caustics (light patterns) ripple across the seabed and coral surfaces. This motion is independent of audio, providing a constant sense of water movement.
- **Interaction:** As audio plays (or simulated sweep), coral voxels extrude upwards and expand. Color shifts from cyan to coral red based on intensity. The motion should be smooth and organic, using easing functions to mimic biological growth.

## Constraints
- **Stack:** React Three Fiber (R3F), Three.js, Web Audio API.
- **Performance:** Use instanced meshes for coral voxels. Limit to 10,000 instances. Use custom shaders for SSS to avoid expensive post-processing.
- **Audio:** Handle missing audio gracefully with a simulated sine wave sweep. Ensure audio context is resumed on user interaction if required by browsers.
- **Responsiveness:** Canvas must resize with the window. UI elements should remain legible on mobile.
- **No SaaS Chrome:** No headers, footers, or navigation bars. The canvas is the hero.

## Acceptance criteria
- [ ] Single HTML file with embedded CSS/JS.
- [ ] Uses R3F and Three.js.
- [ ] Coral voxels react to audio frequency (height and color).
- [ ] Subsurface scattering effect is visible on coral.
- [ ] Volumetric fog and light rays are present.
- [ ] Caustics animate independently of audio.
- [ ] Orbit controls work smoothly.
- [ ] UI uses Syne and Space Mono.
- [ ] No external assets (images/fonts) except via CDN links.
- [ ] 60fps on mid-range hardware.

## Type pairing
Syne + Space Mono
