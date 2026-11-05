/* Your Property Valencia: newsletter sign-up
   The newsletter sign-up page link goes between the quotes below.
   Leave it empty and nothing newsletter-related shows on the site. */

(function () {
  "use strict";

  var NEWSLETTER_URL = "https://z3g1v7.subscribepage.io/";

  if (!NEWSLETTER_URL) return;

  var SNOOZE_DAYS = 30; // how long the pop-up stays away after "No thanks"
  var SHOW_AFTER_MS = 25000; // pop-up delay on a page
  var KEY = "ypv-newsletter-dismissed";

  var store = {
    get: function () {
      try { return window.localStorage.getItem(KEY); } catch (e) { return null; }
    },
    set: function (v) {
      try { window.localStorage.setItem(KEY, v); } catch (e) {}
    },
  };

  function link(cls, label) {
    var a = document.createElement("a");
    a.className = cls;
    a.href = NEWSLETTER_URL;
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = label;
    return a;
  }

  /* ---------- footer link ---------- */
  var contactList = document.querySelector(".site-footer .footer-grid > div:last-child ul");
  if (contactList) {
    var li = document.createElement("li");
    var fa = document.createElement("a");
    fa.href = NEWSLETTER_URL;
    fa.target = "_blank";
    fa.rel = "noopener";
    fa.textContent = "Join the newsletter";
    li.appendChild(fa);
    contactList.appendChild(li);
  }

  /* ---------- band above the footer, on every page ---------- */
  var footer = document.querySelector(".site-footer");
  if (footer) {
    var band = document.createElement("section");
    band.className = "newsletter-band";
    band.setAttribute("aria-label", "Newsletter");
    band.innerHTML =
      '<div class="container newsletter-band__inner">' +
      '<div><h2>Valencia Real Estate Insider</h2>' +
      "<p>Off-market deals, rental strategies and market insights from Valencia, straight to your inbox.</p></div>" +
      "</div>";
    band.querySelector(".newsletter-band__inner").appendChild(link("btn btn-primary btn-lg", "Join the newsletter"));
    footer.parentNode.insertBefore(band, footer);
  }

  /* ---------- pop-up ---------- */
  var dismissedAt = parseInt(store.get() || "0", 10);
  if (dismissedAt && Date.now() - dismissedAt < SNOOZE_DAYS * 86400000) return;

  var shown = false;
  var lastFocus = null;
  var overlay = document.createElement("div");
  overlay.className = "newsletter-pop";
  overlay.hidden = true;
  overlay.innerHTML =
    '<div class="newsletter-pop__card" role="dialog" aria-modal="true" aria-labelledby="nlTitle">' +
    '<button type="button" class="newsletter-pop__close" aria-label="Close">&times;</button>' +
    '<p class="eyebrow">Newsletter</p>' +
    '<h2 id="nlTitle">Valencia Real Estate Insider</h2>' +
    "<p>Off-market deals, rental strategies and market insights from Valencia, straight to your inbox.</p>" +
    '<div class="newsletter-pop__actions"></div>' +
    "</div>";
  var actions = overlay.querySelector(".newsletter-pop__actions");
  var join = link("btn btn-primary", "Join the newsletter");
  var no = document.createElement("button");
  no.type = "button";
  no.className = "newsletter-pop__no";
  no.textContent = "No thanks";
  actions.appendChild(join);
  actions.appendChild(no);
  document.body.appendChild(overlay);

  function close() {
    overlay.hidden = true;
    document.removeEventListener("keydown", onKey);
    store.set(String(Date.now()));
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function onKey(e) {
    if (e.key === "Escape") close();
  }
  function open() {
    if (shown) return;
    shown = true;
    lastFocus = document.activeElement;
    overlay.hidden = false;
    document.addEventListener("keydown", onKey);
    join.focus();
  }

  overlay.querySelector(".newsletter-pop__close").addEventListener("click", close);
  no.addEventListener("click", close);
  join.addEventListener("click", function () {
    store.set(String(Date.now()));
    overlay.hidden = true;
    document.removeEventListener("keydown", onKey);
  });
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) close();
  });

  /* show after a delay, or once the visitor has read most of the page */
  setTimeout(open, SHOW_AFTER_MS);
  window.addEventListener(
    "scroll",
    function onScroll() {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max > 0.6) {
        window.removeEventListener("scroll", onScroll);
        open();
      }
    },
    { passive: true }
  );
})();
