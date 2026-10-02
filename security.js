(function(global) {
    function escapeHtml(value) {
        return String(value ?? '').replace(/[&<>\'"]/g, character => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[character]));
    }

    function safeHttpUrl(value) {
        if (typeof value !== 'string' || !value.trim()) return '';
        try {
            const url = new URL(value.trim(), global.location.href);
            if ((url.protocol === 'https:' || url.protocol === 'http:') && !url.username && !url.password) return url.href;
        } catch (_) {}
        return '';
    }

    function safeImageUrl(value) {
        if (typeof value !== 'string') return '';
        const url = value.trim();
        if (/^data:image\/(?:png|jpeg|webp|gif);base64,[a-z0-9+/]+=*$/i.test(url)) return url;
        return safeHttpUrl(url);
    }

    function safePdfUrl(value) {
        if (typeof value !== 'string') return '';
        const url = value.trim();
        if (/^data:application\/pdf;base64,[a-z0-9+/]+=*$/i.test(url)) return url;
        return safeHttpUrl(url);
    }

    function isGuest(user) {
        let activeUser = user;
        if (!activeUser) {
            try {
                activeUser = JSON.parse(global.localStorage.getItem('current_user') || 'null');
            } catch (_) {
                activeUser = null;
            }
        }
        return Boolean(activeUser && (activeUser.isGuest === true || activeUser.role === 'guest'));
    }

    function activateGuestView() {
        if (!isGuest() || !global.document.body) return;
        global.document.body.classList.add('guest-mode');
        if (!global.document.getElementById('guestModeStyles')) {
            const style = global.document.createElement('style');
            style.id = 'guestModeStyles';
            style.textContent = `
                body.guest-mode main img:not(.rounded-full):not(#largeProfileImage) {
                    filter: blur(12px) !important;
                    pointer-events: none !important;
                    user-select: none !important;
                }
                body.guest-mode details[id^="post-comments-"] { display: none !important; }
                body.guest-mode main a[download],
                body.guest-mode main [data-download-image],
                body.guest-mode main a[href*="cloudinary.com"],
                body.guest-mode main a[href^="data:application/pdf"],
                body.guest-mode main a:has(img:not(.rounded-full)) { display: none !important; }
                body.guest-mode #postComposerModal,
                body.guest-mode #openPostComposer,
                body.guest-mode #questionForm,
                body.guest-mode [data-answer-form],
                body.guest-mode #profileImageEdit,
                body.guest-mode #saveProfileButton { display: none !important; }
            `;
            global.document.head.appendChild(style);
        }
    }

    global.document.addEventListener('click', event => {
        if (!isGuest()) return;
        const link = event.target.closest('a');
        const downloadControl = event.target.closest('[download], [data-download-image]');
        if (downloadControl || (link && (link.href.includes('cloudinary.com') || link.querySelector('img:not(.rounded-full)')))) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }
    }, true);

    activateGuestView();
    global.AppSecurity = Object.freeze({escapeHtml, safeHttpUrl, safeImageUrl, safePdfUrl, isGuest, activateGuestView});
})(window);