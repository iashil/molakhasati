Molakhasati — A Social Learning Platform for Students

Molakhasati is a student-focused social learning platform designed to make sharing and discovering educational resources simple and accessible.

The platform combines social features with an organized academic content experience. Users can create public profiles, share study notes and educational materials, upload images and PDF documents, save useful posts, download shared resources, discover other users, and publish content anonymously when needed.

The project focuses on responsive design, usability, performance, and a clean modern interface across desktop and mobile devices.

Core technologies: Firebase Authentication, Cloud Firestore, Cloudinary, JavaScript, HTML, CSS, and Tailwind CSS.

The interface supports Arabic and English. Use the language button at the bottom of any page to switch languages; the choice is saved in the browser and remains active across sign-in, guest access, and page navigation.

New releases can introduce a one-time animated update intro and interactive feature tour. The tour is keyed by `UPDATE_ID` in `language.js`, saved per account (and synchronized to its Firestore user document when available) or per guest browser, and is also recorded when skipped. Bump `UPDATE_ID` and update the tour highlights when preparing a future release.

## Minified production site

The GitHub Actions workflow builds the Jekyll site, minifies generated HTML and JavaScript into `_site`, then deploys that output to GitHub Pages. Set the repository's Pages source to **GitHub Actions** under **Settings > Pages > Build and deployment**. Source files remain readable in this repository for development.

Minification makes browser-delivered code harder to read, but it is not encryption: visitors can still download, inspect, and pretty-print any code sent to their browser. If the repository is public, its source files are also public. Never put secrets or authorization rules in client-side code; enforce sensitive access in a backend.

## Guest-mode security limitation

The current pages read posts directly from Cloud Firestore and media directly from Cloudinary. Guest-mode blur and hidden controls are presentation-only; they cannot prevent a browser from receiving or extracting original media URLs or comment data. Do not treat this mode as private until reads are served through an authorized backend, comments and media are separated from public post data, and Cloudinary delivery and uploads require server-issued authorization. Firebase security rules must enforce guest, member, and admin access independently of values stored in browser storage.
