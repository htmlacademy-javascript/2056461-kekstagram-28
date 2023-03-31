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

function validateFormat () {
  const hashTagRegexp = /^#[a-zа-яё0-9]{1,19}$/i;
  const tags = hashtagsInput.value.trim().split(' ');
  const uniqueTags = [];
  for (let i = 0; i < tags.length; i++) {
    if (!hashTagRegexp.test(tags[i])) {
      return false;
    }
    if (uniqueTags.includes(tags[i])) {
      return false;
    }
    uniqueTags.push(tags[i]);
  }
  return uniqueTags.length <= 5;
}

pristine.addValidator(
  hashtagsInput,
  validateFormat,
  'хэштэг должен начинаться c # и содержать только буквы и цифры (от 1 до 19 символов)'
);

hashtagsInput.addEventListener('input', () => {
  pristine.validate();
});

uploadImgForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
