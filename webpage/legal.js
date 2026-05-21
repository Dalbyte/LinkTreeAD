// ── Copy on Click (mailto / tel) ───────────────────────
function showCopyBubble(element) {
    var rect = element.getBoundingClientRect();
    var bubble = document.createElement('div');
    bubble.className = 'copy-bubble';
    bubble.textContent = 'Copied!';
    bubble.style.left = (rect.left + rect.width / 2) + 'px';
    bubble.style.top = rect.top + 'px';
    document.body.appendChild(bubble);
    bubble.addEventListener('animationend', function () { bubble.remove(); });
}

document.querySelectorAll('a[href^="mailto:"]:not(.link), a[href^="tel:"]:not(.link)').forEach(function (link) {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        var href = this.getAttribute('href');
        var value = href.startsWith('mailto:') ? href.slice(7) : href.slice(4);
        var el = this;
        navigator.clipboard.writeText(value).then(function () {
            showCopyBubble(el);
        });
    });
});

// ── Modal ──────────────────────────────────────────────
function openModal(id) {
    document.getElementById(id).classList.add('active');
}

function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}

document.querySelectorAll('.modal-overlay').forEach(function(overlay) {
    overlay.addEventListener('click', function(e) {
        if (e.target === this) closeModal(this.id);
    });
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(function(m) {
            m.classList.remove('active');
        });
    }
});

// ── Google Fonts Consent ────────────────────────────────
function loadGoogleFonts() {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,100..900;1,100..900&display=swap';
    document.head.appendChild(link);
}

function setConsent(accepted) {
    localStorage.setItem('fonts-consent', accepted ? 'yes' : 'no');
    document.getElementById('consent-banner').classList.remove('active');
    if (accepted) loadGoogleFonts();
}

function resetConsent() {
    localStorage.removeItem('fonts-consent');
    closeModal('modal-datenschutz');
    document.getElementById('consent-banner').classList.add('active');
}

(function checkConsent() {
    var consent = localStorage.getItem('fonts-consent');
    if (consent === 'yes') {
        loadGoogleFonts();
    } else if (consent === null) {
        document.getElementById('consent-banner').classList.add('active');
    }
})();
