const TAGS_LIMIT = 5;
const uploadImgForm = document.querySelector('#upload-select-image');
const hashtagsInput = uploadImgForm.querySelector('.text__hashtags');

const pristine = new Pristine(uploadImgForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'text--invalid',
  successClass: 'text--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'text--error'
});

const getTagsList = () => hashtagsInput.value.toLowerCase().trim().split(/\s+/);

const validateTag = () => {
  if (hashtagsInput.value === '') {
    return true;
  }

  const hashTagRegexp = /^#[a-zа-яё0-9]{1,19}$/i;
  const tags = getTagsList();
  for (let i = 0; i < tags.length; i++) {
    if (!hashTagRegexp.test(tags[i])) {
      return false;
    }
  }

  return true;
};

const validateUniqueness = () => {
  const tags = getTagsList();
  const uniqueTags = [];
  for (let i = 0; i < tags.length; i++) {
    if (uniqueTags.includes(tags[i])) {
      return false;
    }
    uniqueTags.push(tags[i]);
  }
  return true;
};

const validateLength = () => {
  const tags = getTagsList();
  return tags.length <= TAGS_LIMIT;
};

pristine.addValidator(
  hashtagsInput,
  validateTag,
  'хэштэг должен начинаться c # и содержать только буквы и цифры (от 1 до 19 символов)'
);

pristine.addValidator(
  hashtagsInput,
  validateUniqueness,
  'один и тот же хэш-тег не может быть использован дважды'
);

pristine.addValidator(
  hashtagsInput,
  validateLength,
  'нельзя указать больше пяти хэш-тегов'
);

export {pristine};
