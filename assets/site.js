/* mahzim coming-soon — countdown, attribution, email capture.
   No dependencies, no third-party requests unless config asks for them. */
(function () {
  'use strict';

  var CFG = window.MAHZIM || {};
  var $ = function (id) { return document.getElementById(id); };

  /* ---------------------------------------------------------------
     Preview bar
     --------------------------------------------------------------- */
  if (CFG.preview) $('preview-bar').hidden = false;

  /* ---------------------------------------------------------------
     Attribution — first touch wins.
     Each countdown post links here with its own ?utm_content=post-08, so a
     signup can be traced to the post that produced it. Stored for the session
     and sent with the submission.
     --------------------------------------------------------------- */
  var UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  var STORE_KEY = 'mahzim.attribution';

  function readAttribution() {
    var stored;
    try { stored = JSON.parse(sessionStorage.getItem(STORE_KEY) || 'null'); } catch (e) { stored = null; }
    if (stored) return stored;

    var params = new URLSearchParams(window.location.search);
    var attr = {};
    UTM_KEYS.forEach(function (k) {
      var v = params.get(k);
      if (v) attr[k] = v.slice(0, 120);
    });
    // ref= is a shorthand some posts use; fold it into utm_content.
    if (!attr.utm_content && params.get('ref')) attr.utm_content = params.get('ref').slice(0, 120);
    attr.referrer = document.referrer ? document.referrer.slice(0, 200) : '';
    attr.landing = window.location.pathname;

    try { sessionStorage.setItem(STORE_KEY, JSON.stringify(attr)); } catch (e) { /* private mode */ }
    return attr;
  }

  var attribution = readAttribution();

  /* Privacy-friendly pageviews, only if a domain is configured. */
  if (CFG.plausibleDomain) {
    var s = document.createElement('script');
    s.defer = true;
    s.setAttribute('data-domain', CFG.plausibleDomain);
    s.src = 'https://plausible.io/js/script.js';
    document.head.appendChild(s);
  }

  /* ---------------------------------------------------------------
     Countdown — renders only when a launch date exists.
     The page never states a date it has not been given.
     --------------------------------------------------------------- */
  (function countdown() {
    if (!CFG.launchISO) return;
    var target = new Date(CFG.launchISO).getTime();
    if (isNaN(target)) return;

    var el = $('countdown');
    var UNITS = [['Days', 864e5], ['Hours', 36e5], ['Minutes', 6e4], ['Seconds', 1e3]];

    el.innerHTML = UNITS.map(function (u) {
      return '<div class="cell"><span class="n" data-u="' + u[0] + '">--</span>' +
             '<span class="l">' + u[0] + '</span></div>';
    }).join('');
    el.hidden = false;

    function tick() {
      var left = target - Date.now();
      if (left <= 0) { el.hidden = true; return; }
      UNITS.forEach(function (u) {
        var v = Math.floor(left / u[1]);
        left -= v * u[1];
        el.querySelector('[data-u="' + u[0] + '"]').textContent = v < 10 ? '0' + v : String(v);
      });
      setTimeout(tick, 1000);
    }
    tick();
  }());

  /* ---------------------------------------------------------------
     Email capture
     --------------------------------------------------------------- */
  var form = $('waitlist');
  var input = $('email');
  var button = $('submit');
  var note = $('form-note');
  var cap = CFG.capture || {};

  function say(msg, isError) {
    note.textContent = msg;
    note.className = isError ? 'note error' : 'note';
  }

  /* No provider wired: refuse to take an address we cannot store.
     A form that stores nothing is worse than no form. */
  if (!cap.provider) {
    input.disabled = true;
    button.disabled = true;
    input.removeAttribute('required');
    say('Not yet open.');
    form.addEventListener('submit', function (e) { e.preventDefault(); });
    return;
  }

  function valid(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); }

  /* Mailchimp's classic hosted endpoint speaks JSONP, so the visitor never
     leaves the page and no API key is exposed. */
  function submitMailchimp(email, done) {
    var mc = cap.mailchimp || {};
    var cb = 'mahzim_cb_' + Date.now();
    var url = 'https://' + mc.dc + '.list-manage.com/subscribe/post-json' +
              '?u=' + encodeURIComponent(mc.u) +
              '&id=' + encodeURIComponent(mc.id) +
              '&EMAIL=' + encodeURIComponent(email);

    // Attribution rides along as merge fields (create these on the audience).
    if (attribution.utm_source)   url += '&SOURCE=' + encodeURIComponent(attribution.utm_source);
    if (attribution.utm_campaign) url += '&CAMPAIGN=' + encodeURIComponent(attribution.utm_campaign);
    if (attribution.utm_content)  url += '&POST=' + encodeURIComponent(attribution.utm_content);

    url += '&c=' + cb;

    var script = document.createElement('script');
    var timer = setTimeout(function () { cleanup(); done(new Error('timeout')); }, 12000);

    function cleanup() {
      clearTimeout(timer);
      delete window[cb];
      if (script.parentNode) script.parentNode.removeChild(script);
    }

    window[cb] = function (res) {
      cleanup();
      // Mailchimp says "error" for an address already on the list; that is a success here.
      if (res && res.result === 'error' && !/already subscribed/i.test(res.msg || '')) {
        done(new Error(String(res.msg || '').replace(/<[^>]*>/g, '')));
      } else {
        done(null);
      }
    };

    script.onerror = function () { cleanup(); done(new Error('network')); };
    script.src = url;
    document.body.appendChild(script);
  }

  /* FormSubmit's AJAX endpoint answers CORS and forwards each submission to the
     mailbox the endpoint was built from. Underscore-prefixed keys are its own
     directives; everything else is forwarded as a row, so attribution rides
     along with the address. It answers 200 even when it refuses, so the
     success flag in the body is what decides. */
  function submitFormsubmit(email, done) {
    var body = {
      email: email,
      _subject: 'Mahzim waitlist signup',
      _template: 'table',
      _captcha: 'false'
    };
    UTM_KEYS.concat(['referrer', 'landing']).forEach(function (k) {
      if (attribution[k]) body[k] = attribution[k];
    });

    fetch(cap.formsubmit.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(body)
    })
      .then(function (r) { return r.json().catch(function () { return null; }); })
      .then(function (res) {
        done(res && String(res.success) === 'true' ? null : new Error('network'));
      })
      .catch(function () { done(new Error('network')); });
  }

  function submitEndpoint(email, done) {
    var body = { email: email };
    UTM_KEYS.concat(['referrer', 'landing']).forEach(function (k) {
      if (attribution[k]) body[k] = attribution[k];
    });

    fetch(cap.endpoint.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then(function (r) { done(r.ok ? null : new Error('HTTP ' + r.status)); })
      .catch(function () { done(new Error('network')); });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var email = input.value.trim();

    if (!valid(email)) { say('That address does not look right.', true); input.focus(); return; }

    button.disabled = true;
    say('');

    var send = cap.provider === 'formsubmit' ? submitFormsubmit
             : cap.provider === 'mailchimp'  ? submitMailchimp
             : submitEndpoint;
    send(email, function (err) {
      if (err) {
        button.disabled = false;
        say(err.message === 'network' || err.message === 'timeout'
              ? 'That did not go through. Try again.'
              : err.message, true);
        return;
      }
      form.reset();
      input.disabled = true;
      say('You are on the list.');
      if (window.plausible) window.plausible('Waitlist signup');
    });
  });
}());
