/* Mahzim coming-soon — the only file you edit to take this live.
   Everything else is built from the locked brand tokens and should not change. */

window.MAHZIM = {
  /* ---------------------------------------------------------------
     1. LAUNCH DATE  (campaign placeholder {{LAUNCH_DATE}})
     Not yet set. Leave null and the countdown stays hidden — the page
     never states a date it does not have.
     To switch it on, put the public launch moment here as ISO 8601
     with an explicit offset, e.g. "2026-10-15T09:00:00+04:00".
     --------------------------------------------------------------- */
  launchISO: null,

  /* ---------------------------------------------------------------
     2. EMAIL CAPTURE
     provider: null            -> form renders disabled. Nothing is ever
                                  accepted and silently dropped.
     provider: "mailchimp"     -> set mailchimp.{u,id,dc}. These come off the
                                  audience's embedded-form action URL:
                                  https://<dc>.list-manage.com/subscribe/post?u=<u>&id=<id>
                                  No API key, no secret in the page.
     provider: "endpoint"      -> set endpoint.url. Any handler that accepts
                                  JSON {email, utm...} and answers CORS.
     --------------------------------------------------------------- */
  capture: {
    provider: null,
    mailchimp: { u: null, id: null, dc: null },
    endpoint: { url: null }
  },

  /* ---------------------------------------------------------------
     3. ATTRIBUTION
     Every countdown post links here with its own ?utm_content=post-08.
     Whatever the visitor arrived with is stored on first touch and sent
     with the signup, so waitlist growth is attributable per post.
     plausibleDomain: set to the live host to switch on privacy-friendly
     pageview analytics (no cookies). Leave null for none.
     --------------------------------------------------------------- */
  plausibleDomain: null,

  /* ---------------------------------------------------------------
     4. PREVIEW BANNER
     true  -> shows an internal-preview bar. Keep true until capture is
              wired and the page has been approved.
     false -> production.
     --------------------------------------------------------------- */
  preview: true
};
