
import {
  pictureClose,
  closeImgInfoHandler,
  onClickImgHandler
} from './set-info.js';

import {
  picturesContainer,
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
  hideSuccessMessageClick,
  hideSettingsHandler,
  loadPictureHandler,
  uploadCloseBtn,
  uploadForm,
  uploadInputs,
  hideErrorMessageClick,
} from './validate-form.js';

uploadForm.addEventListener('change', loadPictureHandler);
uploadInputs.forEach((item) => blurInputHandler(item));
uploadForm.addEventListener('submit', checkValidationHandler);
uploadCloseBtn.addEventListener('click', hideSettingsHandler);
pictureClose.addEventListener('click', closeImgInfoHandler);
picturesContainer.addEventListener('click', onClickImgHandler);

btnPlus.addEventListener('click', () => {
  incrementValueHandler(scaleControl.value)();
});

btnMinus.addEventListener('click', () => {
  decrementValueHandler(scaleControl.value)();
});

uploadForm.addEventListener('change', changeEffectHandler);
uploadForm.addEventListener('change', loadLocalPictureHandler);


document.addEventListener('click', hideSuccessMessageClick);
document.addEventListener('click', hideErrorMessageClick);
