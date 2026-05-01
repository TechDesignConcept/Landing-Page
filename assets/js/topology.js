(function () {
    var canvas = document.getElementById('topo-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var W, H;

    var nodes = [
        { label: 'Modern Work',           bx: 0.62, by: 0.35, ax: 110, ay: 80,  r: 28, phase: 0.0 },
        { label: 'Infrastructure',        bx: 0.80, by: 0.25, ax: 90,  ay: 100, r: 22, phase: 1.1 },
        { label: 'Security',              bx: 0.90, by: 0.58, ax: 70,  ay: 90,  r: 20, phase: 2.3 },
        { label: 'Data & AI',             bx: 0.75, by: 0.70, ax: 100, ay: 70,  r: 20, phase: 3.7 },
        { label: 'Business Applications', bx: 0.65, by: 0.65, ax: 80,  ay: 110, r: 20, phase: 5.1 },
    ];

    var edges = [[0,1],[0,2],[0,3],[0,4],[1,2],[1,3],[2,3],[3,4],[1,4]];

    var ACCENT      = '#0078D4';
    var ACCENT_GLOW = 'rgba(0,120,212,';

    function resize() {
        var el = canvas.parentElement;
        while (el && !el.classList.contains('hero')) { el = el.parentElement; }
        var hero = el || canvas.parentElement;
        W = canvas.width  = window.innerWidth;
        H = canvas.height = Math.max(hero.offsetHeight, window.innerHeight * 0.88);
        canvas.style.width  = W + 'px';
        canvas.style.height = H + 'px';
    }

    function nodePos(n, t) {
        return {
            x: n.bx * W + Math.sin(t * 0.0007 + n.phase)       * n.ax,
            y: n.by * H + Math.cos(t * 0.0009 + n.phase * 1.3) * n.ay,
        };
    }

    function roundRect(cx, x, y, w, h, r) {
        cx.beginPath();
        cx.moveTo(x + r, y);
        cx.lineTo(x + w - r, y);
        cx.quadraticCurveTo(x + w, y,     x + w, y + r);
        cx.lineTo(x + w, y + h - r);
        cx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        cx.lineTo(x + r, y + h);
        cx.quadraticCurveTo(x, y + h,     x, y + h - r);
        cx.lineTo(x, y + r);
        cx.quadraticCurveTo(x, y,         x + r, y);
        cx.closePath();
    }

    function draw(t) {
        ctx.clearRect(0, 0, W, H);
        var positions = nodes.map(function (n) { return nodePos(n, t); });

        /* Edges */
        edges.forEach(function (e) {
            var a = positions[e[0]], b = positions[e[1]];
            var dist  = Math.hypot(b.x - a.x, b.y - a.y);
            var alpha = Math.max(0.06, 0.28 - dist / 1800);
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle    = ACCENT_GLOW + alpha + ')';
            ctx.lineWidth      = 1.2;
            ctx.setLineDash([6, 9]);
            ctx.lineDashOffset = -(t * 0.04);
            ctx.stroke();
            ctx.restore();
        });

        /* Nodes */
        nodes.forEach(function (n, i) {
            var p     = positions[i];
            var pulse = 0.5 + 0.5 * Math.sin(t * 0.0015 + n.phase);

            /* Outer glow */
            var outerR = n.r + 18 + pulse * 12;
            var grd = ctx.createRadialGradient(p.x, p.y, n.r * 0.5, p.x, p.y, outerR);
            grd.addColorStop(0, ACCENT_GLOW + (0.18 + pulse * 0.1) + ')');
            grd.addColorStop(1, ACCENT_GLOW + '0)');
            ctx.beginPath();
            ctx.arc(p.x, p.y, outerR, 0, Math.PI * 2);
            ctx.fillStyle = grd;
            ctx.fill();

            /* Ring */
            ctx.beginPath();
            ctx.arc(p.x, p.y, n.r + 10, 0, Math.PI * 2);
            ctx.strokeStyle = ACCENT_GLOW + '0.22)';
            ctx.lineWidth   = 1;
            ctx.setLineDash([]);
            ctx.stroke();

            /* Core */
            ctx.beginPath();
            ctx.arc(p.x, p.y, n.r, 0, Math.PI * 2);
            ctx.strokeStyle = ACCENT_GLOW + '0.55)';
            ctx.lineWidth   = 1.5;
            ctx.stroke();

            /* Centre dot */
            ctx.beginPath();
            ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
            ctx.fillStyle = ACCENT;
            ctx.fill();

            /* Pill label */
            ctx.font         = '500 11px "Geist Mono", ui-monospace, monospace';
            ctx.textAlign    = 'center';
            ctx.textBaseline = 'middle';
            var tw = ctx.measureText(n.label).width;
            var ph = 18, pw = tw + 20, pr = 9;
            var lx = p.x - pw / 2;
            var ly = p.y + n.r + 10;

            roundRect(ctx, lx, ly, pw, ph, pr);
            ctx.fillStyle = 'rgba(10,10,14,0.82)';
            ctx.fill();

            roundRect(ctx, lx, ly, pw, ph, pr);
            ctx.strokeStyle = 'rgba(0,120,212,0.35)';
            ctx.lineWidth   = 1;
            ctx.stroke();

            ctx.fillStyle = 'rgba(161,161,170,0.9)';
            ctx.fillText(n.label, p.x, ly + ph / 2);
        });

        /* Left fade */
        var fadeW    = W * 0.42;
        var leftFade = ctx.createLinearGradient(0, 0, fadeW, 0);
        leftFade.addColorStop(0,    'rgba(6,6,8,0.96)');
        leftFade.addColorStop(0.65, 'rgba(6,6,8,0)');
        ctx.fillStyle = leftFade;
        ctx.fillRect(0, 0, fadeW, H);

        /* Vignette */
        var radFade = ctx.createRadialGradient(W * 0.65, H * 0.5, H * 0.3, W * 0.65, H * 0.5, H * 1.1);
        radFade.addColorStop(0, 'rgba(6,6,8,0)');
        radFade.addColorStop(1, 'rgba(6,6,8,0.75)');
        ctx.fillStyle = radFade;
        ctx.fillRect(0, 0, W, H);
    }

    function loop(t) { draw(t); requestAnimationFrame(loop); }

    window.addEventListener('resize', function () { resize(); draw(0); });

    function init() {
        resize();
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            draw(0);
        } else {
            requestAnimationFrame(loop);
        }
    }

    if (document.readyState === 'complete') {
        init();
    } else {
        window.addEventListener('load', init);
    }
})();
