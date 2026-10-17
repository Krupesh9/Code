# Changes

## 2026-10-17 — Districts and moving hazards

- Added moving bonus rings, sliding gates, rotating sweepers, timed presses, swinging loads, slalom drums, and rolling hazards, with collision and reward rules.
- Added 36 district-aware route recipes and progressive hazard speed, density, road width, gate clearance, rival strength, and six objective types.
- Added CC0 photographed concrete/gravel surfaces, original-resolution asphalt/HDR sky, correctly filtered sky pixels, and district-specific road markings and grip.
- Changed Auto graphics to preserve sharper resolution, reduce effects first, and recover resolution; reduced car self-shadow artifacts and added opaque responsive controls.
- Added full tunnel sections, moving wind turbines/cranes, snowfall, animated garage presentation, and upcoming hazard callouts.
- Reworked engine synthesis and audio mixing with a compressor, separate volume controls, reusable noise buffers, and interrupted-context recovery. Existing save keys and backups remain compatible.
- Validation: JavaScript syntax and desktop renders across six districts passed without console errors. At 390×844, both arrows, drift, brake, and nitro remain on-screen; nitro is at the right edge. Full gameplay, audio listening, and physical-device performance remain for user testing.

## 2026-10-17 — Nightshift driving update

- Renamed the game and arcade entry from Apex Drive to Nightshift while retaining existing save keys and backup compatibility.
- Reversed swipe, tilt, and arrow input mapping to match the chase camera; corrected minimap handedness and lateral car positions.
- Rebuilt loop paths as offset corkscrews to separate entry and exit roads. Added loop traction assistance, a camera that follows the actual road path, and finish-line-based loop rewards.
- Added longer drift slides, countersteering, delayed grip recovery, bounded skid-mark and smoke pools, tire sounds, and wet-road spray.
- Added road-aligned asphalt UVs, painted lanes, shoulders, metal guardrails, drains, reflective posts, wet patches, street blocks, and dynamic headlights.
- Lowered the chase camera and added a persistent Road view camera setting. Corrected the displayed speed conversion to km/h.
- Added deployment, save backup, controls, asset-license, and visual-reference documentation.
- Validation: no automated tests or browser play-tests run for this revision, as requested.
