const createImgTemplate = (dataList) => {
  const imgItemTemplate = document.querySelector('#picture');
  const fragment = document.createDocumentFragment();
  dataList.forEach(({ url, likes, comments, id }) => {
    const cloneImgTemplate = imgItemTemplate.content.cloneNode(true);
    const pictureImg = cloneImgTemplate.querySelector('.picture__img');
    pictureImg.src = url;
    pictureImg.parentElement.setAttribute('data-pic-id', id);
    cloneImgTemplate.querySelector('.picture__comments').textContent = comments.length;
    cloneImgTemplate.querySelector('.picture__likes').textContent = likes;
    fragment.append(cloneImgTemplate);
  });

  return fragment;
};

export { createImgTemplate };
