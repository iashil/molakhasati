Molakhasati — A Social Learning Platform for Students

Molakhasati is a student-focused social learning platform designed to make sharing and discovering educational resources simple and accessible.

The platform combines social features with an organized academic content experience. Users can create public profiles, share study notes and educational materials, upload images and PDF documents, save useful posts, download shared resources, discover other users, and publish content anonymously when needed.

The project focuses on responsive design, usability, performance, and a clean modern interface across desktop and mobile devices.

Core technologies: Firebase Authentication, Cloud Firestore, Cloudinary, JavaScript, HTML, CSS, and Tailwind CSS.

The interface supports Arabic and English. Use the language button at the bottom of any page to switch languages; the choice is saved in the browser and remains active across sign-in, guest access, and page navigation.

## Text-only chat and message expiration

`chat.html` provides account-to-account text conversations. Messages are stored only in the `chat_conversations/{conversationId}/chat_messages` subcollection, have a 1,000-character limit, and do not accept image, file, audio, or call content. The trusted `sendChatMessage` Cloud Function sets each message's `expiresAt` timestamp to 24 hours after sending, using server time; the interface stops showing it at expiry. Clients cannot create or modify conversation or message documents directly. Posts remain in the separate `posts` collection and are not covered by this expiration.

Firestore must be configured to delete expired chat documents. Enable a Firestore TTL policy for the `chat_messages` collection group and its `expiresAt` field in the `molakhasat-web` project (Firestore > Time-to-live > Create policy), or run:

```sh
gcloud firestore fields ttls update expiresAt \
  --collection-group=chat_messages \
  --enable-ttl \
  --project=molakhasat-web
```

The browser code cannot enable a server-side TTL policy. Until the policy is active, expired message documents can remain in Firestore even though the interface hides them. Firestore TTL deletion is asynchronous and can take additional time after `expiresAt`; it is not an exact-to-the-second deletion or a guarantee that storage is never full. Deletions can also incur Firestore delete charges. The TTL policy targets only the `chat_messages` collection group, not `posts`.

Deploy the Cloud Functions and Firestore rules before enabling private messaging. The rules allow only active Firebase account participants to read their conversations; trusted callable functions validate account status and create conversations and messages. Admin message review uses a separate audited callable and does not provide access to conversation reads.

Conversation records contain participant IDs and the time of the latest message, but no message text. They are not covered by the message TTL. The existing administrator action continues to delete only the selected document from `posts`; chat expiration does not alter or delete posts.

## Firebase account authentication and audited message review

The sign-in migration replaces browser-stored passwords with Firebase Authentication accounts. Usernames are mapped to non-deliverable internal email aliases; users continue signing in with their username and password. Existing user documents are not automatically trusted as credentials. An administrator must set a new password for each existing Firestore member from the admin account table before that member can sign in. Existing profile IDs and post/question ownership remain unchanged for those reset accounts.

One-time setup for the new authentication backend:

1. Enable **Email/Password** and **Anonymous** providers in Firebase Authentication. Add the production Pages host under **Authorized domains**.
2. Install the Firebase CLI, authenticate as a project deployer, and run `npm install --prefix functions`.
3. Deploy the Functions, Firestore rules, and required collection-group index with `firebase deploy --only functions,firestore:rules,firestore:indexes --project molakhasat-web`. Back up and review the live project's current rules before deployment; Firestore deployment replaces them with this file. This file protects chat, account, and admin-audit collections while retaining the app's current posts/questions/support features.
4. Seed the first administrator, or reset that administrator's Firebase password, securely with Google Application Default Credentials that have Firebase Authentication and Firestore admin permissions: `npm run --prefix functions bootstrap:admin`. The script prompts for a password without echoing it, retains the configured admin account ID, and refuses to reset a non-admin account. Do not put this password in source code or command arguments.
5. Sign in as `ashil admin`. Reset each legacy member's password from the admin account table and send the temporary password through a separate, trusted channel. New members register with their existing authorized username and a new password.
6. In Firestore, enable a TTL policy on the `chat_messages` collection group using `expiresAt`. TTL deletion is asynchronous and can take additional time; Firestore does not promise deletion at the exact expiry instant.

Run the authentication flow tests against local Auth, Firestore, and Functions emulators with `npx firebase-tools emulators:exec --only auth,firestore,functions --project demo-molakhasati "npm run --prefix functions test:auth"`. This uses temporary emulator accounts only and verifies an allowed `صالح` registration/sign-in, rejection of a wrong password and duplicate registration, and the legacy-account safeguard. Run Firestore authorization tests with `npm run --prefix functions test:rules` while the Firestore emulator is available.

The admin page offers a **read-only** viewer for up to 100 active messages sent by a selected member. It does not log in as that member and cannot send messages in their name. Each review is written to the server-only `admin_message_access` collection. The callable function verifies the Firebase custom admin claim; the client-side `role` field is not used as authority.

The first deployment requires a trusted project operator with Firebase CLI, billing/Cloud Functions eligibility, and IAM permissions. Existing browser-only accounts whose user documents were never written to Firestore cannot be reset from the admin table and must register again. Firebase clients need the deployed Functions and Firestore rules; this repository cannot activate backend policies on the live project without those project credentials.

New releases can introduce a one-time animated update intro and interactive feature tour. The tour is keyed by `UPDATE_ID` in `language.js`, saved per account (and synchronized to its Firestore user document when available) or per guest browser, and is also recorded when skipped. Bump `UPDATE_ID` and update the tour highlights when preparing a future release.

## Minified production site

The GitHub Actions workflow builds the Jekyll site, minifies generated HTML and JavaScript into `_site`, then deploys that output to GitHub Pages. Set the repository's Pages source to **GitHub Actions** under **Settings > Pages > Build and deployment**. Source files remain readable in this repository for development.

Minification makes browser-delivered code harder to read, but it is not encryption: visitors can still download, inspect, and pretty-print any code sent to their browser. If the repository is public, its source files are also public. Never put secrets or authorization rules in client-side code; enforce sensitive access in a backend.

## Guest-mode security limitation

The current pages read posts directly from Cloud Firestore and media directly from Cloudinary. Guest-mode blur and hidden controls are presentation-only; they cannot prevent a browser from receiving or extracting original media URLs or comment data. Do not treat this mode as private until reads are served through an authorized backend, comments and media are separated from public post data, and Cloudinary delivery and uploads require server-issued authorization. Firebase security rules must enforce guest, member, and admin access independently of values stored in browser storage.
