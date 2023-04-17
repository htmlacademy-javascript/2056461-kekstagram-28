import {isEscapeKey, unblockSubmitButton} from './utils.js';

const submitSuccessTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const submitErrorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

let modalOpenStatus = false;

const alertSubmit = (template) => {
  const submitAlertElement = template.cloneNode('true');
  const closeButton = submitAlertElement.querySelector('button');
  const submitButton = document.querySelector('#upload-submit');

  const getModalClose = () => {
    submitAlertElement.remove();
    removeListeners();
    unblockSubmitButton(submitButton);
    modalOpenStatus = false;
  };

  const onCloseButtonClick = () => {
    getModalClose();
  };

  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      getModalClose();
    }
  };

  const onDocumentClick = () => {
    getModalClose();
  };

  function removeListeners() {
    closeButton.removeEventListener('click', onCloseButtonClick);
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);
  }

  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);

  document.body.appendChild(submitAlertElement);
  modalOpenStatus = true;
};

export {submitSuccessTemplate, submitErrorTemplate, alertSubmit, modalOpenStatus};
