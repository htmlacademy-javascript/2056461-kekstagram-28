const NAMES = [
  'Иван',
  'Хуан',
  'Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
  'Карл',
];

const SURNAMES = [
  'Крутой',
  'Ворона',
  'Мирабелла',
  'Шольц',
  'Петров',
  'Уж',
  'Жигулевский',
  'Ирвинг',
  'Кукуруза',
  'Вино',
];

const DESCRIPTIONS = [
  'Чудесный день!',
  'Всем добра!',
  'Пост здесь ради лайков!',
  'Не проходим мимо, подписываемся!',
  'Жизнь прекрасна, выпьем Шомпанского!',
  'Наконец-то дошли лапы выложить фотки с отпуска...',
];

const USER_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const USERS_ARTICLES = 25;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

const commentsQuantity = getRandomInteger(1, 4);

const getRandomName = () => `${getRandomArrayElement(NAMES)} ${getRandomArrayElement(SURNAMES)}`;

const createComment = (index) => ({
  id: index,
  avatar: `img/avatar-${ getRandomInteger(1, 6) }.svg`,
  message: getRandomArrayElement(USER_COMMENTS),
  name: getRandomName(),
});

const createCommentArray = () => Array.from({length: commentsQuantity}, (_, commentIndex) => createComment(commentIndex + 1));

const createPhotoDescription = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: createCommentArray(),
});

const createPostsArray = () => Array.from({length: USERS_ARTICLES}, (_, photoIndex) => createPhotoDescription(photoIndex + 1));

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
