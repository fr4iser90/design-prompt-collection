Create a single-file HTML interface for 'Caliper', a hydraulic brake bleed simulation tool. The aesthetic is a technical instrument panel, not a marketing page. Use a dark background (#111111) with high-contrast white (#F0F0F0) schematic lines and bright orange (#FF4400) for interactive accents.

**Layout & Structure:**
The layout must be split: a left sidebar (250px wide) for controls and status, and a main canvas area for the SVG diagram. No cards, no shadows, no rounded corners except for the valve handle. Use 1px solid borders (#333333) to separate panels. The header contains the 'Caliper' wordmark in Space Grotesk, bold, uppercase, letter-spaced.

**Visuals:**
The central element is an SVG schematic of a brake master cylinder connecting to a caliper. Use thin white strokes (1px) for the tubing. Inside the tubing, render air bubbles as small white circles (r=4px) with 80% opacity. The tubing should have a subtle inner glow or gradient to suggest fluid depth (#1a1a1a to #222222).

**Typography:**
Use 'Space Grotesk' for all headings, labels, and the brand name. Use 'IBM Plex Mono' for all numerical data, status codes, and technical readouts. Font sizes should be small and precise (12px-14px for body, 18px for headers). Avoid system-ui fonts.

**Interaction & Physics:**
1. **Valve Control:** A draggable circular handle (16px diameter, #FF4400 stroke, transparent fill) sits on a 'bleed valve' node in the SVG. Dragging this handle down/right simulates opening the valve.
2. **Fluid Dynamics:** When the valve is 'open' (dragged), a wave effect pushes fluid towards the outlet. Bubbles within the affected tube segment should accelerate towards the outlet. 
3. **Bubble Behavior:** Bubbles drift slowly upward/left when static (simulating air rising in a closed system). When pushed by the valve, they move rapidly right. 
4. **Catch Cup:** At the far right, a small container 'catch cup' receives bubbles. When a bubble enters the cup, it 'pops' (scale up and fade out) and the 'Bleed Status' counter decreases.

**States:**
- **Default:** Bubbles drift gently. Status: 'System Sealed'.
- **Dragging:** Valve handle follows cursor. Fluid flow animation active. Status: 'Bleeding...'.
- **Empty:** All bubbles popped. Status: 'System Clear' in green (#00FF00) or bright white. Show a 'Reset System' button.
- **Error:** If the user drags the valve handle outside the valid track bounds, show a red outline on the valve and display 'Valve Misaligned' in the status log.

**Constraints:**
- No marketing heroes or large images.
- No purple or blue glows.
- No decorative icons; use simple geometric SVG shapes.
- The interface must feel like a CAD tool or diagnostic software.
- Ensure the SVG is responsive but maintains aspect ratio.
- Use CSS variables for colors to ensure consistency.
- Implement basic drag-and-drop logic using native JS or a lightweight library if necessary, but prefer vanilla JS for precision.
- The 'Caliper' brand must be visible but not dominant; it is a tool, not a brand showcase.
