import {getRandomInteger} from './util.js';
import {getRandomArrayElement} from './util.js';
import {NAMES} from './mock.js';
import {SURNAMES} from './mock.js';
import {DESCRIPTIONS} from './mock.js';
import {USER_COMMENTS} from './mock.js';
import {USERS_ARTICLES} from './mock.js';

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

export {createPostsArray};
