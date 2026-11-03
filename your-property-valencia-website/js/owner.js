/* Your Property Valencia: shows the owner details on the legal pages only when asked.
   The details are kept out of the page source so simple scrapers don't collect them. */
(function () {
  "use strict";
  var D = {
    name: "U2FyYSBNdcOxb3ogU2ltw7Nu",
    taxid: "NDgwNDA5NjhW",
    address: "QXZlbmlkYSBQZXJpcyB5IFZhbGVybyAxODgsIDQ2MDA2IFZhbGVuY2lh"
  };
  function dec(s) {
    return new TextDecoder().decode(Uint8Array.from(atob(s), function (c) { return c.charCodeAt(0); }));
  }
  var btn = document.querySelector(".owner-reveal");
  var box = document.getElementById("ownerData");
  if (!btn || !box) return;
  var filled = false;
  btn.addEventListener("click", function () {
    if (!filled) {
      [].forEach.call(box.querySelectorAll("[data-owner]"), function (el) {
        el.textContent = dec(D[el.getAttribute("data-owner")]);
      });
      filled = true;
    }
    var open = box.hasAttribute("hidden");
    if (open) box.removeAttribute("hidden"); else box.setAttribute("hidden", "");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.textContent = open ? "Hide owner details" : "Show owner details";
  });
})();
