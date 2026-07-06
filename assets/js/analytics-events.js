/* Conversion event tracking. Delegated so it works on every page without
   inline handlers (CSP: script-src 'self'). */
(function () {
    'use strict';
    document.addEventListener('click', function (e) {
        if (typeof gtag !== 'function') return;
        var a = e.target.closest && e.target.closest('a[href]');
        if (!a) return;
        var href = a.getAttribute('href') || '';
        if (/\.pdf$/i.test(href)) {
            gtag('event', 'lead_magnet_download', {
                file_name: href.split('/').pop()
            });
        }
    });
})();
