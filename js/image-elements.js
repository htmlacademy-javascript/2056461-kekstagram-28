import { createPostsArray } from './data';

const usersImagesList = document.querySelector('.pictures');
const imageElementTamplate = document.querySelector('#picture').content.querySelector('.picture');
const usersPublications = createPostsArray();

const usersPublicationsFragment = document.createDocumentFragment();

usersPublications.forEach(({url, comments, likes}) => {
  const imageElement = imageElementTamplate.cloneNode(true);
  imageElement.querySelector('.picture__img').src = url;
  imageElement.querySelector('.picture__comments').innerHTML = comments.length;
  imageElement.querySelector('.picture__likes').textContent = likes;

  usersPublicationsFragment.appendChild(imageElement);
});

usersImagesList.appendChild(usersPublicationsFragment);
