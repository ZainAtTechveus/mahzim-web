# mahzim — coming-soon page

One static page. No build step, no dependencies, no third-party requests unless
`config.js` asks for them. Deployed from `main` by GitHub Pages.

Built from the locked brand tokens in `Ventures/Mahzim/02-brand/TOKENS.md`
(locked 2026-08-30). Copy is taken verbatim from the **Coming-soon social
campaign** document on TEC-1 and is not rewritten here.

## Taking it live

Everything that needs a decision lives in `config.js`. Nothing else should change.

| Field | Now | To go live |
|---|---|---|
| `launchISO` | `null` | The public launch moment, ISO 8601 with offset — `"2026-10-15T09:00:00+04:00"`. The countdown appears; until then the page states no date it has not been given. |
| `capture.provider` | `null` | `"mailchimp"` or `"endpoint"`. See below. |
| `plausibleDomain` | `null` | The live host, to switch on cookieless pageview analytics. |
| `preview` | `true` | `false` — removes the internal-preview bar. |

### Email capture

The form is deliberately **disabled while `capture.provider` is `null`**. It will
not accept an address it cannot store.

**Mailchimp** (no API key, nothing secret in the page). Open the audience's
embedded-form code and read its action URL:

```
https://<dc>.list-manage.com/subscribe/post?u=<u>&id=<id>
```

Copy `u`, `id` and `dc` (e.g. `us14`) into `config.js`. Submission goes over
Mailchimp's JSONP endpoint so the visitor never leaves the page.

To keep per-post attribution, add three text merge fields to the audience with
tags `SOURCE`, `CAMPAIGN` and `POST`. They are populated automatically.

**Anything else** — set `capture.provider` to `"endpoint"` and `endpoint.url` to
a handler that accepts `POST` JSON `{email, utm_source, utm_medium,
utm_campaign, utm_content, utm_term, referrer, landing}` and answers CORS.

### Attribution

Each countdown post should link here with its own tag, e.g.

```
https://<host>/?utm_source=instagram&utm_medium=social&utm_campaign=coming-soon&utm_content=post-08
```

First touch is stored for the session and travels with the signup, so waitlist
growth is attributable to the post that produced it.

## Custom domain

Pages serves free SSL on the default `*.github.io` host. For a custom domain,
add a `CNAME` file containing the bare host, then point DNS at GitHub:

```
A     @   185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
AAAA  @   2606:50c0:8000::153, 2606:50c0:8001::153, 2606:50c0:8002::153, 2606:50c0:8003::153
CNAME www <user>.github.io
```

Then enable **Enforce HTTPS** in the repository's Pages settings once the
certificate is issued.

## Design

Two shapes carry the page, and both come off the artwork rather than out of a
document. Change either and you are changing the brand, not the page.

**The arch.** Three of the ten approved renders are composed around a pointed
niche, and the signup line is "be first through the door" — so the page is a
door. It is drawn in SVG, not photographed: sharp at any width, and it costs
nothing to download. The same ogee path appears twice in `index.html`, once as
a `clipPath` (which holds the dusk) and once as a stroked `path` (the gold
line). **They must stay identical** or the fill and the outline drift apart.

**The interrupted line.** Every rule in the artwork is a hairline broken at its
centre by the four-point sparkle. That is the brand's divider, and it is the
`.rule` component — used under the wordmark, under the promise, and as the
separator between the two footer links. Never use a plain rule instead.

Light enters low and from one side, as it does in every render. Nothing on this
page is lit from behind and centred, and gold is never a flat fill — every gold
surface is a gradient, per TOKENS.md.

Type is two families in three roles: a high-contrast serif for display, caps
and labels (Didot-led, staying inside that category on every platform), and a
humanist sans for body copy. No webfont is loaded, so the page makes no
external request for type.

## Assets

`assets/` holds crops derived from the ten approved renders in
`Ventures/Mahzim/04-assets/`. The wordmark and the monogram are placed as
artwork and never re-set in type, per TOKENS.md. No generated Arabic script
appears anywhere, in keeping with the same rule.

| File | What it is |
|---|---|
| `wordmark.png` / `.webp` | The wordmark. WebP is served first and the PNG is the fallback; they are pixel-identical at 3x. |
| `monogram.png` | The `m` monogram, keyed to transparency. TOKENS.md makes this the small-size mark — the roundel turns to mush below about 60px. |
| `dusk.jpg` | The sky seen through the arch. Sits under a heavy veil inside the clip, so it reads as depth rather than as a picture. |
| `plate-window.jpg` | Lahore at dusk, through the niche, with the burner alight. |
| `plate-oud.jpg` | Oud wood before it is oil. |
| `plate-vessel.jpg` | The bottle. |
| `og.jpg` | Share card. |

The three plates are sized by height, not width, so they sit at different
heights on one shared floor line — every render is a still life with a ground
plane, and a grid of equal boxes is the one thing the pictures are not.

## Local preview

```
python3 -m http.server 8731
```
