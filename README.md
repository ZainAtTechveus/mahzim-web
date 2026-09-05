# mahzim — coming-soon page

One static page. No build step, no dependencies, and **zero third-party requests
on load** — every image, script and the display font are local, and the font is
a data URI. Open `index.html` by double-clicking it and it works.

Built from the locked brand tokens in `Ventures/Mahzim/02-brand/TOKENS.md`
(locked 2026-08-30).

---

## ⛔ Read first: the retired tagline

**"Two letters. One essence. One name." is retired** (Zain, 2026-09-05). It is
the private story of two names — his wife's and his daughter's — and it is not
customer-facing. It went live by accident earlier that day and was taken down.

The customer-facing line is now:

> **ATTAR. WORN, NOT SPRAYED.**

This page is clean. **The artwork is not.** Fixing a stylesheet fixes one page;
the line is *printed into the renders themselves*, so it will keep resurfacing
through the asset library until someone regenerates them. What carries it:

**Masters** (`04-assets/`) — 7 of the 9 unique renders:

| Master | Stable id | Carries it |
|---|---|---|
| `…01_59_51 PM.png` | `wordmark-noir` | **yes** |
| `…02_03_27 PM.png` | `roundel` | no |
| `…02_10_32 PM.png` | `monogram` | no |
| `…02_10_42 PM.png` | `bottle-silk` | **yes** |
| `…02_16_10 PM.png` | `bottle-noir` | **yes** |
| `…02_22_18 PM.png` | `arch-sunset` | **yes** |
| `…02_48_08 PM.png` | `daylight-cream` | **yes** |
| `…02_58_24 PM.png` | `guidelines` | **yes** (internal only, never post) |
| `…03_03_10 PM.png` | `hero` | **yes** |

**Shipped social files** — the good news is that the build script's "clean
zone" crops already cut *around* the type, so every scenic plate is clean by
accident. Only the plates that deliberately carry type are affected:

- `mahzim-tagline-lockup-{4x5,1x1,9x16}` — the line **is** the plate (post 9, slide 3)
- `mahzim-wordmark-noir-{4x5,1x1,9x16}` — post 3
- `mahzim-hero-keyvisual-{4x5,1x1,9x16}` — post 11, the launch hero
- `mahzim-reel-05-endcard-9x16` — the reel end card
- `mahzim-story-tagline-01/02/03-9x16` — the three story taps
- `profile-kit/facebook-cover-820x360.png` — **the Facebook cover**
- the matching files in `delivery-jpg/` and in `12-posts/`

All avatars (`instagram-avatar-1080`, `facebook-avatar-720`, `tiktok-avatar-720`,
`ALT-monogram-avatar-1080`) are **clean**, as are `roundel`, `monogram`,
`tomorrow`, `story-soon`, `scent-remains` and every scenic crop.

`scent-remains` sets **"A SCENT THAT REMAINS."** — a different line, still in
use, and not affected.

Crops used on this page were all measured against the type bands and take only
regions clean of every burned-in glyph. The numbers are in the asset table below
so they can be re-cut without rediscovering them.

---

## The action: WhatsApp, not a waitlist

The email waitlist was **removed 2026-09-05** on Zain's instruction. It asked a
stranger to wait for something with no date and no product, and it banked an
address nobody had a plan to mail. The accounts now exist, so the page starts a
conversation instead: WhatsApp is the shop, Instagram is the window.

The page's single action is `https://wa.me/923390075856`.

### What that leaves dormant — clean this up deliberately, not by accident

| Thing | State |
|---|---|
| `config.js` → `capture.provider: "formsubmit"` and the FormSubmit URL | **dead.** Nothing on this page submits. |
| `site.js` → `#waitlist`, `#email`, `#submit`, `#form-note` | **orphaned hooks.** The markup is gone. |
| `site.js` capture section (validation, FormSubmit / Mailchimp / endpoint senders) | **dormant**, behind a guard |
| `?utm_content=post-NN` attribution in `site.js` | **inert.** It existed to attribute a *signup* to the post that produced it. With no signup there is nothing to attribute. A WhatsApp click cannot be measured this way. |
| `launchISO` / `#countdown` / `preview` | **live.** Still work, still wired. |

`site.js` was **not** deleted, and neither was `config.js`: the countdown and
preview-bar hooks are still in use, and `03-web/` has its own separate copy of
both files. Instead one guard was added near the top of the capture section —

```js
if (!form || !input || !button || !note) return;
```

— which makes the block a no-op when the markup is absent. Without it, the page
throws a `TypeError` on every load. That guard is the difference between
*dormant* and *broken*; delete the capture section and the FormSubmit config
together, on purpose, if the waitlist is confirmed as not coming back.

---

## Taking it live

| `config.js` field | Now | To go live |
|---|---|---|
| `launchISO` | `null` | The public launch moment, ISO 8601 with offset — `"2026-10-15T09:00:00+04:00"`. The countdown appears; until then the page states no date it has not been given. |
| `capture.*` | `"formsubmit"` | Dead — see above. |
| `plausibleDomain` | `null` | The live host, for cookieless pageview analytics. **This is the only setting that would add a third-party request.** |
| `preview` | `false` | Already production. Set `true` to put the internal-preview bar back. |

### Custom domain

Pages serves free SSL on the default `*.github.io` host. For a custom domain,
add a `CNAME` file containing the bare host, then point DNS at GitHub:

```
A     @   185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
AAAA  @   2606:50c0:8000::153, 2606:50c0:8001::153, 2606:50c0:8002::153, 2606:50c0:8003::153
CNAME www <user>.github.io
```

Then enable **Enforce HTTPS** in the repository's Pages settings.

---

## Design

### The arch is an aperture, not an outline

The first pass of this redesign drew the arch and left it **empty** — at 1400px
it was a large gold outline containing nothing but the wordmark, with the
signup pushed entirely below the fold. It was rejected, correctly.

The arch stays; what changed is that it now **holds a photograph**. The same
photograph runs on behind it as the room, sunk into the dark. Inside the arch
the picture is at full warmth, outside it falls away — so it reads as a lit
doorway rather than as a photograph with a shape on top. That is the literal
reading of the artwork, which is a room at dusk with incense burning.

Two consequences worth keeping:

- **A door is narrow and tall.** The ratio is `0.536`, not the squat `0.72` of
  the first pass. A wide ogee is a niche; a narrow one is a door you walk
  through, which is what "be first through the door" describes.
- **The subject needs headroom.** The ogee's head is the top 46% of the box, so
  a subject placed high gets sawn through by the curve — which is exactly what
  happened to the bottle's stopper on the first render. `door.jpg` is built
  with 130px of matched dark above the crop so the head has room. Change the
  ratio and you must rebuild that plate; they are a matched pair.

The same ogee path appears twice in `index.html`, once as a `clipPath` and once
as a stroked `path`. **They must stay identical** or the fill and the outline
drift apart.

### The threshold

One hairline runs under the door *and continues under the invitation beside
it*. The door stands on it; so does the step through. It is the thing that
holds a two-column hero together as one composition rather than two panels.

### The interrupted line

Every rule in the artwork is a hairline broken at its centre by the four-point
sparkle. That is the brand's divider — the `.rule` component. Never use a plain
rule instead.

### Type

Display is **Cinzel**, subsetted to Latin, instanced at wght 400 and embedded
as base64: **7.2 KB of font, 9.6 KB as a data URI, and no external request.**

This is not a preference. The brand guideline sheet in `04-assets` names
**CINZEL REGULAR** as the secondary face, so the page now uses the typeface the
brand already specified. The previous build shipped a font *stack* — Didot on a
Mac, something else on the Android phones this page actually targets — which is
not a decision, it is a coin toss.

Cinzel has no true lowercase; its lowercase slots hold small caps. That is
deliberate here: "Come to the counter." sets as engraved caps, which is the
right register for a heritage house and the wrong one for a startup.

Licence: `assets/OFL-Cinzel.txt` (SIL OFL 1.1). The old Didot-led stack is kept
behind Cinzel in `--display` so a browser that refuses the data URI still lands
on an inscriptional serif instead of falling to Times.

### And the rest

Light enters low and from one side, as it does in every render. Nothing is lit
from behind and centred. Gold is never a flat fill — every gold surface is a
gradient, per TOKENS.md.

All motion lives inside `@media (prefers-reduced-motion: no-preference)`, and
the default state of every animated element is *visible*. A reduced-motion
visitor can never be left looking at something stuck at zero opacity.

---

## Assets

Crops derived from the approved renders in `Ventures/Mahzim/04-assets/`. Every
crop box below was measured against the burned-in type and is clean of all of
it. The wordmark and monogram are placed as artwork and never re-set in type,
per TOKENS.md. No generated Arabic appears anywhere, per the same rule.

| File | Master | Crop (source px) | Output | What it is |
|---|---|---|---|---|
| `door.jpg` / `.webp` | `hero` | `x 750–1200, y 345–1055` + 130px built headroom | 900×1680 | What you see through the door: the bottle, the brass burner, oud wood, black marble. The best-resolved clean region in the whole library. |
| `ground.jpg` / `.webp` | `bottle-silk` | `x 0–415, y 90–790` | 760×1280 | The room. Bronze silk, blurred past recognition and sunk — it is texture and warmth, not a subject. |
| `plate-view.jpg` / `.webp` | `arch-sunset` | `x 0–300, y 25–705` | 620×1405 | Lahore at dusk through the niche, burner alight. |
| `plate-vessel.jpg` / `.webp` | `bottle-silk` | `x 1290–1672, y 150–790` | 764×1280 | The bottle on oud wood against bronze silk. |
| `plate-light.jpg` / `.webp` | `daylight-cream` | `x 1500–1900, y 40–730` | 800×1380 | The light side. Toned down ~12% and warmed slightly so it sits in the same room as the other two instead of becoming a hole in the page. |
| `wordmark.png` / `.webp` | — | — | 1200×348 | The wordmark. Clean — it never carried the tagline. |
| `monogram.png` | — | — | 330×360 | The `m`, keyed to transparency. The small-size mark; the roundel turns to mush below ~60px. |
| `og.jpg` | `hero` + wordmark | — | 1200×630 | Share card. **Rebuilt 2026-09-05** — the previous one had the retired line burned into it, and the OG image is the one thing every share preview shows. |

`bottle-silk` has a corrupt encoder band below `y≈800`; every crop above stops
short of it.

**Plate sizing.** Stacked on a phone they are sized by **width** (`min(72vw,
300px)`), so a tall crop is not punished with a narrow column when it is the
only thing on screen. From 40rem up they come onto one shared floor line and
are sized by **height**, so they stand at their own scale against a common
baseline — every render is a still life with a ground plane, and a grid of
equal boxes is the one thing the pictures are not.

The previous build capped these at 300px and blamed the source resolution. The
masters are 1300–2000px and these plates are cut at 620–800px wide; the ceiling
was the layout.

### Weight

| | |
|---|---|
| First screen (WebP path) | ~368 KB — of which the wordmark PNG's WebP is 202 KB |
| Lazy, below the fold | ~287 KB |
| Total | ~656 KB |

The wordmark is the single heaviest asset on the page and the obvious next
optimisation: it is a 1200×348 render of flat artwork and would be a fraction
of the size as SVG, if anyone has the vector.

---

## Verifying a change

No headless Chrome. `qlmanage` renders WebKit straight off disk, which also
proves the `file://` case:

```
qlmanage -t -s 1024 -o <outdir> <file.html>
```

Two things to know or you will misread every screenshot:

1. **It captures a fixed 1024×1024 CSS-pixel window** from the top-left and
   scales that square to `-s N`. `-s` is not a viewport control. That fixed
   1024 is the whole story behind the ~1.367 factor people notice
   (1400 / 1024 = 1.367). To capture a real *W*×*H* viewport, put the page in
   an iframe of exactly *W*×*H* — which gives the inner document a true CSS
   viewport, so media queries **and** `vh` both resolve correctly — then
   CSS-scale that iframe by `min(1024/W, 1024/H)` so the whole thing lands
   inside the square.
2. **It runs no JavaScript.** You are looking at the static shell. The
   countdown and the preview bar never appear in a `qlmanage` screenshot, and
   nothing about them can be verified this way.

## Local preview

```
python3 -m http.server 8731
```
