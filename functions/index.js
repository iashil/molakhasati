'use strict';

const {initializeApp} = require('firebase-admin/app');
const {getAuth} = require('firebase-admin/auth');
const {FieldValue, getFirestore, Timestamp} = require('firebase-admin/firestore');
const {HttpsError, onCall} = require('firebase-functions/v2/https');

initializeApp();

const auth = getAuth();
const db = getFirestore();
const USERNAME_DOMAIN = 'accounts.molakhasati.app';
const USERNAME_PATTERN = /^[\p{L}\p{N} _.-]{2,40}$/u;
const ALLOWED_USERNAMES = new Set([
    'اصيل', 'صلاح', 'محمد', 'رشاد', 'ابوبكر', 'حسين', 'احمد', 'معتز', 'منير',
    'سالم', 'مهاب', 'فراس', 'شهاب', 'عمار', 'عبد الحكيم', 'هيثم ابراهيم',
    'صالح', 'سيف', 'باوزير', 'جراح', 'جمال'
].map(normalizeUsername));

function normalizeUsername(value) {
    return String(value || '').normalize('NFC').trim().toLocaleLowerCase('ar');
}

function usernameKey(username) {
    return Buffer.from(normalizeUsername(username), 'utf8').toString('base64url');
}

function usernameEmail(username) {
    return `u-${usernameKey(username).toLowerCase()}@${USERNAME_DOMAIN}`;
}

function requireSignedIn(request) {
    if (!request.auth) throw new HttpsError('unauthenticated', 'سجّل الدخول أولاً.');
    return request.auth;
}

async function requireAdmin(request) {
    const identity = requireSignedIn(request);
    if (identity.token.admin !== true) {
        throw new HttpsError('permission-denied', 'هذه العملية متاحة للأدمن فقط.');
    }
    const user = await db.collection('users').doc(identity.uid).get();
    if (!user.exists
        || user.data().role !== 'admin'
        || user.data().status !== 'active'
        || Number(identity.token.auth_time || 0) < Number(user.data().authTimeFloor || 0)) {
        throw new HttpsError('permission-denied', 'جلسة الأدمن غير صالحة أو تم إيقافها.');
    }
    return identity;
}

function validatePassword(password) {
    if (typeof password !== 'string' || password.length < 8 || password.length > 128) {
        throw new HttpsError('invalid-argument', 'يجب أن تتكون كلمة المرور من 8 إلى 128 حرفًا.');
    }
}

async function findExistingUsername(username) {
    const users = await db.collection('users').limit(1000).get();
    return users.docs.find(document => normalizeUsername(document.data().name) === username) || null;
}

async function createFirebaseAccount({uid, username, password, role}) {
    const email = usernameEmail(username);
    try {
        await auth.createUser({
            uid,
            email,
            password,
            displayName: username,
            emailVerified: false,
            disabled: false
        });
    } catch (error) {
        if (error.code !== 'auth/uid-already-exists' && error.code !== 'auth/email-already-exists') throw error;
        await auth.updateUser(uid, {email, password, displayName: username, disabled: false});
    }
    await auth.setCustomUserClaims(uid, {account: true, admin: role === 'admin'});
}

async function requireAccount(request) {
    const identity = requireSignedIn(request);
    if (identity.token.account !== true || identity.token.firebase?.sign_in_provider === 'anonymous') {
        throw new HttpsError('permission-denied', 'الدردشة متاحة للحسابات المسجلة فقط.');
    }
    const userDoc = await db.collection('users').doc(identity.uid).get();
    if (!userDoc.exists
        || userDoc.data().status !== 'active'
        || Number(identity.token.auth_time || 0) < Number(userDoc.data().authTimeFloor || 0)) {
        throw new HttpsError('permission-denied', 'الحساب غير مفعل أو تم إيقاف جلسته.');
    }
    return identity;
}

function getConversationId(userId, recipientId) {
    return [String(userId), String(recipientId)].sort().map(encodeURIComponent).join('__');
}

function validateRecipientId(recipientId, senderId) {
    if (!recipientId || recipientId.length > 128 || recipientId === senderId) {
        throw new HttpsError('invalid-argument', 'المستخدم المحدد للمحادثة غير صالح.');
    }
}

exports.openChatConversation = onCall(async request => {
    const identity = await requireAccount(request);
    const recipientId = String(request.data && request.data.recipientId || '');
    validateRecipientId(recipientId, identity.uid);
    const participantIds = [identity.uid, recipientId].sort();
    const conversationId = getConversationId(identity.uid, recipientId);
    const conversationRef = db.collection('chat_conversations').doc(conversationId);

    await db.runTransaction(async transaction => {
        const [sender, recipient, conversation] = await Promise.all([
            transaction.get(db.collection('users').doc(identity.uid)),
            transaction.get(db.collection('users').doc(recipientId)),
            transaction.get(conversationRef)
        ]);
        if (!sender.exists
            || sender.data().status !== 'active'
            || Number(identity.token.auth_time || 0) < Number(sender.data().authTimeFloor || 0)
            || !recipient.exists
            || recipient.data().status !== 'active'
            || recipient.data().role === 'guest'
            || recipient.data().isGuest === true) {
            throw new HttpsError('permission-denied', 'الحساب غير متاح للمراسلة.');
        }
        if (conversation.exists) {
            const currentIds = conversation.data().participantIds || [];
            if (currentIds.length !== 2 || participantIds.some(id => !currentIds.includes(id))) {
                throw new HttpsError('failed-precondition', 'بيانات المحادثة غير متطابقة.');
            }
            return;
        }
        transaction.create(conversationRef, {
            participantIds,
            updatedAt: FieldValue.serverTimestamp()
        });
    });
    return {conversationId};
});

exports.sendChatMessage = onCall(async request => {
    const identity = await requireAccount(request);
    const recipientId = String(request.data && request.data.recipientId || '');
    const text = typeof (request.data && request.data.text) === 'string'
        ? request.data.text.trim()
        : '';
    if (!text || text.length > 1000) {
        throw new HttpsError('invalid-argument', 'يجب أن تكون الرسالة بين حرف واحد و1000 حرف.');
    }
    validateRecipientId(recipientId, identity.uid);

    const participantIds = [identity.uid, recipientId].sort();
    const conversationId = getConversationId(identity.uid, recipientId);
    const conversationRef = db.collection('chat_conversations').doc(conversationId);
    const messageRef = conversationRef.collection('chat_messages').doc();
    let expiresAt;
    await db.runTransaction(async transaction => {
        const [sender, recipient, conversation] = await Promise.all([
            transaction.get(db.collection('users').doc(identity.uid)),
            transaction.get(db.collection('users').doc(recipientId)),
            transaction.get(conversationRef)
        ]);
        if (!sender.exists
            || sender.data().status !== 'active'
            || Number(identity.token.auth_time || 0) < Number(sender.data().authTimeFloor || 0)
            || !recipient.exists
            || recipient.data().status !== 'active'
            || recipient.data().role === 'guest'
            || recipient.data().isGuest === true) {
            throw new HttpsError('permission-denied', 'الحساب غير متاح للمراسلة.');
        }
        if (conversation.exists) {
            const currentIds = conversation.data().participantIds || [];
            if (currentIds.length !== 2 || participantIds.some(id => !currentIds.includes(id))) {
                throw new HttpsError('failed-precondition', 'بيانات المحادثة غير متطابقة.');
            }
            transaction.update(conversationRef, {updatedAt: FieldValue.serverTimestamp()});
        } else {
            transaction.create(conversationRef, {
                participantIds,
                updatedAt: FieldValue.serverTimestamp()
            });
        }
        expiresAt = Timestamp.fromMillis(Date.now() + 24 * 60 * 60 * 1000);
        transaction.create(messageRef, {
            senderId: identity.uid,
            senderName: String(sender.data().name || 'حساب').slice(0, 40),
            recipientId,
            text,
            createdAt: FieldValue.serverTimestamp(),
            expiresAt
        });
    });
    return {conversationId, messageId: messageRef.id, expiresAt: expiresAt.toMillis()};
});

exports.completeAccountRegistration = onCall(async request => {
    const identity = requireSignedIn(request);
    const username = normalizeUsername(request.data && request.data.username);
    if (!USERNAME_PATTERN.test(username) || !ALLOWED_USERNAMES.has(username)) {
        throw new HttpsError('invalid-argument', 'اسم المستخدم غير مصرح له بالتسجيل.');
    }
    if (String(identity.token.email || '').toLowerCase() !== usernameEmail(username)) {
        throw new HttpsError('permission-denied', 'اسم المستخدم لا يطابق حساب Firebase.');
    }

    const usernameRef = db.collection('account_usernames').doc(usernameKey(username));
    const [usernameDoc, existingUser] = await Promise.all([
        usernameRef.get(),
        findExistingUsername(username)
    ]);
    if (usernameDoc.exists && usernameDoc.data().uid !== identity.uid) {
        throw new HttpsError('already-exists', 'اسم المستخدم مسجل بالفعل. تواصل مع الأدمن لاستعادة الحساب.');
    }
    if (existingUser && existingUser.id !== identity.uid) {
        throw new HttpsError('failed-precondition', 'هذا حساب قديم. تواصل مع الأدمن لإعادة ضبط كلمة المرور قبل تسجيل الدخول.');
    }

    const userRef = db.collection('users').doc(identity.uid);
    const userDoc = await userRef.get();
    if (userDoc.exists && userDoc.data().status === 'banned') {
        throw new HttpsError('permission-denied', 'هذا الحساب محظور.');
    }
    const batch = db.batch();
    batch.set(usernameRef, {uid: identity.uid, username, updatedAt: FieldValue.serverTimestamp()});
    batch.set(userRef, {
        name: username,
        role: 'user',
        status: 'active',
        authVersion: 1,
        authTimeFloor: 0,
        createdAt: userDoc.exists ? userDoc.data().createdAt || FieldValue.serverTimestamp() : FieldValue.serverTimestamp(),
        lastLoginAt: FieldValue.serverTimestamp()
    }, {merge: true});
    await batch.commit();
    await auth.setCustomUserClaims(identity.uid, {account: true, admin: false});
    return {uid: identity.uid, username, role: 'user'};
});

exports.validateAccountSession = onCall(async request => {
    const identity = requireSignedIn(request);
    if (identity.token.firebase && identity.token.firebase.sign_in_provider === 'anonymous') {
        throw new HttpsError('permission-denied', 'الدخول كضيف لا يملك صلاحية حساب مسجل.');
    }
    const userRef = db.collection('users').doc(identity.uid);
    const userDoc = await userRef.get();
    if (!userDoc.exists) throw new HttpsError('permission-denied', 'الحساب غير مفعّل. تواصل مع الأدمن لإعادة ضبطه.');
    const user = userDoc.data();
    if (user.status === 'banned') throw new HttpsError('permission-denied', 'هذا الحساب محظور.');
    const isAdmin = user.role === 'admin';
    await auth.setCustomUserClaims(identity.uid, {account: true, admin: isAdmin});
    await userRef.set({lastLoginAt: FieldValue.serverTimestamp()}, {merge: true});
    return {uid: identity.uid, username: user.name || '', role: isAdmin ? 'admin' : 'user', status: user.status || 'active'};
});

exports.createAdminAccount = onCall(async request => {
    await requireAdmin(request);
    const username = normalizeUsername(request.data && request.data.username);
    const password = request.data && request.data.password;
    validatePassword(password);
    if (!USERNAME_PATTERN.test(username)) throw new HttpsError('invalid-argument', 'اسم المستخدم غير صالح.');
    const usernameRef = db.collection('account_usernames').doc(usernameKey(username));
    const [usernameDoc, existingUser] = await Promise.all([usernameRef.get(), findExistingUsername(username)]);
    if (usernameDoc.exists || existingUser) throw new HttpsError('already-exists', 'اسم المستخدم مسجل بالفعل.');

    const userRecord = await auth.createUser({
        email: usernameEmail(username),
        password,
        displayName: username,
        emailVerified: false
    });
    const batch = db.batch();
    batch.create(usernameRef, {uid: userRecord.uid, username, updatedAt: FieldValue.serverTimestamp()});
    batch.create(db.collection('users').doc(userRecord.uid), {
        name: username,
        role: 'admin',
        status: 'active',
        authVersion: 1,
        authTimeFloor: 0,
        createdAt: FieldValue.serverTimestamp(),
        lastLoginAt: FieldValue.serverTimestamp()
    });
    await batch.commit();
    await auth.setCustomUserClaims(userRecord.uid, {account: true, admin: true});
    return {uid: userRecord.uid, username};
});

exports.resetAccountPassword = onCall(async request => {
    await requireAdmin(request);
    const uid = String(request.data && request.data.uid || '');
    const password = request.data && request.data.password;
    validatePassword(password);
    if (!uid || uid.length > 128) throw new HttpsError('invalid-argument', 'معرّف الحساب غير صالح.');

    const userRef = db.collection('users').doc(uid);
    const userDoc = await userRef.get();
    if (!userDoc.exists || userDoc.data().role === 'admin') {
        throw new HttpsError('not-found', 'تعذر العثور على حساب مستخدم لإعادة ضبطه.');
    }
    const username = normalizeUsername(userDoc.data().name);
    if (!username) throw new HttpsError('failed-precondition', 'الحساب لا يحتوي على اسم مستخدم صالح.');
    const usernameRef = db.collection('account_usernames').doc(usernameKey(username));
    const usernameDoc = await usernameRef.get();
    if (usernameDoc.exists && usernameDoc.data().uid !== uid) {
        throw new HttpsError('already-exists', 'اسم المستخدم مرتبط بحساب آخر.');
    }
    await createFirebaseAccount({uid, username, password, role: 'user'});
    await usernameRef.set({
        uid,
        username,
        updatedAt: FieldValue.serverTimestamp()
    }, {merge: true});
    await userRef.set({
        status: 'active',
        authVersion: 1,
        authTimeFloor: Math.floor(Date.now() / 1000) + 1
    }, {merge: true});
    await auth.revokeRefreshTokens(uid);
    return {uid, username};
});

exports.deleteAccount = onCall(async request => {
    await requireAdmin(request);
    const uid = String(request.data && request.data.uid || '');
    if (!uid || uid.length > 128) throw new HttpsError('invalid-argument', 'معرّف الحساب غير صالح.');
    if (uid === request.auth.uid) throw new HttpsError('failed-precondition', 'لا يمكنك حذف حساب الأدمن الحالي.');

    const userRef = db.collection('users').doc(uid);
    const userDoc = await userRef.get();
    if (!userDoc.exists || userDoc.data().role === 'admin') {
        throw new HttpsError('not-found', 'تعذر العثور على حساب عضو قابل للحذف.');
    }
    const username = normalizeUsername(userDoc.data().name);
    const batch = db.batch();
    batch.delete(userRef);
    if (username) {
        const usernameRef = db.collection('account_usernames').doc(usernameKey(username));
        const usernameDoc = await usernameRef.get();
        if (usernameDoc.exists && usernameDoc.data().uid === uid) batch.delete(usernameRef);
    }
    await batch.commit();
    try {
        await auth.deleteUser(uid);
    } catch (error) {
        if (error.code !== 'auth/user-not-found') throw error;
    }
    return {uid};
});

exports.getUserSentMessages = onCall(async request => {
    const admin = await requireAdmin(request);
    const targetUid = String(request.data && request.data.uid || '');
    if (!targetUid || targetUid.length > 128) throw new HttpsError('invalid-argument', 'معرّف الحساب غير صالح.');
    const targetDoc = await db.collection('users').doc(targetUid).get();
    if (!targetDoc.exists) throw new HttpsError('not-found', 'الحساب غير موجود.');

    const snapshot = await db.collectionGroup('chat_messages')
        .where('senderId', '==', targetUid)
        .orderBy('createdAt', 'desc')
        .limit(100)
        .get();
    const now = Date.now();
    const messages = snapshot.docs
        .map(document => {
            const data = document.data();
            return {
                id: document.id,
                conversationId: document.ref.parent.parent.id,
                senderId: data.senderId || '',
                recipientId: data.recipientId || '',
                text: data.text || '',
                createdAt: data.createdAt && typeof data.createdAt.toMillis === 'function' ? data.createdAt.toMillis() : 0,
                expiresAt: data.expiresAt && typeof data.expiresAt.toMillis === 'function' ? data.expiresAt.toMillis() : 0
            };
        })
        .filter(message => message.expiresAt > now)
        .sort((left, right) => right.createdAt - left.createdAt);
    await db.collection('admin_message_access').add({
        adminUid: admin.uid,
        targetUid,
        targetName: targetDoc.data().name || '',
        messageCount: messages.length,
        accessedAt: FieldValue.serverTimestamp()
    });
    return {username: targetDoc.data().name || '', messages};
});
