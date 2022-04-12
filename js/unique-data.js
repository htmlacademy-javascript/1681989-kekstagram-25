import { getRandomPositiveInteger } from './util.js';

const getUniqueArr = (array) => array.filter((item, index) => array.indexOf(item) === index);

const getUniqueIntegers = (array) => {
  const arrayItems = [];

  let repeat = true;
  while (repeat) {
    const foo = getRandomPositiveInteger(0, array.length - 1);
    arrayItems.push(foo);
    if (getUniqueArr(arrayItems).length === 10) {
      repeat = false;
    }
  }

  return getUniqueArr(arrayItems);
};

export {
  getUniqueIntegers,
};
