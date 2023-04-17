const COMMENTS_PORTION_SHOWN = 5;
const renderContainer = document.querySelector('.big-picture');
const bigPictureSelector = renderContainer.querySelector('.big-picture__img');
const bigPictureSrc = bigPictureSelector.querySelector('img');
const bigPictureLikesCount = renderContainer.querySelector('.likes-count');
const bigPictureCommentsShown = renderContainer.querySelector('.comments-count');
const bigPictureCommentTotal = renderContainer.querySelector('.comments-count--total');
const bigPictureDescription = renderContainer.querySelector('.social__caption');
const commentsField = renderContainer.querySelector('.social__comments');
const commentsLoader = renderContainer.querySelector('.comments-loader');
const commentElementTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');

let commentLength = 0;

const renderPostContent = (element) => {
  commentLength = 0;
  bigPictureSrc.src = element.url;
  bigPictureSrc.alt = element.description;
  bigPictureLikesCount.textContent = element.likes;
  bigPictureCommentsShown.textContent = element.comments.length;
  bigPictureDescription.textContent = element.description;
};

const renderComment = (element) => {
  const commentElement = commentElementTemplate.cloneNode(true);
  commentElement.querySelector('.social__picture').src = element.avatar;
  commentElement.querySelector('.social__picture').alt = element.name;
  commentElement.querySelector('.social__text').textContent = element.message;
  return commentElement;
};

const usersCommentsFragment = document.createDocumentFragment();

const renderComments = (element) => {
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
  bigPictureCommentTotal.textContent = usersComments.length;
  bigPictureCommentsShown.textContent = commentLength;
};

export {renderPostContent, renderComments};
