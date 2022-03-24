import {
  bigPictureClose,
  closeModalHandler,
  onGetInfoAboutImg
} from './openInfoImg.js';
import {
  imgContainer
} from './render-img.js';
import {
  checkStrLength,
} from './util.js';

bigPictureClose.addEventListener('click', closeModalHandler);
imgContainer.addEventListener('click', onGetInfoAboutImg);

window.addEventListener('keydown', (e) => {
  if (e.code === 'Escape') {
    closeModalHandler();
  }
});

// homework
// classTo: 'text__wrapper',
// errorTextParent: 'text__wrapper',
// errorTextTag: 'div',
// errorTextClass: 'text-help'
const regExp = new RegExp(/^#(?=.*[^0-9])[a-zа-яё0-9]{1,19}$/i);
const uploadForm = document.querySelector('.img-upload__form');
const uploadHasTags = uploadForm.querySelector('.text__hashtags');
const uploadTextArea = uploadForm.querySelector('.text__description');
const uploadSubmit = uploadForm.querySelector('.img-upload__submit');
const uploadFieldset = document.querySelector('.img-upload__text');

function createConfigTemplate(classTo, errorTextParent, errorTextTag, errorTextClass) {
  return {
    classTo,
    errorTextParent,
    errorTextTag,
    errorTextClass,
  };
}

const hasTagsConfig = createConfigTemplate('text', 'text', 'div', 'text-help');
const textAreaConfig = createConfigTemplate('text', 'text', 'div', 'text-help');

const pristineHasTags = new Pristine(uploadForm, hasTagsConfig);
const pristineTextArea = new Pristine(uploadForm, textAreaConfig);


// validation
function validateUploadTags(value) {
  const arrHashTags = value.split(' ').map((item) => item.toLowerCase());
  const invalidTags = arrHashTags.filter((item) => !regExp.test(item));
  const doubleHashTags = arrHashTags.filter((item, index, arr) => arr.indexOf(item) !== index);
  const moreThanFive = arrHashTags.length > 5;

  if (value === '') {
    return true;
  }

  if (invalidTags.length || doubleHashTags.length || moreThanFive) {
    return false;
  }
  return true;
}

function validateUploadComment(value) {
  if (checkStrLength(value, 140)) {
    return true;
  }
  return false;
}

pristineTextArea.addValidator(
  uploadTextArea,
  validateUploadComment,
  'слишком длинный комментарий',
  2,
  false
);

pristineHasTags.addValidator(
  uploadHasTags,
  validateUploadTags,
  'некорректный хэштэг',
  2,
  false
);


// add function
function removeFocusInput(e, arr) {
  if (e.code === 'Escape') {
    e.stopPropagation();
    arr.forEach((input) => input.blur());
  }
}

function removeFousHandler(e) {
  const arrOfInputs = [uploadHasTags, uploadTextArea];
  removeFocusInput(e, arrOfInputs);
}

window.addEventListener('keydown', removeFousHandler);
