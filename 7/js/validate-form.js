import { checkStrLength } from './util.js';

const regExp = new RegExp(/^#(?=.*[^0-9])[a-zа-яё0-9]{1,19}$/i);
const uploadForm = document.querySelector('.img-upload__form');
const uploadHashTags = uploadForm.querySelector('.text__hashtags');
const uploadTextArea = uploadForm.querySelector('.text__description');
const uploadFile = uploadForm.querySelector('#upload-file');

const uploadConfig = {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'div',
};

const pristineForm = new Pristine(uploadForm, uploadConfig);

const validateHashTags = (value) => {
  const arrHashTags = value.split(' ').map((item) => item.toLowerCase());
  const wrongValues = arrHashTags.filter((item) => !regExp.test(item));
  const doubleValues = arrHashTags.filter((item, index, array) => array.indexOf(item) !== index);
  const moreThanFive = arrHashTags.length > 5;

  if (value === '') {
    return true;
  }

  if (wrongValues.length || moreThanFive || doubleValues.length) {
    return false;
  }

  return true;
};

const validateComment = (value) => {
  if (!checkStrLength(value, 140)) {
    return false;
  }

  return true;
};

const detectFileExtention = (value) => {
  let extention = '';
  for (let i = value.length; i--;) {
    if (value[i] === '.') {
      break;
    }

    extention += value[i];
  }

  return extention.split('').reverse().join('');
};

const validateContentFile = (value) => {
  const fileExtention = detectFileExtention(value);
  const correctValues = ['svg', 'jpg', 'png', 'webp'];
  return correctValues.some((ext) => (fileExtention).toLowerCase() === ext.toLowerCase());
};

pristineForm.addValidator(uploadHashTags, validateHashTags, 'некорректный хэштэг', 2, false);
pristineForm.addValidator(uploadTextArea, validateComment, 'слишком длинный комментарий', 2, false);
pristineForm.addValidator(uploadFile, validateContentFile, 'выбран некорректный файл', 2, false);

const checkValidationHandler = (e) => {
  if (!pristineForm.validate()) {
    e.preventDefault();
    document.querySelector('.pristine-error').style.display = 'block';
  }
};

uploadForm.addEventListener('submit', checkValidationHandler);


export { uploadForm, uploadHashTags, uploadTextArea, uploadFile };
