import {pristine} from './form-validation.js';
import {postUserData} from './server.js';
import {uploadPicPreview, resetForm, uploadCancel} from './image-user-upload.js';
import {submitSuccessTemplate, submitErrorTemplate, alertSubmit} from './submit-modal.js';
import {blockSubmitButton, unblockSubmitButton} from './utils.js';

const KEKSTAGRAM_POST = 'https://28.javascript.pages.academy/kekstagram';
const uploadImgForm = document.querySelector('#upload-select-image');
const hashtagsInput = uploadImgForm.querySelector('.text__hashtags');
const submitButton = uploadImgForm.querySelector('.img-upload__submit');

const uploadSuccess = () => {
  uploadCancel();
  unblockSubmitButton(submitButton);
  alertSubmit(submitSuccessTemplate);
  resetForm();
  uploadPicPreview.style.transform = 'scale(1)';
  uploadPicPreview.src = '';
};

const uploadFail = () => {
  alertSubmit(submitErrorTemplate);
};

const postForm = () => {
  uploadImgForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (!hashtagsInput.value.trim() || pristine.validate()) {
      blockSubmitButton(submitButton);

      const formData = new FormData(evt.target);
      postUserData(uploadSuccess, uploadFail, formData, KEKSTAGRAM_POST);
    }
  });
};

postForm();
