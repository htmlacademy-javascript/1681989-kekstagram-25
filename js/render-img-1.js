import { createImgTemplate } from './img-template.js';

const imgContainer = document.querySelector('.pictures');

const renderImages = (dataList) => {
  if (!dataList.length) {
    return;
  }

  const generatedImgTemplate = createImgTemplate(dataList);
  imgContainer.append(generatedImgTemplate);
};

export { renderImages };
