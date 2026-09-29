# Silicone Sealant Cure — Extended Brief

## Concept
'Seal & Set' is a brand for professionals who value precision and reliability. The website must convey the physical properties of their products: the satisfying transition from liquid application to solid, flexible seal. The design language is 'Soft-Machine'—industrial but humane, clean but tactile.

## Palette
- **Primary:** `#F2F2F2` (Cool White), `#8C9EAB` (Slate Blue-Grey)
- **Secondary:** `#D1D5DB` (Light Grey)
- **Accent:** `#E5E7EB` (Highlight White)
- **Text:** `#1F2937` (Dark Grey)

## Typography
- **Display:** 'Aktiv Grotesk' or 'Neue Haas Grotesk'. Clean, neutral, professional.
- **Body:** 'Aktiv Grotesk' Light/Regular.
- **Data/Labels:** 'IBM Plex Mono' or 'Space Mono'. Small size, uppercase, tracking +0.05em.

## Layout
- **Hero:** Full viewport height. Centralized visual of the sealant bead. Headline is minimal: 'The Perfect Seal.' Subheadline: 'Precision adhesives for complex assemblies.'
- **Product Grid:** 3-column grid. Each item is a card with a soft shadow and a 'soft-touch' hover effect (slight lift, shadow blur increase).
- **Technical Specs:** Presented as 'data sheets' with clean tables and monospaced numbers.

## Motion Design
- **Entrance:** Elements fade in with a slight upward drift (20px) and ease-out.
- **Ambient:** The hero sealant bead slowly shifts between 'wet' (glossy reflection) and 'cured' (matte texture) states on a loop, or driven by scroll progress.
- **Interaction:** Hovering over product cards causes the image to zoom slightly (1.05x) with a slow, viscous easing curve. Buttons have a 'squish' effect on click (scale 0.98) that feels like pressing rubber.

## Constraints Checklist
- [ ] No Inter, Roboto, Arial, or system fonts.
- [ ] No purple/blue gradients typical of generic SaaS.
- [ ] No sharp, aggressive shadows.
- [ ] Ensure all animations respect `prefers-reduced-motion`.
- [ ] Maintain high contrast for readability.

## Acceptance Criteria
- The hero animation clearly demonstrates the material change (liquid to solid).
- The overall feel is calm, professional, and tactile.
- Code is modular, using CSS variables for colors and easing functions.
