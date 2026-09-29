Build a single-page React interface for 'Mon no B Groceries', a conceptual grocery shopping tool that rejects standard e-commerce patterns in favor of physical ledger metaphors. The core visual is a vertical wire (thin, dark line) running down the center of the viewport. Grocery items are not cards; they are rectangular paper tags hanging from this wire via a short string. 

**Visual Design & Typography:**
Use a strict palette: Background #FDFBF7 (off-white paper), Ink #2B2B2B (text/strings), Accent #D97706 (price/ink depth), and Neutral #E5E5E5 (wire). Typography must use 'Genjyu Gothic' for item names (clean, modern Japanese sans-serif) and 'Shippori Mincho B1' for prices and ledger totals (traditional serif). Do not use Inter, Roboto, or Arial. The price text should visually represent 'ink depth'—higher prices appear bolder or darker, lower prices lighter.

**Layout & Components:**
1. **The Wire:** A fixed vertical line centered horizontally. 
2. **The Tags:** Each item is a tag component. It hangs from the wire. The string length varies slightly to prevent perfect alignment (organic feel). The tag contains: Item Name (Genjyu Gothic), Price (Shippori Mincho B1, bolded by value), and a subtle 'cut' indicator (a dotted line near the top of the tag).
3. **The Cart:** A fixed bottom bar showing 'Total Weight' and 'Total Cost'. It does not look like a standard cart icon; it looks like a hanging scale or a simple ledger total.
4. **Empty State:** If no items are added, the wire is bare, with a faint ghost outline of where tags would hang.

**Interactions & Motion:**
1. **Entrance:** When the page loads, items slide down from the top, clacking together. Use Framer Motion for spring physics. They should settle with a slight bounce.
2. **Ambient Sway:** The entire wire container should sway gently (rotate -2deg to 2deg) based on the total weight of items in the cart. Heavier carts sway more slowly but with greater amplitude.
3. **The Cut:** Clicking a tag triggers the 'buy' action. The string connecting the tag to the wire snaps (animation: string disappears, tag rotates and falls off-screen). The remaining tags above/below adjust their spacing slightly to compensate for the lost item, causing a ripple effect down the wire.
4. **Hover:** Hovering a tag lifts it slightly (translateY -4px) and increases the shadow depth, simulating lifting a physical tag.

**Constraints:**
- No 'Add to Cart' buttons. The tag itself is the button.
- No modals. All feedback is inline or via the bottom ledger.
- No purple glows or standard SaaS shadows. Use hard, directional shadows to simulate paper depth.
- Ensure the 'cut' animation is snappy (duration < 300ms) to feel like a physical severing.
- The interface must feel calm and deliberate, not frantic.

**Responsive Layout:**
On desktop, the wire remains centered with ample whitespace on sides. On mobile, the wire stays centered but tags scale down to 80% width to prevent overflow. The bottom ledger bar becomes sticky with a backdrop blur of the paper background. Touch targets for tags must be at least 44x44px. On narrow screens, the 'Total Weight' label may abbreviate to 'Wt.' to save space.

**Deliverable:**
Single-file HTML/CSS/JS. All styles and scripts must be embedded. No external CSS files. Use CDN links for React, ReactDOM, Babel, and Framer Motion. Ensure the code is self-contained and runs directly in a browser without a build step.
