import {showAlert, debounce} from './utils.js';
import {getServerData, KEKSTAGRAM_GET} from './get-server-data.js';

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

const RERENDER_DELAY = 500;
const RANDOM_POSTS_LENGTH = 10;

const renderUsersPosts = (data) => {
  let sortedData = data;
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
    imageElement.querySelector('.picture__comments').innerHTML = comments.length;
    imageElement.querySelector('.picture__likes').textContent = likes;
    imageElement.dataset.thumbnailId = id;
    usersPublicationsFragment.appendChild(imageElement);
  });

  const imagesListElements = usersImagesList.querySelectorAll('.picture');
  imagesListElements.forEach((element) => usersImagesList.removeChild(element));
  usersImagesList.appendChild(usersPublicationsFragment);
  imagesFilter.classList.remove('img-filters--inactive');
};

const deboncedFilterButtons = debounce((evt) => {
  evt.preventDefault();
  if (evt.target.matches('#filter-default')) {
    const activeButton = filtersForm.querySelector('.img-filters__button--active');
    activeButton.classList.remove('img-filters__button--active');
    filterDefault.classList.add('img-filters__button--active');
    getServerData(renderUsersPosts, showAlert, KEKSTAGRAM_GET);
  }

  if (evt.target.matches('#filter-random')) {
    const activeButton = filtersForm.querySelector('.img-filters__button--active');
    activeButton.classList.remove('img-filters__button--active');
    filterRandom.classList.add('img-filters__button--active');
    getServerData(renderUsersPosts, showAlert, KEKSTAGRAM_GET);
  }

  if (evt.target.matches('#filter-discussed')) {
    const activeButton = filtersForm.querySelector('.img-filters__button--active');
    activeButton.classList.remove('img-filters__button--active');
    filterDiscussed.classList.add('img-filters__button--active');
    getServerData(renderUsersPosts, showAlert, KEKSTAGRAM_GET);
  }
}, RERENDER_DELAY);

filtersForm.addEventListener('click', deboncedFilterButtons);

getServerData(renderUsersPosts, showAlert, KEKSTAGRAM_GET);

export {usersImagesList};
