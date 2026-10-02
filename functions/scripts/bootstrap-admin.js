'use strict';

const {initializeApp} = require('firebase-admin/app');
const {getAuth} = require('firebase-admin/auth');
const {FieldValue, getFirestore} = require('firebase-admin/firestore');

const USERNAME = 'ashil admin';
const UID = 'admin_1';
const DOMAIN = 'accounts.molakhasati.app';
const usernameKey = Buffer.from(USERNAME.normalize('NFC').trim().toLocaleLowerCase('ar'), 'utf8').toString('base64url');
const email = `u-${usernameKey}@${DOMAIN}`;

function readPassword() {
    return new Promise((resolve, reject) => {
        if (!process.stdin.isTTY || !process.stdin.setRawMode) {
            reject(new Error('Run the bootstrap script in an interactive terminal.'));
            return;
        }
        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdout.write('Set the new password for ashil admin (8-128 characters): ');
        let password = '';
        const onData = chunk => {
            const value = chunk.toString();
            if (value === '\u0003') {
                process.stdin.removeListener('data', onData);
                process.stdin.setRawMode(false);
                process.stdin.pause();
                reject(new Error('Bootstrap cancelled.'));
                return;
            }
            if (value === '\r' || value === '\n') {
                process.stdin.removeListener('data', onData);
                process.stdin.setRawMode(false);
                process.stdin.pause();
                process.stdout.write('\n');
                resolve(password);
                return;
            }
            if (value === '\u007f' || value === '\b') password = password.slice(0, -1);
            else if (value >= ' ' && value !== '\u007f') password += value;
        };
        process.stdin.on('data', onData);
    });
}

async function main() {
    const password = await readPassword();
    if (password.length < 8 || password.length > 128) throw new Error('Password must contain 8-128 characters.');
    initializeApp({projectId: process.env.GCLOUD_PROJECT || 'molakhasat-web'});
    const auth = getAuth();
    const db = getFirestore();
    const usernameRef = db.collection('account_usernames').doc(usernameKey);
    const usernameDoc = await usernameRef.get();
    if (usernameDoc.exists && usernameDoc.data().uid !== UID) {
        throw new Error('The admin username is already linked to a different account.');
    }
    try {
        await auth.createUser({uid: UID, email, password, displayName: USERNAME});
    } catch (error) {
        if (error.code !== 'auth/uid-already-exists' && error.code !== 'auth/email-already-exists') throw error;
        await auth.updateUser(UID, {email, password, displayName: USERNAME, disabled: false});
    }
    await auth.setCustomUserClaims(UID, {account: true, admin: true});
    const batch = db.batch();
    batch.set(db.collection('users').doc(UID), {
        name: USERNAME,
        role: 'admin',
        status: 'active',
        authVersion: 1,
        authTimeFloor: 0,
        updatedAt: FieldValue.serverTimestamp()
    }, {merge: true});
    batch.set(usernameRef, {
        uid: UID,
        username: USERNAME,
        updatedAt: FieldValue.serverTimestamp()
    });
    await batch.commit();
    console.log('Admin bootstrap complete. Sign in with "ashil admin" and the password you just entered.');
}

main().catch(error => {
    console.error('Admin bootstrap failed:', error);
    process.exitCode = 1;
});
