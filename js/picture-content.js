const renderContainer = document.querySelector('.big-picture');
const bigPictureSelector = renderContainer.querySelector('.big-picture__img');
const bigPictureSrc = bigPictureSelector.querySelector('img');
const bigPictureLikesCount = renderContainer.querySelector('.likes-count');
const bigPictureCommentsLength = renderContainer.querySelector('.social__comment-count');
const bigPictureDescription = renderContainer.querySelector('.social__caption');
const commentsField = renderContainer.querySelector('.social__comments');
const commentsLoader = renderContainer.querySelector('.comments-loader');
const commentElementTamplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');

const COMMENTS_PORTION_SHOWN = 5;


const renderPostContent = (element) => {
  bigPictureSrc.src = element.url;
  bigPictureSrc.alt = element.description;
  bigPictureLikesCount.textContent = element.likes;
  bigPictureCommentsLength.textContent = element.comments.length;
  bigPictureDescription.textContent = element.description;
};

const renderComment = (element) => {
  const commentElement = commentElementTamplate.cloneNode(true);
  commentElement.querySelector('.social__picture').src = element.avatar;
  commentElement.querySelector('.social__picture').alt = element.name;
  commentElement.querySelector('.social__text').textContent = element.message;

  return commentElement;
};

const usersCommentsFragment = document.createDocumentFragment();

let commentLength = 0;

function renderComments(element) {
  commentLength += COMMENTS_PORTION_SHOWN;
  const usersComments = element.comments;

  if (commentLength >= usersComments.length) {
    commentsLoader.classList.add('hidden');
    commentLength = usersComments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  for (let i = 0; i < commentLength; i++) {
    const commentElement = renderComment(usersComments[i]);
    usersCommentsFragment.appendChild(commentElement);
  }

  commentsField.innerHTML = '';
  commentsField.appendChild(usersCommentsFragment);
  bigPictureCommentsLength.innerHTML = `${commentLength} из <span class="comments-count">${usersComments.length}</span> комментариев</div>`;
}

export {renderPostContent, renderComments};
