import {isEscapeKey} from './utils.js';
import {pristine} from './form-validation.js';
import {addFiltersEvent, removeFiltersEvent} from './image-filters.js';
import {modalOpenStatus} from './submit-modal.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const uploadImgForm = document.querySelector('#upload-select-image');
const uploadForm = document.querySelector('.img-upload__form');
const uploadField = uploadForm.querySelector('.img-upload__overlay');
const uploadPicInput = uploadForm.querySelector('#upload-file');
const uploadPicPreview = uploadForm.querySelector('.img-upload__preview img');
const uploadCancelButton = uploadForm.querySelector('#upload-cancel');
const inputTag = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

const resetForm = () => {
  uploadImgForm.reset();
  pristine.reset();
};

const toggleUploadField = () => {
  uploadField.classList.toggle('hidden');
  document.body.classList.toggle('modal-open');
};

const onDocumentKeyDown = (evt) => {
  if (isEscapeKey(evt) && ![inputTag, textDescription].includes(document.activeElement)) {
    evt.preventDefault();
    if (!modalOpenStatus) {
      resetForm();
      uploadCancel();
      uploadPicPreview.style.transform = 'scale(1)';
      uploadPicPreview.src = '';
    }
  }
};

const onCancelButtonClick = () => {
  uploadCancel();
  resetForm();
};

const addEventListeners = () => {
  document.addEventListener('keydown', onDocumentKeyDown);
  uploadCancelButton.addEventListener('click', onCancelButtonClick);
};

const removeEventListeners = () => {
  document.removeEventListener('keydown', onDocumentKeyDown);
  uploadCancelButton.removeEventListener('click', onCancelButtonClick);
  removeFiltersEvent();
};

const uploadPicture = () => {
  toggleUploadField();
  addEventListeners();
  addFiltersEvent();
};

function uploadCancel() {
  toggleUploadField();
  removeEventListeners();
}

uploadPicInput.addEventListener('change', (evt) => {
  uploadPicture();
  const selectedFile = evt.target.files[0];
  const fileName = selectedFile.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    uploadPicPreview.src = URL.createObjectURL(selectedFile);
  }
});

export {uploadPicPreview, uploadCancel, resetForm};
