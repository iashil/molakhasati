(function () {
    const translations = {
        'منصة ملخصاتي - الصفحة الرئيسية': 'Molakhasati - Home',
        'تسجيل الدخول - منصة ملخصاتي': 'Sign in - Molakhasati',
        'المحفوظات - منصة ملخصاتي': 'Saved - Molakhasati',
        'منشوراتي - منصة ملخصاتي': 'My Posts - Molakhasati',
        'البروفايل - منصة ملخصاتي': 'Profile - Molakhasati',
        'طرح سؤال - منصة ملخصاتي': 'Ask a Question - Molakhasati',
        'الدعم - منصة ملخصاتي': 'Support - Molakhasati',
        'لوحة الإدارة - التحكم بالأمان والمحتوى': 'Admin Dashboard - Security and Content',
        'ملخصاتي': 'Molakhasati',
        'الصفحة الرئيسية': 'Home',
        'القائمة': 'Menu',
        'إغلاق القائمة': 'Close menu',
        'فتح القائمة': 'Open menu',
        'حسابي': 'My Account',
        'صورة المستخدم': 'User image',
        'صورة البروفايل': 'Profile picture',
        'المحفوظات': 'Saved',
        'منشوراتي': 'My Posts',
        'طرح سؤال': 'Ask a Question',
        'الدعم': 'Support',
        'الدعم والمقترحات': 'Support and Suggestions',
        'خروج': 'Sign out',
        '🚪 خروج': '🚪 Sign out',
        'إدارة': 'Admin',
        'الإدارة': 'Admin',
        'ChatGPT': 'ChatGPT',
        'تغيير لون الخلفية': 'Toggle dark mode',
        'الوضع الداكن': 'Dark mode',
        'الوضع الفاتح': 'Light mode',
        '🌙 الوضع الداكن': '🌙 Dark mode',
        '☀️ الوضع الفاتح': '☀️ Light mode',
        '🌙/☀️': '🌙/☀️',
        'اكتشف المستخدمين': 'Discover users',
        'ملفات حقيقية من المنصة': 'Real profiles from the platform',
        'جارٍ تحميل المستخدمين...': 'Loading users...',
        'المستخدمون': 'Users',
        'الصف': 'Grade',
        'جميع الصفوف': 'All grades',
        'الأول الثانوي': 'First Secondary',
        'الثاني الثانوي': 'Second Secondary',
        'الثالث الثانوي': 'Third Secondary',
        'المادة': 'Subject',
        'جميع المواد': 'All subjects',
        'تاريخ': 'History',
        'جغرافيا': 'Geography',
        'عربي': 'Arabic',
        'الرياضيات': 'Mathematics',
        'الفيزياء': 'Physics',
        'الكيمياء': 'Chemistry',
        'انجليزي': 'English',
        'قرآن': 'Quran',
        'إسلامية': 'Islamic Studies',
        'نشر مادة جديدة': 'Share a new resource',
        'إغلاق نافذة النشر': 'Close post composer',
        'الوصف أو الملاحظة': 'Description or note',
        'اكتب وصفاً أو ملاحظة للدرس...': 'Write a description or note about the lesson...',
        'الصف الدراسي': 'Grade',
        'المادة الدراسية': 'Subject',
        'تاريخ المادة': 'Subject date',
        'صورة أو ملف PDF': 'Image or PDF file',
        'النشر مجهول الهوية (Anonymous)': 'Post anonymously',
        'إزالة الملف': 'Remove file',
        'إلغاء': 'Cancel',
        'نشر في الأرشيف': 'Post to the archive',
        'إغلاق': 'Close',
        'اكتب اسم المستخدم': 'Enter a username',
        'مجهول (Anonymous)': 'Anonymous',
        'بحث': 'Search',
        'البحث عن مستخدم': 'Search for a user',
        'التنقل الرئيسي': 'Main navigation',
        'الرئيسية': 'Home',
        '؟': '?',
        'نشر جديد': 'Create post',
        'صفحتي الشخصية': 'My profile',
        'لوحة تحكم المسؤولين': 'Admin Dashboard',
        'ملفك الشخصي للعرض فقط': 'Your profile (view only)',
        'الأسئلة المحفوظة': 'Saved questions',
        'جارٍ تحميل الأسئلة المحفوظة...': 'Loading saved questions...',
        'الملف الشخصي': 'Profile',
        'العودة للصفحة الرئيسية': 'Back to home',
        'اختيار صورة شخصية': 'Choose a profile picture',
        'النبذة الشخصية': 'Bio',
        'مثال: طالب بالصف الأول ثانوي - مهتم بالرياضيات': 'Example: First-year secondary student interested in mathematics',
        'تعديل البروفايل': 'Edit profile',
        'إحصاءات الملف': 'Profile statistics',
        'المنشورات المحفوظة': 'Saved posts',
        'الصورة المكبرة': 'Enlarged image',
        'إجابات': 'Answers',
        'إعجابات': 'Likes',
        'محفوظات': 'Saved',
        'سؤالك': 'Your question',
        'شارك سؤالك الدراسي ودع الآخرين يساعدونك.': 'Share your study question and let others help.',
        'اكتب سؤالك باختصار...': 'Write your question briefly...',
        '📷 إرفاق صورة واحدة': '📷 Attach one image',
        'PNG أو JPEG أو WebP أو GIF، حتى 10 ميجابايت': 'PNG, JPEG, WebP, or GIF, up to 10 MB',
        'نشر السؤال': 'Post question',
        'معاينة الصورة المرفقة': 'Attached image preview',
        'حذف الصورة': 'Remove image',
        'أسئلة المجتمع': 'Community questions',
        'جارٍ تحميل الأسئلة...': 'Loading questions...',
        'الأسئلة': 'Questions',
        'الدخول': 'Sign in',
        'دخول': 'Sign in',
        'تسجيل الدخول': 'Sign in',
        'إنشاء حساب جديد': 'Create a new account',
        'الاسم': 'Name',
        'أدخل اسمك (عربي أو English)': 'Enter your name (Arabic or English)',
        'كلمة المرور': 'Password',
        'الدخول كضيف': 'Continue as guest',
        'قواعد المنصة': 'Platform Rules',
        'يرجى الالتزام بالقواعد': 'Please follow the rules',
        'ممنوع الدخول بأسماء أشخاص آخرين، استخدم اسمك فقط.': 'Do not use another person’s name. Use your own name only.',
        'إذا دخلت باسم غير اسمك، سيتم طردك من المنصة بواسطة الإدارة.': 'If you sign in using someone else’s name, the administrators may remove you from the platform.',
        'الادمن يستطيع رؤية هوية صاحب المنشور حتى عند النشر بشكل مجهول.': 'Admins can see who created a post, even when it is posted anonymously.',
        'تستطيع إرسال التسريبات بشكل مجهول، ولن تظهر هويتك للمستخدمين.': 'You can share leaks anonymously; your identity will not be shown to users.',
        'تستطيع إرسال صور الدفاتر والكتب بهويتك العادية.': 'You can share notebook and book images using your regular identity.',
        'ابحث عن ما تريد وانشر ما تريد.': 'Search for what you need and share what you want.',
        'عند إرسال كلمة بذيئة، يتم تنبيه الإدارة مع صورة واسم الشخص الذي أرسلها.': 'If an offensive word is submitted, admins are notified along with the sender’s name and image.',
        'الاسم المسموح به': 'Authorized name',
        'مثال: ashil أو فراس': 'Example: ashil or Firas',
        'كلمة المرور الجديدة': 'New password',
        'إنشاء الحساب ودخول': 'Create account and sign in',
        'اكتب اقتراحك أو أي ملاحظة تريد أن تراها الإدارة، وسيظهر هذا الطلب في لوحة الإدارة.': 'Send a suggestion or note for the administrators. It will appear in the admin dashboard.',
        'الاسم أو اسم المستخدم': 'Name or username',
        'الرسالة / الاقتراح': 'Message / suggestion',
        'اكتب اقتراحك أو ملاحظتك...': 'Write your suggestion or note...',
        'إرسال الدعم': 'Send to support',
        'آخر الرسائل': 'Recent messages',
        'إضافة مسؤول (Admin) جديد': 'Add a new admin',
        'الاسم الكامل': 'Full name',
        'البريد الإلكتروني': 'Email address',
        'إضافة المسؤول': 'Add admin',
        'الكلمات الممنوعة في المنشورات': 'Blocked words in posts',
        'اكتب الكلمات الممنوعة، وافصل بينها بفاصلة أو سطر جديد': 'Enter blocked words, separated by commas or new lines',
        'حفظ الكلمات': 'Save words',
        'إدارة الحسابات والأعضاء': 'Manage accounts and members',
        'الرتبة': 'Role',
        'الحالة': 'Status',
        'آخر اتصال': 'Last active',
        'الإجراءات': 'Actions',
        'المنشورات والتعليقات': 'Posts and comments',
        'اقتراحات الدعم': 'Support suggestions',
        'الأسئلة والإجابات': 'Questions and answers',
        'غير متوفر': 'Unavailable',
        'لا توجد أسئلة مطروحة حالياً.': 'There are no questions yet.',
        'لا توجد أسئلة محفوظة.': 'No saved questions.',
        'لا توجد نبذة شخصية': 'No bio',
        'لا توجد نبذة شخصية.': 'No bio.',
        'بدون صف': 'No grade',
        'بدون مادة': 'No subject',
        'لا توجد تغييرات للحفظ.': 'There are no changes to save.',
        'تم اختيار الصورة، جارٍ تحسينها...': 'Image selected, optimizing...',
        'تعذر تحسين الصورة، يرجى المحاولة مرة أخرى.': 'Could not optimize the image. Please try again.',
        'لا يمكنك تعديل ملف مستخدم آخر.': 'You cannot edit another user’s profile.',
        'جارٍ التحقق من اتصال Firebase...': 'Checking the Firebase connection...',
        'جارٍ رفع الصورة...': 'Uploading image...',
        'جارٍ حفظ البيانات...': 'Saving data...',
        'تم حفظ البروفايل بنجاح.': 'Profile saved successfully.',
        'وضع بايو': 'Add a bio',
        'خطأ حفظ البروفايل:': 'Error saving profile:',
        'تعذر تحميل الأسئلة المحفوظة:': 'Could not load saved questions:',
        'تعذر حذف التعليق:': 'Could not delete comment:',
        'تعذر نشر المادة:': 'Could not publish the resource:',
        'لا يمكنك إنشاء حساب بهذه الصلاحية من هنا.': 'You cannot create an account with this role here.',
        'يجب تفعيل Anonymous من Firebase Authentication قبل تحميل البروفايل. رمز الخطأ:': 'Enable Anonymous in Firebase Authentication before loading the profile. Error code:',
        'تم إرسال دعمك بنجاح.': 'Your support message was sent successfully.',
        'إزالة من المحفوظات': 'Remove from saved',
        'حفظ السؤال': 'Save question',
        'إزالة الحفظ': 'Remove bookmark',
        'الحفظ': 'Save',
        'النشر': 'Post',
        'إرسال إجابة': 'Send answer',
        'الإعجاب بالمنشور': 'Like post',
        'اكتب إجابتك...': 'Write your answer...',
        'تم نشر سؤالك بنجاح.': 'Your question was posted successfully.',
        'يرجى اختيار ملف PDF واحد فقط في المنشور.': 'Select only one PDF file per post.',
        'حجم ملف PDF يجب ألا يتجاوز 5 ميجابايت.': 'The PDF file must not exceed 5 MB.',
        'الملف المحدد لا يحتوي على توقيع PDF صالح.': 'The selected file does not have a valid PDF signature.',
        'تُقبل الصور بصيغ PNG أو JPEG أو WebP أو GIF فقط.': 'Only PNG, JPEG, WebP, and GIF images are accepted.',
        'يجب ألا يتجاوز حجم الصورة 10 ميجابايت، ومجموع الصور 25 ميجابايت.': 'Each image must be 10 MB or smaller, and all images together must not exceed 25 MB.',
        'عذراً، الحد الأقصى المسموح به هو 10 صور فقط في المنشور الواحد!': 'Sorry, a post can contain no more than 10 images!',
        'تعذر ضغط إحدى الصور، يرجى المحاولة مرة أخرى.': 'Could not compress one of the images. Please try again.',
        'اكتب وصفاً أو اختر صورة أو ملف PDF قبل النشر.': 'Write a description or choose an image or PDF before posting.',
        'يرجى تحديد تاريخ المادة.': 'Select the subject date.',
        'لا يمكن نشر المنشور لأنه يحتوي على كلمة ممنوعة.': 'This post cannot be published because it contains a blocked word.',
        'تم نشر المادة بنجاح.': 'Resource posted successfully.',
        'تعذر النشر. بقيت بيانات النموذج كما هي.': 'Could not publish. Your form data has been kept.',
        'حدث خطأ غير متوقع. تحقق من الاتصال ثم حاول مجدداً.': 'An unexpected error occurred. Check your connection and try again.',
        'تعذر تجهيز الصورة. تحقق من اتصال المصدر أو صلاحية CORS.': 'Could not prepare the image. Check the source connection or CORS permissions.',
        'تعذر تنزيل الصورة بعلامة مائية:': 'Could not download the watermarked image:',
        'تعذر جلب منشوراتي من Firestore:': 'Could not retrieve my posts from Firestore:',
        'خطأ في تحميل منشوراتي:': 'Error loading my posts:',
        'فشل تحميل بيانات البروفايل من Firestore:': 'Could not load profile data from Firestore:',
        'تعذر تحميل الأسئلة المحفوظة. تحقق من الاتصال وحاول مجددًا.': 'Could not load saved questions. Check your connection and try again.',
        'تعذر جلب المنشورات المحفوظة:': 'Could not retrieve saved posts:',
        'خطأ في تحميل المنشورات المحفوظة:': 'Error loading saved posts:',
        'تعذر حفظ اقتراح الدعم في Firebase:': 'Could not save the support suggestion to Firebase:',
        'تعذر حذف السؤال من لوحة الإدارة:': 'Could not delete question from the admin dashboard:',
        'تعذر حذف السؤال. تحقق من اتصالك وصلاحيات قاعدة البيانات ثم حاول مجددًا.': 'Could not delete question. Check your connection and database permissions, then try again.',
        'هل تريد حذف هذه الإجابة؟': 'Do you want to delete this answer?',
        'الإجابة غير موجودة أو حُذفت بالفعل.': 'Answer not found or already deleted.',
        'تعذر حذف الإجابة من لوحة الإدارة:': 'Could not delete answer from the admin dashboard:',
        'تعذر حذف الإجابة. تحقق من اتصالك وصلاحيات قاعدة البيانات ثم حاول مجددًا.': 'Could not delete answer. Check your connection and database permissions, then try again.',
        'تعذر نشر السؤال:': 'Could not post the question:',
        'تعذر تحميل الأسئلة:': 'Could not load questions:',
        'الإصدار 2.12.0': 'Version 2.12.0',
        'إرسال': 'Send',
        'التعليقات': 'Comments',
        'لا توجد تعليقات بعد.': 'No comments yet.',
        'اكتب تعليقًا...': 'Write a comment...',
        'سجّل الدخول لإضافة تعليق.': 'Sign in to add a comment.',
        'تعذر إرسال التعليق. حاول مرة أخرى.': 'Could not send comment. Please try again.',
        'إرسال تعليق': 'Send comment',
        'المنشور غير موجود.': 'Post not found.',
        'حفظ المنشور': 'Save post',
        'تحميل PDF': 'Download PDF',
        'تحميل': 'Download',
        'عرض': 'View',
        'صورة منشور': 'Post image',
        'صورة السؤال': 'Question image',
        'صورة مرفقة بالسؤال': 'Image attached to question',
        'فتح ملف PDF:': 'Open PDF:',
        'بدون اسم': 'Unnamed',
        'مستخدم': 'User',
        'ضيف': 'Guest',
        'متصل': 'Online',
        'غير متصل': 'Offline',
        'لم يتصل بعد': 'Not active yet',
        'محظور': 'Banned',
        'إلغاء الحظر': 'Unban',
        'حظر': 'Ban',
        'حذف التعليق': 'Delete comment',
        'حذف الإجابة': 'Delete answer',
        'نُشر بمجهول': 'Posted anonymously',
        'جارٍ الحفظ...': 'Saving...',
        'جارٍ التجهيز...': 'Preparing...',
        'وقت غير متاح': 'Time unavailable',
        'لا توجد أسئلة بعد. كن أول من يطرح سؤالاً.': 'No questions yet. Be the first to ask one.',
        'لا توجد إجابات بعد.': 'No answers yet.',
        'لا توجد إجابات.': 'No answers.',
        'لا توجد تعليقات.': 'No comments.',
        'لا توجد رسائل دعم بعد.': 'No support messages yet.',
        'لا توجد اقتراحات أو رسائل دعم حتى الآن.': 'There are no suggestions or support messages yet.',
        'جارٍ تحميل الإحصاءات...': 'Loading statistics...',
        'منشورات': 'Posts',
        'أسئلة': 'Questions',
        'تعذر تفعيل Firebase Authentication:': 'Could not initialize Firebase Authentication:',
        'تعذر تحميل بيانات المستخدم في الـ Sidebar:': 'Could not load sidebar user data:',
        'فشل تحميل بيانات Sidebar:': 'Could not load sidebar data:',
        'فشل تحميل بيانات المستخدم في الـ Sidebar:': 'Could not load sidebar user data:',
        'تعذر تحميل بيانات الحساب:': 'Could not load account data:',
        'تعذر تحميل المستخدمين الآن.': 'Could not load users right now.',
        'لا يوجد مستخدمون آخرون لعرضهم الآن.': 'There are no other users to show right now.',
        'تعذر تحميل شريط المستخدمين:': 'Could not load the user strip:',
        'تعذر تحميل المنشورات.': 'Could not load posts.',
        'تعذر تحميل الأسئلة. تحقق من الاتصال وصلاحيات قاعدة البيانات.': 'Could not load questions. Check your connection and database permissions.',
        'تعذر تحميل الأسئلة في لوحة الإدارة:': 'Could not load questions in the admin dashboard:',
        'تعذر تحميل رسائل الدعم:': 'Could not load support messages:',
        'تعذر جلب رسائل الدعم:': 'Could not retrieve support messages:',
        'تعذر جلب اقتراحات الدعم:': 'Could not retrieve support suggestions:',
        'تعذر جلب منشورات البروفايل:': 'Could not retrieve profile posts:',
        'تعذر تحميل إحصاءات الملف من Firebase:': 'Could not load profile statistics from Firebase:',
        'تعذر الحفظ:': 'Could not save:',
        'تعذر الحفظ': 'Could not save',
        'تعذر إرسال الإجابة. حاول مرة أخرى.': 'Could not send answer. Please try again.',
        'تعذر إرسال الإجابة:': 'Could not send answer:',
        'تعذر رفع صورة السؤال.': 'Could not upload the question image.',
        'تحقق من الاتصال وحاول مرة أخرى.': 'Check your connection and try again.',
        'يمكن إرفاق صورة واحدة فقط لكل سؤال.': 'Only one image can be attached to each question.',
        'اختر صورة PNG أو JPEG أو WebP أو GIF بحجم لا يتجاوز 10 ميجابايت.': 'Choose a PNG, JPEG, WebP, or GIF image up to 10 MB.',
        'تم إرفاق صورة واحدة. يمكنك حذفها أو استبدالها قبل النشر.': 'One image attached. You can remove or replace it before posting.',
        'تعذر تجهيز صورة السؤال:': 'Could not prepare the question image:',
        'تعذر تجهيز الصورة. اختر صورة أخرى.': 'Could not prepare the image. Choose another one.',
        'تم حذف الصورة.': 'Image removed.',
        'اكتب سؤالاً لا يتجاوز 500 حرف.': 'Enter a question with no more than 500 characters.',
        'جارٍ النشر...': 'Publishing...',
        'السؤال غير موجود.': 'Question not found.',
        'تعذر إنشاء حساب بهذه الصلاحية من هنا.': 'You cannot create an account with this role here.',
        'عذراً، هذا الاسم غير مصرح له بإنشاء حساب.': 'Sorry, this name is not authorized to create an account.',
        'هذا الاسم مسجل بالفعل، يرجى تسجيل الدخول.': 'This name is already registered. Please sign in.',
        'الاسم أو كلمة المرور غير صحيحة.': 'Incorrect name or password.',
        'تم حظر هذا الحساب من استخدام المنصة.': 'This account has been banned from the platform.',
        'جارٍ الدخول...': 'Signing in...',
        'تعذر إنشاء جلسة الضيف:': 'Could not create a guest session:',
        'تعذر الدخول كضيف الآن. حاول مرة أخرى.': 'Could not continue as a guest. Please try again.',
        'اكتب الرسالة أو الاقتراح قبل الإرسال.': 'Write a message or suggestion before sending.',
        'هذا البريد مسجل بالفعل.': 'This email is already registered.',
        'تم إضاقة المسؤول بنجاح.': 'Admin added successfully.',
        'لا توجد كلمات ممنوعة حالياً.': 'There are no blocked words currently.',
        'تعذر تنزيل الصورة. تحقق من اتصال المصدر أو صلاحية CORS.': 'Could not download the image. Check the source connection or CORS permissions.',
        'تعذر تجهيز الصورة للتنزيل.': 'Could not prepare the image for download.',
        'تعذر جلب الصورة من مصدرها.': 'Could not retrieve the image from its source.',
        'المصدر ليس ملف صورة صالحاً.': 'The source is not a valid image file.',
        'تعذر إنشاء نسخة قابلة للتنزيل.': 'Could not create a downloadable copy.',
        'تعذر تصدير الصورة.': 'Could not export the image.',
        'تم تجهيز الصورة بعلامة منصة ملخصاتي.': 'Image prepared with the Molakhasati watermark.',
        'تعذر تحديث عدد اللايكات:': 'Could not update the like count:',
        'تعذر إرسال التعليق:': 'Could not send comment:',
        'تعذر جلب المنشورات من Firestore:': 'Could not retrieve posts from Firestore:',
        'تعذر تحميل منشوراتي:': 'Could not load my posts:',
        'لا توجد منشورات بعد.': 'No posts yet.',
        'لا توجد منشورات محفوظة بعد.': 'No saved posts yet.',
        'لا توجد منشورات لعرضها.': 'No posts to display.',
        'لا توجد منشورات حتى الآن.': 'There are no posts yet.',
        'تم حفظ التعديلات بنجاح.': 'Changes saved successfully.',
        'تم تحديث الملف الشخصي بنجاح.': 'Profile updated successfully.',
        'يجب تسجيل الدخول أولاً.': 'You must sign in first.',
        'لا تملك صلاحية تنفيذ هذا الإجراء.': 'You are not authorized to perform this action.',
        'تعذر تحميل المنشورات من Firebase:': 'Could not load posts from Firebase:',
        'تعذر حفظ المنشور:': 'Could not save post:',
        'يرجى إدخال الوصف أو إرفاق صورة أو ملف PDF.': 'Enter a description or attach an image or PDF.',
        'يرجى اختيار الصف والمادة.': 'Select a grade and subject.',
        'تعذر رفع الصورة. حاول مرة أخرى.': 'Could not upload the image. Please try again.',
        'تعذر رفع الملف. حاول مرة أخرى.': 'Could not upload the file. Please try again.',
        'تم نشر المنشور بنجاح.': 'Post published successfully.',
        'لا يمكن إرسال إجابة فارغة.': 'An empty answer cannot be submitted.',
        'اكتب إجابتك هنا...': 'Write your answer here...',
        'إرسال الإجابة': 'Send answer',
        'لا توجد أسئلة محفوظة بعد.': 'No saved questions yet.',
        'لم يتم العثور على المستخدم.': 'User not found.',
        'لا توجد بيانات لعرضها.': 'There is no data to display.',
        'حفظ': 'Save',
        'تعديل': 'Edit',
        'حذف': 'Delete',
        'نعم': 'Yes',
        'لا': 'No',
        'صورة المنشور': 'Post image',
        'تحميل الصورة': 'Download image',
        'عرض الملف': 'View file',
        'إصدار': 'Version',
        'تعذر حذف التعليق. تحقق من اتصالك وصلاحيات Firestore ثم حاول مجددًا.': 'Could not delete comment. Check your connection and Firestore permissions, then try again.',
        'تعذر حذف السؤال. تحقق من الاتصال وصلاحيات قاعدة البيانات ثم حاول مجددًا.': 'Could not delete question. Check your connection and database permissions, then try again.',
        'لا يمكنك حظر حسابك الحالي!': 'You cannot ban your current account!',
        'لا يمكنك حذف حسابك الحالي!': 'You cannot delete your current account!',
        'هل أنت تأكد من حذف هذا الحساب نهائياً؟': 'Are you sure you want to permanently delete this account?',
        'هل أنت تأكد من حذف هذا المنشور؟': 'Are you sure you want to delete this post?',
        'هل أنت متأكد من حذف هذا التعليق؟': 'Are you sure you want to delete this comment?',
        'هل تريد حذف السؤال وجميع إجاباته؟': 'Do you want to delete this question and all its answers?',
        'السؤال غير موجود أو حُذف بالفعل.': 'Question not found or already deleted.',
        'التعليق غير موجود أو حُذف بالفعل.': 'Comment not found or already deleted.',
        'عرض الملف الشخصي': 'View profile',
        'زيارة الملف الشخصي لـ': 'Visit the profile of',
        'إعجاب بالمنشور': 'Like post',
        'عذراً، لا تملك صلاحيات الوصول لهذه الصفحة.': 'Sorry, you do not have permission to access this page.',
        'ضع_': 'Set_'
    };

    const guestActionPattern = /^عذراً، ليس بإمكانك (.*)، لا تملك حساباً\.$/;
    const dynamicTranslations = [
        [/^التعليقات \((\d+)\)$/, 'Comments ($1)'],
        [/^الإجابات \((\d+)\)$/, 'Answers ($1)'],
        [/^تم حفظ (\d+) كلمة ممنوعة\.$/, 'Saved $1 blocked words.'],
        [/^(\d+) سؤال$/, '$1 question'],
        [/^(\d+) أسئلة$/, '$1 questions'],
        [/^يجب تفعيل Anonymous من Firebase Authentication قبل تحميل البروفايل\. رمز الخطأ: (.*)$/, 'Enable Anonymous in Firebase Authentication before loading the profile. Error code: $1'],
        [guestActionPattern, 'Sorry, you need an account to $1.']
    ];
    const textRecords = new WeakMap();
    const attributeRecords = new WeakMap();
    let language = localStorage.getItem('site_language') === 'en' ? 'en' : 'ar';

    function setDocumentLanguage() {
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'en' ? 'ltr' : 'rtl';
    }

    function translateValue(value) {
        const trimmed = value.trim();
        if (translations[trimmed]) return preserveWhitespace(value, translations[trimmed]);
        for (const [pattern, replacement] of dynamicTranslations) {
            const match = trimmed.match(pattern);
            if (match) {
                const translated = pattern === guestActionPattern
                    ? `Sorry, you need an account to ${({
                        'النشر': 'post',
                        'الحفظ': 'save',
                        'طرح سؤال': 'ask a question',
                        'إرسال إجابة': 'send an answer',
                        'إرسال تعليق': 'send a comment'
                    })[match[1]] || match[1]}.`
                    : trimmed.replace(pattern, replacement);
                return preserveWhitespace(value, translated);
            }
        }
        return value;
    }

    function preserveWhitespace(original, replacement) {
        const leading = original.match(/^\s*/)?.[0] || '';
        const trailing = original.match(/\s*$/)?.[0] || '';
        return `${leading}${replacement}${trailing}`;
    }

    function processText(node) {
        if (node.parentElement?.closest('#updateExperience')) return;
        if (node.parentElement?.closest('#languageToggle, #sidebarLanguageToggle')) return;
        const current = node.nodeValue;
        let record = textRecords.get(node);
        if (!record) {
            record = { arabic: current, english: translateValue(current), rendered: current };
            textRecords.set(node, record);
        } else if (current !== record.rendered) {
            record.arabic = current;
            record.english = translateValue(current);
        }
        const next = language === 'en' ? record.english : record.arabic;
        if (current !== next) node.nodeValue = next;
        record.rendered = next;
    }

    function processAttribute(element, name) {
        if (element.closest('#updateExperience')) return;
        const current = element.getAttribute(name);
        if (current === null) return;
        let records = attributeRecords.get(element);
        if (!records) {
            records = new Map();
            attributeRecords.set(element, records);
        }
        let record = records.get(name);
        if (!record) {
            record = { arabic: current, english: translateValue(current), rendered: current };
            records.set(name, record);
        } else if (current !== record.rendered) {
            record.arabic = current;
            record.english = translateValue(current);
        }
        const next = language === 'en' ? record.english : record.arabic;
        if (current !== next) element.setAttribute(name, next);
        record.rendered = next;
    }

    function processElement(element) {
        if (element.id === 'updateExperience' || element.closest('#updateExperience')) return;
        if (element.matches('#languageToggle, #sidebarLanguageToggle')) return;
        for (const attribute of ['placeholder', 'title', 'aria-label', 'alt']) {
            processAttribute(element, attribute);
        }
        for (const child of element.childNodes) {
            if (child.nodeType === Node.TEXT_NODE) processText(child);
            else if (child.nodeType === Node.ELEMENT_NODE) processElement(child);
        }
    }

    function injectControls() {
        const toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.id = 'languageToggle';
        toggle.className = 'site-language-toggle';
        toggle.addEventListener('click', () => setLanguage(language === 'en' ? 'ar' : 'en'));
        document.body.appendChild(toggle);

        const nav = document.querySelector('#sidebar nav, aside nav');
        if (nav) {
            const sidebarToggle = document.createElement('button');
            sidebarToggle.type = 'button';
            sidebarToggle.id = 'sidebarLanguageToggle';
            sidebarToggle.className = 'site-sidebar-language-toggle';
            sidebarToggle.addEventListener('click', () => setLanguage(language === 'en' ? 'ar' : 'en'));
            nav.appendChild(sidebarToggle);
        }
        updateControls();
        processElement(document.documentElement);
    }

    function updateControls() {
        const label = language === 'en' ? 'عربي' : 'eng';
        const toggle = document.getElementById('languageToggle');
        if (toggle) {
            toggle.textContent = label;
            toggle.setAttribute('aria-label', language === 'en' ? 'Switch to Arabic' : 'Switch to English');
        }
        const sidebarToggle = document.getElementById('sidebarLanguageToggle');
        if (sidebarToggle) {
            sidebarToggle.textContent = language === 'en' ? 'عربي' : 'English';
            sidebarToggle.setAttribute('aria-label', language === 'en' ? 'Switch to Arabic' : 'Switch to English');
        }
    }

    function setLanguage(nextLanguage) {
        language = nextLanguage;
        localStorage.setItem('site_language', language);
        setDocumentLanguage();
        processElement(document.documentElement);
        updateControls();
        document.dispatchEvent(new CustomEvent('site-language-change', { detail: { language } }));
    }

    const UPDATE_ID = '2.12.0';
    let experienceRoot = null;
    let experienceTimer = null;
    let tourResizeHandler = null;
    let bodyOverflowBeforeExperience = '';
    let focusBeforeExperience = null;

    function getExperienceIdentity() {
        let currentUser;
        try {
            currentUser = JSON.parse(localStorage.getItem('current_user') || 'null');
        } catch (error) {
            console.error('تعذر قراءة المستخدم الحالي لعرض تجربة التحديث:', error);
            return null;
        }
        if (!currentUser) return null;

        if (currentUser.isGuest === true || currentUser.role === 'guest') {
            try {
                let guestId = localStorage.getItem('molakhasati_guest_id');
                if (!guestId) {
                    guestId = typeof crypto.randomUUID === 'function'
                        ? crypto.randomUUID()
                        : `guest-${Date.now()}-${Math.random().toString(36).slice(2)}`;
                    localStorage.setItem('molakhasati_guest_id', guestId);
                }
                return {scope: `guest_${guestId}`, userId: null};
            } catch (error) {
                console.error('تعذر إنشاء معرف ثابت للضيف:', error);
                return null;
            }
        }

        const userId = String(currentUser.id || currentUser.name || '').trim();
        return userId ? {scope: `user_${userId}`, userId: currentUser.id ? String(currentUser.id) : null} : null;
    }

    async function markUpdateAsSeen(identity) {
        const storageKey = `updateSeen_${UPDATE_ID}_${encodeURIComponent(identity.scope)}`;
        try {
            if (localStorage.getItem(storageKey) === 'true') return false;
            localStorage.setItem(storageKey, 'true');
        } catch (error) {
            console.error('تعذر حفظ مشاهدة تجربة التحديث محلياً:', error);
            return false;
        }

        if (identity.userId && window.firebase?.apps?.length) {
            let readTimeout;
            try {
                const userRef = firebase.firestore().collection('users').doc(identity.userId);
                const userSnapshot = await Promise.race([
                    userRef.get(),
                    new Promise((_, reject) => {
                        readTimeout = window.setTimeout(
                            () => reject(new Error('Timed out while checking the saved update history.')),
                            1500
                        );
                    })
                ]);
                const seenUpdates = userSnapshot.exists ? userSnapshot.data().updateExperiencesSeen || [] : [];
                if (Array.isArray(seenUpdates) && seenUpdates.includes(UPDATE_ID)) return false;
                userRef.set({
                    updateExperiencesSeen: firebase.firestore.FieldValue.arrayUnion(UPDATE_ID)
                }, {merge: true}).catch(error => {
                    console.error('تعذر مزامنة مشاهدة تجربة التحديث مع الحساب:', error);
                });
            } catch (error) {
                console.error('تعذر مزامنة مشاهدة تجربة التحديث مع الحساب:', error);
            } finally {
                window.clearTimeout(readTimeout);
            }
        }
        return true;
    }

    function experienceCopy() {
        if (language === 'en') {
            return {
                skip: 'Skip tour',
                introEyebrow: `A fresh update · ${UPDATE_ID}`,
                introTitle: 'A better way to learn starts here',
                introText: 'Molakhasati now speaks your language. Take a quick look around.',
                introHint: 'A short, interactive tour is coming up',
                whatsTitle: '✨ See what’s new',
                whatsText: 'A more comfortable experience, in the language you choose.',
                items: [
                    ['🌍', 'The interface, in English', 'Switch the interface between Arabic and English from any page. Shared posts stay in their original language.'],
                    ['💾', 'Your choice stays with you', 'Your selected language is remembered as you move around the site.'],
                    ['↔️', 'Switch whenever you need', 'Use the small button below or the language option in the sidebar.']
                ],
                start: 'Try the new feature',
                tourTitle: 'Your site, your language',
                tourText: 'Tap the language button to switch languages and try the new experience.',
                step: 'Your only step',
                finishTitle: '✨ You’re all set!',
                finishText: 'Choose the language that feels right. You can switch again at any time.',
                done: 'Back to the site'
            };
        }
        return {
            skip: 'تخطي الجولة',
            introEyebrow: `تحديث جديد · ${UPDATE_ID}`,
            introTitle: 'تجربة تعلّم أقرب إليك',
            introText: 'ملخصاتي أصبحت تتحدث لغتك. خذ جولة سريعة لاكتشافها.',
            introHint: 'جولة تفاعلية قصيرة على وشك البدء',
            whatsTitle: '✨ شوف إيش الجديد',
            whatsText: 'تجربة أريح، باللغة التي تختارها.',
            items: [
                ['🌍', 'واجهة الموقع بالإنجليزية', 'حوّل واجهة الموقع بين العربية والإنجليزية من أي صفحة. تبقى المنشورات بلغتها الأصلية.'],
                ['💾', 'اختيارك يبقى محفوظًا', 'ستبقى اللغة التي تختارها معك أثناء تنقلك في الموقع.'],
                ['↔️', 'بدّل وقت ما تحب', 'استخدم الزر الصغير أسفل الصفحة أو خيار اللغة في القائمة الجانبية.']
            ],
            start: 'جرّب الميزة الجديدة',
            tourTitle: 'الموقع بلغتك',
            tourText: 'اضغط زر اللغة لتبديل الموقع وتجربة الميزة الجديدة بنفسك.',
            step: 'خطوة واحدة',
            finishTitle: '✨ تمام، أنت جاهز!',
            finishText: 'اختر اللغة التي تناسبك، ويمكنك تغييرها متى شئت.',
            done: 'العودة للموقع'
        };
    }

    function buildExperience() {
        if (experienceRoot) return;
        bodyOverflowBeforeExperience = document.body.style.overflow;
        focusBeforeExperience = document.activeElement;
        document.body.style.overflow = 'hidden';
        experienceRoot = document.createElement('div');
        experienceRoot.id = 'updateExperience';
        experienceRoot.setAttribute('role', 'dialog');
        experienceRoot.setAttribute('aria-modal', 'true');
        experienceRoot.setAttribute('aria-label', language === 'en' ? 'New update experience' : 'تجربة التحديث الجديد');
        experienceRoot.addEventListener('keydown', handleExperienceKeydown);
        document.body.appendChild(experienceRoot);
        showExperienceIntro();
    }

    function handleExperienceKeydown(event) {
        if (event.key === 'Escape') {
            event.preventDefault();
            closeExperience();
            return;
        }
        if (event.key !== 'Tab' || !experienceRoot) return;
        const focusable = [...experienceRoot.querySelectorAll('button')].filter(button => !button.disabled);
        if (experienceRoot.classList.contains('update-stage-tour')) {
            const target = document.getElementById('languageToggle');
            if (target) focusable.splice(1, 0, target);
        }
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }

    function renderExperienceShell(content, stageClass) {
        if (!experienceRoot) return;
        const copy = experienceCopy();
        experienceRoot.className = `update-experience ${stageClass}`;
        experienceRoot.innerHTML = `${content}<button type="button" class="update-experience-skip">${copy.skip}</button>`;
        experienceRoot.querySelector('.update-experience-skip').addEventListener('click', closeExperience);
        experienceRoot.querySelector('.update-experience-skip').focus();
    }

    function showExperienceIntro() {
        const copy = experienceCopy();
        renderExperienceShell(`
            <section class="update-experience-panel update-intro-panel">
                <div class="update-scene" aria-hidden="true">
                    <div class="update-scene-glow"></div>
                    <div class="update-scene-star update-star-one">✦</div>
                    <div class="update-scene-star update-star-two">✧</div>
                    <div class="update-scene-book"></div>
                    <div class="update-scene-laptop"><span></span></div>
                    <div class="update-scene-student">
                        <span class="update-student-head"></span>
                        <span class="update-student-body"></span>
                        <span class="update-student-arm"></span>
                    </div>
                    <div class="update-scene-pencil">✎</div>
                </div>
                <span class="update-experience-eyebrow">${copy.introEyebrow}</span>
                <h1>${copy.introTitle}</h1>
                <p>${copy.introText}</p>
                <span class="update-intro-hint">${copy.introHint}</span>
            </section>`, 'update-stage-intro');
        experienceTimer = window.setTimeout(showWhatsNew, 2600);
    }

    function showWhatsNew() {
        if (!experienceRoot) return;
        window.clearTimeout(experienceTimer);
        const copy = experienceCopy();
        const items = copy.items.map(([icon, title, description], index) => `
            <article class="update-feature-card" style="--feature-index:${index}">
                <span class="update-feature-icon">${icon}</span>
                <span><strong>${title}</strong><small>${description}</small></span>
            </article>`).join('');
        renderExperienceShell(`
            <section class="update-experience-panel update-whats-panel">
                <span class="update-experience-eyebrow">MOLAKHASATI · ${UPDATE_ID}</span>
                <h1>${copy.whatsTitle}</h1>
                <p class="update-whats-subtitle">${copy.whatsText}</p>
                <div class="update-feature-list">${items}</div>
                <button type="button" class="update-primary-action">${copy.start}<span aria-hidden="true"> →</span></button>
            </section>`, 'update-stage-whats');
        experienceRoot.querySelector('.update-primary-action').addEventListener('click', startFeatureTour);
    }

    function renderSpotlight() {
        if (!experienceRoot) return;
        const target = document.getElementById('languageToggle');
        if (!target) {
            showTourComplete();
            return;
        }
        experienceRoot.querySelector('.update-tour-backdrop')?.remove();
        experienceRoot.querySelector('.update-tour-tooltip')?.remove();
        target.classList.add('update-tour-target');
        target.setAttribute('aria-describedby', 'updateTourTooltip');
        const rect = target.getBoundingClientRect();
        const gap = 9;
        const edge = 0;
        const left = Math.max(edge, rect.left - gap);
        const top = Math.max(edge, rect.top - gap);
        const right = Math.min(window.innerWidth, rect.right + gap);
        const bottom = Math.min(window.innerHeight, rect.bottom + gap);
        const copy = experienceCopy();
        const mask = document.createElement('div');
        mask.className = 'update-tour-backdrop';
        mask.innerHTML = `
            <span style="left:0;top:0;width:100%;height:${top}px"></span>
            <span style="left:0;top:${top}px;width:${left}px;height:${bottom - top}px"></span>
            <span style="left:${right}px;top:${top}px;width:${window.innerWidth - right}px;height:${bottom - top}px"></span>
            <span style="left:0;top:${bottom}px;width:100%;height:${window.innerHeight - bottom}px"></span>`;
        const tooltip = document.createElement('section');
        tooltip.className = 'update-tour-tooltip';
        tooltip.id = 'updateTourTooltip';
        tooltip.innerHTML = `
            <span class="update-tour-step">${copy.step}</span>
            <h2>${copy.tourTitle}</h2>
            <p>${copy.tourText}</p>
            <span class="update-tour-pointer" aria-hidden="true">↓</span>`;
        const tooltipWidth = Math.min(340, window.innerWidth - 28);
        tooltip.style.width = `${tooltipWidth}px`;
        tooltip.style.left = `${Math.max(14, Math.min(rect.left, window.innerWidth - tooltipWidth - 14))}px`;
        tooltip.style.top = `${Math.max(14, rect.top - 168)}px`;
        experienceRoot.append(mask, tooltip);
    }

    function startFeatureTour() {
        if (!experienceRoot) return;
        window.clearTimeout(experienceTimer);
        experienceRoot.className = 'update-experience update-stage-tour';
        const skipLabel = experienceCopy().skip;
        experienceRoot.innerHTML = `<div class="update-tour-backdrop"></div><button type="button" class="update-experience-skip">${skipLabel}</button>`;
        experienceRoot.querySelector('.update-experience-skip').addEventListener('click', closeExperience);
        experienceRoot.querySelector('.update-experience-skip').focus();
        renderSpotlight();
        tourResizeHandler = renderSpotlight;
        window.addEventListener('resize', tourResizeHandler);
        document.addEventListener('site-language-change', handleTourLanguageChange);
    }

    function handleTourLanguageChange() {
        if (!experienceRoot?.classList.contains('update-stage-tour')) return;
        document.removeEventListener('site-language-change', handleTourLanguageChange);
        window.removeEventListener('resize', tourResizeHandler);
        tourResizeHandler = null;
        showTourComplete();
    }

    function showTourComplete() {
        if (!experienceRoot) return;
        document.getElementById('languageToggle')?.classList.remove('update-tour-target');
        document.getElementById('languageToggle')?.removeAttribute('aria-describedby');
        if (tourResizeHandler) window.removeEventListener('resize', tourResizeHandler);
        tourResizeHandler = null;
        document.removeEventListener('site-language-change', handleTourLanguageChange);
        const copy = experienceCopy();
        renderExperienceShell(`
            <section class="update-experience-panel update-complete-panel">
                <span class="update-complete-icon" aria-hidden="true">✨</span>
                <span class="update-experience-eyebrow">${UPDATE_ID}</span>
                <h1>${copy.finishTitle}</h1>
                <p>${copy.finishText}</p>
                <button type="button" class="update-primary-action">${copy.done}</button>
            </section>`, 'update-stage-complete');
        experienceRoot.querySelector('.update-primary-action').addEventListener('click', closeExperience);
    }

    function closeExperience() {
        window.clearTimeout(experienceTimer);
        if (tourResizeHandler) window.removeEventListener('resize', tourResizeHandler);
        document.removeEventListener('site-language-change', handleTourLanguageChange);
        document.getElementById('languageToggle')?.classList.remove('update-tour-target');
        document.getElementById('languageToggle')?.removeAttribute('aria-describedby');
        experienceRoot?.remove();
        experienceRoot = null;
        document.body.style.overflow = bodyOverflowBeforeExperience;
        if (focusBeforeExperience?.isConnected && typeof focusBeforeExperience.focus === 'function') focusBeforeExperience.focus();
        focusBeforeExperience = null;
    }

    async function maybeStartUpdateExperience() {
        const identity = getExperienceIdentity();
        if (!identity || !await markUpdateAsSeen(identity)) return;
        buildExperience();
    }

    window.setSiteLanguage = setLanguage;
    window.getSiteLocale = () => language === 'en' ? 'en-US' : 'ar-EG';
    window.translateSiteText = value => language === 'en' ? translateValue(String(value)) : String(value);
    const nativeAlert = window.alert.bind(window);
    const nativeConfirm = window.confirm.bind(window);
    window.alert = message => nativeAlert(window.translateSiteText(message));
    window.confirm = message => nativeConfirm(window.translateSiteText(message));
    setDocumentLanguage();

    const style = document.createElement('style');
    style.textContent = `
        .site-language-toggle {
            position: fixed;
            z-index: 100;
            left: 12px;
            bottom: 12px;
            min-width: 42px;
            padding: 5px 9px;
            border: 1px solid #9ca3af;
            border-radius: 9999px;
            background: #fff;
            color: #111827;
            font: 600 11px/1.4 ui-sans-serif, system-ui, sans-serif;
            box-shadow: 0 2px 8px rgb(0 0 0 / 12%);
        }
        body.has-bottom-navigation .site-language-toggle { bottom: 76px; }
        .dark .site-language-toggle {
            border-color: #525252;
            background: #171717;
            color: #f3f4f6;
        }
        .site-sidebar-language-toggle {
            display: flex;
            width: 100%;
            align-items: center;
            gap: .75rem;
            padding: .75rem;
            border: 0;
            border-radius: .75rem;
            background: transparent;
            color: inherit;
            cursor: pointer;
            text-align: start;
            font-size: .875rem;
        }
        .site-sidebar-language-toggle:hover { background: rgb(156 163 175 / 15%); }
        .update-experience {
            position: fixed;
            inset: 0;
            z-index: 190;
            display: grid;
            place-items: center;
            overflow: hidden;
            padding: 20px;
            color: #172033;
            background:
                radial-gradient(ellipse at 50% 42%, rgb(92 151 255 / 17%), transparent 48%),
                radial-gradient(ellipse at 80% 20%, rgb(180 115 255 / 14%), transparent 42%),
                rgb(8 13 29 / 96%);
            font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            animation: updateExperienceIn 420ms cubic-bezier(.2,.8,.2,1) both;
        }
        .update-experience.update-stage-tour {
            overflow: visible;
            background: transparent;
            pointer-events: none;
        }
        .update-experience.update-stage-tour::before,
        .update-experience.update-stage-tour::after { display: none; }
        .update-experience.update-stage-tour > * { pointer-events: auto; }
        .update-experience::before,
        .update-experience::after {
            position: absolute;
            width: min(70vw, 520px);
            aspect-ratio: 1;
            border: 1px solid rgb(180 202 255 / 9%);
            border-radius: 50%;
            content: "";
            pointer-events: none;
            animation: updateOrbit 18s linear infinite;
        }
        .update-experience::after {
            width: min(92vw, 760px);
            animation-direction: reverse;
            animation-duration: 28s;
        }
        .update-experience-panel {
            position: relative;
            z-index: 1;
            width: min(100%, 510px);
            max-height: min(84vh, 760px);
            overflow-y: auto;
            padding: clamp(24px, 5vw, 42px);
            border: 1px solid rgb(255 255 255 / 55%);
            border-radius: 28px;
            background: linear-gradient(145deg, #fff 0%, #f7f9ff 68%, #eef3ff 100%);
            box-shadow: 0 32px 100px rgb(0 0 0 / 38%), inset 0 1px 0 #fff;
            text-align: center;
            animation: updatePanelIn 520ms cubic-bezier(.16,1,.3,1) both;
        }
        .update-experience-panel h1 {
            margin: 10px 0 8px;
            color: #111827;
            font-size: clamp(24px, 5vw, 34px);
            font-weight: 800;
            letter-spacing: -.04em;
            line-height: 1.2;
        }
        .update-experience-panel p {
            margin: 0 auto;
            max-width: 390px;
            color: #596579;
            font-size: 14px;
            line-height: 1.8;
        }
        .update-experience-eyebrow {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            color: #5968da;
            font-size: 10px;
            font-weight: 800;
            letter-spacing: .14em;
        }
        .update-experience-skip {
            position: absolute;
            z-index: 3;
            top: max(18px, env(safe-area-inset-top));
            inset-inline-end: 18px;
            padding: 9px 13px;
            border: 1px solid rgb(255 255 255 / 24%);
            border-radius: 999px;
            background: rgb(255 255 255 / 9%);
            color: #f8fafc;
            font: inherit;
            font-size: 12px;
            cursor: pointer;
            backdrop-filter: blur(12px);
        }
        .update-experience-skip:hover { background: rgb(255 255 255 / 17%); }
        .update-scene {
            position: relative;
            width: 230px;
            height: 174px;
            margin: -14px auto 16px;
            isolation: isolate;
        }
        .update-scene-glow {
            position: absolute;
            inset: 15px 25px;
            border-radius: 50%;
            background: radial-gradient(ellipse, rgb(111 129 255 / 28%), transparent 68%);
            filter: blur(7px);
            animation: updateGlow 2.8s ease-in-out infinite alternate;
        }
        .update-scene-book {
            position: absolute;
            z-index: 1;
            bottom: 17px;
            left: 5px;
            width: 76px;
            height: 35px;
            border: 2px solid #6f7ced;
            border-radius: 5px 3px 8px 5px;
            background: linear-gradient(90deg, #dce2ff 48%, #fff 49%, #f3f5ff 100%);
            box-shadow: 0 9px 14px rgb(60 68 140 / 13%);
            transform: rotate(-9deg);
            animation: updateBook 3s ease-in-out infinite;
        }
        .update-scene-book::after {
            position: absolute;
            top: 7px;
            left: 36px;
            width: 1px;
            height: 23px;
            background: #a8b0ee;
            content: "";
        }
        .update-scene-laptop {
            position: absolute;
            z-index: 3;
            right: 19px;
            bottom: 21px;
            width: 100px;
            height: 66px;
            padding: 6px;
            border: 3px solid #343e62;
            border-radius: 8px;
            background: linear-gradient(145deg, #bfcaff, #edf0ff);
            box-shadow: 0 14px 24px rgb(40 48 100 / 19%);
            transform: perspective(240px) rotateY(-8deg);
        }
        .update-scene-laptop::after {
            position: absolute;
            right: -10px;
            bottom: -8px;
            left: -10px;
            height: 7px;
            border-radius: 2px 2px 7px 7px;
            background: #535e83;
            content: "";
        }
        .update-scene-laptop span {
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 3px;
            background: linear-gradient(135deg, #8ea2ff, #c9a7ff 50%, #8de3dc);
            animation: updateScreen 2.6s ease-in-out infinite alternate;
        }
        .update-scene-student {
            position: absolute;
            z-index: 2;
            bottom: 48px;
            left: 76px;
            width: 85px;
            height: 92px;
            animation: updateStudent 3s ease-in-out infinite;
        }
        .update-student-head {
            position: absolute;
            top: 2px;
            left: 28px;
            width: 38px;
            height: 43px;
            border: 3px solid #303a60;
            border-radius: 48% 48% 45% 45%;
            background: #f1bd9c;
            box-shadow: inset 0 7px #44395e;
        }
        .update-student-head::after {
            position: absolute;
            right: 7px;
            bottom: 11px;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background: #29314c;
            box-shadow: -13px 0 #29314c;
            content: "";
        }
        .update-student-body {
            position: absolute;
            bottom: 0;
            left: 15px;
            width: 64px;
            height: 48px;
            border: 3px solid #35416b;
            border-radius: 24px 24px 8px 8px;
            background: linear-gradient(130deg, #7989eb, #5969cb);
        }
        .update-student-arm {
            position: absolute;
            z-index: 4;
            right: -2px;
            bottom: 18px;
            width: 41px;
            height: 10px;
            border: 2px solid #ad795f;
            border-radius: 99px;
            background: #f1bd9c;
            transform: rotate(-22deg);
            transform-origin: 5px center;
            animation: updateWrite 1.5s ease-in-out infinite alternate;
        }
        .update-scene-pencil {
            position: absolute;
            z-index: 4;
            right: 18px;
            bottom: 8px;
            color: #efad54;
            font-size: 28px;
            transform: rotate(18deg);
        }
        .update-scene-star {
            position: absolute;
            z-index: 2;
            color: #828fff;
            animation: updateTwinkle 1.8s ease-in-out infinite alternate;
        }
        .update-star-one { top: 23px; right: 32px; font-size: 28px; }
        .update-star-two { top: 52px; left: 19px; animation-delay: .6s; font-size: 22px; }
        .update-intro-hint {
            display: inline-block;
            margin-top: 20px;
            color: #7b8494;
            font-size: 11px;
        }
        .update-stage-intro .update-intro-hint::after {
            display: inline-block;
            width: 4px;
            height: 4px;
            margin-inline-start: 7px;
            border-radius: 50%;
            background: #727df3;
            content: "";
            animation: updatePulse 1s ease-in-out infinite;
        }
        .update-whats-panel { text-align: start; }
        .update-whats-panel h1 { margin-top: 8px; }
        .update-whats-subtitle { margin-inline: 0 !important; }
        .update-feature-list { display: grid; gap: 10px; margin: 24px 0; }
        .update-feature-card {
            display: flex;
            align-items: flex-start;
            gap: 13px;
            padding: 14px;
            border: 1px solid #e8ebf4;
            border-radius: 16px;
            background: rgb(255 255 255 / 75%);
            animation: updateFeatureIn 420ms cubic-bezier(.16,1,.3,1) both;
            animation-delay: calc(var(--feature-index) * 100ms);
        }
        .update-feature-icon {
            display: grid;
            flex: 0 0 38px;
            width: 38px;
            height: 38px;
            place-items: center;
            border-radius: 12px;
            background: #edf0ff;
            font-size: 19px;
        }
        .update-feature-card strong,
        .update-feature-card small { display: block; }
        .update-feature-card strong { margin: 1px 0 4px; color: #242b3b; font-size: 13px; }
        .update-feature-card small { color: #697386; font-size: 11px; line-height: 1.65; }
        .update-primary-action {
            display: flex;
            width: 100%;
            min-height: 48px;
            align-items: center;
            justify-content: center;
            gap: 7px;
            padding: 12px 18px;
            border: 0;
            border-radius: 14px;
            background: linear-gradient(110deg, #5968dd, #7864dd);
            color: #fff;
            font: inherit;
            font-size: 13px;
            font-weight: 750;
            cursor: pointer;
            box-shadow: 0 8px 22px rgb(93 103 220 / 26%);
            transition: transform 180ms ease, box-shadow 180ms ease;
        }
        .update-primary-action:hover { transform: translateY(-2px); box-shadow: 0 12px 26px rgb(93 103 220 / 32%); }
        .update-tour-backdrop {
            position: absolute;
            z-index: 1;
            inset: 0;
            pointer-events: none;
        }
        .update-tour-backdrop span {
            position: fixed;
            display: block;
            background: rgb(7 11 24 / 76%);
            pointer-events: auto;
            backdrop-filter: blur(2px);
        }
        .update-tour-target {
            z-index: 192 !important;
            outline: 3px solid #a9b1ff !important;
            outline-offset: 5px !important;
            box-shadow: 0 0 0 12px rgb(128 139 255 / 20%), 0 0 32px rgb(130 145 255 / 75%) !important;
            animation: updateTargetPulse 1.5s ease-in-out infinite alternate !important;
        }
        .update-tour-tooltip {
            position: fixed;
            z-index: 193;
            padding: 17px 18px 19px;
            border: 1px solid #e4e7f2;
            border-radius: 18px;
            background: #fff;
            color: #20283a;
            box-shadow: 0 20px 60px rgb(0 0 0 / 28%);
            animation: updatePanelIn 320ms cubic-bezier(.16,1,.3,1) both;
        }
        .update-tour-step { color: #6673dd; font-size: 10px; font-weight: 800; }
        .update-tour-tooltip h2 { margin: 5px 0; font-size: 16px; font-weight: 800; }
        .update-tour-tooltip p { margin: 0; color: #626d80; font-size: 12px; line-height: 1.7; }
        .update-tour-pointer {
            position: absolute;
            right: 18px;
            bottom: -29px;
            color: #fff;
            font-size: 24px;
            filter: drop-shadow(0 2px 2px rgb(0 0 0 / 28%));
            animation: updatePointer 650ms ease-in-out infinite alternate;
        }
        html[dir="ltr"] .update-tour-pointer { right: auto; left: 18px; }
        .update-complete-panel { width: min(100%, 420px); }
        .update-complete-icon {
            display: grid;
            width: 68px;
            height: 68px;
            margin: 0 auto 10px;
            place-items: center;
            border-radius: 22px;
            background: #edf0ff;
            font-size: 32px;
            animation: updateTwinkle 1.2s ease-in-out infinite alternate;
        }
        .update-complete-panel .update-primary-action { margin-top: 24px; }
        @keyframes updateExperienceIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes updatePanelIn { from { opacity: 0; transform: translateY(20px) scale(.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes updateOrbit { to { transform: rotate(360deg); } }
        @keyframes updateGlow { to { opacity: .55; transform: scale(1.1); } }
        @keyframes updateBook { 50% { transform: translateY(-4px) rotate(-7deg); } }
        @keyframes updateScreen { to { filter: hue-rotate(22deg) brightness(1.08); } }
        @keyframes updateStudent { 50% { transform: translateY(-3px); } }
        @keyframes updateWrite { to { transform: rotate(-31deg) translateY(-2px); } }
        @keyframes updateTwinkle { to { opacity: .55; transform: scale(.88) rotate(12deg); } }
        @keyframes updatePulse { 50% { opacity: .3; transform: scale(.7); } }
        @keyframes updateFeatureIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes updateTargetPulse { to { box-shadow: 0 0 0 16px rgb(128 139 255 / 9%), 0 0 38px rgb(130 145 255 / 90%); } }
        @keyframes updatePointer { to { transform: translateY(5px); } }
        @media (max-width: 480px) {
            .update-experience { padding: 14px; }
            .update-experience-panel { border-radius: 22px; padding: 24px 20px; }
            .update-scene { transform: scale(.9); margin-top: -18px; margin-bottom: 4px; }
            .update-feature-list { gap: 8px; margin: 18px 0; }
            .update-feature-card { padding: 11px; }
            .update-tour-tooltip { padding: 14px; }
        }
        @media (prefers-reduced-motion: reduce) {
            #updateExperience *, #updateExperience::before, #updateExperience::after {
                animation-duration: .01ms !important;
                animation-iteration-count: 1 !important;
                scroll-behavior: auto !important;
                transition-duration: .01ms !important;
            }
        }
        html[dir="ltr"] #sidebar,
        html[dir="ltr"] .question-sidebar {
            right: auto;
            left: 0;
            border-left-width: 0;
            border-right-width: 1px;
        }
        html[dir="ltr"] #sidebar.translate-x-full,
        html[dir="ltr"] .question-sidebar.translate-x-full { transform: translateX(-100%); }
        html[dir="ltr"] #sidebar.translate-x-0,
        html[dir="ltr"] .question-sidebar.translate-x-0 { transform: translateX(0); }
        html[dir="ltr"] .text-right { text-align: left; }
        html[dir="ltr"] .text-left { text-align: right; }
        @media (min-width: 1024px) {
            html[dir="ltr"] #sidebar,
            html[dir="ltr"] .question-sidebar {
                left: auto;
                right: auto;
                border: 0;
            }
        }
    `;
    document.head.appendChild(style);

    document.addEventListener('DOMContentLoaded', () => {
        if (document.querySelector('#bottomNavigation')) document.body.classList.add('has-bottom-navigation');
        injectControls();
        const observer = new MutationObserver(records => {
            for (const record of records) {
                if (record.type === 'characterData') {
                    processText(record.target);
                } else if (record.type === 'attributes') {
                    processAttribute(record.target, record.attributeName);
                } else {
                    for (const node of record.addedNodes) {
                        if (node.nodeType === Node.TEXT_NODE) processText(node);
                        else if (node.nodeType === Node.ELEMENT_NODE) processElement(node);
                    }
                }
            }
        });
        observer.observe(document.body, {
            subtree: true,
            childList: true,
            characterData: true,
            attributes: true,
            attributeFilter: ['placeholder', 'title', 'aria-label', 'alt']
        });
        window.setTimeout(maybeStartUpdateExperience, 450);
    });
})();
