import {getRandomInteger, getRandomArrayElement} from './utils.js';
import {NAMES, SURNAMES, DESCRIPTIONS, USER_COMMENTS, USERS_ARTICLES} from './mock.js';

const getRandomName = () => `${getRandomArrayElement(NAMES)} ${getRandomArrayElement(SURNAMES)}`;

const createComment = (index) => ({
  id: index,
  avatar: `img/avatar-${ getRandomInteger(1, 6) }.svg`,
  message: getRandomArrayElement(USER_COMMENTS),
  name: getRandomName(),
});

const getCommentsQuantity = () => {
  let lastGeneratedLength = 0;
  return function() {
    lastGeneratedLength = getRandomInteger(1, 10);
    return lastGeneratedLength;
  };
};

const generatedLength = getCommentsQuantity();

const createCommentArray = () => Array.from({length: generatedLength()}, (_, commentIndex) => createComment(commentIndex + 1));

const createPhotoDescription = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: createCommentArray(),
});

const createPostsArray = () => Array.from({length: USERS_ARTICLES}, (_, photoIndex) => createPhotoDescription(photoIndex + 1));

export {createPostsArray, createCommentArray};
