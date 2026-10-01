let commentsDatabase = null;
let commentsUser = null;

function setCommentsContext(database, user) {
    commentsDatabase = database;
    commentsUser = user;
}

function escapeCommentHtml(value) {
    return String(value ?? '').replace(/[&<>\'"]/g, character => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
    }[character]));
}

function renderCommentItem(comment) {
    return `
        <article id="post-comment-${escapeCommentHtml(comment.id)}" data-comment-id="${escapeCommentHtml(comment.id)}" class="border-b border-gray-100 dark:border-neutral-700 py-2 last:border-0">
            <p class="text-[11px] font-semibold">${escapeCommentHtml(comment.authorName || 'مستخدم')}</p>
            <p class="text-xs leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words">${escapeCommentHtml(comment.text)}</p>
            ${comment.createdAt ? `<time class="text-[10px] text-gray-400">${escapeCommentHtml(new Date(comment.createdAt).toLocaleString('ar-EG'))}</time>` : ''}
        </article>`;
}

function renderPostComments(post) {
    const comments = Array.isArray(post.comments) ? post.comments : [];
    const commentsMarkup = comments.length
        ? comments.map(renderCommentItem).join('')
        : '<p class="py-2 text-[11px] text-gray-500">لا توجد تعليقات بعد.</p>';
    const commentsId = `post-comments-${post.id}`;
    const wasOpen = document.getElementById(commentsId)?.open;

    const formMarkup = commentsUser && commentsUser.id
        ? `<form data-comment-form data-post-id="${escapeCommentHtml(post.id)}" class="flex items-end gap-2 pt-2">
                <textarea name="commentText" rows="1" maxlength="500" required placeholder="اكتب تعليقًا..." class="min-w-0 flex-1 resize-y rounded border border-gray-200 bg-white p-2 text-xs dark:border-neutral-700 dark:bg-neutral-800"></textarea>
                <button type="submit" class="shrink-0 rounded bg-gray-900 px-3 py-2 text-xs text-white dark:bg-gray-100 dark:text-gray-900">إرسال</button>
            </form>`
        : '<p class="pt-2 text-[11px] text-gray-500">سجّل الدخول لإضافة تعليق.</p>';

    return `<details id="${escapeCommentHtml(commentsId)}" class="border-t border-gray-100 px-3 dark:border-neutral-800"${wasOpen ? ' open' : ''}>
        <summary data-comment-count="${comments.length}" class="flex cursor-pointer list-none items-center justify-between rounded-md border border-gray-200 bg-gray-50 px-3 py-2.5 text-xs font-semibold text-gray-800 hover:bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-gray-100 dark:hover:bg-neutral-700">
            <span>💬 التعليقات (${comments.length})</span><span aria-hidden="true" class="text-base">⌄</span>
        </summary>
        <div class="pb-3">
            <div data-comment-list class="divide-y divide-gray-100 dark:divide-neutral-700">${commentsMarkup}</div>
            ${formMarkup}
            <p data-comment-status class="pt-1 text-[10px] text-red-600" role="status"></p>
        </div>
    </details>`;
}

document.addEventListener('submit', async event => {
    const form = event.target.closest('[data-comment-form]');
    if (!form) return;
    event.preventDefault();

    const input = form.elements.commentText;
    const text = input.value.trim();
    const status = form.parentElement.querySelector('[data-comment-status]');
    if (!text || !commentsUser || !commentsUser.id) return;

    const comment = {
        id: typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        authorId: commentsUser.id,
        authorName: commentsUser.name || 'مستخدم',
        text,
        createdAt: new Date().toISOString()
    };
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    status.textContent = '';

    try {
        const postId = form.dataset.postId;
        if (commentsDatabase) {
            await commentsDatabase.collection('posts').doc(postId).update({
                comments: firebase.firestore.FieldValue.arrayUnion(comment)
            });
        } else {
            const posts = JSON.parse(localStorage.getItem('app_posts') || '[]');
            const post = posts.find(item => item.id === postId);
            if (!post) throw new Error('المنشور غير موجود.');
            post.comments = [...(Array.isArray(post.comments) ? post.comments : []), comment];
            localStorage.setItem('app_posts', JSON.stringify(posts));
            window.dispatchEvent(new CustomEvent('post-comment-added', {detail: {postId, comment}}));
        }
        const details = form.closest('details');
        const commentList = details.querySelector('[data-comment-list]');
        if (!document.getElementById(`post-comment-${comment.id}`)) {
            commentList.querySelector('p')?.remove();
            commentList.insertAdjacentHTML('beforeend', renderCommentItem(comment));
        }
        const summary = details.querySelector('summary');
        const count = commentList.querySelectorAll('[data-comment-id]').length;
        summary.dataset.commentCount = count;
        summary.textContent = `التعليقات (${count})`;
        details.open = true;
        input.value = '';
    } catch (error) {
        console.error('تعذر إرسال التعليق:', error);
        status.textContent = 'تعذر إرسال التعليق. حاول مرة أخرى.';
    } finally {
        submitButton.disabled = false;
    }
});