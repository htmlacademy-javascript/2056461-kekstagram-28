import {isEscapeKey} from './utils.js';
import {addFiltersEvent, removeFiltersEvent} from './image-filters.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadField = uploadForm.querySelector('.img-upload__overlay');
const uploadPicInput = uploadForm.querySelector('#upload-file');
const uploadPicPreview = uploadForm.querySelector('.img-upload__preview img');
const uploadCancelButton = uploadForm.querySelector('#upload-cancel');
const inputTag = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');


const onDocumentKeyDown = (evt) => {
  if (isEscapeKey(evt) && ![inputTag, textDescription].includes(document.activeElement)) {
    evt.preventDefault();
    uploadCancel();
  }
};

const onCancelButtonClick = () => {
  uploadCancel();
};

const toggleUploadField = () => {
  uploadField.classList.toggle('hidden');
  document.body.classList.toggle('modal-open');
};

const addEventListeners = () => {
  document.addEventListener('keydown', onDocumentKeyDown);
  uploadCancelButton.addEventListener('click', onCancelButtonClick);
};

const removeEventListeners = () => {
  document.removeEventListener('keydown', onDocumentKeyDown);
  uploadCancelButton.removeEventListener('click', onCancelButtonClick);
  removeFiltersEvent();
  uploadPicInput.value = '';
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
  const fileUrl = URL.createObjectURL(selectedFile);
  uploadPicPreview.src = fileUrl;
});

export {uploadPicture, uploadCancel};
