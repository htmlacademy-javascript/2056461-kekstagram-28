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

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRamdomArrayElement = (element) => element[getRandomInteger(0, element.length - 1)];

const getRandomName = () => `${getRamdomArrayElement(NAMES)} ${getRamdomArrayElement(SURNAMES)}`;

function createRandomIdFromRange (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const generateId = createRandomIdFromRange (1, 25);
const generatePhotoId = createRandomIdFromRange (1, 25);
const generateCommentId = createRandomIdFromRange (1, 15);
const commentsQuantity = getRandomInteger(1, 4);
const USERS_ARTICLES = 25;

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${ getRandomInteger(1, 6) }.svg`,
  message: getRamdomArrayElement(USER_COMMENTS),
  name: getRandomName(),
});

const commentsGroup = Array.from({length: commentsQuantity}, createComment);

const createPhotoDescription = () => ({
  id: generateId(),
  url: `photos/${ generatePhotoId() }.jpg`,
  description: getRamdomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: commentsGroup,
});

const usersPostsArray = Array.from({length: USERS_ARTICLES}, createPhotoDescription);

