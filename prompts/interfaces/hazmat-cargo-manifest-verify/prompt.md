Build a single-screen HazMat Cargo Manifest Verifier interface. The visual language is strict industrial utility: high-contrast, warning-focused, and tactile. Use a background of #F2F2F2 (paper-like off-white). The primary container is a manifest panel with a dynamic border composed of diagonal hazard stripes (#FFB000 and #000000). The density of these stripes must increase as the 'Risk Level' input increases (e.g., from 1 to 5), creating visual tension. Typography must be strictly Druk Wide for headers (uppercase, tight tracking) and IBM Plex Mono for data fields and labels. Never use Inter, Roboto, Arial, or system-ui fonts.

The core interaction is the 'Verify' action. When the user clicks the large, heavy 'VERIFY MANIFEST' button (styled as a physical stamp handle), the system validates the form. If compliant, a large, red (#D0021B) stamp graphic animates onto the manifest. This animation must include a 'smudge' effect: the stamp scales down rapidly, rotates slightly, and applies a CSS filter or SVG displacement map to simulate ink bleeding into the paper texture. If non-compliant, the hazard stripes flash red (#D0021B) and the button shakes.

Include states: Default (empty manifest), Selection (active input focus with a thick black outline), Empty (no data, showing a 'AWAITING DATA' watermark), and Error (validation failure with red text and border). The layout should be dense but calm, avoiding dashboard widget soup. Use hairline dividers (#000000 at 1px) to separate sections. The brand 'SafeLoad Systems' should appear in the top-left corner in Druk Wide, small and unobtrusive. The 'Risk Level' slider should be a custom range input with a thick track and a square thumb, styled to look like a mechanical slider. Ensure the stamp animation feels weighty, using cubic-bezier easing for heavy inertia. The overall aesthetic should evoke a physical clipboard in a hazardous environment, not a generic SaaS dashboard.

**Layout & Responsiveness**:
On desktop, the manifest panel is centered with a max-width of 800px, allowing ample whitespace around the edges to emphasize the document's isolation. On mobile, the panel expands to 100% width with 16px side margins, ensuring the hazard stripes remain visible and legible. The form fields stack vertically on mobile, while on desktop, they may utilize a two-column grid for compact data entry (e.g., UN Number and Proper Shipping Name side-by-side). The 'Verify' button remains full-width on mobile for easy thumb access but retains its substantial height (60px) on desktop.

**Motion & Interaction Details**:
1. **Entrance**: The hazard stripes animate in via `transform: translateX` from opposite edges, meeting in the center with a heavy `cubic-bezier(0.25, 1, 0.5, 1)` easing over 800ms.
2. **Risk Feedback**: As the slider moves, the stripe width transitions smoothly. If Risk > 3, add a subtle `translateX` vibration (±1px) to the panel to simulate instability.
3. **Stamp Impact**: The stamp SVG uses `steps(1)` for the initial 'slam' effect, followed by an ease-out settle. Apply `filter: blur(1px) contrast(1.2)` during the impact frame to mimic ink bleed.
4. **Error Handling**: On validation failure, the panel shakes horizontally (±5px) for 300ms. Hazard stripes flash #D0021B at 0.2s intervals.

**Constraints & Acceptance Criteria**:
- **Deliverable**: Single-file HTML/CSS/JS.
- **No Card Soup**: One single manifest panel. No nested cards.
- **No Soft Shadows**: Only hard 1px borders. Stamp bleed uses filters, not shadows.
- **Sharp Corners**: 0px border-radius on all elements.
- **Performance**: Use GPU-accelerated transforms for stripe animations.
- **Fonts**: Only Druk Wide and IBM Plex Mono loaded.
- **States**: Must support Default, Selection, Empty, Error, and Success states distinctly.
- **Accessibility**: Ensure high contrast ratios and focus indicators are visible.
