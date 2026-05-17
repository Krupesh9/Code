# Photo Asset Library

The app loads photos in this order:

1. **`assets/photos/<slug>.jpg`** — your local file (highest priority).
2. **Wikimedia Commons fallback** — auto-loads if local is missing.
3. **Gradient placeholder** — shown only if both fail.

So you can ship the app immediately with no images and it still works.
Drop your own JPGs in here (named to match the slug column below) any
time and they'll take over instantly. No code changes needed.

## File format

- **Format:** `.jpg` (lowercase extension)
- **Recommended size:** ~800×800 px (card thumbnail crops to 96×96)
- **Aspect ratio:** square works best (`object-fit: cover` will crop landscape/portrait)
- **File size target:** under 200 KB each for fast mobile load

## Filename map

Save each downloaded image as `<slug>.jpg`:

### Day 2 · Santa Cruz & Carmel
| Slug | Subject | Wikimedia source |
|---|---|---|
| `mystery-spot.jpg` | The Mystery Spot sign | [link](https://commons.wikimedia.org/wiki/File:Mystery_Spot_(Santa_Cruz)_sign_2008.jpg) |
| `lone-cypress.jpg` | Lone Cypress, Pebble Beach | [link](https://commons.wikimedia.org/wiki/File:Lone_Cypress.jpg) |
| `carmel-by-the-sea.jpg` | Carmel Ocean Avenue | [link](https://commons.wikimedia.org/wiki/File:Carmel-by-the-Sea_-_Ocean_Avenue.jpg) |

### Day 3 · Big Sur
| Slug | Subject |
|---|---|
| `point-lobos.jpg` | Point Lobos State Reserve |
| `bixby-bridge.jpg` | Bixby Creek Bridge |
| `pfeiffer-beach.jpg` | Pfeiffer Beach (purple sand) |
| `mcway-falls.jpg` | McWay Falls |

### Day 5–6 · Yosemite
| Slug | Subject |
|---|---|
| `tunnel-view.jpg` | Tunnel View (Half Dome + El Cap + Bridalveil) |
| `mariposa-grove.jpg` | Grizzly Giant sequoia |
| `lower-yosemite-falls.jpg` | Lower Yosemite Falls |
| `vernal-fall.jpg` | Vernal Fall |
| `bridalveil-fall.jpg` | Bridalveil Fall |
| `el-capitan.jpg` | El Capitan from meadow |

### Day 7 · Tioga Pass
| Slug | Subject |
|---|---|
| `olmsted-point.jpg` | Olmsted Point granite |
| `tenaya-lake.jpg` | Tenaya Lake |
| `tuolumne-meadows.jpg` | Tuolumne Meadows |
| `convict-lake.jpg` | Convict Lake |

### Day 8 · Lake Tahoe
| Slug | Subject |
|---|---|
| `heavenly-gondola.jpg` | Heavenly Gondola |
| `emerald-bay.jpg` | Emerald Bay overlook |
| `sand-harbor.jpg` | Sand Harbor State Park |
| `bonsai-rock.jpg` | Bonsai Rock |
| `cave-rock.jpg` | Cave Rock |

### Day 9 · Return to Bay
| Slug | Subject |
|---|---|
| `eagle-rock.jpg` | Eagle Rock Trail viewpoint |
| `battery-spencer.jpg` | Golden Gate from Battery Spencer |

### Day 10 · Muir Woods & Bridges
| Slug | Subject |
|---|---|
| `muir-woods.jpg` | Muir Woods redwoods |
| `golden-gate-bridge.jpg` | Golden Gate from Marin |
| `lands-end.jpg` | Lands End Labyrinth |
| `tiled-steps.jpg` | 16th Avenue Tiled Steps |
| `twin-peaks.jpg` | Twin Peaks SF view |

### Day 11 · SF City Landmarks
| Slug | Subject |
|---|---|
| `cable-car.jpg` | Powell-Hyde cable car |
| `lombard-street.jpg` | Lombard Street curves |
| `pier-39.jpg` | Pier 39 sea lions |
| `wave-organ.jpg` | Wave Organ |
| `transamerica-pyramid.jpg` | Transamerica Pyramid |

## How to add more

1. Pick a clean square photo (your own, Unsplash, Wikimedia, etc.).
2. Crop/resize to ~800×800.
3. Save as `<slug>.jpg` in this folder.
4. Commit and push — done. The app picks it up automatically.

To wire up a brand-new slug not in the table, edit `SLUG_MAP` in
`index.html` and add `"Wikimedia_Filename.jpg": "your-new-slug"`.
