# Nightshift

A WebGL arcade racer with 52 car models/variants from 17 brands, 36 events across six environments, a configurable garage, nitro, drifting, jumps, and loop courses. Built with Three.js; no build tool or backend is needed.

## Play

- Swipe left/right or hold the arrow buttons to steer. Acceleration is automatic.
- Hold **DRIFT** while steering to slide. Countersteer to catch the rear; release drift to regain grip.
- Hold **BRAKE** to slow down; release to accelerate.
- Hold **NITRO** to boost. Release and reapply inside the blue charge zone for perfect nitro.
- In the air, tap **BARREL ROLL** for a stunt. Loops use traction assistance.
- Settings offers Sport/Assisted handling, Chase/Road cameras, graphics quality, tilt steering, music and effects.
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

All car models, thumbnails, and surface textures use relative paths and work in a repository subfolder. Keep their spelling and capitalization unchanged. Three.js is pinned to 0.160.1 on jsDelivr, with an unpkg fallback. A network connection is needed on first load; blocked CDNs or disabled WebGL show a retry message. The page is not a fully offline app. Audio starts after a user gesture, and tilt permission depends on browser support and a secure context. High graphics can be demanding; Auto lowers the pixel budget and shadows, while Smooth explicitly reduces effects.

## Assets and limitations

See [ASSET-CREDITS.md](ASSET-CREDITS.md) for each model's source and terms. Several models have noncommercial licenses; this collection is for noncommercial use. Names identify depicted cars and do not imply manufacturer endorsement. Ratings are arcade-balanced, not manufacturer specifications. The models differ in detail and fidelity.

This is a browser arcade game, not a commercial-engine simulation. The current steering, loop, drift, road, camera, and lighting changes are ready for user play-testing; automated/browser tests were skipped at the user's request. Frame rate and iPhone compatibility have not been verified for this revision.

## Visual references

The requested Asphalt references are linked for comparison, not bundled as game assets:

- [Apple's Asphalt Legends Unite preview and screenshots](https://apps.apple.com/us/story/id1735568051): lighting, reflections, garage presentation, and drifting.
- [Asphalt 9 screenshot gallery](https://www.mobygames.com/game/112064/asphalt-9-legends/screenshots/): road environments, track obstacles, and race HUD examples.
