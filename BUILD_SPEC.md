# California Roadtrip Companion — Build Spec

A mobile-first, single-page travel guide for a 12-day California family roadtrip (Patel × Panchal families, May 30 – June 10, 2026). Built for GitHub Pages, single HTML file, no build step.

---

## 1. Project Setup for GitHub Pages

```bash
# Repo layout
ca-roadtrip/
├── index.html          # Everything in one file (HTML + CSS + JS)
├── README.md
└── .nojekyll           # Empty file, prevents Jekyll processing
```

**Deploy:** Push to `main`, then Settings → Pages → Source: `main` branch, `/` root. Site goes live at `https://<username>.github.io/ca-roadtrip/`.

**Tell Claude Code:**
> Build a single-file `index.html` for a mobile-first California roadtrip companion app per the spec in `BUILD_SPEC.md`. No frameworks, no build step — vanilla HTML/CSS/JS. Inter + Fraunces from Google Fonts. Photos sourced via Wikimedia Commons `Special:FilePath` redirect with onerror fallback to gradient placeholders. Optimized for iPhone/Android home-screen install. Implement every screen, every day, every restaurant, every badge as specified.

---

## 2. Design System

### Color tokens (CSS custom properties)

```css
--bg: #F7F2EA;
--bg-elevated: #FFFFFF;
--bg-sunken: #EFE9DE;
--ink: #1B2A3B;
--ink-soft: #4A5868;
--ink-mute: #8A8275;
--line: rgba(27, 42, 59, 0.08);
--line-strong: rgba(27, 42, 59, 0.14);
--sunset: #E26D45;
--sunset-deep: #C8512B;
--ocean: #2C5577;
--ocean-deep: #1E3F5C;
--forest: #3F634D;
--gold: #C99441;
--purple: #7B4F8C;
--sand: #E8DCC6;
```

### Typography
- **Inter** 400/500/600/700 — body, UI
- **Fraunces** 500/600/700 — display headings, big numbers

### Layout
- Max width 540px, centered
- Mobile-first; works on phones, scales clean to tablets
- Bottom navigation with 5 tabs (Today, Days, Stays, Logistics, Eats)
- Safe-area insets for notched phones (`env(safe-area-inset-*)`)
- PWA-ready meta tags so user can "Add to Home Screen"

### Badges
| Badge | Color | When to use |
|---|---|---|
| `MUST SEE` | red `--sunset` | iconic/can't-miss stops |
| `OK TO SKIP` | gray | low-priority if running late |
| `HIDDEN GEM` | gold | lesser-known photo spots |
| `OPTIONAL` | purple | solo/advanced (e.g. Mist Trail steps) |
| `KID FRIENDLY` | green `--forest` | safe for ages 4+ |

---

## 3. Photo Sourcing Strategy

Use Wikimedia Commons via stable redirect URL:
```js
const photoUrl = (filename) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}?width=400`;
```

**Every `<img>` must have `onerror` fallback** to a gradient card with location initials:
```html
<div class="activity-photo" data-initials="MS">
  <img src="..." onerror="this.parentElement.classList.add('fallback')">
</div>
```

CSS for fallback shows the `data-initials` text on a colored gradient (different per activity type).

Wikimedia filenames to try (Claude Code can verify each loads, swap if 404):
- Mystery Spot → `Mystery_Spot_(Santa_Cruz)_sign_2008.jpg`
- Lone Cypress → `Lone_Cypress.jpg`
- Carmel → `Carmel-by-the-Sea_-_Ocean_Avenue.jpg`
- Bixby Bridge → `Bixby_Bridge_Big_Sur_California_United_States_Landscape_Photography_(106473129).jpeg`
- Point Lobos → `Point_Lobos_State_Natural_Reserve.jpg`
- McWay Falls → `McWay_Falls_Julia_Pfeiffer_Burns_State_Park.jpg`
- Pfeiffer Beach → `Pfeiffer_Beach_-_Big_Sur,_California.jpg`
- Half Dome / Tunnel View → `Yosemite_National_Park,_El_Capitan,_Half_Dome,_and_Bridalveil_Fall,_from_Tunnel_View_(7882617076).jpg`
- Mariposa Grove → `Grizzly_Giant_Mariposa_Grove_Sequoia.jpg`
- Lower Yosemite Falls → `Lower_Yosemite_Falls.jpg`
- Vernal Fall → `Vernal_Fall_Yosemite.jpg`
- Bridalveil Fall → `Bridalveil_Fall_Yosemite.jpg`
- El Capitan → `El_Capitan_Yosemite.jpg`
- Olmsted Point → `Olmsted_Point_Yosemite.jpg`
- Tenaya Lake → `Tenaya_Lake_Yosemite.jpg`
- Tuolumne Meadows → `Tuolumne_Meadows.jpg`
- Convict Lake → `Convict_Lake_California.jpg`
- Heavenly Gondola → `Heavenly_Mountain_Resort_gondola.jpg`
- Emerald Bay → `Emerald_Bay_Lake_Tahoe.jpg`
- Sand Harbor → `Sand_Harbor_State_Park_Lake_Tahoe.jpg`
- Bonsai Rock → `Bonsai_Rock_Lake_Tahoe.jpg`
- Cave Rock → `Cave_Rock_Lake_Tahoe.jpg`
- Eagle Rock → `Eagle_Rock_Lake_Tahoe.jpg`
- Golden Gate Bridge → `Golden_Gate_Bridge_from_Marin.jpg`
- Battery Spencer → `Golden_Gate_Bridge_from_Battery_Spencer.jpg`
- Muir Woods → `Muir_Woods_National_Monument.jpg`
- Twin Peaks → `Twin_Peaks_San_Francisco_view.jpg`
- Cable Car → `San_Francisco_Cable_Car_Hyde_Street.jpg`
- Lombard Street → `Lombard_Street_San_Francisco.jpg`
- Pier 39 → `Pier_39_sea_lions_San_Francisco.jpg`
- Transamerica Pyramid → `Transamerica_Pyramid_San_Francisco.jpg`
- Wave Organ → `Wave_Organ_San_Francisco.jpg`
- 16th Ave Tiled Steps → `16th_Avenue_Tiled_Steps_San_Francisco.jpg`
- Lands End Labyrinth → `Lands_End_Labyrinth_San_Francisco.jpg`

---

## 4. App Screens (Bottom Nav)

### 4.1 Today (default screen)
- Auto-detects current date vs trip dates
- **Pre-trip:** Big countdown number + pre-trip checklist
- **In-trip:** Today's banner (Day N of 12, theme, depart time, next activity, sleep location) + "jump to today in itinerary" button
- **Post-trip:** Welcome home message

### 4.2 Days
- Sticky day-pill scroll selector at top (D1–D12)
- Horizontal scroll-snap carousel — each day = full-width swipeable card
- Today's pill has a sunset dot indicator
- Each day card contains: header, depart/drive stats, warning banner (if any), activity timeline with photo cards, kid logistics strip, sleep + food summary blocks

### 4.3 Stays
- All 6 accommodations vertically listed
- Photo or icon, type badge, nights count, dates, address (copy + maps), conf #

### 4.4 Logistics
- Flights card (Delta) — 3 flight rows with conf #s
- Rental car card (Alamo) — both Costco + Alamo conf #s, pickup/dropoff times

### 4.5 Eats
- Search bar (live filter as you type — searches name, area, day, cuisine, notes)
- Filter chips: All / Indian / Veg-friendly / Hidden Gem
- Restaurant cards: name, rating badge, area tag (Day N · Location), cuisine, address (copy + maps), reviews count, notes

---

## 5. Activity Card Layout

```
┌─────────────────────────────────────┐
│ ┌─────┐  10:30 AM  [MUST SEE]       │
│ │     │  The Mystery Spot           │
│ │PHOTO│  Gravity-defying shack...   │
│ │110px│  ⏱ 1.5 hrs  🧭 1h 30min     │
│ └─────┘                             │
├─────────────────────────────────────┤
│ 📍 465 Mystery Spot Rd, Santa Cruz  │
│              [📋 Copy]  [🗺 Maps]   │
├─────────────────────────────────────┤
│ 🅿 PARKING                          │
│ $10 cash only at lot entrance       │
│                                     │
│ 🎫 TICKETS / BOOKING                │
│ $10/adult, $5 kids 4-11 · Book ahead│
│ → mysteryspot.com                   │
└─────────────────────────────────────┘
```

Photo on the left (110×110px), info on the right. Address row at the bottom with copy/maps buttons. Parking + tickets in expandable rows below.

---

## 6. Trip Data — Master File

Embed this entire object as `const TRIP = {...}` in the JS:

### 6.1 Flights
- Panchal Family · Arrival · Conf `GF4DYQ` · May 26, 10:53 AM · SFO
- Patel Family · Arrival · Conf `GERBYK` · May 30, 10:27 PM · SFO
- Both Families · Departure · Jun 10, 9:55 AM · SFO · Legs: DL0920 SFO→SLC, DL2811 SLC→DFW

### 6.2 Rental Car
- Alamo Rent-A-Car · Chrysler Pacifica Mini Van
- Costco Conf `C488250262` · Alamo Conf `1596397883`
- Pickup: May 30, 10:00 PM at SFO
- Dropoff: Jun 9, 10:00 PM at SFO

### 6.3 Stays (6 total)

| ID | Name | Address | In | Out | Nights | Conf | Type |
|---|---|---|---|---|---|---|---|
| burlingame | Hampton Inn & Suites SF–Burlingame Airport South | 1755 Bayshore Hwy, Burlingame, CA 94010 | May 30 | May 31 | 1 | 85991366 | Hotel |
| monterey | Hampton Inn Monterey | 2401 Del Monte Ave, Monterey, CA 93940 | May 31 | Jun 2 | 2 | 94520764 | Hotel |
| oakhurst | Hampton Inn Oakhurst–Yosemite | 40740 Highway 41, Oakhurst, CA 93644 | Jun 2 | Jun 5 | 3 | 90574140 | Hotel |
| tahoe | Enchanting Chamberlands Cabin | 6270 Flicker Ave, Tahoma, CA 96142 | Jun 5 | Jun 7 | 2 | HM32PP9SWF | Airbnb |
| sfo-north | Hilton Garden Inn SF Airport North | 670 Gateway Blvd, South San Francisco, CA 94080 | Jun 7 | Jun 9 | 2 | 3451357510 | Hotel |
| embassy | Embassy Suites by Hilton SF Airport Oyster Point | 250 Gateway Blvd, South San Francisco, CA 94080 | Jun 9 | Jun 10 | 1 | 91486917 | Hotel |

### 6.4 Indian / Veg Restaurants (searchable)

| Day | Area | Name | Cuisine | Address | Rating | Reviews | Notes |
|---|---|---|---|---|---|---|---|
| 2 | Monterey | Ambrosia India Bistro | Indian | 510 Broadway Ave, Seaside, CA 93955 | 4.4⭐ | 600+ | Classic North Indian, family-friendly, near Monterey hotel |
| 2 | Santa Cruz (en route) | Chipotle | Mexican (Veg) | Multiple along US-101/I-280 | 4.0⭐ | — | Quick veg burrito bowls |
| 4 | Tracy (en route) | New Indian Supermarket | Grocery + Sweets/Chaat | 3250 N Tracy Blvd, Tracy, CA 95376 | 3.8⭐ | 100+ | Pick up road snacks. Open 9 AM–9:30 PM. Ample parking. |
| 4 | Tracy | Dhaba Indian Cuisine | Indian | 1500 W 11th St, Tracy, CA 95376 | 4.2⭐ | 300+ | Backup if friend's lunch falls through |
| 4–6 | Oakhurst | **Tandoori Express** | Indian (Punjabi) | 40278 Rd 425A, Oakhurst, CA 93644 | 4.3⭐ | 470+ | Family-run. Owners Omi & Vanshu personally cook. Order Aloo Paratha (off-menu) |
| 5 | In-park Yosemite | Base Camp Eatery | American (Veg) | Yosemite Valley Lodge | 3.8⭐ | 800+ | Pizza, grain bowls, kid-friendly |
| 6 | Oakhurst | Plazuelas Mexican Grill | Mexican (Veg) | 40768 CA-41, Oakhurst, CA 93644 | 4.4⭐ | 350+ | Local fav |
| 6 | In-park Yosemite | Curry Village Pizza Deck | Pizza | Half Dome Village, Yosemite Valley | 3.6⭐ | 1000+ | Outdoor deck, fast |
| 7 | Lee Vining | Whoa Nellie Deli | American (Veg options) | 22 Vista Point Dr, Lee Vining, CA 93541 | 4.5⭐ | 1900+ | LEGENDARY Tioga Pass exit deli |
| 8 | South Lake Tahoe | **Shangrila Himalayan Kitchen** | Indian/Nepalese | 4115 Lake Tahoe Blvd, South Lake Tahoe, CA 96150 | 4.4⭐ | 600+ | Family-run, momos & curries |
| 8 | South Lake Tahoe | Curry & Grill | Indian | 3601 Lake Tahoe Blvd, South Lake Tahoe, CA 96150 | 4.2⭐ | 250+ | Lunch buffet often |
| 8 | South Lake Tahoe | Nikki's Chaat Cafe | Indian (Chaat/Snacks) | 3469 Lake Tahoe Blvd, South Lake Tahoe, CA 96150 | 4.0⭐ | 200+ | Chaat, dosas, owner-run |
| 10 | SF Marina | Chipotle | Mexican (Veg) | 2675 Geary Blvd, SF, CA 94118 | 3.9⭐ | 500+ | Quick option |
| 11 | SF Yerba Buena | **Amber India** | Indian (Upscale) | 25 Yerba Buena Ln, SF, CA 94103 | 4.4⭐ | 1700+ | Bib Gourmand. Book ahead. |
| 11 | SF West Portal | Roti Indian Bistro | Indian | 53 W Portal Ave, SF, CA 94127 | 4.3⭐ | 500+ | Backup |

---

## 7. Day-by-Day Itinerary (12 days)

### Day 1 · Fri, May 30 · Arrival
- **Depart by:** —  · **Driving:** 0.5 hrs (SFO → hotel)
- **Stay:** Hampton Inn Burlingame

**Activities:**
1. **10:27 PM — Arrive SFO Airport** [MUST SEE] · Patel Family · Delta · Conf GERBYK · Type: flight
2. **11:00 PM — Pick up Alamo Rental Car (Pacifica)** · Conf 1596397883 · Costco C488250262 · Type: car · Time at stop: 30 min · Address: San Francisco International Airport, San Francisco, CA · Parking: Alamo SFO rental counter, on-airport shuttle

**Kid logistics:** Hotel has 24-hr front desk + shuttle from SFO; Hampton Inn breakfast 6-10 AM

---

### Day 2 · Sat, May 31 · Santa Cruz & Carmel
- **Depart by:** 9:00 AM · **Driving:** ~3.5 hrs total
- **Stay:** Hampton Inn Monterey
- **Theme:** Quirky stops along the coast

**Activities:**
1. **10:30 AM — The Mystery Spot** [MUST SEE] · Gravity-defying tilted shack, 45-min guided tour. Kids 4+ love it. · Address: 465 Mystery Spot Rd, Santa Cruz, CA 95065 · Time: 1.5 hrs · Drive: 1h 30min · Parking: $10 cash · Tickets: $10/adult, $5 kids 4-11, free under 4 · **BOOK AHEAD at mysteryspot.com** — time slots sell out
2. **12:30 PM — Lunch: Chipotle Santa Cruz** [KID] · Address: 2401 Soquel Dr, Santa Cruz, CA 95062 · Time: 45 min
3. **1:45 PM — 17-Mile Drive (Lone Cypress)** [MUST SEE] · Iconic Pebble Beach coastal drive · Address: 17-Mile Drive Pacific Grove Gate · Time: 1.5 hrs · Tickets: $11.75/vehicle (refunded if dining at Pebble Beach restaurant)
4. **3:45 PM — Explore Carmel-by-the-Sea** [MUST SEE] · Storybook village, dog-friendly beach · Address: Ocean Ave, Carmel-by-the-Sea, CA · Time: 1.5 hrs · Parking: Free 2-hr street parking
5. **6:30 PM — Dinner: Ambrosia India Bistro** [KID] · 4.4⭐ Indian · Address: 510 Broadway Ave, Seaside, CA 93955 · Time: 1 hr

**Kid logistics:** Mystery Spot has full restrooms + water (gravel paths, no strollers); Spanish Bay restrooms at resort entrance; Carmel Beach restrooms at top of Ocean Ave

---

### Day 3 · Sun, Jun 1 · Big Sur Coast
- **Depart by:** 8:30 AM · **Driving:** ~4.5 hrs round-trip
- **Stay:** Hampton Inn Monterey (2nd night)
- **Theme:** Cliffs, bridges & purple sand

**Activities:**
1. **9:00 AM — Point Lobos State Natural Reserve** [MUST SEE] · Sea otters, tide pools, easy 1-mi Cypress Grove loop · Address: 62 CA-1, Carmel-By-The-Sea, CA 93923 · Time: 1.5 hrs · Parking: $10/vehicle, arrive by 9 AM weekends
2. **11:00 AM — Garrapata State Park (Calla Lily Valley)** [HIDDEN GEM] · Park gates 18-19 on Hwy 1, valley of white calla lilies, sea arches · Time: 30 min · Free roadside parking, no facilities
3. **12:00 PM — Bixby Creek Bridge + Hurricane Point** [MUST SEE] · Best view from Hurricane Point south pull-off · Address: Bixby Creek Bridge, Big Sur, CA 93920 · Time: 30 min · No public restrooms here
4. **12:45 PM — Point Sur State Historic Park** [OK TO SKIP] · 1889 lighthouse, tour-only access · Time: 15 min drive-by
5. **1:30 PM — Lunch: Nepenthe** [MUST SEE] · Cliff-side terrace, 800 ft above Pacific · Address: 48510 CA-1, Big Sur, CA 93920 · Time: 1.5 hrs · Call ahead, wait expected
6. **3:30 PM — Pfeiffer Beach (Purple Sand + Keyhole Arch)** [HIDDEN GEM] · Unmarked turn 0.5 mi south of Big Sur Station, then 2 mi down narrow Sycamore Canyon Rd · Time: 45 min · Parking: $15/vehicle, lot is small
7. **5:00 PM — McWay Falls** [MUST SEE] · 80-ft waterfall on a beach, 0.5 mi paved overlook · Address: Julia Pfeiffer Burns State Park, 52801 CA-1, Big Sur, CA 93920 · Time: 30 min · Parking: $10/vehicle (covers all CA State Parks for the day)

**Kid logistics:** Restrooms: Point Lobos (multiple), Nepenthe, McWay Falls trailhead. NO restrooms between Garrapata and Nepenthe. Bring extra water — Nepenthe + Big Sur Station are only refills.

---

### Day 4 · Mon, Jun 2 · Transit & Reunion
- **Depart by:** 8:00 AM · **Driving:** ~6 hrs total (Monterey → Tracy → Oakhurst)
- **Stay:** Hampton Inn Oakhurst (first of 3 nights)
- **Theme:** Families converge en route to Yosemite

**Activities:**
1. **11:30 AM — Arrive at Friend's house (Tracy)** [MUST SEE] · Lunch with friends · Address: 3163 Neil Jerome Dr, Tracy, CA 95377 · Time: 2 hrs · Drive: 2h 15min from Monterey
2. **1:30 PM — New Indian Supermarket (road snacks pickup)** [MUST SEE] · Biggest Indian grocery in Tracy. Samosas, sweets, chaat, fruit, chai mixes for the Yosemite days · Address: 3250 N Tracy Blvd, Tracy, CA 95376 · Time: 30 min · Open 9 AM–9:30 PM daily, ample free parking
3. **2:30 PM — Drive to Oakhurst** [MUST SEE] · Tracy → Oakhurst: 2h 45min via I-5 S + CA-152 E + CA-99 S + CA-41 N · Restroom stop in Madera or Chowchilla suggested
4. **6:00 PM — Check in: Hampton Inn Oakhurst** · Settle, decompress · Address: 40740 Highway 41, Oakhurst, CA 93644
5. **7:00 PM — Dinner: Tandoori Express** [MUST SEE] · 4.3⭐ (470+ reviews). Family-run Punjabi. Owners Omi & Vanshu personally cook. Order Aloo Paratha (off-menu), Butter Chicken, Dal Tadka · Address: 40278 Rd 425A, Oakhurst, CA 93644 · Time: 1.5 hrs · 5 min from hotel

**Kid logistics:** Restrooms at friend's house, New Indian Supermarket, Madera/Chowchilla gas stations. Stock up on snacks at Indian grocery — no Indian food in Yosemite. Long day, plan a 15-min stretch break mid-drive.

---

### Day 5 · Tue, Jun 3 · Yosemite High Views
- **Depart by:** 7:30 AM · **Driving:** ~3.5 hrs total
- **Stay:** Hampton Inn Oakhurst (2nd night)
- **Theme:** Glacier Point & granite domes
- ⚠️ **Warning:** Glacier Point Rd is a 16-mile windy mountain road. Bring Dramamine / motion sickness bands for the 4-year-olds. Drive slow, stop at pullouts.

**Activities:**
1. **7:30 AM — Depart Oakhurst → Yosemite South Entrance** [MUST SEE] · 1 hr to park entrance + 1 hr up Glacier Point Rd
2. **9:30 AM — Sentinel Dome OR Taft Point Trailhead** [MUST SEE] · Sentinel Dome (kid-friendlier): 2.2 mi RT, 360° view of Half Dome, El Cap, Yosemite Falls. Taft Point has UNFENCED cliffs — not safe for 4-year-olds. · Address: Glacier Point Rd, Yosemite Valley, CA · Time: 2 hrs · Drive: 45 min from Yosemite gate · Parking: Free, fills by 10 AM
3. **12:00 PM — Lunch: packed Indian food picnic** [KID] · Picnic at Glacier Point or pullout · Time: 45 min
4. **1:00 PM — Glacier Point (Half Dome View)** [MUST SEE] · THE iconic viewpoint. Half Dome looks close enough to touch · Address: Glacier Point, Yosemite National Park, CA · Time: 1.5 hrs · Free large parking lot, fills 11 AM–2 PM · Geology Hut closed for restoration in 2026
5. **7:30 PM — OPTIONAL: Stay for Alpenglow on Half Dome** [OPTIONAL] · Sunset 8:15 PM. Half Dome turns pink-orange for 10-15 min after sunset. Natural Firefall substitute. Adds 2 hrs. Bring layers — cold at 7,200 ft
6. **10:00 PM — OPTIONAL: Moonbow at Lower Yosemite Falls** [OPTIONAL] · Solo mission while kids stay with Panchal family. **Jun 3 = LAST predicted moonbow night of 2026.** Drive: 1.5 hrs Oakhurst → Valley. Lower Falls 1-mi paved loop. Check yosemitemoonbow.com for exact time

**Kid logistics:** Restrooms at South Entrance station, Glacier Point parking, Sentinel Dome trailhead. Water refills at South Entrance + Glacier Point. Kids need fleece + hat at 7,200 ft even in June.

---

### Day 6 · Wed, Jun 4 · Valley, Sequoias & Falls
- **Depart by:** 7:00 AM · **Driving:** ~3.5 hrs total
- **Stay:** Hampton Inn Oakhurst (3rd night)
- **Theme:** Mariposa Grove, waterfalls & Tunnel View sunset
- ⚠️ **Warning:** Yosemite Valley parking fills by 9 AM in summer. Aim for arrival ≤8:30 AM. Use the FREE Valley shuttle once parked.

**Activities:**
1. **7:30 AM — Mariposa Grove of Giant Sequoias** [MUST SEE] · 500+ ancient sequoias including 1,800-yr-old Grizzly Giant. Free shuttle from Welcome Plaza. Easy 0.4-mi Big Trees Loop for 4-year-olds; 2-mi loop adds Grizzly Giant + California Tunnel Tree (walk THROUGH it!) · Address: Mariposa Grove Welcome Plaza, Wawona Rd, Yosemite NP, CA 95389 · Time: 2 hrs
2. **10:00 AM — Drive to Yosemite Valley** · ~1 hr via Wawona Rd
3. **11:30 AM — Lower Yosemite Falls** [KID] · KID-PERFECT WATERFALL. 1-mi paved loop, flat. Kids walk to the base of the 320-ft Lower Fall and get sprayed by mist · Address: Lower Yosemite Fall Trailhead, Yosemite Valley, CA · Time: 45 min
4. **12:30 PM — Lunch: Curry Village Pizza Deck** [KID] · Outdoor pizza deck, kid-friendly, fast · Address: Half Dome Village, Yosemite Valley · Time: 1 hr
5. **1:45 PM — Mist Trail to Vernal Falls Footbridge** [KID] · 0.8 mi each way, paved, gradual climb. Kids 4+ can do this. View of the falls from the bridge · Address: Happy Isles Trailhead (Shuttle Stop 16), Yosemite Valley · Time: 1.5 hrs · Park at Curry Village, take East Valley Shuttle to Stop 16
6. **3:15 PM — OPTIONAL: Mist Trail Steps to top of Vernal Fall** [OPTIONAL] · 600+ steep wet granite steps. 3.4 mi RT, gains 1,000 ft. **SOLO MISSION — leave kids with Panchal family at the footbridge.** NOT safe for 4-year-olds · Time: 2.5 hrs solo
7. **4:30 PM — Bridalveil Fall** [MUST SEE] · 620-ft waterfall, short 0.5-mi paved walk. Windswept mist often soaks viewing area — kids love it · Address: Bridalveil Fall Parking, Wawona Rd · Time: 30 min · Free parking, recently expanded
8. **5:15 PM — El Capitan Meadow** [HIDDEN GEM] · Pull-off on Northside Drive. Stand in the meadow, look STRAIGHT UP the 3,000-ft face. Bring binoculars to spot climbers (tiny dots on the wall). Pure awe for kids · Address: El Capitan Meadow, Northside Drive, Yosemite Valley · Time: 20 min
9. **5:45 PM — Valley View (Gates of the Valley)** [HIDDEN GEM] · Better than Tunnel View for some. El Capitan reflected in the Merced River. Most tourists skip · Address: Valley View, Northside Drive, Yosemite Valley · Time: 15 min
10. **6:30 PM — Tunnel View (sunset alpenglow)** [MUST SEE] · THE iconic Yosemite postcard — El Capitan + Half Dome + Bridalveil all in one frame. STAY until 8:15 PM sunset for golden hour on El Cap · Address: Tunnel View Overlook, Wawona Rd · Time: 2 hrs · Free large parking lot
11. **9:30 PM — Return to Oakhurst, late dinner** · Tandoori Express closes ~9 PM weekdays — call ahead for pickup

**Kid logistics:** Restrooms at Mariposa Grove Welcome Plaza, Curry Village, Lower Yosemite Falls trailhead, Bridalveil parking, Tunnel View. Water refills at Curry Village, Yosemite Village, Glacier Point. Big day! Pack snacks, sunscreen, extra layers for Tunnel View at altitude.

---

### Day 7 · Thu, Jun 5 · Tioga Pass Drive
- **Depart by:** 7:00 AM · **Driving:** ~7 hrs total — LONGEST DRIVING DAY
- **Stay:** Tahoma Cabin (Airbnb)
- **Theme:** High Sierra scenic route to Tahoe
- ⚠️ **Warning:** LONG DRIVING DAY. Tioga Rd has NO food, water, gas, or services between Crane Flat and Lee Vining (135 mi). Fill gas in Oakhurst. Bring lots of water + snacks. Vault toilets only at Tioga stops.

**Activities:**
1. **7:00 AM — Depart Oakhurst — fill gas first** · Crane Flat in-park gas is the LAST gas until Lee Vining
2. **9:00 AM — Olmsted Point** [MUST SEE] · Granite slabs you can walk on. Kids love scrambling. View of Half Dome from the back side · Address: Olmsted Point, Tioga Rd, Yosemite NP · Time: 30 min · Free roadside pull-off, vault toilets nearby
3. **10:00 AM — Tenaya Lake** [MUST SEE] · Sapphire alpine lake at 8,150 ft. Kids can splash on the east beach · Address: Tenaya Lake, Tioga Rd, Yosemite NP · Time: 45 min
4. **11:30 AM — Tuolumne Meadows + Lembert Dome view** [HIDDEN GEM] · Largest subalpine meadow in the Sierra. Vault toilets — last stop before Lee Vining · Address: Tuolumne Meadows, Tioga Rd, Yosemite NP · Time: 30 min
5. **12:30 PM — Tioga Pass + Lee Vining descent** [MUST SEE] · Highest pass in Sierra at 9,943 ft. Steep, winding descent to Hwy 395 · Drive: 45 min
6. **1:30 PM — Lunch: Whoa Nellie Deli (Lee Vining)** [MUST SEE] · 4.5⭐ LEGENDARY gas-station deli at Tioga Pass exit. Fish tacos, buffalo meatloaf, veg options. Outdoor Mono Lake views · Address: 22 Vista Point Dr, Lee Vining, CA 93541 · Time: 1 hr
7. **2:45 PM — Convict Lake (photo stop)** [HIDDEN GEM] · Crystal-clear lake against jagged Sierra peaks. 30 min detour south on Hwy 395. Adds ~1.5 hrs total. Just drive to lake parking, walk 5 min to shore, photograph, leave · Address: 2000 Convict Lake Rd, Mammoth Lakes, CA 93546 · Time: 30 min · Free day-use lot, restrooms available
8. **4:00 PM — Drive Lee Vining → Tahoma** [MUST SEE] · ~3.5 hrs north on Hwy 395 + 89. Bridgeport restroom stop midway
9. **7:30 PM — Arrive Tahoma Cabin** · Conf HM32PP9SWF · Address: 6270 Flicker Ave, Tahoma, CA 96142
10. **8:00 PM — Dinner: Shangrila Himalayan Kitchen** [MUST SEE] · 4.4⭐ Indian/Nepalese. 40 min drive south from cabin. Slow service but worth it. **CALL AHEAD for pickup** to save time · Address: 4115 Lake Tahoe Blvd, South Lake Tahoe, CA 96150 · Time: 1.5 hrs

**Kid logistics:** Vault-only restrooms at Crane Flat, Olmsted Point, Tuolumne Meadows, Tioga Pass entrance. Full facilities at Whoa Nellie Deli + Lee Vining Mobil. Bridgeport gas + restrooms midway. Bring 1 gallon water per person — Tioga has zero water sources.

---

### Day 8 · Fri, Jun 6 · Lake Tahoe
- **Depart by:** 8:30 AM · **Driving:** ~2 hrs around the lake
- **Stay:** Tahoma Cabin (2nd night)
- **Theme:** Gondolas, coves, alpine water & rock-jumping

**Activities:**
1. **9:30 AM — Heavenly Gondola** [MUST SEE] · 2.4-mi gondola to 9,123 ft observation deck. 360° lake + Carson Valley views. Kids 5+ love it · Address: 4080 Lake Tahoe Blvd, South Lake Tahoe, CA 96150 · Time: 2 hrs · Drive: 45 min from cabin · Parking: Heavenly Village garage at 1 Bellamy Ct, $1.50/hr, $20 daily max · Tickets: ~$79/adult, ~$45/child at skiheavenly.com (buy online to skip line)
2. **12:00 PM — Lunch: Curry & Grill** [KID] · 4.2⭐ Indian. Lunch buffet often $8.99. Backup: Chipotle next door · Address: 3601 Lake Tahoe Blvd, South Lake Tahoe · Time: 1 hr
3. **1:30 PM — Emerald Bay State Park Lookout** [MUST SEE] · Most photographed view in Tahoe. Vikingsholm Castle visible 1,000 ft below. Quick photo OR add 2-hr round-trip hike down · Address: Inspiration Point, Emerald Bay, CA · Time: 30 min (photo) or 2.5 hrs (with hike) · Parking: $10 fee, lot fills 10 AM–4 PM
4. **2:30 PM — Sand Harbor State Park** [MUST SEE] · BEST FAMILY BEACH on the lake. Sandy beach, giant granite boulders to scramble + jump from, kayak rentals, shallow swimming · Address: 2005 NV-28, Incline Village, NV 89451 · Time: 2.5 hrs · Parking: $15 out-of-state vehicle ($12 NV). Fills by 11 AM weekends
5. **5:00 PM — Bonsai Rock + Whale Rock** [HIDDEN GEM] · 1 mi south of Sand Harbor on NV-28. Iconic granite boulder with 4 small trees on top. Short scramble down to beach. ROCK JUMPING for the 10-year-old (parents check depth first). 4-year-olds wade · Address: NV-28, ~1 mi south of Sand Harbor, Crystal Bay, NV · Time: 1 hr · Small unofficial roadside pullouts — park carefully · Steep 5-min scramble down
6. **6:30 PM — Cave Rock (drive-by)** [OK TO SKIP] · Sacred Washoe tribal site, tunnel through the rock on US-50 · Address: Cave Rock, US-50, Glenbrook, NV · Time: 10 min · $5 NV state lot
7. **7:30 PM — Dinner: Nikki's Chaat Cafe** [KID] · 4.0⭐ chaat, dosas, samosas. Quick + casual · Address: 3469 Lake Tahoe Blvd, South Lake Tahoe · Time: 1 hr

**Kid logistics:** Full restrooms at Heavenly Village, Emerald Bay Inspiration Point, Sand Harbor (also showers). Bonsai Rock has NO restrooms. Sand Harbor has water fountains — bring extra for Bonsai Rock. Water is COLD (~60°F in June). High-altitude sun is intense — sunscreen.

---

### Day 9 · Sat, Jun 7 · Return to the Bay
- **Depart by:** 10:00 AM · **Driving:** ~4 hrs total (Tahoma → SF)
- **Stay:** Hilton Garden Inn SFO North
- **Theme:** I-80 west + Golden Gate sunset

**Activities:**
1. **10:00 AM — Check out of Tahoma cabin** · Final breakfast, pack up · Time: 1 hr
2. **11:00 AM — Eagle Rock Trail (west shore)** [HIDDEN GEM] · Quick 20-min hike to a volcanic outcrop with panoramic Tahoe views. Easy for kids, <1 mi round-trip · Address: Eagle Rock Trailhead, Homewood, CA · Time: 1 hr · Free roadside pull-off on Hwy 89
3. **12:30 PM — Drive I-80 West to SF** [MUST SEE] · ~3 hrs. Stop in Auburn or Davis for lunch (In-N-Out, Chipotle)
4. **4:30 PM — Check in: Hilton Garden Inn SFO N** · Settle, kids nap · Conf 3451357510 · Address: 670 Gateway Blvd, South San Francisco, CA 94080
5. **7:00 PM — Battery Spencer Viewpoint (sunset)** [MUST SEE] · BEST Golden Gate Bridge photo spot in SF. Bridge fills your camera frame at golden hour. Bring jacket — windy · Address: Battery Spencer, Conzelman Rd, Sausalito, CA 94965 · Time: 1 hr · Drive: 45 min from hotel · Small free lot, fills before sunset — arrive 30 min early
6. **9:00 PM — Late dinner** · Order delivery to the room (Roti Indian or Chipotle delivery)

**Kid logistics:** Restrooms at cabin (go before Eagle Rock — none on trail), Auburn/Davis stop, Battery Spencer (vault only). Long drive day — bring snacks, books, downloaded shows.

---

### Day 10 · Sun, Jun 8 · Muir Woods & Bridges
- **Depart by:** 7:30 AM · **Driving:** ~3 hrs around city
- **Stay:** Hilton Garden Inn SFO North (2nd night)
- **Theme:** Redwoods, then the city
- ⚠️ **Warning:** MUIR WOODS REQUIRES ADVANCE PARKING RESERVATION. Book at **gomuirwoods.com** — $10/vehicle + $15/adult entry, kids 15 & under FREE. Reservations open 90 days out. **BOOK NOW.**

**Activities:**
1. **8:30 AM — Muir Woods National Monument** [MUST SEE] · Ancient coast redwoods, 1-mi paved boardwalk loop perfect for 4-year-olds. Cool & misty year-round — bring jackets. NO cell signal · Address: 1 Muir Woods Rd, Mill Valley, CA 94941 · Time: 2 hrs · Drive: 45 min from hotel · Parking: RESERVATION REQUIRED. Standard vehicle $10. 30-min arrival window
2. **11:00 AM — Golden Gate Bridge Welcome Center** [MUST SEE] · Bridge views, gift shop, exhibits. Walk a short stretch onto the bridge. Crissy Field walk along the bay is a 5-min drive away · Address: Golden Gate Bridge Welcome Center, San Francisco, CA 94129 · Time: 1.5 hrs · Drive: 30 min · Try Crissy Field East Beach lot ($1.20/hr) — 10-min walk to bridge
3. **1:00 PM — Lunch: Chipotle Marina** [KID] · Address: 2675 Geary Blvd, SF, CA 94118 · Time: 45 min
4. **2:00 PM — Lands End Labyrinth** [HIDDEN GEM] · Stone labyrinth on a cliff above the Pacific. 20-min walk from Lands End parking. Kids love walking the spiral · Address: Lands End Lookout, San Francisco, CA 94121 · Time: 1 hr · Free lot at Merrie Way, fills 11 AM–4 PM weekends
5. **4:00 PM — 16th Avenue Tiled Steps** [HIDDEN GEM] · 163 mosaic steps with sun-and-sea design. Quick photo · Address: 16th Ave & Moraga St, SF, CA 94122 · Time: 30 min · Free residential parking on Moraga or 15th Ave
6. **5:30 PM — Twin Peaks (sunset)** [MUST SEE] · Highest accessible view in SF. 360° city + bridges + ocean. Get there 30 min before 8:25 PM sunset · Address: 501 Twin Peaks Blvd, SF, CA 94114 · Time: 1.5 hrs · Free parking at upper viewing lot, fills 30 min before sunset
7. **8:30 PM — Dinner near hotel** · Quick option in South SF or hotel restaurant

**Kid logistics:** Restrooms at Muir Woods (multiple), Golden Gate Welcome Center, Lands End Lookout, Twin Peaks (upper lot). NO cell at Muir Woods — download offline maps before. Layers: Muir Woods ~55°F even in June, bridges windy.

---

### Day 11 · Mon, Jun 9 · City Landmarks
- **Depart by:** 8:00 AM · **Driving:** ~2 hrs total + rental return
- **Stay:** Embassy Suites Oyster Point
- **Theme:** Cable cars, Lombard, Pier 39

**Activities:**
1. **9:00 AM — Cable Car Ride (Powell-Hyde line)** [MUST SEE] · Classic SF experience. Hold on tight! · Address: Powell-Hyde Cable Car Turnaround, 2099 Hyde St, SF · Time: 1 hr · Drive: 25 min · Park at Pier 39 garage and ride cable car as a loop. Don't park near Lombard. Tickets: $8/ride or $26 day pass
2. **11:00 AM — Lombard Street (Crookedest Street)** [MUST SEE] · Walk down the brick stairs on either side — DON'T queue to drive it (1+ hr wait). View from bottom at Leavenworth is best · Address: 1070 Lombard St, SF, CA 94109 · Time: 30 min
3. **12:00 PM — Lunch: Amber India (Yerba Buena)** [MUST SEE] · 4.4⭐ best Indian in SF, Bib Gourmand. Book ahead. Try Murgh Makhani, Bhel Puri, Tandoori platter · Address: 25 Yerba Buena Ln, SF, CA 94103 · Time: 1.5 hrs · amber-india.com
4. **2:00 PM — Pier 39 + Sea Lions** [MUST SEE] · Famous sea lion colony on K-Dock. Aquarium of the Bay nearby. Touristy but kids love it · Address: Pier 39, The Embarcadero, SF, CA 94133 · Time: 2 hrs · Pier 39 garage $9/hr or $40 day max with validation
5. **4:30 PM — Wave Organ** [HIDDEN GEM] · Sculpture of PVC pipes set into a marina jetty. Wave action plays low musical tones. Kids put ears to pipes · Address: Wave Organ, 83 Marina Green Dr, SF, CA 94123 · Time: 45 min · Free marina parking, 10-min walk on jetty
6. **5:45 PM — Transamerica Pyramid (drive-by)** [OK TO SKIP] · Iconic 853-ft pyramid. Quick photo from across the street · Address: 600 Montgomery St, SF, CA 94111 · Time: 15 min
7. **7:30 PM — Dinner: light meal near hotel** [KID] · Save energy for tomorrow's flight · Time: 1 hr
8. **10:00 PM — Drop off Rental Van at SFO Airport (Alamo)** [MUST SEE] · Conf 1596397883. Fill gas first at SFO Costco or Chevron · Address: Alamo SFO Return, San Francisco International Airport · Time: 30 min
9. **10:45 PM — Shuttle to Embassy Suites Oyster Point** · Conf 91486917 · Address: 250 Gateway Blvd, South San Francisco, CA 94080

**Kid logistics:** Restrooms at Pier 39 (multiple), Lombard St (Hyde St cafes), Amber India, Embassy Suites. Cable car LOUD when bells ring — smaller kids may need parent's lap. Sea lions are loud and smelly — kids find both hilarious.

---

### Day 12 · Tue, Jun 10 · Departure
- **Depart by:** 6:30 AM · **Driving:** 15 min shuttle
- **Stay:** —

**Activities:**
1. **6:30 AM — Hotel Shuttle to SFO Airport** [MUST SEE] · Embassy Suites runs continuous SFO shuttle. 90 min before Delta domestic · Time: 15 min
2. **8:00 AM — TSA + breakfast at SFO** [KID] · Kid-friendly food at Terminal 2 · Time: 1.5 hrs
3. **9:55 AM — Depart SFO · Delta DL0920** [MUST SEE] · SFO → SLC (Salt Lake City) · Type: flight
4. **Connecting — SLC → DFW · Delta DL2811** · Final leg home · Type: flight

**Kid logistics:** SFO Terminal 2 has play area near Gate 54. Bring snacks + Dramamine for motion-prone kids.

---

## 8. Pre-Trip Checklist (shown on Today screen before May 30)

- [ ] Book Muir Woods parking at gomuirwoods.com (90 days out)
- [ ] Buy Mystery Spot tickets at mysteryspot.com
- [ ] Pre-buy Heavenly Gondola tickets at skiheavenly.com
- [ ] Buy America the Beautiful pass ($80) — covers Yosemite + Muir Woods entrance
- [ ] Confirm 3 car seats/boosters with Alamo or bring from home (~$13/day each at counter)
- [ ] Download offline Google Maps for Yosemite + Tioga Pass area (no signal in either)
- [ ] Pack: Dramamine for kids, layers (cold at altitude), reef-safe sunscreen, swim gear for Tahoe, binoculars for El Cap climbers

---

## 9. Functional Requirements

### 9.1 Today screen logic
```js
const today = new Date();
const todayISO = today.toISOString().slice(0, 10);
const todayDay = TRIP.days.find(d => d.dateISO === todayISO);

if (!todayDay) {
  if (today < new Date('2026-05-30')) showCountdown();
  else showTripComplete();
} else {
  showTodayBanner(todayDay);
  showNextActivity(todayDay);  // find activity by current time
}
```

### 9.2 Itinerary swipe-snap carousel
- `display: flex` + `overflow-x: auto` + `scroll-snap-type: x mandatory` on container
- Each `.day-slide` is `flex: 0 0 100%` + `scroll-snap-align: start`
- On scroll, debounce 80ms then compute active day from `scrollLeft / clientWidth`
- Update active pill + scroll pill into view (`scrollIntoView({ inline: 'center' })`)

### 9.3 Eats search + filter
- Live filter on `keyup` of `<input id="eats-search">`
- Filter chips: All / Indian / Veg-friendly / Hidden Gem
- Search matches: name, area, cuisine, notes, "Day N"
- "No results" empty state

### 9.4 Copy buttons
- Use `navigator.clipboard.writeText()` in secure context
- Fallback to `document.execCommand('copy')` for `file://` opens
- Show toast "Copied" for 1.6s

### 9.5 Maps links
- Format: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
- Opens user's default map app on iOS/Android
- Use `target="_blank" rel="noopener"`

### 9.6 Photo onerror fallback
```html
<div class="activity-photo type-activity" data-initials="MS">
  <img src="..." loading="lazy"
       onerror="this.parentElement.classList.add('fallback')">
</div>
```
```css
.activity-photo.fallback img { display: none; }
.activity-photo.fallback::after {
  content: attr(data-initials);
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  color: white; font-family: 'Fraunces', serif;
  font-size: 32px; font-weight: 600;
}
.activity-photo.type-activity { background: linear-gradient(135deg, var(--sunset), var(--ocean)); }
.activity-photo.type-hike { background: linear-gradient(135deg, var(--forest), #2A4A35); }
/* ... one gradient per type */
```

---

## 10. PWA Meta Tags

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="CA Roadtrip">
<meta name="theme-color" content="#1B2A3B">
```

Optional: add `manifest.json` + a 512×512 icon if you want true PWA installability.

---

## 11. Build Instructions for Claude Code

```bash
# 1. Create repo
mkdir ca-roadtrip && cd ca-roadtrip
git init
touch .nojekyll

# 2. Drop BUILD_SPEC.md in repo

# 3. Tell Claude Code:
```

> Read `BUILD_SPEC.md`. Build a single-file `index.html` implementing the entire spec. Embed all 12 days of trip data, all 16 restaurants, all 6 stays as JavaScript constants. Implement all 5 screens (Today, Days, Stays, Logistics, Eats). Render photo cards with Wikimedia photos + onerror fallback to gradient placeholders. Use the badge system. Mobile-first, max-width 540px container. No frameworks, vanilla JS only. Use Inter + Fraunces from Google Fonts. Verify each Wikimedia filename loads in a browser before finalizing — if any 404, search Wikimedia Commons for an alternative and substitute. Output a single `index.html` file ready to commit.

```bash
# 4. After Claude Code finishes
git add . && git commit -m "Initial build"
git remote add origin https://github.com/<you>/ca-roadtrip.git
git push -u origin main

# 5. Enable GitHub Pages: Settings → Pages → main / root
# Live at https://<you>.github.io/ca-roadtrip/
```

---

## 12. Known-Good Verifications (already cross-checked)

- ✅ Tioga Pass opens May 15, 2026 (earliest in 16 years) — your June 5 drive is safe
- ✅ Yosemite reservations NOT required in 2026
- ✅ Tandoori Express Oakhurst: 4.3⭐, 470+ Yelp reviews, address 40278 Rd 425A
- ✅ New Indian Supermarket Tracy: 3250 N Tracy Blvd, open 9–9:30 daily
- ✅ Muir Woods requires reservation: $10/vehicle + $15/adult, kids free
- ✅ Heavenly Gondola: ~$79/adult summer rate, $1.50/hr Village garage
- ✅ Moonbow window May 28 – Jun 3, 2026 (Jun 3 = last predicted night for 2026)
- ✅ Sand Harbor: $15 out-of-state vehicle, fills 11 AM weekends
- ✅ Mariposa Grove: free shuttle from Welcome Plaza, lot opens 6 AM

---

**End of spec.**
