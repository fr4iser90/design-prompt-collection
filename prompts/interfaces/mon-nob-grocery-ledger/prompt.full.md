## Concept
'Mon no B Groceries' is a digital interface that restores the physical weight and cost of consumption. Inspired by traditional Japanese market ledgers and hanging tags, it rejects the frictionless 'add to cart' fly-out animation. Instead, every purchase is a deliberate act of 'cutting' a tag from a wire. The design emphasizes materiality: paper, string, ink, and gravity. The aesthetic is 'Cultural-Hybrid'—modern React functionality wrapped in the tactile sensibility of a Kyoto market stall.

## Primary task
The user's primary task is to select grocery items by 'cutting' them from the ledger wire. The interface must communicate the cost (ink depth) and the physical act of acquisition (severing the string). The secondary task is viewing the running total, which affects the physical behavior of the ledger (sway).

## States
1. **Default:** The wire is populated with available items. Tags hang statically with slight organic variation in string length. Background is #FDFBF7.
2. **Hover:** A tag lifts slightly (translateY -4px) and casts a sharper shadow. The string appears taut.
3. **Selection (Cutting):** Clicking a tag triggers the 'cut' sequence. The string snaps (opacity 0, scale 0). The tag rotates and falls out of the viewport. The wire 'ripples' as remaining tags adjust position.
4. **Empty:** If all items are bought, the wire is bare. A faint, dashed outline indicates the wire's presence. A message in Shippori Mincho B1 reads 'Ledger Clear'.
5. **Error:** If an item is out of stock, the tag is greyed out (#8B8B8B), the string is broken (dashed), and clicking it shakes the tag horizontally (no cut).

## Palette
- **Background:** #FDFBF7 (Off-white paper, warm neutral)
- **Ink/Text:** #2B2B2B (Deep charcoal, for item names and strings)
- **Accent/Price:** #D97706 (Amber/Ink depth, for prices and active states)
- **Wire/Neutral:** #E5E5E5 (Light grey, for the main wire and borders)
- **Disabled:** #8B8B8B (Medium grey, for out-of-stock items)

## Type
- **Item Names:** 'Genjyu Gothic' (or similar modern Japanese sans-serif). Clean, legible, medium weight. Used for product names.
- **Prices & Totals:** 'Shippori Mincho B1' (or similar traditional Japanese serif). Used for prices and the bottom ledger total. 
- **Ink Depth Mechanic:** The font weight or opacity of the price text correlates with the numerical value. High prices are bold/dark; low prices are light/thin. This visually reinforces the 'cost' of the item.
- **Constraint:** Never use Inter, Roboto, Arial, or system-ui. The typography must feel crafted and culturally specific.

## Layout
- **Vertical Wire:** A 1px vertical line (#E5E5E5) centered horizontally in the viewport. It extends from the top padding to the bottom ledger.
- **Tags:** Rectangular components (approx 120px width, 60px height) hanging from the wire. They are aligned centrally but have slight random rotation (-2deg to 2deg) and string length variation (10px to 30px) to avoid robotic perfection.
- **Bottom Ledger:** A fixed bar at the bottom. Contains 'Total Weight' (kg) and 'Total Cost' (¥). Styled like a paper slip attached to the wire. Uses Shippori Mincho B1 for numbers.
- **Spacing:** Generous vertical spacing between tags to allow for the 'sway' animation without collision.

## Motion
1. **Entrance (Clack):** On load, items slide down from the top. They use a spring animation with high stiffness and low damping to simulate 'clacking' together. They settle with a slight bounce.
2. **Ambient Sway:** The entire wire container rotates based on the total weight of items in the cart. 
   - Formula: `rotation = sin(time * frequency) * amplitude`. 
   - Amplitude increases with weight. Frequency decreases with weight (heavier = slower sway).
   - This creates a living, breathing interface.
3. **The Cut (Snap):** 
   - Clicking a tag triggers a 200ms animation.
   - The string (a small div above the tag) scales to 0 vertically and fades out.
   - The tag rotates 15deg and translates Y +100px, fading out.
   - The remaining tags above/below animate their `top` position to close the gap, using a spring animation to create a 'ripple' effect.
4. **Hover Lift:** TranslateY -4px with a cubic-bezier(0.175, 0.885, 0.32, 1.275) for a slight overshoot, simulating lifting a physical object.

## Constraints
- **No Modals:** All interactions are inline. No popups for 'Added to Cart'.
- **No Standard Buttons:** The tag is the button. No 'Add' text.
- **No Purple Glows:** Avoid AI-default SaaS aesthetics. Use hard, directional shadows (box-shadow: 2px 2px 0px #E5E5E5) to simulate paper depth.
- **Performance:** Use `transform` and `opacity` for all animations. Avoid layout thrashing.
- **Accessibility:** Ensure tags are focusable and have aria-labels. The 'cut' action should be keyboard accessible (Enter/Space).

## Responsive Design
- **Desktop:** The wire is centered. Tags are 120px wide. The bottom ledger is fixed at the bottom with 20px padding.
- **Mobile:** The wire remains centered. Tags scale to 90% of their desktop width. The bottom ledger becomes sticky with a backdrop-filter blur to maintain readability over scrolling content. Touch targets are expanded to 48px height minimum.
- **Breakpoints:** Use a media query at 768px to adjust font sizes and tag dimensions. Ensure the 'Ledger Clear' message remains centered and legible on small screens.

## Acceptance criteria
- [ ] Interface loads with items hanging from a central vertical wire.
- [ ] Typography uses Genjyu Gothic and Shippori Mincho B1 (or close equivalents). No Inter/Roboto.
- [ ] Prices are visually differentiated by weight/opacity based on value.
- [ ] Clicking a tag triggers a 'cut' animation: string snaps, tag falls, gap closes.
- [ ] The wire sways gently based on the total weight of purchased items.
- [ ] Empty state shows a bare wire with a 'Ledger Clear' message.
- [ ] Out-of-stock items are greyed out and do not cut.
- [ ] No 'Add to Cart' buttons or modals are present.
- [ ] The design feels tactile and physical, not flat or digital-only.
- [ ] All animations are smooth (60fps) and use transform/opacity.
- [ ] Responsive layout works on mobile and desktop without horizontal scrolling.
- [ ] Deliverable is a single-file HTML/CSS/JS solution.
