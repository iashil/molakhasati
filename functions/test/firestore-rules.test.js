'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {
    assertFails,
    assertSucceeds,
    initializeTestEnvironment
} = require('@firebase/rules-unit-testing');
const {
    Timestamp,
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    where,
    writeBatch
} = require('firebase/firestore');

const projectId = 'demo-molakhasati';
const rules = fs.readFileSync(path.resolve(__dirname, '../../firestore.rules'), 'utf8');
let testEnvironment;

function signedIn(uid, claims = {}) {
    return testEnvironment.authenticatedContext(uid, {
        ...claims,
        auth_time: Math.floor(Date.now() / 1000)
    }).firestore();
}

function messageData(overrides = {}) {
    return {
        senderId: 'member-a',
        senderName: 'Member A',
        recipientId: 'member-b',
        text: 'A text message',
        createdAt: serverTimestamp(),
        expiresAt: Timestamp.fromMillis(Date.now() + 24 * 60 * 60 * 1000),
        ...overrides
    };
}

async function seedConversation() {
    await testEnvironment.withSecurityRulesDisabled(async context => {
        const db = context.firestore();
        await Promise.all([
            setDoc(doc(db, 'users/member-a'), {name: 'Member A', role: 'user', status: 'active', authTimeFloor: 0}),
            setDoc(doc(db, 'users/member-b'), {name: 'Member B', role: 'user', status: 'active', authTimeFloor: 0}),
            setDoc(doc(db, 'users/member-c'), {name: 'Member C', role: 'user', status: 'active', authTimeFloor: 0}),
            setDoc(doc(db, 'users/admin-a'), {name: 'Admin', role: 'admin', status: 'active', authTimeFloor: 0}),
            setDoc(doc(db, 'chat_conversations/member-a__member-b'), {
                participantIds: ['member-a', 'member-b'],
                updatedAt: Timestamp.now()
            }),
            setDoc(doc(db, 'chat_conversations/member-a__member-b/chat_messages/seed'), messageData())
        ]);
    });
}

async function main() {
    testEnvironment = await initializeTestEnvironment({
        projectId,
        firestore: {rules}
    });

    try {
        await testEnvironment.clearFirestore();
        await seedConversation();

        const memberA = signedIn('member-a', {account: true});
        const memberB = signedIn('member-b', {account: true});
        const memberC = signedIn('member-c', {account: true});
        const admin = signedIn('admin-a', {account: true, admin: true});
        const guest = signedIn('guest-a');
        const messagePath = 'chat_conversations/member-a__member-b/chat_messages/seed';

        await assertSucceeds(getDoc(doc(memberA, messagePath)));
        await assertSucceeds(getDoc(doc(memberB, messagePath)));
        await assertSucceeds(getDocs(query(
            collection(memberA, 'chat_conversations'),
            where('participantIds', 'array-contains', 'member-a')
        )));
        await assertFails(getDoc(doc(memberC, messagePath)));
        await assertFails(getDoc(doc(admin, messagePath)));
        await assertFails(getDoc(doc(guest, messagePath)));
        await assertFails(getDocs(collection(admin, 'admin_message_access')));
        await assertSucceeds(getDoc(doc(admin, 'posts/public-post')));
        await assertSucceeds(getDoc(doc(guest, 'posts/public-post')));

        const batch = writeBatch(memberA);
        batch.update(doc(memberA, 'chat_conversations/member-a__member-b'), {updatedAt: serverTimestamp()});
        batch.set(doc(memberA, 'chat_conversations/member-a__member-b/chat_messages/valid-new'), messageData());
        await assertFails(batch.commit());
        await assertFails(setDoc(
            doc(memberA, 'chat_conversations/member-a__member-c'),
            {participantIds: ['member-a', 'member-c']}
        ));

        await assertFails(setDoc(
            doc(memberA, 'chat_conversations/member-a__member-b/chat_messages/with-image'),
            messageData({imageUrl: 'https://example.invalid/image.jpg'})
        ));
        await assertFails(setDoc(
            doc(memberA, 'chat_conversations/member-a__member-b/chat_messages/forged-sender'),
            messageData({senderId: 'member-b'})
        ));
        await assertFails(setDoc(
            doc(memberA, 'chat_conversations/member-a__member-b/chat_messages/long-expiry'),
            messageData({expiresAt: Timestamp.fromMillis(Date.now() + 25 * 60 * 60 * 1000)})
        ));
        await assertFails(setDoc(
            doc(guest, 'chat_conversations/member-a__member-b/chat_messages/guest-message'),
            messageData({senderId: 'guest-a'})
        ));
        await assertFails(updateDoc(doc(memberA, 'users/member-a'), {role: 'admin'}));

        await testEnvironment.withSecurityRulesDisabled(async context => {
            await updateDoc(doc(context.firestore(), 'users/member-c'), {status: 'banned'});
        });
        await assertFails(setDoc(
            doc(signedIn('member-c', {account: true}), 'posts/banned-post'),
            {authorId: 'member-c', text: 'blocked'}
        ));
        console.log('Firestore rules tests passed: private chats, admin audit boundary, text-only writes, and banned accounts.');
    } finally {
        await testEnvironment.cleanup();
    }
}

main().catch(error => {
    console.error('Firestore rules tests failed:', error);
    process.exitCode = 1;
});
