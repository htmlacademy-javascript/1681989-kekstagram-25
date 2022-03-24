import { generatedImgData } from './render-img.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureDescr = bigPicture.querySelector('.social__caption');
const bigPictureLikesCount = bigPicture.querySelector('.likes-count');
const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const bigPictureComments = bigPicture.querySelector('.social__comments');


const setImgValues = ({url, description, likes, comments}) => {
  bigPictureImg.src = url;
  bigPictureDescr.textContent = description;
  bigPictureLikesCount.textContent = likes;
  bigPictureCommentsCount.textContent = comments.length;
};

const closeModalHandler = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  bigPictureClose.removeEventListener('click', closeModalHandler);
};

const openModal = () => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPictureClose.addEventListener('click', closeModalHandler);
};

const createCommentTemplate = (comment) => `
  <li class="social__comment">
  <img
      class="social__picture"
      src="${comment.avatar}"
      alt="${comment.name}"
      width="35" height="35">
  <p class="social__text">${comment.message}</p>
  </li>
`;

const renderComments = ({comments}) => {
  bigPictureComments.innerHTML = '';
  const fragment = comments.reduce((acc, comment) => acc + createCommentTemplate(comment), '');
  bigPictureComments.insertAdjacentHTML('afterbegin', fragment);
};

// временная функция (3 пункт дз)
const hideElems = () => {
  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
};

hideElems();

const getInfoImgHandler = (e) => {
  const imgId = e.target.parentElement.dataset.picId;
  const currentPicture = generatedImgData[imgId - 1];
  const isPicture = e.target.classList.contains('picture__img');
  const isPictureInfo = e.target.classList.contains('picture__info');
  const isPictureClose = bigPicture.classList.contains('hidden');

  if (isPicture || isPictureInfo) {
    e.preventDefault();
    setImgValues(currentPicture);
    renderComments(currentPicture);
  } else {
    return;
  }

  return isPictureClose ? openModal() : closeModalHandler();
};

export { bigPictureClose, closeModalHandler, getInfoImgHandler };
