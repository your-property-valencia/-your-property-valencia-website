/* Your Property Valencia — CMS-driven content
   Loads blog posts and testimonials from content/*.json (edited via the
   /admin panel — see CMS-SETUP.md) and swaps them into the page.

   Safe by design: the HTML already contains the current real content, so if
   this script fails, is blocked, or the JSON is missing/empty, the page just
   keeps showing what's already there — nothing goes blank. */

(function () {
  "use strict";

  function escapeHtml(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function escapeAttr(str) {
    // only allow relative page links or http(s) links — anything else falls
    // back to "#" so a stray value can never inject a javascript: URL etc.
    var s = String(str == null ? "" : str).trim();
    if (/^(https?:)?\/\//i.test(s) || /^[a-z0-9_-]+\.html(#[\w-]+)?$/i.test(s) || /^#[\w-]+$/i.test(s) || /^mailto:/i.test(s)) {
      return escapeHtml(s);
    }
    return "#";
  }

  function fetchJson(path) {
    return fetch(path, { cache: "no-store" }).then(function (res) {
      if (!res.ok) throw new Error("not ok");
      return res.json();
    });
  }

  /* ---------- blog posts ---------- */
  var blogGrid = document.getElementById("blog-posts-grid");
  if (blogGrid) {
    fetchJson("content/blog-posts.json")
      .then(function (data) {
        var posts = (data && data.posts) || [];
        if (!posts.length) return;
        blogGrid.innerHTML = posts
          .map(function (p) {
            var meta = escapeHtml(p.category || "");
            if (p.status) meta += " &middot; " + escapeHtml(p.status);
            return (
              '<article class="card post-card">' +
              '<p class="post-card__meta"><span class="pill">' + meta + "</span></p>" +
              "<h2>" + escapeHtml(p.title) + "</h2>" +
              "<p>" + escapeHtml(p.excerpt) + "</p>" +
              '<p class="post-card__link"><a href="' + escapeAttr(p.linkUrl) + '">' +
              "Read more &rarr;</a></p>" +
              "</article>"
            );
          })
          .join("");
      })
      .catch(function () {
        /* keep the existing hardcoded cards */
      });
  }

  /* ---------- testimonials ----------
     any element with data-testimonials="N" gets the first N quotes;
     data-testimonials="all" gets every quote. */
  var testimonialTargets = [].slice.call(document.querySelectorAll("[data-testimonials]"));
  if (testimonialTargets.length) {
    fetchJson("content/testimonials.json")
      .then(function (data) {
        var items = (data && data.items) || [];
        if (!items.length) return;
        testimonialTargets.forEach(function (grid) {
          var raw = grid.getAttribute("data-testimonials");
          var count = raw === "all" ? items.length : parseInt(raw, 10) || items.length;
          grid.innerHTML = items
            .slice(0, count)
            .map(function (t) {
              return (
                '<figure class="quote">' +
                '<div class="quote__mark">&ldquo;</div>' +
                "<p>" + escapeHtml(t.quote) + "</p>" +
                '<figcaption class="quote__who"><b>' + escapeHtml(t.name) + "</b>" +
                escapeHtml(t.location) + "</figcaption>" +
                "</figure>"
              );
            })
            .join("");
        });
      })
      .catch(function () {
        /* keep the existing hardcoded quotes */
      });
  }
})();
