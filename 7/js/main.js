import {
  bigPictureClose,
  closeModalHandler,
  getInfoImgHandler
} from './openInfoImg.js';

import {
  imgContainer
} from './render-img.js';

import {
  uploadCloseBtn,
  uploadInputs,
  hideSettingsHandler,
  loadPictureHandler,
  blurInputHandler,
} from './upload-file.js';

import {
  uploadForm,
} from './validate-form.js';


bigPictureClose.addEventListener('click', closeModalHandler);
imgContainer.addEventListener('click', getInfoImgHandler);
uploadCloseBtn.addEventListener('click', hideSettingsHandler);
uploadForm.addEventListener('change', loadPictureHandler);
uploadInputs.forEach((item) => blurInputHandler(item));

window.addEventListener('keydown', (e) => {
  if (e.code === 'Escape') {
    closeModalHandler();
    hideSettingsHandler();
  }
});

