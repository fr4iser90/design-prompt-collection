# Ledger Blueprint Reconciliation — Extended

## Concept
"VeriLedger" solves the chaos of financial discrepancies. The design metaphor is the "Blueprint" meets the "Ledger." It combines the technical precision of engineering drawings (grid lines, annotations) with the clarity of accounting (columns, numbers, balance). The goal is to convey that the software brings order to chaos through rigid, trustworthy logic. It should feel like looking at a clean, approved architectural plan.

## Palette
- **Paper White:** #ffffff (Background)
- **Blueprint Blue:** #005f73 (Headings, Primary UI)
- **Active Teal:** #0a9396 (Links, Interactive States)
- **Verified Gold:** #e9d8a6 (Success states, subtle highlights)

## Typography
- **Headings:** "Work Sans" or "Inter" (used strictly for structure, not as a generic body font). Bold, geometric.
- **Data/Numbers:** "JetBrains Mono" or "Roboto Mono". Tabular figures are essential for column alignment.
- **Body:** "Work Sans" Light. Clean, readable.

## Layout
- **Grid System:** Explicitly visible 12-column grid using thin, light-blue lines (opacity 0.1). Content sits on the grid, not on top of cards.
- **Hero:** A large, centered headline "Balance the Books" with a visual representation of two mismatched ledgers sliding into perfect alignment.
- **Features:** Three columns, separated by vertical grid lines. No boxes. Just text and line icons.

## Motion
- **Reconciliation Animation:** In the hero, two sets of numbers slide horizontally and snap into place. A green checkmark fades in.
- **Hover:** Buttons invert colors (Teal to White text). No scaling.
- **Scroll:** Parallax is forbidden. Static, stable scrolling to reinforce trust.

## Constraints Checklist
- [ ] No dark mode.
- [ ] No purple or neon accents.
- [ ] No drop shadows.
- [ ] Numbers must be monospaced/tabular.
- [ ] Grid lines must be visible but subtle.

## Acceptance Criteria
- The page feels structured and orderly.
- The "blueprint" grid is a design feature, not just background noise.
- The reconciliation metaphor is clear and satisfying.
