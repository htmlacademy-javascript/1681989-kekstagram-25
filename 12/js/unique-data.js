import { getRandomPositiveInteger } from './util.js';

const getUniqueArr = (array) => array.filter((item, index) => array.indexOf(item) === index);

const getUniqueIntegers = (array) => {
  const result = [];

  let repeat = true;
  while (repeat) {
    const foo = getRandomPositiveInteger(0, array.length - 1);
    result.push(foo);
    if (getUniqueArr(result).length === 10) {
      repeat = false;
    }
  }

  return getUniqueArr(result);
};

export {
  getUniqueIntegers,
};
