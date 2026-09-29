# Kintsugi Gold Seam Heal — Extended

## Concept
Kintsugi is the Japanese art of repairing broken pottery with lacquer dusted or mixed with powdered gold, silver, or platinum. As a philosophy, it treats breakage and repair as part of the history of an object, rather than something to disguise. This concept translates that philosophy into UI: interfaces that don't hide errors but highlight the resilience of the system. The visual metaphor is "broken but beautiful," suitable for insurance, mental health, or sustainability brands.

## Palette
-   **Void**: `#1a1a1a` (Background, deep matte black)
-   **Clay**: `#f5f5f5` (The ceramic body, slightly off-white)
-   **Gold**: `#d4af37` (The primary accent, metallic sheen via CSS gradients)
-   **Lacquer**: `#8b4513` (Subtle brown undertone for the adhesive before golding)

## Typography
-   **Display**: 'Cormorant Garamond' (Light weight) for headings. Elegant, serif, evokes tradition.
-   **Body**: 'Lato' or 'Source Sans Pro' (Regular) for instructions. Clean, readable, modern counterpoint.
-   **Rule**: Text must never obscure the gold seams. Use negative space generously.

## Layout
-   **Desktop**: Centered composition. The bowl occupies 60% of the vertical space. Instructions are bottom-aligned, small, subtle.
-   **Mobile**: Full-screen focus on the bowl. Instructions fade in after first interaction. Haptic feedback suggested via `navigator.vibrate` on mobile if supported.

## Motion Brief
1.  **Entrance**: Shards fall gently from above, settling into a broken arrangement. No bounce, just settle.
2.  **Ambient**: A slow, subtle shimmer on the existing gold seams (if any are pre-repaired) to catch the eye.
3.  **Interaction**: 
    -   *Hover*: Cursor becomes a pointer with a slight gold glow. Shards under cursor lift `z-index` and move 2-4px toward the mouse.
    -   *Click/Touch*: Triggers the "Join" animation. A gold gradient fills the gap between the hovered shard and its nearest neighbor. The animation is 800ms, ease-in-out. The sound of ceramic clicking (subtle) should be optional.

## Constraints Checklist
-   [ ] No purple gradients.
-   [ ] No "healing" green colors (gold only).
-   [ ] Shards must look like ceramic, not glass (matte finish).
-   [ ] Gold seams must have depth (box-shadow or SVG filters).

## Acceptance Criteria
-   User can identify the interaction immediately.
-   The gold seam animation feels physical and viscous.
-   The final state looks like a finished art piece, not a UI bug.

## Variants
-   **A**: Single bowl, multiple breaks.
-   **B**: Multiple small bowls, each representing a different "error" state that gets healed by user action.
