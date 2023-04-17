import {showAlert, debounce} from './utils.js';
import {getServerData} from './server.js';
import {findPictureByID} from './image-element-open.js';

const RERENDER_DELAY = 500;
const RANDOM_POSTS_LENGTH = 10;
const KEKSTAGRAM_GET = 'https://28.javascript.pages.academy/kekstagram/data';
const imagesFilter = document.querySelector('.img-filters');
const filtersForm = imagesFilter.querySelector('.img-filters__form');
const filterDefault = imagesFilter.querySelector('#filter-default');
const filterRandom = imagesFilter.querySelector('#filter-random');
const filterDiscussed = imagesFilter.querySelector('#filter-discussed');
const usersImagesList = document.querySelector('.pictures');
const imageElementTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const usersPublicationsFragment = document.createDocumentFragment();

let serverDataCopy = [];

const renderUsersPosts = (data) => {
  let sortedData = data;
  serverDataCopy = data.slice();
  if (filterDefault.classList.contains('img-filters__button--active')) {
    sortedData = serverDataCopy;
  }
  if (filterRandom.classList.contains('img-filters__button--active')) {
    sortedData = data.sort(() => Math.random() - 0.5).slice(0, RANDOM_POSTS_LENGTH);
  }
  if (filterDiscussed.classList.contains('img-filters__button--active')) {
    sortedData = data.sort((a, b) => b.comments.length - a.comments.length);
  }

  sortedData.forEach(({id, url, description, comments, likes}) => {
    const imageElement = imageElementTemplate.cloneNode(true);
    imageElement.querySelector('.picture__img').src = url;
    imageElement.querySelector('.picture__img').alt = description;
    imageElement.querySelector('.picture__comments').textContent = comments.length;
    imageElement.querySelector('.picture__likes').textContent = likes;
    imageElement.dataset.thumbnailId = id;
    usersPublicationsFragment.appendChild(imageElement);
  });

  const imagesListElements = usersImagesList.querySelectorAll('.picture');
  imagesListElements.forEach((element) => usersImagesList.removeChild(element));
  usersImagesList.appendChild(usersPublicationsFragment);
  imagesFilter.classList.remove('img-filters--inactive');
  findPictureByID(sortedData);
};

const setActiveButton = (button) => {
  const activeButton = filtersForm.querySelector('.img-filters__button--active');
  activeButton.classList.remove('img-filters__button--active');
  button.classList.add('img-filters__button--active');
  renderUsersPosts(serverDataCopy);
};

const deboncedFilterButtons = debounce((evt) => {
  evt.preventDefault();
  const clickedButton = evt.target;
  if (clickedButton.classList.contains('img-filters__button--active')) {
    return;
  }

  setActiveButton(evt.target);
}, RERENDER_DELAY);

filtersForm.addEventListener('click', deboncedFilterButtons);

getServerData(renderUsersPosts, showAlert, KEKSTAGRAM_GET);

export {usersImagesList, serverDataCopy};
