(function(global) {
    const PRESENCE_INTERVAL_MS = 30 * 1000;

    function saveLocalPresence(userId, lastSeenAt) {
        const users = JSON.parse(localStorage.getItem('app_users') || '[]');
        const user = users.find(item => String(item.id) === String(userId));
        if (user) {
            user.lastSeenAt = lastSeenAt;
            localStorage.setItem('app_users', JSON.stringify(users));
        }

        const currentUser = JSON.parse(localStorage.getItem('current_user') || 'null');
        if (currentUser && String(currentUser.id) === String(userId)) {
            currentUser.lastSeenAt = lastSeenAt;
            localStorage.setItem('current_user', JSON.stringify(currentUser));
        }
    }

    global.startPresenceTracking = function(db, user) {
        if (!user || !user.id) return;

        const updatePresence = async function() {
            if (document.visibilityState === 'hidden') return;

            const lastSeenAt = new Date().toISOString();
            try {
                saveLocalPresence(user.id, lastSeenAt);
            } catch (error) {
                console.error('تعذر تحديث حالة الاتصال محلياً:', error);
            }

            if (!db) return;
            try {
                await db.collection('users').doc(user.id).set({
                    lastSeenAt: firebase.firestore.FieldValue.serverTimestamp()
                }, {merge: true});
            } catch (error) {
                console.error('تعذر تحديث حالة الاتصال:', error);
            }
        };

        updatePresence();
        const intervalId = setInterval(updatePresence, PRESENCE_INTERVAL_MS);
        const onVisibilityChange = function() {
            if (document.visibilityState === 'visible') updatePresence();
        };
        const stopTracking = function() {
            clearInterval(intervalId);
            document.removeEventListener('visibilitychange', onVisibilityChange);
            window.removeEventListener('pagehide', stopTracking);
        };

        document.addEventListener('visibilitychange', onVisibilityChange);
        window.addEventListener('pagehide', stopTracking);
    };
})(window);