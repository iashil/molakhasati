'use strict';

const assert = require('node:assert/strict');
const firebase = require('firebase/compat/app');
require('firebase/compat/auth');
require('firebase/compat/functions');
const {initializeApp: initializeAdminApp} = require('firebase-admin/app');
const {getAuth: getAdminAuth} = require('firebase-admin/auth');
const {getFirestore} = require('firebase-admin/firestore');

const projectId = 'demo-molakhasati';
const password = 'local-emulator-test-password';
const app = firebase.initializeApp({
    apiKey: 'emulator-test-key',
    authDomain: `${projectId}.firebaseapp.com`,
    projectId
}, 'auth-flow-test');
const auth = app.auth();
const functions = app.functions('us-central1');
auth.useEmulator('http://127.0.0.1:9099');
functions.useEmulator('127.0.0.1', 5001);

function usernameEmail(username) {
    const normalized = username.normalize('NFC').trim().toLocaleLowerCase('ar');
    const alias = Buffer.from(normalized, 'utf8').toString('base64url');
    return `u-${alias.toLowerCase()}@accounts.molakhasati.app`;
}

function usernameKey(username) {
    return Buffer.from(username.normalize('NFC').trim().toLocaleLowerCase('ar'), 'utf8').toString('base64url');
}

async function main() {
    const adminApp = initializeAdminApp({projectId});
    const adminAuth = getAdminAuth(adminApp);
    const db = getFirestore();
    const username = 'صالح';
    const email = usernameEmail(username);
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const registration = await functions.httpsCallable('completeAccountRegistration')({username});
        assert.equal(registration.data.username, username);

        await userCredential.user.getIdToken(true);
        const session = await functions.httpsCallable('validateAccountSession')();
        assert.equal(session.data.uid, userCredential.user.uid);
        assert.equal(session.data.username, username);
        assert.equal(session.data.role, 'user');

        await auth.signOut();
        const signedInCredential = await auth.signInWithEmailAndPassword(email, password);
        const signedInSession = await functions.httpsCallable('validateAccountSession')();
        assert.equal(signedInSession.data.uid, signedInCredential.user.uid);

        await auth.signOut();
        await assert.rejects(
            auth.signInWithEmailAndPassword(email, 'incorrect-local-emulator-password'),
            error => error.code === 'auth/invalid-credential'
                || error.code === 'auth/wrong-password'
        );
        await assert.rejects(
            auth.createUserWithEmailAndPassword(email, password),
            error => error.code === 'auth/email-already-in-use'
        );

        const legacyUsername = 'محمد';
        const legacyUid = 'legacy-member-emulator-test';
        await db.collection('users').doc(legacyUid).set({
            name: legacyUsername,
            role: 'user',
            status: 'active'
        });
        await auth.createUserWithEmailAndPassword(
            usernameEmail(legacyUsername),
            password
        );
        await assert.rejects(
            functions.httpsCallable('completeAccountRegistration')({username: legacyUsername}),
            error => error.code === 'functions/failed-precondition'
        );

        const adminName = 'ashil admin';
        const adminPassword = 'local-emulator-admin-password';
        const adminUid = 'admin-emulator-test';
        await adminAuth.createUser({
            uid: adminUid,
            email: usernameEmail(adminName),
            password: adminPassword,
            displayName: adminName
        });
        await adminAuth.setCustomUserClaims(adminUid, {account: true, admin: true});
        await db.collection('users').doc(adminUid).set({
            name: adminName,
            role: 'admin',
            status: 'active',
            authTimeFloor: 0
        });
        await db.collection('account_usernames').doc(usernameKey(adminName)).set({
            uid: adminUid,
            username: adminName
        });
        await auth.signInWithEmailAndPassword(usernameEmail(adminName), adminPassword);
        const adminSession = await functions.httpsCallable('validateAccountSession')();
        assert.equal(adminSession.data.uid, adminUid);
        assert.equal(adminSession.data.username, adminName);
        assert.equal(adminSession.data.role, 'admin');

        console.log('Auth emulator tests passed: صالح registration/sign-in, synthetic admin sign-in, wrong password, duplicate registration, and legacy-account protection.');
    } finally {
        await auth.signOut();
        await app.delete();
    }
}

main().catch(error => {
    console.error('Auth emulator tests failed:', error);
    process.exitCode = 1;
});
