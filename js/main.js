import {
  arrObjData
} from './data.js';
import { bigPictureClose, closeImgInfoHandler, onClickImgHandler } from './download-commnets.js';

import {
  picturesContainer,
  renderImages
} from './render.js';

import {
  blurInputHandler,
  checkValidationHandler,
  hideSettingsHandler,
  loadPictureHandler,
  uploadCloseBtn,
  uploadForm,
  uploadInputs
} from './validate-form.js';


renderImages(arrObjData);

// events
uploadForm.addEventListener('change', loadPictureHandler);
uploadInputs.forEach((item) => blurInputHandler(item));
uploadForm.addEventListener('submit', checkValidationHandler);
uploadCloseBtn.addEventListener('click', hideSettingsHandler);
bigPictureClose.addEventListener('click', closeImgInfoHandler);
picturesContainer.addEventListener('click', onClickImgHandler);

window.addEventListener('keydown', (e) => {
  if (e.code === 'Escape') {
    hideSettingsHandler();
    closeImgInfoHandler();
  }
});
