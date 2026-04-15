// Modern AI Enablement ROI calculator
// Anchors only. Real numbers need a baseline measurement.
(function(){
    function init(){
        var devsEl = document.getElementById("roi-devs");
        if (!devsEl) return; // not on this page
        var fmt = function(n){ return "A$" + Math.round(n).toLocaleString("en-AU"); };
        var el = function(id){ return document.getElementById(id); };

        function calc(){
            var devs = +el("roi-devs").value || 0;
            var salary = +el("roi-salary").value || 0;
            var uplift = +el("roi-uplift").value || 0;
            var kw = +el("roi-kw").value || 0;
            var kwcost = +el("roi-kwcost").value || 0;

            var captureDev = 0.70;
            var captureKw = 0.30;
            var kwUplift = 0.08;
            var licDev = 700;
            var licKw = 540;
            var tdcFee = 145000;

            var eng = devs * salary * uplift * captureDev;
            var know = kw * kwcost * kwUplift * captureKw;
            var lic = devs * licDev + kw * licKw;
            var total = eng + know;
            var net = total - lic - tdcFee;

            el("roi-eng").textContent = fmt(eng);
            el("roi-know").textContent = fmt(know);
            el("roi-lic").textContent = fmt(lic);
            el("roi-total").textContent = fmt(total);
            el("roi-net").textContent = fmt(net);
        }

        ["roi-devs","roi-salary","roi-uplift","roi-kw","roi-kwcost"].forEach(function(id){
            var node = el(id);
            if (!node) return;
            node.addEventListener("input", calc);
            node.addEventListener("change", calc);
        });
        calc();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
