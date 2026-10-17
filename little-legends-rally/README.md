# Nightshift

A WebGL arcade racer with 52 car models/variants from 17 brands, 36 events across six environments, a configurable garage, nitro, drifting, jumps, and loop courses. Built with Three.js; no build tool or backend is needed.

## Play

- Swipe left/right or hold the arrow buttons to steer. Acceleration is automatic.
- Hold **DRIFT** while steering to slide. Countersteer to catch the rear; release drift to regain grip.
- Hold **BRAKE** to slow down; release to accelerate.
- Hold **NITRO** to boost. Release and reapply inside the blue charge zone for perfect nitro.
- In the air, tap **BARREL ROLL** for a stunt. Loops use traction assistance.
- Settings offers Sport/Assisted handling, Chase/Road cameras, graphics quality, tilt steering, and separate music/effects volume controls.
- Drive through moving rings for bonus credits, points and nitro. Sliding gates, rotating sweepers, timed presses, swinging loads, slalom drums, and rolling rocks/snowballs appear progressively. Brake or change your line to pass hazards; warning paint and the HUD identify approaching hazards.
- Keyboard alternatives: arrows steer, down/S brakes, Shift drifts, Space boosts, Escape pauses.

## Save progress

Campaign unlocks, best results, currency, purchased cars, cosmetics, upgrades, and settings save automatically in the browser. Nightshift retains the original `apex-drive-v2` storage key and save-file format so the rename does not reset an existing garage. A previous complete save is retained as a recovery copy.

Use **Settings → Export backup** before switching browsers, devices, or website addresses. Import it on the destination with **Settings → Import backup**. Localhost and GitHub Pages are separate browser storage origins; saves do not automatically sync between them. Clearing browser data or private browsing can remove browser saves. An unfinished race restarts; collected credits are retained.

## Local preview

From this folder:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Open http://127.0.0.1:8765/. Keep this address consistent to retain the same browser save. Do not open `index.html` through `file://`, because browsers restrict fetching local model files.

## GitHub Pages

For the existing `Krupesh9/Code` repository, keep this entire folder in the repository and publish the root of `main`. The expected game address is:

https://krupesh9.github.io/Code/little-legends-rally/

For a separate repository:

1. Create a GitHub repository, for example `nightshift`.
2. Upload `index.html`, the complete `assets/` directory, and `ASSET-CREDITS.md` to the repository root. Use Git or GitHub Desktop if the browser upload limit is reached.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select **main** and **/(root)**, then **Save**.
6. Wait for GitHub's Pages deployment to finish. Open `https://YOUR-USERNAME.github.io/nightshift/`.

All car models, thumbnails, and surface textures use relative paths and work in a repository subfolder. Keep their spelling and capitalization unchanged. Three.js is pinned to 0.160.1 on jsDelivr, with an unpkg fallback. A network connection is needed on first load; blocked CDNs or disabled WebGL show a retry message. The page is not a fully offline app. Audio starts after a user gesture, and tilt permission depends on browser support and a secure context. High graphics can be demanding; Auto starts at up to 2× display resolution, reduces secondary effects before resolution, and restores resolution when frame time improves. High allows up to 2.5× within an 8.5-megapixel budget; Smooth explicitly reduces effects.

## Assets and limitations

See [ASSET-CREDITS.md](ASSET-CREDITS.md) for each model's source and terms. Several models have noncommercial licenses; this collection is for noncommercial use. Names identify depicted cars and do not imply manufacturer endorsement. Ratings are arcade-balanced, not manufacturer specifications. The models differ in detail and fidelity.

This is a browser arcade game, not a commercial-engine simulation. The current revision is ready for user driving and difficulty assessment. JavaScript syntax and a brief desktop/mobile browser render are checked; full race playthroughs and physical iPhone testing are not covered. Frame rate depends on device and graphics settings.

## Visual references

The requested Asphalt references are linked for comparison, not bundled as game assets:

- [Apple's Asphalt Legends Unite preview and screenshots](https://apps.apple.com/us/story/id1735568051): lighting, reflections, garage presentation, and drifting.
- [Asphalt 9 screenshot gallery](https://www.mobygames.com/game/112064/asphalt-9-legends/screenshots/): road environments, track obstacles, and race HUD examples.

## Campaign variety

| District | Surface and route | Main hazards |
| --- | --- | --- |
| Pacific Coast | Highway and concrete promenade; flowing bends | Slalom drums, moving gates, sweepers |
| Neon Metro | Wet expressway, tunnels, city chicanes | Gates, overhead presses, sweepers |
| Redrock Canyon | Photographed gravel; climbs and ridge turns | Rolling rocks, drums, sweepers |
| Alpine Pass | Snowfall, cold asphalt and icy concrete; switchbacks | Snowballs, gates, slalom |
| Rainforest Run | Gravel/asphalt, monsoon conditions and bridge crossings | Swinging loads, gates, rocks |
| Storm Harbor | Concrete docks, covered roads and narrower lanes | Presses, sweepers, gates, swinging loads |

Later events increase moving-hazard speed, reduce obstacle spacing and gate openings, narrow the road, and strengthen rivals. Thirty-six route recipes combine district-specific opening sections with different technical sections. Objectives rotate through clean runs, ring collections, stunts, drift duration, near misses and score. Objectives award extra credits; finishing top three still unlocks progression.

The game saves on background/close and pauses an active race. Audio resumes after a tap; mobile browsers can require that gesture after an interruption. The garage animates while open, with a reduced-motion option. The app does not attempt to run animations or audio after it is closed.
