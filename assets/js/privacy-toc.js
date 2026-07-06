/* Privacy page: table-of-contents scroll-spy and smooth-scroll.
   Externalised from an inline <script> so it satisfies the site CSP
   (script-src 'self') without needing 'unsafe-inline'. */
(function () {
    'use strict';
    var links = document.querySelectorAll('.privacy-toc a');
    if (!links.length) return;
    var sections = Array.prototype.slice.call(links).map(function (a) {
        return document.querySelector(a.getAttribute('href'));
    }).filter(Boolean);
    if (!sections.length) return;

    function onScroll() {
        var pos = window.scrollY + 140;
        var current = sections[0];
        sections.forEach(function (s) { if (s.offsetTop <= pos) current = s; });
        links.forEach(function (a) {
            a.classList.toggle('active', a.getAttribute('href') === '#' + current.id);
        });
    }
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    links.forEach(function (a) {
        a.addEventListener('click', function (e) {
            var target = document.querySelector(a.getAttribute('href'));
            if (target) {
                e.preventDefault();
                window.scrollTo({ top: target.offsetTop - 90, behavior: 'smooth' });
                history.pushState(null, '', a.getAttribute('href'));
            }
        });
    });
})();
