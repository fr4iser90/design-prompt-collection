Build a single-page interface for 'Cinnabar & Co.', a textile revision tool. The layout is a strict vertical split: left pane shows 'Raw Fabric' (static image with visible weave texture), right pane shows 'Dyed Result'. The core mechanic is a horizontal slider labeled 'Immersion Time' (0–100%). Moving the slider increases the opacity and saturation of a crimson (#8B0000) overlay on the right pane, simulating dye absorption. The overlay should use a blend mode like 'multiply' or 'color' to interact with the underlying fabric texture, not just sit on top. 

Typography: Use Cormorant Garamond for the brand name 'Cinnabar & Co.' and section headers ('Raw', 'Dyed'). Use IBM Plex Sans for UI labels, slider values, and button text. 

Colors: Background #F5F5F0 (off-white paper), Ink #1A1A1A (near-black), Accent #8B0000 (crimson), Muted #D3D3D3 (light gray for inactive states). 

Interactions: 
1. Slider: Custom range input. Thumb is a small crimson circle. Track is thin gray. As slider moves, the right pane's fabric darkens/reddens progressively. 
2. Buttons: Two primary actions at the bottom. 'Set Color' (primary, crimson bg, white text) and 'Bleach' (secondary, outline, gray text). 
3. Feedback: On 'Set Color' click, the button scales down slightly (0.95) and returns, simulating a stamp. On 'Bleach' click, the right pane flashes white briefly, then resets slider to 0. 

States: 
- Default: Slider at 0%, right pane looks identical to left but with a faint 'Dye Bath' placeholder icon if no fabric is loaded (or just lighter). 
- Active: Slider > 0%, overlay visible. 
- Empty: If no fabric, show a dashed border area with 'Upload Fabric' text. 
- Error: If 'Set Color' is clicked with slider at 0%, show a small red error text 'No dye applied' near the button. 

Layout: Full viewport height. Split is 50/50. Controls are centered horizontally below the split. Brand wordmark top-left. Status text top-right. No cards, no shadows. Flat design with texture. Ensure the fabric texture is visible even when dyed. Use CSS filters or canvas for the dye effect if needed, but prefer CSS blend modes for performance. The interface must feel heavy and physical, not digital-slick. 

Mobile Responsiveness: On screens narrower than 768px, the vertical split collapses into a stacked layout. The 'Raw Fabric' pane sits above the 'Dyed Result' pane, each occupying 50vh. The header remains fixed at the top, but the brand name scales down to 1.2rem. The slider controls move to the bottom of the viewport, fixed position, with a semi-transparent backdrop blur to ensure readability over the content. The buttons stack vertically if horizontal space is insufficient, maintaining a minimum touch target of 44x44px. 

Motion Details: The entrance animation should feel deliberate. The left pane slides in from -20px with a cubic-bezier(0.25, 1, 0.5, 1) easing over 600ms. The right pane fades in from opacity 0 to 1 over 800ms, delayed by 200ms. When the slider is dragged, the dye overlay opacity transitions smoothly over 100ms to prevent flickering. The 'Bleach' flash effect uses a keyframe animation: 0% opacity 0, 50% opacity 1 (white), 100% opacity 0, lasting 200ms. The slider thumb should have a subtle scale-up effect (1.1x) on hover to indicate interactivity. 

Constraints: No external libraries. Use vanilla JS for state management. The fabric texture should be a base64 encoded SVG or CSS pattern to ensure it loads instantly without network requests. The dye effect must not obscure the weave structure; test with high-contrast textures. Ensure accessibility: slider has aria-label 'Immersion Time', buttons have clear focus states (2px solid #1A1A1A outline). 

Acceptance Criteria: 
- [ ] Desktop layout is 50/50 split. 
- [ ] Mobile layout stacks vertically. 
- [ ] Slider updates dye opacity in real-time. 
- [ ] Blend mode preserves texture. 
- [ ] Error message appears on invalid action. 
- [ ] Animations are smooth and non-janky. 
- [ ] Colors match hex codes exactly. 

Deliverable: single-file HTML/CSS/JS.
