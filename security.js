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

    global.AppSecurity = Object.freeze({escapeHtml, safeHttpUrl, safeImageUrl, safePdfUrl});
})(window);