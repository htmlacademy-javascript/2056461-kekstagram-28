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
  if (isEscapeKey(evt) && document.activeElement !== inputTag && document.activeElement !== textDescription) {
    evt.preventDefault();
    uploadCancel ();
  }
};

const onButtonClick = () => {
  uploadCancel();
};

const upoloadPicture = () => {
  uploadField.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeyDown);
  uploadCancelButton.addEventListener('click', onButtonClick);
  addFiltersEvent();
};

function uploadCancel() {
  uploadField.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
  uploadCancelButton.removeEventListener('click', onButtonClick);
  removeFiltersEvent();
}

uploadPicInput.addEventListener('change', (evt) => {
  upoloadPicture();
  const selectedFile = evt.target.files[0];
  const fileUrl = URL.createObjectURL(selectedFile);
  uploadPicPreview.src = fileUrl;
});


