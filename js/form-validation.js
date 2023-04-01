const uploadImgForm = document.querySelector('#upload-select-image');
const hashtagsInput = uploadImgForm.querySelector('.text__hashtags');

const TAGS_LIMIT = 5;

const pristine = new Pristine(uploadImgForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'text--invalid',
  successClass: 'text--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'text--error'
});

const validateTag = () => {
  const hashTagRegexp = /^#[a-zа-яё0-9]{1,19}$/i;
  const tags = hashtagsInput.value.toLowerCase().trim().split(' ');
  for (let i = 0; i < tags.length; i++) {
    if (!hashTagRegexp.test(tags[i])) {
      return false;
    }
  }
  return true;
};

const validateUniqnes = () => {
  const tags = hashtagsInput.value.toLowerCase().trim().split(' ');
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
  const tags = hashtagsInput.value.toLowerCase().trim().split(' ');
  return tags.length <= TAGS_LIMIT;
};

pristine.addValidator(
  hashtagsInput,
  validateTag,
  'хэштэг должен начинаться c # и содержать только буквы и цифры (от 1 до 19 символов)'
);

pristine.addValidator(
  hashtagsInput,
  validateUniqnes,
  'один и тот же хэш-тег не может быть использован дважды'
);

pristine.addValidator(
  hashtagsInput,
  validateLength,
  'нельзя указать больше пяти хэш-тегов'
);

hashtagsInput.addEventListener('input', () => {
  if (hashtagsInput.value.length > 0) {
    pristine.validate();
  } else {
    pristine.reset();
  }
});

uploadImgForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    uploadImgForm.submit();
  }
});
