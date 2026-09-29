# Apothecary Cabinet Organization — Extended

## Concept
In an era of infinite scroll, we offer finite, curated order. 'Cabinet & Code' is a knowledge base for researchers who need to find, not just browse. The design language borrows from the physical libraries of the early 20th century—brass rails, white cards, and the clarity of north-facing studio light. It rejects the 'dashboard soup' of modern SaaS in favor of a single, elegant interface that feels like a trusted tool.

## Palette
- **Primary:** `#EAE6DF` (Bone White) – Background
- **Secondary:** `#2C3539` (Ink Black) – Text
- **Accent:** `#8A9A9B` (Patina Grey) – UI Elements/Handles
- **Highlight:** `#F0E6D2` (Aged Paper) – Card Backgrounds

## Typography
- **Display:** *Cormorant Garamond* or *Libre Caslon* — Elegant, high-contrast serif.
- **Body/UI:** *IBM Plex Mono* — Technical, precise, legible.
- **Hierarchy:** Large, spaced-out serifs for section headers. Small, tight monospace for labels and metadata.

## Layout
- **Desktop:** A centered "cabinet" container with max-width 1200px. Nav is a row of brass tabs. Content area is a stack of "drawers".
- **Mobile:** Vertical accordion. Tabs become a sticky header. Drawers open as modals.

## Motion Brief
1. **Entrance:** The cabinet frame fades in. A single light beam sweeps across the surface.
2. **Interaction (Drawer Open):** When a tab is clicked, the drawer slides down 300px. The contents (cards) fade in and slide up from the bottom of the drawer with a 50ms stagger.
3. **Interaction (Card Hover):** Cards lift 4px. Shadow deepens. A "date" or "category" stamp appears in the corner.

## Constraints
- No drop shadows with blur > 4px.
- No neon colors.
- Animations must be < 300ms to feel snappy.

## Acceptance Criteria
- User can identify a section by its "tab" label.
- Opening a drawer feels mechanical but smooth.
- Text is legible at 12px.
