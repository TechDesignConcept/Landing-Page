(function () {
    'use strict';

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
        document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-revealed'); });
        return;
    }

    /* Scroll reveal */
    const io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
                io.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

    /* Animated stat counters */
    function parseTarget(el) {
        const raw = el.dataset.target || el.textContent;
        const match = raw.match(/([\d.]+)/);
        return match ? parseFloat(match[1]) : 0;
    }
    function renderNumber(el, value, suffix, prefix) {
        const rounded = value >= 100 ? Math.round(value) : value.toFixed(value % 1 ? 1 : 0);
        el.textContent = (prefix || '') + rounded + (suffix || '');
    }
    const statIo = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseTarget(el);
            const suffix = el.dataset.suffix || '';
            const prefix = el.dataset.prefix || '';
            const duration = 1400;
            const start = performance.now();
            function frame(now) {
                const t = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - t, 3);
                renderNumber(el, target * eased, suffix, prefix);
                if (t < 1) requestAnimationFrame(frame);
            }
            requestAnimationFrame(frame);
            statIo.unobserve(el);
        });
    }, { threshold: 0.3 });
    document.querySelectorAll('[data-count]').forEach(function (el) { statIo.observe(el); });

    /* Cursor-follow hero glow */
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        const glow = heroVisual.querySelector('.glow');
        if (glow) {
            heroVisual.addEventListener('mousemove', function (e) {
                const rect = heroVisual.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                glow.style.transform = 'translate(' + ((x - 50) * 0.4) + 'px, ' + ((y - 50) * 0.4) + 'px)';
            });
            heroVisual.addEventListener('mouseleave', function () {
                glow.style.transform = '';
            });
        }
    }

    /* Marquee seamless loop — clone children via cloneNode */
    document.querySelectorAll('.marquee-track').forEach(function (track) {
        const originals = Array.from(track.children);
        originals.forEach(function (child) { track.appendChild(child.cloneNode(true)); });
    });
})();
