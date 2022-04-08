import {
  bigPicture,
  bigPictureClose,
  closeImgInfoHandler,
  onClickImgHandler
} from './download-commnets.js';

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
  hideSuccessMessage,
  hideSuccessMessageClick,
  hideSettingsHandler,
  loadPictureHandler,
  successWrapper,
  uploadCloseBtn,
  uploadForm,
  uploadInputs,
  uploadOverlay,
  hideErrorMessageClick,
  errorWrapper,
  hideErrorMessage
} from './validate-form.js';


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

const closeModalEsc = (e) => {
  if (e.code === 'Escape') {
    if (!uploadOverlay.classList.contains('hidden')) {
      hideSettingsHandler();
    }

    if (!bigPicture.classList.contains('hidden')) {
      closeImgInfoHandler();
    }

    if (!successWrapper.classList.contains('hidden')) {
      hideSuccessMessage();
    }

    if (!errorWrapper.classList.contains('hidden')) {
      hideErrorMessage();
    }
  }
};

document.addEventListener('click', hideSuccessMessageClick);
document.addEventListener('click', hideErrorMessageClick);
window.addEventListener('keydown', closeModalEsc);


