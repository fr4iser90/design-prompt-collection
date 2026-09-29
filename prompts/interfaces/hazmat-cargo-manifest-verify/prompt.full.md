## Concept
The HazMat Cargo Manifest Verifier is a utility interface designed for logistics safety audits. It rejects modern soft-UI trends in favor of a brutalist, industrial aesthetic that communicates urgency and precision. The core metaphor is a physical manifest document being stamped for approval. The interface uses high-contrast hazard stripes to visually represent risk levels, creating an immediate, intuitive understanding of the payload's danger. The 'stamp' mechanic provides tactile feedback, gamifying the compliance process through a satisfying, physical animation.

## Primary task
The user's primary task is to input cargo details and verify compliance. The interface must guide the user through a single, linear flow: input data -> adjust risk level -> click verify -> receive stamp result. There should be no distractions, no navigation menus, and no secondary actions. The focus is entirely on the manifest panel.

## States
1. **Default**: The manifest is empty. The hazard stripes are at minimum density (low risk). The 'Verify' button is disabled or inactive.
2. **Selection**: When an input field is focused, it receives a thick, 3px solid black (#000000) outline. The hazard stripes remain static.
3. **Empty**: If the form is submitted with missing required fields, the 'Empty' state is triggered. A large, semi-transparent 'AWAITING DATA' watermark appears over the form fields in Druk Wide.
4. **Error**: If validation fails (e.g., invalid UN number), the hazard stripes flash red (#D0021B) rapidly (0.2s intervals). The 'Verify' button shakes horizontally. Error messages appear in IBM Plex Mono, red, below the specific field.
5. **Success**: Upon valid verification, the red stamp animation occurs. The hazard stripes settle into their final density. The 'Verify' button changes to 'VERIFIED' and becomes disabled.

## Palette
- **Background**: #F2F2F2 (Off-white paper)
- **Ink/Text**: #000000 (Pure black for high contrast)
- **Hazard Primary**: #FFB000 (Safety yellow)
- **Hazard Secondary**: #000000 (Black stripes)
- **Alert/Stamp**: #D0021B (Deep red for errors and the approval stamp)
- **Borders**: #000000 (1px solid lines for structure)

## Type
- **Display**: Druk Wide. Used for the brand name, section headers, and the 'VERIFY' button text. Must be uppercase, with tight letter-spacing (-0.05em). This font provides the industrial, heavy weight.
- **Body/Data**: IBM Plex Mono. Used for all input fields, labels, data values, and error messages. This font provides the technical, precise feel of a printed manifest.
- **Constraint**: Never use Inter, Roboto, Arial, Helvetica, or system-ui. The contrast between the heavy display and the monospaced data is critical to the aesthetic.

## Layout
- **Container**: A centered, max-width 800px panel. The panel has a 20px padding.
- **Hazard Border**: The panel's border is not a standard CSS border. It is a repeating linear gradient of 45-degree stripes (#FFB000 and #000000). The stripe width should be dynamic: 10px for low risk, 20px for high risk. This border wraps the entire panel.
- **Header**: Top-left: 'SafeLoad Systems' in Druk Wide, 12px. Top-right: 'MANIFEST ID: [AUTO-GEN]' in IBM Plex Mono, 12px.
- **Form**: A vertical stack of inputs. Labels are above inputs in IBM Plex Mono, 10px, uppercase. Inputs are 100% width, with a 1px black border. No rounded corners.
- **Risk Slider**: A custom range input. The track is a 10px high black bar. The thumb is a 20x20px yellow square with a black border. Moving the slider updates the hazard border density in real-time.
- **Verify Button**: Full width, 60px height. Background #000000, Text #FFB000 in Druk Wide. Hover state: Background #FFB000, Text #000000. Active state: Scale down 0.98.

## Motion
1. **Entrance**: On load, the hazard stripes slide in from the left and right edges, meeting in the center. Use a cubic-bezier(0.25, 1, 0.5, 1) easing for heavy inertia. Duration: 800ms.
2. **Ambient**: If the Risk Level is > 3, the entire manifest panel vibrates subtly (translateX ±1px, 0.1s interval). This creates a sense of instability.
3. **Interaction (Stamp)**: On 'Verify' click, a red stamp SVG scales from 1.5 to 1.0 over 150ms, rotating -5 degrees. Simultaneously, apply a `blur(1px)` and `contrast(1.2)` filter to simulate ink smudging. The stamp should remain visible. Use a `steps(1)` timing function for the initial impact, then ease-out for the settle.
4. **Error Shake**: On validation error, the panel shakes horizontally (translateX ±5px) for 300ms.

## Constraints
- **No Card Soup**: Do not use multiple cards. One single manifest panel.
- **No Soft Shadows**: Use only hard, 1px borders. No box-shadows except for the stamp's ink bleed effect (which should be a filter, not a shadow).
- **No Rounded Corners**: All elements must have 0px border-radius. The aesthetic is sharp and industrial.
- **Single Task**: Do not add navigation, settings, or help links. The tool is for one job only.
- **Performance**: The hazard stripe animation must be GPU-accelerated (transform/opacity). Avoid animating background-position if possible; use a pseudo-element with a transform instead.

## Acceptance criteria
- [ ] The interface uses only Druk Wide and IBM Plex Mono. No other fonts are loaded.
- [ ] The hazard stripes change density dynamically when the Risk Level slider is moved.
- [ ] The 'Verify' button triggers a red stamp animation with a smudge/bleed effect on success.
- [ ] The interface displays distinct states for Default, Selection, Empty, and Error.
- [ ] The background is #F2F2F2, and the primary colors are #000000, #FFB000, and #D0021B.
- [ ] The layout is a single, centered panel with no dashboard widgets or marketing heroes.
- [ ] The stamp animation feels weighty and physical, not like a simple fade-in.
- [ ] Error states flash the hazard stripes red and shake the panel.
- [ ] All borders are 1px solid black, and all corners are sharp (0px radius).
- [ ] The brand 'SafeLoad Systems' is visible in the chrome but does not distract from the task.
- [ ] **Deliverable**: Single-file HTML/CSS/JS.
- [ ] **Responsive**: Layout adapts from desktop (centered 800px) to mobile (full width, stacked inputs).
- [ ] **Accessibility**: High contrast maintained; focus states clearly visible.

## Type pairing
Druk Wide + IBM Plex Mono
