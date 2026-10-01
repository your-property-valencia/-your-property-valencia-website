/* Your Property Valencia — site behaviour
   Vanilla JS, no dependencies. Safe to load with `defer`. */

(function () {
  "use strict";

  /* ---------- sticky header shadow ---------- */
  var header = document.getElementById("siteHeader");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- mobile nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("navMenu");
  if (toggle && menu) {
    var closeMenu = function () {
      toggle.setAttribute("aria-expanded", "false");
      menu.classList.remove("is-open");
    };
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      menu.classList.toggle("is-open", !open);
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeMenu();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 900) closeMenu();
    });
  }

  /* ---------- scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if ("IntersectionObserver" in window && revealEls.length && !reduceMotion) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealEls.forEach(function (el) {
      el.classList.add("reveal--armed"); // hide only now that we can reveal
      io.observe(el);
    });
  }

  /* ---------- contact form (front-end only) ----------
     No backend yet. This shows a confirmation message and
     keeps the entered data. To make it actually send, wire the
     <form> up to Formspree / your booking tool — see README.md */
  var form = document.getElementById("contactForm");
  if (form) {
    var status = form.querySelector(".form-status");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      if (status) {
        var name = (form.querySelector('[name="name"]') || {}).value || "";
        status.textContent =
          "Thank you" +
          (name ? ", " + name.split(" ")[0] : "") +
          ". Your message is ready — connect the form to email or a booking tool to start receiving these (see README).";
        status.classList.add("is-visible");
        status.setAttribute("role", "status");
      }
      form.querySelector(".btn").textContent = "Message prepared";
    });
  }

  /* ---------- case-study transformation gallery ----------
     A drag-to-compare slider: pull the handle (or click/tap anywhere)
     to reveal more of the "after" photo over the "before" one. */
  document.querySelectorAll(".cs-gallery").forEach(function (g) {
    var thumbs = [].slice.call(g.querySelectorAll(".cs-gallery__thumbs button"));
    if (!thumbs.length) return;
    var compare = g.querySelector(".cs-compare");
    var beforeImg = compare.querySelector(".cs-compare__before");
    var afterImg = compare.querySelector(".cs-compare__after");
    var handle = compare.querySelector(".cs-compare__handle");
    var idxEl = g.querySelector(".cs-gallery__idx");
    var i = 0;

    function setPos(pct) {
      pct = Math.max(0, Math.min(100, pct));
      compare.style.setProperty("--pos", pct + "%");
      if (handle) handle.setAttribute("aria-valuenow", String(Math.round(pct)));
    }

    function show(n) {
      i = (n + thumbs.length) % thumbs.length;
      var t = thumbs[i];
      var label = (t.querySelector("img") || {}).alt || "";
      var before = t.getAttribute("data-before");
      var after = t.getAttribute("data-after");
      afterImg.src = after;
      afterImg.alt = label ? label + " after renovation" : "";
      if (before) {
        beforeImg.src = before;
        beforeImg.alt = label ? label + " before renovation" : "";
        compare.classList.remove("is-single");
        setPos(50);
      } else {
        beforeImg.src = after;
        beforeImg.alt = "";
        compare.classList.add("is-single");
        setPos(100);
      }
      thumbs.forEach(function (x, xi) {
        x.classList.toggle("is-active", xi === i);
        x.setAttribute("aria-current", xi === i ? "true" : "false");
      });
      if (idxEl) idxEl.textContent = String(i + 1);
    }

    /* dragging the divider */
    var dragging = false;
    function posFromEvent(e) {
      var rect = compare.getBoundingClientRect();
      var clientX = "touches" in e && e.touches.length ? e.touches[0].clientX : e.clientX;
      return ((clientX - rect.left) / rect.width) * 100;
    }
    compare.addEventListener("pointerdown", function (e) {
      if (compare.classList.contains("is-single")) return;
      dragging = true;
      if (compare.setPointerCapture) compare.setPointerCapture(e.pointerId);
      setPos(posFromEvent(e));
    });
    compare.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      setPos(posFromEvent(e));
    });
    ["pointerup", "pointercancel", "pointerleave"].forEach(function (evt) {
      compare.addEventListener(evt, function () {
        dragging = false;
      });
    });
    if (handle) {
      handle.addEventListener("keydown", function (e) {
        var cur = parseFloat(compare.style.getPropertyValue("--pos")) || 50;
        if (e.key === "ArrowLeft") {
          setPos(cur - 5);
          e.preventDefault();
        } else if (e.key === "ArrowRight") {
          setPos(cur + 5);
          e.preventDefault();
        }
      });
    }

    var prev = g.querySelector(".cs-gallery__nav--prev");
    var next = g.querySelector(".cs-gallery__nav--next");
    if (prev) prev.addEventListener("click", function () { show(i - 1); });
    if (next) next.addEventListener("click", function () { show(i + 1); });
    thumbs.forEach(function (t, ti) {
      t.addEventListener("click", function () { show(ti); });
    });
    show(0);
  });

  /* ---------- current year in footer ---------- */
  var yearEl = document.querySelectorAll("[data-year]");
  yearEl.forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
