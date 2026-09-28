# Vault Archive Stamp — Extended

## Concept
Vault positions digital permanence as a tangible, physical act. The design evokes the trust of paper records and the authority of an official seal. It’s not 'skeuomorphic' in a fake-plastic way, but rather 'materially honest'—using textures and interactions that mimic ink, paper, and pressure.

## Palette
- **Paper:** #f4f1ea (Warm Off-White) — The base canvas.
- **Ink:** #2c2c2c (Deep Charcoal) — For all primary text.
- **Seal:** #d32f2f (Official Red) — Used for stamps, 'Verified' badges, and primary buttons. Must look slightly translucent where it overlaps text.
- **Folder:** #e0dcd3 (Manila) — For secondary backgrounds or folder tabs.

## Typography
- **Display:** 'Special Elite' or 'Courier Prime' (Typewriter/Monospace). Used for labels, dates, and ID numbers. All-caps for labels.
- **Headings:** 'Merriweather' (Serif). Bold, classical, authoritative.
- **Body:** 'Lato' (Sans-serif) or 'Source Sans Pro'. Clean for readability of long-form descriptions.

## Layout Structure
1. **Hero:** Centered content. A large, bold headline: "PERMANENCE, SEALED." Overlapping the bottom right of the text is a large, rotated red 'ARCHIVED' stamp graphic. The background has a very faint grid, like ledger paper.
2. **Collections Grid:** Cards look like file folders. 
   - *Top edge:* Tab with the collection name.
   - *Content:* Thumbnail image with a 'slight' sepia filter.
   - *Badge:* A small red 'Verified' stamp in the corner.
3. **Process Section:** Step-by-step flow using icons that look like rubber stamps (Ink, Paper, Seal).

## Motion Brief
- **Entrance:** The hero stamp 'lands' after a 0.5s delay. It scales from 1.1 to 1.0 with a slight rotate(-15deg to -10deg) and opacity fade-in.
- **Hover:** On collection cards, the folder tab lifts slightly (translateY -4px) and casts a subtle drop shadow. The 'Verified' stamp wiggles slightly (rotate ±2deg).
- **Scroll:** As sections enter the viewport, they slide up from below the fold with a slight 3D perspective transform (rotateX 5deg to 0deg), mimicking a document being slid out of a box.

## Constraints
- No gradients. Use solid colors and opacity for depth.
- Stamps must not obscure critical text; use mix-blend-mode: multiply.
- Typography must remain legible on textured backgrounds.
- Mobile: Stamps scale down; folder tabs become left-side borders.

## Acceptance Criteria
- The design feels tactile and trustworthy.
- The 'stamp' animation is satisfying, not gimmicky.
- The contrast between the warm paper and stark red seal creates visual tension and focus.
