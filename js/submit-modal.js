import {isEscapeKey, unblockSubmitButton} from './utils.js';

const submitSuccessTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const submitErrorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const alertSubmit = (tamplate, onError) => {
  const submitAllertElement = tamplate.cloneNode('true');
  const closeButton = submitAllertElement.querySelector('button');
  const submitButton = document.querySelector('#upload-submit');

  const onCloseButtonClick = () => {
    submitAllertElement.remove();
    removeListeners();
    unblockSubmitButton(submitButton);
  };

  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      submitAllertElement.remove();
      removeListeners();
      onError();
      unblockSubmitButton(submitButton);
    }
  };

  const onDocumentClick = () => {
    submitAllertElement.remove();
    removeListeners();
    unblockSubmitButton(submitButton);
  };

  function removeListeners() {
    closeButton.removeEventListener('click', onCloseButtonClick);
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);
  }

  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);

  document.body.appendChild(submitAllertElement);
};

export {submitSuccessTemplate, submitErrorTemplate, alertSubmit};
