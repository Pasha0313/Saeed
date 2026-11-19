// Mobile nav toggle — shows/hides the primary nav links on narrow screens.
// The toggle button itself is only visible under the site.css mobile breakpoint;
// on wider screens the links stay visible regardless of the "open" class.
(function () {
  document.querySelectorAll(".nav-toggle").forEach(function (btn) {
    var menu = document.getElementById(btn.getAttribute("aria-controls"));
    if (!menu) return;

    btn.addEventListener("click", function () {
      var isOpen = menu.classList.toggle("open");
      btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Tapping a link closes the menu (relevant when it navigates to an
    // in-page anchor, e.g. index.html's Research/Publications links).
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      });
    });
  });

  // Reveal major content groups as visitors move through long archive pages.
  // Content remains visible when IntersectionObserver is unavailable.
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px" });

    document.querySelectorAll("main > .section, main > .grid, main > .panel, main > .timeline, main > .gallery, main > .masonry, main > .lede, main > .cv").forEach(function (item) {
      item.classList.add("page-reveal");
      observer.observe(item);
    });
  }
})();
