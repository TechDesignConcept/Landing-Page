/* Services page: section nav scroll-spy via IntersectionObserver.
   Externalised from an inline <script> so it satisfies the site CSP
   (script-src 'self') without needing 'unsafe-inline'. */
(function () {
    'use strict';
    var navLinks = document.querySelectorAll('.services-nav a');
    if (!navLinks.length || !('IntersectionObserver' in window)) return;
    var map = {};
    navLinks.forEach(function (a) {
        var id = a.getAttribute('href').slice(1);
        map[id] = a;
    });
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                navLinks.forEach(function (a) { a.classList.remove('is-active'); });
                var link = map[entry.target.id];
                if (link) link.classList.add('is-active');
            }
        });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });
    Object.keys(map).forEach(function (id) {
        var el = document.getElementById(id);
        if (el) observer.observe(el);
    });
})();
