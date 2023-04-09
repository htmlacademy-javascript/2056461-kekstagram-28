import {pristine} from './form-validation.js';
import {uploadPicture, uploadCancel} from './image-user-upload.js';
import {submitSuccessTamplate, submitErrorTamplate, alertSubmit} from './submit-modal.js';
import {blockSubmitButton, unblockSubmitButton} from './utils.js';

const uploadImgForm = document.querySelector('#upload-select-image');
const hashtagsInput = uploadImgForm.querySelector('.text__hashtags');

const postForm = (onSuccess) => {
  const submitButton = uploadImgForm.querySelector('.img-upload__submit');

  uploadImgForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (!hashtagsInput.value.trim() || pristine.validate()) {
      blockSubmitButton(submitButton);

      const formData = new FormData(evt.target);
      fetch(
        'https://28.javascript.pages.academy/kekstagram',
        {
          method: 'POST',
          body: formData,
        },
      )
        .then((response) => {
          if (response.ok) {
            onSuccess();
            unblockSubmitButton(submitButton);
            alertSubmit(submitSuccessTamplate);
          } else {
            alertSubmit(submitErrorTamplate, uploadPicture);
          }
        })
        .catch(() => {
          alertSubmit(submitErrorTamplate, uploadPicture);
        });
    }
    pristine.reset();
  });
};

postForm(uploadCancel);

