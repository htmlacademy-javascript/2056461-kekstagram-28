import {isEscapeKey, showAlert} from './utils.js';
import {usersDataLoader} from './get-server-data.js';
import {usersImagesList} from './image-elements.js';
import {renderPostContent, renderComments} from './image-content.js';

const bigPictureWindow = document.querySelector('.big-picture');
const bigPictureClose = bigPictureWindow.querySelector('.big-picture__cancel');
const commentsLoaderButton = bigPictureWindow.querySelector('.comments-loader');

let picture = 0;

const onDocumentKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture ();
  }
};

const onCommentsLoaderClick = () => {
  renderComments(picture);
};

const openBigPicture = (id) => {
  bigPictureWindow.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeyDown);
  renderPostContent(id);
  renderComments(id);
  commentsLoaderButton.addEventListener('click', onCommentsLoaderClick);
};

function closeBigPicture() {
  bigPictureWindow.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
  commentsLoaderButton.removeEventListener('click', onCommentsLoaderClick);
  picture = 0;
}

const findPictureByID = (data) => {
  usersImagesList.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');
    if (!thumbnail) {
      return;
    } else {
      evt.preventDefault();
    }

    picture = data.find((item) => item.id === Number(thumbnail.dataset.thumbnailId));

    if (evt.target.closest('.picture')) {
      openBigPicture(picture);
    }
  });
};


bigPictureClose.addEventListener('click', () => {
  closeBigPicture();
});

usersDataLoader(findPictureByID, showAlert);

export {openBigPicture};
