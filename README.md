# mahzim — coming-soon page

One static page. No build step, no dependencies, no third-party requests unless
`config.js` asks for them. Deployed from `main` by GitHub Pages.

Built from the locked brand tokens in `Ventures/Mahzim/02-brand/TOKENS.md`
(locked 2026-08-30). Copy is taken verbatim from the **Coming-soon social
campaign** document on TEC-1 and is not rewritten here.

## Taking it live

Everything that needs a decision lives in `config.js`. Nothing else should change.
`launchISO` and `plausibleDomain` are the two still unset.

| Field | Now | To go live |
|---|---|---|
| `launchISO` | `null` | The public launch moment, ISO 8601 with offset — `"2026-10-15T09:00:00+04:00"`. The countdown appears; until then the page states no date it has not been given. |
| `capture.provider` | `"formsubmit"` | **Live.** Signups go to the address in `capture.formsubmit.url`. See below. |
| `plausibleDomain` | `null` | The live host, to switch on cookieless pageview analytics. |
| `preview` | `false` | Already off. Set `true` to put the internal-preview bar back. |

### Email capture

The form is deliberately **disabled while `capture.provider` is `null`**. It will
not accept an address it cannot store.

**Live provider: FormSubmit.** Signups are delivered to **mahzim.pk@gmail.com**,
the Mahzim brand account:

```
capture.formsubmit.url = "https://formsubmit.co/ajax/mahzim.pk@gmail.com"
```

Set 2026-09-05, replacing a mail.tm disposable mailbox. Disposable mailboxes are
reclaimed once they go idle, and a lapsed one drops signups with no error —
the form still says "You are on the list" and nothing arrives. Nobody would
notice until they went looking and found an empty list.

**One manual step, and it is still outstanding.** FormSubmit binds an endpoint to
its destination the first time it is used. The first submission after this change
sends an activation email to mahzim.pk@gmail.com — **click the link in it once**
and the endpoint is live for good. Until that click, submissions are accepted by
the page and not delivered. Send that first submission yourself, before any
traffic is driven here, so the activation is triggered by a test and not by the
first real visitor.

Attribution fields carry over unchanged. Nothing else moves.

*Worth doing after activation:* FormSubmit also issues a random hashed endpoint,
`https://formsubmit.co/ajax/<hash>`, which does the same job without putting the
address in a page anyone can read. The hash arrives with the activation email.
Swapping the URL for it is a one-line change in `config.js` and keeps the brand
inbox off a scrapeable public page.

The two providers below are wired but not in use.

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

## Elsewhere

The foot of the page carries two marks, Instagram and WhatsApp, so a visitor who
has joined the list has somewhere to go instead of a dead end.

| | |
|---|---|
| Instagram | https://www.instagram.com/mahzim.official/ |
| WhatsApp | https://wa.me/923390075856 |

Icons are **inline SVG**. The page makes no third-party requests on load and an
icon font or a CDN sprite would have been the one exception — so they are drawn
in the markup.

**Facebook is deliberately absent.** The Page exists (id `61594102680802`) and it
matters — Instagram Business, the catalogue and the ad account all chain off it —
but it is plumbing, not a destination. Nobody browses a fragrance house on
Facebook. A third mark would cost restraint and buy nothing. Add it only if the
Page ever becomes somewhere worth sending a person.

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
