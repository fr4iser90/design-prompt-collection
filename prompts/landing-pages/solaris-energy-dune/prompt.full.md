# Solaris Energy Dune — Extended

## Concept
Solaris Energy is a tech-forward solar power company operating in desert environments. The landing page must convey efficiency, light, and innovation. The design language is 'arid-minimal' meets 'clean tech': bright, airy, and data-driven.

## Palette
- **Bone-White**: #F5F5F5 (Background)
- **Solar-Yellow**: #F7C873 (Accents, CTAs, Data Highlights)
- **Charcoal**: #1A1A1A (Text, Dark Elements)
- **Sand-Shadow**: #E0D8C8 (Subtle backgrounds, curves)

## Typography
- **Display**: Space Grotesk Bold (Tech, geometric)
- **Body**: Space Grotesk Regular
- **Hierarchy**: Clear, bold headings. Data labels in monospace (e.g., IBM Plex Mono).

## Layout
- **Hero**: Animated SVG sun rising behind layered dune silhouettes (SVG paths with fill colors in Sand-Shadow and Bone-White). Headline: 'Harness the Sun' in Charcoal. CTA Button: Solar-Yellow, rounded, text in Charcoal.
- **Navigation**: Fixed top, bone-white background, links in Charcoal. Active state: Solar-Yellow underline.
- **Sections**:
  1. **Dune Curves**: Section dividers are smooth, flowing SVG curves in Sand-Shadow, creating a sense of movement and landscape.
  2. **Energy Output**: Interactive line chart showing daily solar output. Line color: Solar-Yellow. Background: Bone-White. Hover: Tooltip shows exact energy values.
  3. **Technology**: Three-column layout (desktop) / Stacked (mobile). Icons: Minimalist sun/panel icons in Charcoal. Text: Brief description of tech.
  4. **Contact**: Form with minimal inputs. Borders in Charcoal. Focus state: Border color Solar-Yellow.

## Motion
- **Entrance**: Sun rises slowly in hero (5s). Text fades in after sun reaches 50%.
- **Scroll**: Dune curves move slightly on scroll (parallax).
- **Interaction**: Chart line animates on load. Hover effects on icons (scale 1.1, color Solar-Yellow).
- **Light Sweep**: A subtle CSS gradient animation on CTA button to simulate light sweep on hover.

## Constraints
- No dark mode default (use bone-white).
- No purple or blue tech clichés.
- Charts must be clean and minimalist.
- Curves must be smooth and organic.
- Responsive: Hero SVG scales correctly. Mobile layout stacks columns.

## Acceptance Criteria
- Palette uses bone-white, solar-yellow, and charcoal.
- Typography is Space Grotesk (not system default).
- Dune curves are prominent section dividers.
- Hero animation shows sun rising.
- No card components.
