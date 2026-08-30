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

## Assets

`assets/` holds crops derived from the ten approved renders in
`Ventures/Mahzim/04-assets/`. The wordmark and mark are placed as artwork and
never re-set in type, per TOKENS.md. No generated Arabic script appears
anywhere, in keeping with the same rule.

## Local preview

```
python3 -m http.server 8731
```
