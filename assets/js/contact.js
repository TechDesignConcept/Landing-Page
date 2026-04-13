(function () {
    'use strict';
    const form = document.getElementById('contact-form');
    const success = document.getElementById('contact-success');
    if (!form || !success) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnLabel = submitBtn ? submitBtn.textContent.trim() : 'Send';

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const data = new FormData(form);

        if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }

        fetch(form.action, {
            method: 'POST',
            body: data,
            headers: { 'Accept': 'application/json' }
        }).then(function (res) {
            return res.json().catch(function () { return {}; }).then(function (body) {
                if (!res.ok) {
                    const reason = (body && (body.error || (body.errors && body.errors.map(function (e) { return e.message; }).join(', ')))) || ('HTTP ' + res.status);
                    throw new Error(reason);
                }
                form.hidden = true;
                success.hidden = false;
                success.scrollIntoView({ behavior: 'smooth', block: 'center' });
            });
        }).catch(function (err) {
            if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalBtnLabel; }
            console.error('Contact form submit failed:', err);
            alert('Sorry — something went wrong (' + (err && err.message ? err.message : 'unknown') + '). Please email info@techdesignconcept.com directly.');
        });
    });
})();
