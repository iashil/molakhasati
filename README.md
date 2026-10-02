Molakhasati — A Social Learning Platform for Students

Molakhasati is a student-focused social learning platform designed to make sharing and discovering educational resources simple and accessible.

The platform combines social features with an organized academic content experience. Users can create public profiles, share study notes and educational materials, upload images and PDF documents, save useful posts, download shared resources, discover other users, and publish content anonymously when needed.

The project focuses on responsive design, usability, performance, and a clean modern interface across desktop and mobile devices.

Core technologies: Firebase Authentication, Cloud Firestore, Cloudinary, JavaScript, HTML, CSS, and Tailwind CSS.

## Guest-mode security limitation

The current pages read posts directly from Cloud Firestore and media directly from Cloudinary. Guest-mode blur and hidden controls are presentation-only; they cannot prevent a browser from receiving or extracting original media URLs or comment data. Do not treat this mode as private until reads are served through an authorized backend, comments and media are separated from public post data, and Cloudinary delivery and uploads require server-issued authorization. Firebase security rules must enforce guest, member, and admin access independently of values stored in browser storage.
