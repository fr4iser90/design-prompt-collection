Build a single-page HTML interface for 'SubZero', a cryo-blast food preservation timer. The core experience is a vacuum chamber simulation where the UI physically reacts to pressure changes. Use a deep cryo-blue background (#0A1128) with cyan (#00F0FF) accents and off-white (#E0E1DD) for text and structural lines. Typography must use Space Grotesk for display elements (titles, primary numbers) and JetBrains Mono for all data readouts, labels, and buttons to maintain an industrial, precise aesthetic. 

The layout centers a circular 'Depth Gauge' component. This is not a static dial; it is a dynamic viewport. As the timer runs, the background gradient within this circle compresses radially inward, simulating the evacuation of air. The 'Engage' button triggers this compression. When engaged, the canvas or CSS-driven background must visibly squeeze toward the center point. 

Implement three distinct states: 
1. Default: The gauge is idle, particles drift slowly upward and vanish at the top, simulating residual air. 
2. Active: The timer counts down. The background compresses progressively. Particles accelerate upward. The cyan accent pulses subtly with each second. 
3. Complete: The compression hits maximum density (darkest blue center), and the timer hits zero. A 'Release' button appears to reset the state. 

Motion is critical. On page load, all UI elements must scale down from 120% opacity and scale to 100%, creating a 'sucked-in' effect. The ambient motion involves small, faint white/cyan particles floating upward. During the 'Engage' interaction, the background gradient must animate its radial stops inward rapidly. Use CSS transitions for UI elements and Canvas 2D or advanced CSS gradients for the depth simulation. Avoid any green, terracotta, or rustic colors. The feel must be sterile, cold, and mechanical. Ensure the primary task (setting time and engaging) is the only focus; no marketing hero text. The wordmark 'SubZero' should be small, top-left, in Space Grotesk, muted. 

Constraints: Do not use standard system fonts. Do not use purple gradients. Do not use card layouts for the main gauge; it should be a standalone circular element. Ensure the 'compression' effect is visible and distinct from simple scaling of the entire page; it should affect the background texture/gradient of the gauge area specifically. The interface must remain legible even when compressed. Provide a clear error state if the timer is attempted to be engaged without a set duration.

**Desktop Layout:** The gauge occupies 60-70% of the viewport height, centered horizontally and vertically. Controls sit below the gauge in a horizontal flex row. Top-left contains the 'SubZero' wordmark. Top-right displays a status indicator (e.g., 'CHAMBER READY'). 
**Mobile Layout:** The gauge scales to 80% of viewport width. Controls stack vertically below the gauge. The wordmark moves to top-center. Status indicator hides or moves to bottom-left. Touch targets for time steppers and 'Engage' button must be at least 44x44px. 
**Motions:** Entrance animation: `transform: scale(1.2); opacity: 0;` to `scale(1); opacity: 1;` over 800ms. Ambient particles: Canvas-based, spawning at bottom, moving up with slight horizontal sine wave drift, fading out at top. Compression: CSS variable `--compression-radius` animates from 100% to 10% over the timer duration. 
**Constraints:** No external libraries except Google Fonts. Single HTML file. No SVGs unless inline. 
**Acceptance Criteria:** 1. Gauge compresses visually. 2. Particles react to state. 3. Timer counts down accurately. 4. Error shake on invalid input. 5. Responsive layout works on mobile. 
**Deliverable:** single-file HTML/CSS/JS.
