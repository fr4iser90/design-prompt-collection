# Radio Scan Archive — Extended

**Concept:**
A landing page for 'ScanArchive', a platform for archiving and analyzing radio signals. The aesthetic is retro-utility, inspired by vintage radio equipment, oscilloscopes, and early computer terminals. It focuses on the 'hunt' for signals.

**Palette:**
- Primary Background: Void Black `#050505`
- Active Signal: Phosphor Green `#00ff41`
- UI Structure: Dark Grey `#333333`
- Text: White `#ffffff`
- Error/Static: Alert Red `#ff3333`

**Typography:**
- All Text: Monospace (e.g., 'VT323', 'Share Tech Mono') to maintain the terminal/radio vibe.

**Layout:**
- **Desktop:** A central 'console' container. Data is displayed in key-value pairs like `FREQ: 104.5MHz`, `STATUS: LOCKED`. Visuals include tuning dials and waveform graphs.
- **Mobile:** Simplified console, stacked data fields, but maintaining the monospace aesthetic.

**Motion Brief:**
- **Entrance:** Text types out character-by-character. Scanlines appear first, then content fades in.
- **Ambient:** Scanlines move slowly. Background has a subtle 'noise' texture.
- **Interaction:** Scrolling triggers a 'tuning' animation where a horizontal line moves across the screen, 'locking' onto sections with a 'Signal Found' indicator.

**Constraints Checklist:**
- [ ] No sans-serif fonts. Everything must be monospace.
- [ ] CRT effects should be subtle, not causing nausea.
- [ ] Use of green must be consistent for 'active' states.

**Acceptance Criteria:**
- The page feels like interacting with a piece of vintage technical equipment.
- Motion is mechanical and precise, not fluid.
- Clear distinction between 'found' signals and 'static'.
