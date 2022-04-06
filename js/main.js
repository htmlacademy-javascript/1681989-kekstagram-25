import {
  arrObjData
} from './data.js';
import {
  bigPictureClose,
  closeImgInfoHandler,
  onClickImgHandler
} from './download-commnets.js';

import {
  picturesContainer,
  renderImages
} from './render.js';

import {
  btnMinus,
  btnPlus,
  changeEffectHandler,
  decrementValueHandler,
  incrementValueHandler,
  loadLocalPictureHandler,
  scaleControl
} from './slider-effects.js';

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

btnPlus.addEventListener('click', () => {
  incrementValueHandler(scaleControl.value)();
});

btnMinus.addEventListener('click', () => {
  decrementValueHandler(scaleControl.value)();
});

uploadForm.addEventListener('change', changeEffectHandler);
uploadForm.addEventListener('change', loadLocalPictureHandler);


window.addEventListener('keydown', (e) => {
  if (e.code === 'Escape') {
    hideSettingsHandler();
    closeImgInfoHandler();
  }
});

