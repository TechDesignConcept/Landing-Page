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
            if (!res.ok) throw new Error('network');
            form.hidden = true;
            success.hidden = false;
            success.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }).catch(function () {
            if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalBtnLabel; }
            alert('Sorry — something went wrong. Please email info@techdesignconcept.com directly.');
        });
    });
})();
