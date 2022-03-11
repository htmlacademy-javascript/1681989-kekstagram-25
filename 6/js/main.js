import { bigPictureClose, closeModal, getInfoAboutImg } from './openInfoImg.js';
import { imgContainer } from './render-img.js';

bigPictureClose.addEventListener('click', closeModal);
imgContainer.addEventListener('click', getInfoAboutImg);

window.addEventListener('keydown', (e) => {
  if (e.code === 'Escape') {
    closeModal();
  }
});
