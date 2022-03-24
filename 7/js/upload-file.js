import {
  uploadForm,
  uploadHashTags,
  uploadTextArea,
  uploadFile,
} from './validate-form.js';

const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadCloseBtn = uploadForm.querySelector('.img-upload__cancel');
const uploadInputs = [uploadHashTags, uploadTextArea];

const blurInputHandler = (item) => {
  item.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') {
      e.stopPropagation();
      item.blur();
    }
  });
};

const hideSettingsHandler = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadFile.value = '';
};

const showPictureSettings = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const loadPictureHandler = (e) => {
  e.preventDefault();
  showPictureSettings();
};

export {
  uploadCloseBtn,
  uploadInputs,
  hideSettingsHandler,
  loadPictureHandler,
  blurInputHandler,
};
