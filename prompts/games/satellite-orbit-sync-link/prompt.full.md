## Concept
'Satellite Orbit Sync' is a high-precision rhythm game set in deep space. The player acts as a ground station operator. Multiple satellites orbit a central point (the station) at varying radii and angular velocities. Data packets must be dropped from these satellites to a receiving dish that opens and closes in a rhythmic pattern. The challenge lies in predicting the satellite's position at the moment of the drop and the receiver's state at the moment of impact. The game emphasizes anticipation and timing over reflexes.

## Core loop
1. **Observe**: Satellites orbit continuously. One satellite is highlighted as 'active' (or the player selects one by proximity/click). 
2. **Anticipate**: The Receiver Window pulses open/closed. The player calculates the drop time so the packet intersects the window while open.
3. **Act**: Click to drop the packet. It travels linearly (or with slight gravity) to the receiver.
4. **Resolve**: If packet hits open window -> +1 Data (GB), score increases, visual success pulse. If packet hits closed window or misses -> +1 Miss, visual error flash.
5. **Reset/Continue**: Next packet ready. If Misses >= 5, Game Over. If Data >= 100, Win.

## Input
- **Mouse/Touch**: Click/Tap anywhere on the canvas to drop a packet from the currently active satellite. 
- **Active Satellite Logic**: The satellite closest to the 'drop zone' angle or the one most recently interacted with becomes active. Alternatively, clicking directly on a satellite selects it, then a second click drops. *Simpler implementation for one-shot*: Clicking drops from the satellite currently in the 'upper' quadrant or the one with the shortest path to the receiver. Let's go with: Clicking drops from the satellite that is currently closest to the receiver's angular position, or the player clicks a specific satellite to 'lock' it, then clicks again to drop. To keep it simple: Clicking anywhere drops from the satellite that is currently 'in phase' or the one the mouse is hovering over. Let's specify: Hovering over a satellite highlights it. Clicking drops from the highlighted satellite. If no satellite is highlighted, clicking drops from the one closest to the receiver.

## Fail / win
- **Fail**: Accumulate 5 Misses. The connection is severed. Show 'CONNECTION LOST' in red.
- **Win**: Successfully transfer 100 packets (100GB). Show 'TRANSFER COMPLETE' in green.
- **Score**: Base score = 100 per packet. Bonus for consecutive hits (combo multiplier). Speed bonus if completed under a time limit (optional, but keep it simple: just count packets).

## Entities
1. **Satellites (3-5)**: White circles/triangles. Orbit the center at different radii (e.g., 100px, 150px, 200px) and speeds (e.g., 0.5 rad/s, 0.8 rad/s, 1.2 rad/s). They leave a faint blue trail.
2. **Receiver**: A fixed arc segment at the bottom center (or center). It has a 'state': Open (glowing blue, 0.5s duration) and Closed (dim gray, 1.5s duration). This creates the rhythm.
3. **Data Packets**: Small white squares/circles dropped from satellites. They move towards the receiver center.
4. **Background**: Static starfield or subtle parallax stars.

## Feel
- **Juice**: 
  - *Success*: Blue particle burst at receiver. Screen shake (subtle). Sound: Digital 'ping'.
  - *Miss*: Red flash at receiver or packet impact point. Sound: Low 'thud' or static noise.
  - *Orbit*: Smooth, continuous motion. Trails fade out.
- **Visuals**: High contrast. Dark background (#050510). White entities (#FFFFFF). Blue accents (#0088FF). Red for errors (#FF0000).

## Palette
- Background: #050510 (Deep Space)
- Primary: #FFFFFF (Satellites, Packets, Text)
- Accent: #0088FF (Receiver Open, Trails, Success)
- Error: #FF0000 (Misses, Closed Receiver)

## Type
- **HUD**: Futura (or similar geometric sans) for 'DATA: 0/100', 'MISSES: 0/5'.
- **Telemetry**: Courier New for small status text like 'SATELLITE LOCK: ACTIVE'.

## Constraints
- Single HTML file.
- Canvas 2D context.
- No external assets (images/sounds) unless base64 encoded or synthesized via Web Audio API.
- Must be responsive to window resize.
- Frame rate independent movement (use delta time).

## Acceptance criteria
- [ ] Game starts immediately or with a clear 'Start' click.
- [ ] Satellites orbit smoothly at different speeds.
- [ ] Receiver window pulses open/closed rhythmically.
- [ ] Clicking drops a packet from a satellite.
- [ ] Packet collision detection with receiver works.
- [ ] Misses are counted correctly (5 misses = Game Over).
- [ ] Wins are counted correctly (100 packets = Win).
- [ ] HUD displays current data and misses.
- [ ] Visual feedback for hit/miss is distinct.
- [ ] Code is clean, commented, and runs without errors in Chrome/Firefox.
- [ ] Layout adapts to mobile and desktop viewports without breaking aspect ratio.
- [ ] Animations are smooth and do not stutter on standard hardware.
- [ ] All game states (Start, Playing, GameOver, Win) are handled gracefully.

## Type pairing
Futura + Courier New


## Motion
- entrance: Orbit paths draw themselves, satellites appear
- ambient: Satellites orbit at different speeds; receiver window opens periodically
- interaction: Click to drop data packet; must hit receiver when it passes through window
