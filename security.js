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

    function notifyGuestAction(action, user) {
        if (!isGuest(user)) return false;
        global.alert(`عذراً، ليس بإمكانك ${action}، لا تملك حساباً.`);
        return true;
    }

    global.document.addEventListener('click', event => {
        if (!isGuest()) return;
        let action = '';
        if (event.target.closest('#openPostComposer, #publishPostButton')) action = 'النشر';
        else if (event.target.closest('[data-bookmark-id], [data-toggle-saved-question]')) action = 'الحفظ';
        if (!action) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        notifyGuestAction(action);
    }, true);

    global.document.addEventListener('submit', event => {
        if (!isGuest()) return;
        const form = event.target;
        let action = '';
        if (form.matches('#questionForm')) action = 'طرح سؤال';
        else if (form.matches('[data-answer-form]')) action = 'إرسال إجابة';
        else if (form.matches('[data-comment-form]')) action = 'إرسال تعليق';
        else return;
        event.preventDefault();
        event.stopImmediatePropagation();
        notifyGuestAction(action);
    }, true);

    global.AppSecurity = Object.freeze({escapeHtml, safeHttpUrl, safeImageUrl, safePdfUrl, isGuest, notifyGuestAction});
})(window);