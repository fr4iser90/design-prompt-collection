# Ledger Rule Alignment — Extended

## Concept
Balanced Books promises clarity and accuracy in financial management. The design leverages the visual language of traditional double-entry bookkeeping. The 'ruled ledger' is a symbol of order, accountability, and trust. By making the grid visible and enforcing strict alignment, the design communicates that every number has a place and everything balances.

## Art Direction
**Palette:**
- **Paper White**: `#f9f9f9` (Main background)
- **Ledger Blue**: `#003366` (Rules, borders, primary text)
- **Debit Red**: `#cc0000` (Used for 'Expenses' or 'Negative' indicators, and accent buttons)
- **Rule Gray**: `#e0e0e0` (Fainter horizontal lines)

**Typography:**
- **Numbers**: 'Lora' or 'Crimson Text' in tabular figures (monospaced digits) to ensure column alignment.
- **Labels**: 'Inter' or 'Roboto Condensed', uppercase, small size, letter-spacing 1px.
- **Headings**: 'Lora' bold, large, aligned left or centered within the grid.

**Texture:**
- **Watermark**: A very faint (5% opacity) repeating pattern of the 'Balanced Books' logo in the background.
- **Shadow**: Subtle drop shadows on cards to lift them slightly off the 'paper' surface.

## Layout
**Hero:**
- A large, centered heading: "EVERY PENNY ACCOUNTED FOR."
- Below, a mock 'ledger entry' showing the core value proposition in a table format.

**Features Section:**
- A 3-column grid.
- Each feature is a 'row' in the ledger.
- Left column: Icon/Label. Middle: Description. Right: Metric/Status.

## Motion Design
1. **Entrance**: The 'rules' (horizontal lines) draw themselves from left to right on load.
2. **Interaction**:
   - **Row Hover**: When hovering over a ledger row, the background color shifts to a pale blue (`#e6f2ff`), simulating a highlighter marker.
   - **Number Ticker**: Key financial metrics in the hero section count up from 0 to the final value, aligned to the right of their column.
3. **Ambient**: A faint 'ink drying' animation on the main heading (opacity change from 0.8 to 1.0) on load.

## Constraints Checklist
- [ ] Grid alignment must be pixel-perfect.
- [ ] No purple or gradient backgrounds.
- [ ] Numbers must use tabular figures for proper column alignment.
- [ ] Mobile view: Collapse the 3-column ledger into a single-column card list, but keep the 'ruled' background.

## Acceptance Criteria
- The page feels orderly and calm.
- The distinction between 'Credits' (Blue) and 'Debits' (Red) is clear but not alarming.
- The 'ledger' metaphor is consistent throughout the layout.
