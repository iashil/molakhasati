(function () {
    'use strict';

    const FIREBASE_CONFIG = {
        apiKey: 'AIzaSyByDS_xwe-nZQWlWTMUgRex4ITMPWtGRKQ',
        authDomain: 'molakhasat-web.firebaseapp.com',
        projectId: 'molakhasat-web',
        messagingSenderId: '87734758041',
        appId: '1:87734758041:web:22251786db9b0aee2fa608'
    };
    const MAX_MESSAGE_LENGTH = 1000;
    const MAX_CONTACTS = 100;
    const MAX_CONVERSATION_MESSAGES = 100;
    const currentUser = readCurrentUser();
    const status = document.getElementById('chatStatus');
    const contactsList = document.getElementById('contactsList');
    const messageList = document.getElementById('messageList');
    const messageForm = document.getElementById('messageForm');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const conversationName = document.getElementById('conversationName');
    const conversationHint = document.getElementById('conversationHint');
    let db = null;
    let functions = null;
    let activeContact = null;
    let usersById = new Map();
    let conversationUnsubscribe = null;
    let expirationTimer = null;
    let currentMessageSnapshot = null;
    let sending = false;

    function readCurrentUser() {
        try {
            return JSON.parse(localStorage.getItem('current_user') || 'null');
        } catch (error) {
            console.error('تعذر قراءة الحساب الحالي:', error);
            return null;
        }
    }

    function escapeHtml(value) {
        return String(value ?? '').replace(/[&<>'"]/g, character => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[character]));
    }

    function setStatus(message, isError) {
        status.textContent = message;
        status.classList.toggle('text-red-600', Boolean(isError));
        status.classList.toggle('dark:text-red-400', Boolean(isError));
    }

    function getTimestampMillis(value) {
        if (value && typeof value.toMillis === 'function') return value.toMillis();
        if (value && typeof value.toDate === 'function') return value.toDate().getTime();
        if (value instanceof Date) return value.getTime();
        return 0;
    }

    function formatMessageTime(value) {
        const millis = getTimestampMillis(value);
        if (!millis) return 'الآن';
        return new Intl.DateTimeFormat(document.documentElement.lang === 'en' ? 'en' : 'ar', {
            hour: 'numeric',
            minute: '2-digit'
        }).format(new Date(millis));
    }

    function conversationIdFor(userId, otherUserId) {
        return [String(userId), String(otherUserId)].sort().map(encodeURIComponent).join('__');
    }

    function contactButton(user, lastMessageAt, isActive) {
        const name = user.name || 'حساب';
        const initial = Array.from(name.trim())[0] || '؟';
        const lastActivity = lastMessageAt ? formatMessageTime(lastMessageAt) : 'محادثة نصية';
        return `<button type="button" data-contact-id="${escapeHtml(user.id)}" class="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-right transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:hover:bg-neutral-800 ${isActive ? 'bg-blue-50 dark:bg-blue-950/40' : ''}">
            <span aria-hidden="true" class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-sm font-bold text-white">${escapeHtml(initial)}</span>
            <span class="min-w-0 flex-1">
                <span class="block truncate text-xs font-bold">${escapeHtml(name)}</span>
                <span class="mt-1 block truncate text-[10px] text-slate-500 dark:text-slate-400">${escapeHtml(lastActivity)}</span>
            </span>
            <span aria-hidden="true" class="text-blue-600 dark:text-blue-400">›</span>
        </button>`;
    }

    async function loadContacts() {
        setStatus('جارٍ تحميل الحسابات والمحادثات...', false);
        const [userSnapshot, conversationSnapshot] = await Promise.all([
            db.collection('users').limit(MAX_CONTACTS).get(),
            db.collection('chat_conversations')
                .where('participantIds', 'array-contains', String(currentUser.id))
                .limit(MAX_CONTACTS)
                .get()
        ]);
        usersById = new Map();
        userSnapshot.forEach(document => {
            const user = {id: document.id, ...document.data()};
            if (user.id !== String(currentUser.id) && user.status !== 'banned' && user.role !== 'guest' && user.isGuest !== true) {
                usersById.set(user.id, user);
            }
        });

        const recentConversations = new Map();
        conversationSnapshot.forEach(document => {
            const data = document.data() || {};
            const otherId = (data.participantIds || []).find(id => String(id) !== String(currentUser.id));
            if (otherId) recentConversations.set(String(otherId), data.updatedAt || null);
        });

        const deepLinkedId = new URLSearchParams(window.location.search).get('uid');
        if (deepLinkedId && deepLinkedId !== String(currentUser.id) && !usersById.has(deepLinkedId)) {
            const target = await db.collection('users').doc(deepLinkedId).get();
            if (target.exists) {
                const user = {id: target.id, ...target.data()};
                if (user.status !== 'banned' && user.role !== 'guest' && user.isGuest !== true) usersById.set(user.id, user);
            }
        }

        const contacts = Array.from(usersById.values()).sort((left, right) => {
            const leftTime = getTimestampMillis(recentConversations.get(left.id));
            const rightTime = getTimestampMillis(recentConversations.get(right.id));
            if (leftTime !== rightTime) return rightTime - leftTime;
            return String(left.name || '').localeCompare(String(right.name || ''), document.documentElement.lang === 'en' ? 'en' : 'ar');
        });
        contactsList.innerHTML = contacts.length
            ? contacts.map(user => contactButton(user, recentConversations.get(user.id), false)).join('')
            : '<p class="px-4 py-6 text-center text-xs leading-6 text-slate-500 dark:text-slate-400">لا توجد حسابات متاحة للمراسلة.</p>';
        contactsList.querySelectorAll('[data-contact-id]').forEach(button => {
            button.addEventListener('click', () => openConversation(button.dataset.contactId));
        });
        setStatus('اختر حسابًا لبدء محادثة نصية. لا يمكن إرسال صور أو ملفات أو إجراء مكالمات.', false);
        if (deepLinkedId && usersById.has(deepLinkedId)) openConversation(deepLinkedId);
    }

    async function openConversation(otherId) {
        const contact = usersById.get(String(otherId));
        if (!contact) {
            setStatus('تعذر العثور على هذا الحساب.', true);
            return;
        }
        if (conversationUnsubscribe) conversationUnsubscribe();
        if (expirationTimer) clearInterval(expirationTimer);
        currentMessageSnapshot = null;
        activeContact = contact;
        conversationName.textContent = contact.name || 'حساب';
        conversationHint.textContent = 'رسائل نصية فقط · تختفي بعد 24 ساعة';
        messageInput.disabled = false;
        messageInput.placeholder = 'اكتب رسالتك هنا...';
        sendButton.disabled = false;
        contactsList.querySelectorAll('[data-contact-id]').forEach(button => {
            const selected = button.dataset.contactId === String(contact.id);
            button.classList.toggle('bg-blue-50', selected);
            button.classList.toggle('dark:bg-blue-950/40', selected);
        });
        setStatus(`المحادثة مع ${contact.name || 'الحساب'} جاهزة.`, false);

        const conversationId = conversationIdFor(currentUser.id, contact.id);
        const conversationRef = db.collection('chat_conversations').doc(conversationId);
        try {
            const result = await functions.httpsCallable('openChatConversation')({recipientId: String(contact.id)});
            if (result.data.conversationId !== conversationId) throw new Error('chat/conversation-id-mismatch');
        } catch (error) {
            console.error('تعذر تهيئة المحادثة:', error);
            setStatus('تعذر فتح المحادثة. تحقق من اتصالك وصلاحيات Firebase.', true);
            return;
        }
        if (!activeContact || String(activeContact.id) !== String(contact.id)) return;

        const emptyConversation = document.getElementById('emptyConversation');
        emptyConversation.classList.add('hidden');
        messageList.querySelectorAll('[data-rendered-message]').forEach(node => node.remove());
        conversationUnsubscribe = conversationRef.collection('chat_messages')
            .orderBy('createdAt', 'asc')
            .limitToLast(MAX_CONVERSATION_MESSAGES)
            .onSnapshot(snapshot => {
                renderMessages(snapshot);
            }, error => {
                console.error('تعذر تحميل رسائل المحادثة:', error);
                setStatus('تعذر تحميل الرسائل. تحقق من اتصالك وصلاحيات Firebase.', true);
            });
    }

    function renderMessages(snapshot) {
        currentMessageSnapshot = snapshot;
        const now = Date.now();
        const messages = snapshot.docs
            .map(document => ({id: document.id, ...document.data()}))
            .filter(message => getTimestampMillis(message.expiresAt) > now);
        messageList.querySelectorAll('[data-rendered-message]').forEach(node => node.remove());
        if (expirationTimer) clearInterval(expirationTimer);
        const emptyConversation = document.getElementById('emptyConversation');
        if (!messages.length) {
            emptyConversation.classList.remove('hidden');
            emptyConversation.querySelector('p:first-of-type').textContent = 'لا توجد رسائل نشطة بعد.';
            emptyConversation.querySelector('p:last-of-type').textContent = 'أرسل رسالة نصية؛ وستختفي بعد 24 ساعة.';
            return;
        }
        emptyConversation.classList.add('hidden');
        messages.forEach(message => {
            const isMine = String(message.senderId) === String(currentUser.id);
            const bubble = document.createElement('div');
            bubble.dataset.renderedMessage = 'true';
            bubble.className = `chat-message flex w-full ${isMine ? 'justify-start' : 'justify-end'}`;
            bubble.innerHTML = `<article class="max-w-[88%] rounded-2xl px-4 py-2.5 shadow-sm sm:max-w-[75%] ${isMine ? 'rounded-bl-md bg-blue-700 text-white dark:bg-blue-600' : 'rounded-br-md border border-slate-200 bg-white dark:border-neutral-700 dark:bg-neutral-800'}">
                <p class="whitespace-pre-wrap break-words text-sm leading-6">${escapeHtml(message.text)}</p>
                <time class="mt-1 block text-left text-[9px] ${isMine ? 'text-blue-100' : 'text-slate-400 dark:text-slate-500'}">${escapeHtml(formatMessageTime(message.createdAt))}</time>
            </article>`;
            messageList.appendChild(bubble);
        });
        messageList.scrollTop = messageList.scrollHeight;
        expirationTimer = setInterval(() => {
            if (currentMessageSnapshot) renderMessages(currentMessageSnapshot);
        }, 30_000);
    }

    async function sendMessage(event) {
        event.preventDefault();
        if (sending || !activeContact) return;
        if (currentUser.status === 'banned') {
            setStatus('هذا الحساب محظور من إرسال الرسائل.', true);
            return;
        }
        const text = messageInput.value.trim();
        if (!text) {
            setStatus('اكتب رسالة نصية قبل الإرسال.', true);
            messageInput.focus();
            return;
        }
        if (text.length > MAX_MESSAGE_LENGTH) {
            setStatus('الرسالة أطول من الحد المسموح (1000 حرف).', true);
            return;
        }

        sending = true;
        sendButton.disabled = true;
        setStatus('جارٍ إرسال الرسالة...', false);
        try {
            await functions.httpsCallable('sendChatMessage')({
                recipientId: String(activeContact.id),
                text
            });
            messageInput.value = '';
            document.getElementById('characterCount').textContent = '0/1000';
            setStatus('تم إرسال الرسالة. ستختفي بعد 24 ساعة.', false);
        } catch (error) {
            console.error('تعذر إرسال الرسالة:', error);
            setStatus('تعذر إرسال الرسالة. تحقق من اتصالك وصلاحيات Firebase ثم حاول مجددًا.', true);
        } finally {
            sending = false;
            sendButton.disabled = !activeContact;
        }
    }

    function initializeTheme() {
        const isDark = localStorage.getItem('theme') === 'dark';
        document.documentElement.classList.toggle('dark', isDark);
        document.getElementById('themeToggle').addEventListener('click', () => {
            const nextIsDark = !document.documentElement.classList.contains('dark');
            document.documentElement.classList.toggle('dark', nextIsDark);
            localStorage.setItem('theme', nextIsDark ? 'dark' : 'light');
        });
    }

    async function initializeChat() {
        initializeTheme();
        messageForm.addEventListener('submit', sendMessage);
        messageInput.addEventListener('input', () => {
            document.getElementById('characterCount').textContent = `${messageInput.value.length}/${MAX_MESSAGE_LENGTH}`;
        });
        if (!currentUser) {
            window.location.replace('login.html');
            return;
        }
        if (currentUser.isGuest === true || currentUser.role === 'guest') {
            setStatus('الدردشة متاحة للحسابات المسجلة فقط. سجّل الدخول للمراسلة.', true);
            messageInput.disabled = true;
            sendButton.disabled = true;
            return;
        }

        try {
            if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
            db = firebase.firestore();
            functions = firebase.app().functions('us-central1');
            await new Promise((resolve, reject) => {
                let unsubscribe = function() {};
                unsubscribe = firebase.auth().onAuthStateChanged(async user => {
                    unsubscribe();
                    try {
                        resolve(user || (await firebase.auth().signInAnonymously()).user);
                    } catch (error) {
                        reject(error);
                    }
                }, error => {
                    unsubscribe();
                    reject(error);
                });
            });
            await loadContacts();
        } catch (error) {
            console.error('تعذر تهيئة الرسائل:', error);
            setStatus('تعذر الاتصال بخدمة الرسائل. تحقق من إعداد Firebase Authentication وFirestore.', true);
        }
    }

    initializeChat();
})();
