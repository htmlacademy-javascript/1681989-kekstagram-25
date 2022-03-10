import { makeComments } from './data.js';
import { closeModal, openModal } from './toggle-modal.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialCommentsCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const btnClose = bigPicture.querySelector('.big-picture__cancel');

const setImgValues = (obj) => {
  bigPictureImg.src = obj.url;
  bigPictureImg.alt = obj.description;
  likesCount.textContent = obj.likes;
  commentsCount.textContent = obj.comments.length;
  socialCaption.textContent = obj.description;
};

const createCommentTemplate = ({avatar, name, message}) =>
  `
  <li class="social__comment">
    <img
      class="social__picture"
      src="${avatar}"
      alt="${name}"
      width="35" height="35">
    <p class="social__text">${message}</p>
  </li>`;

const generateComments = (comments) => {
  if (!comments.length) {
    return 'Нет комментариев';
  }
  const commentsContainer = document.querySelector('.social__comments');
  commentsContainer.innerHTML = '';
  const fragment = comments.reduce((acc, comment) => acc + createCommentTemplate(comment), '');
  commentsContainer.insertAdjacentHTML('afterbegin', fragment);
};

const openInfoImg = ({ target }, dataList) => {
  const parentTarget = target.parentElement;
  const parentId = parentTarget.dataset.picId;
  const currentPictureObj = dataList[parentId - 1];
  const arrayComments = makeComments(currentPictureObj.comments.length);
  const isClosePicture = target.classList.contains('picture__img') && bigPicture.classList.contains('hidden');

  if (isClosePicture) {
    setImgValues(currentPictureObj);
    generateComments(arrayComments);
    openModal();
  }
};

const modifyModal = () => {
  window.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') {
      closeModal();
    }
  });
};

const hideElems = () => {
  socialCommentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
};

hideElems();
modifyModal();


export { openInfoImg, btnClose, bigPicture };
