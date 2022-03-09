const createImgTemplate = (dataList) => {
  const imgItemTemplate = document.querySelector('#picture');
  const fragment = document.createDocumentFragment();
  dataList.forEach(({ url, likes, comments }) => {
    const cloneImgTemplate = imgItemTemplate.content.cloneNode(true);
    cloneImgTemplate.querySelector('.picture__img').src = url;
    cloneImgTemplate.querySelector('.picture__comments').textContent = comments.length;
    cloneImgTemplate.querySelector('.picture__likes').textContent = likes;
    fragment.append(cloneImgTemplate);
  });

  return fragment;
};

export { createImgTemplate };
