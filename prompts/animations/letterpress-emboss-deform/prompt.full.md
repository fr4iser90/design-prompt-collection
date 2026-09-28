# Letterpress Emboss Deform — Extended Brief

## Concept
Digital design often lacks physical weight. This animation bridges the gap by simulating the 'bite' of a letterpress. The goal is to make the user feel the resistance of the paper. The text does not just appear; it displaces the material.

## Palette
- **Paper:** `#E6E6E6` (Uncoated, matte stock). No gradients on the background.
- **Ink/Text:** `#FFFFFF` (Blind deboss) or `#333333` (Standard ink). *Recommendation: Use white text for pure shadow play, or dark grey for standard letterpress.*
- **Light Source:** Fixed at top-left (45 degrees).

## Visual Mechanics
1. **The 'Bite':** 
   - When the text moves down, the paper doesn't move with it; the text sinks into it.
   - We simulate this using `box-shadow` or `text-shadow` manipulation.
   - **Inset Shadow (Top-Left):** Represents the shadow inside the indentation. `inset 2px 2px 4px rgba(0,0,0,0.4)`.
   - **Drop Shadow (Bottom-Right):** Represents the highlight on the raised paper lip. `2px 2px 0px rgba(255,255,255,0.8)`.

2. **Motion Sequence:**
   - **Rest State:** Text is 'floating' 20px above paper. Large, soft, diffuse shadow.
   - **Press State:** Text moves to `translateZ(-10px)` or scales slightly. Shadows become tighter, sharper, and higher contrast. The inset shadow appears.
   - **Release:** Bounce back slightly to show elasticity of paper.

## Layout
- Large, heavy typography (e.g., Times New Roman Bold, or a slab serif). 
- Centered. High contrast against the mid-grey background.

## Interaction/Loop
- **Option A (Hover):** On `:hover`, the element 'presses' down. On `mouseleave`, it springs back up with a slight overshoot (paper elasticity).
- **Option B (Loop):** A continuous 'stamping' rhythm. Press (1s), Hold (0.5s), Release (0.5s). Pause (2s).

## Constraints
- No gradients on the text fill.
- Shadows must change *intensity* and *blur* dynamically, not just position.
- Avoid 3D perspective distortion on the text itself; keep it flat but change the Z-depth for shadow calculation if using CSS 3D, or fake it with 2D shadow scaling.

## Acceptance Criteria
1. The text appears to be *in* the paper, not on top of it.
2. The highlight on the bottom-right edge is distinct.
3. The motion feels heavy and impactful, not floaty.
