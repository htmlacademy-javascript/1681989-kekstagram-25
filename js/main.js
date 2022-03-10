import { generateArr } from './data.js';
import { renderImages, imgContainer} from './render-img-1.js';
import { openInfoImg, btnClose } from './info-modal.js';
import { closeModal } from './toggle-modal.js';


const generatedImgData = generateArr(25);

renderImages(generatedImgData);

imgContainer.addEventListener('click', (e) => {
  e.preventDefault();
  openInfoImg(e, generatedImgData);
});

btnClose.addEventListener('click', closeModal);
