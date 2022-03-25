const getRandomInteger = (min = 0, max = 1) => {
  min = +min;
  max = +max;
  const isWrongRange = min >= max || min < 0 || max < 0 || isNaN(min) || isNaN(max);
  const randomInteger = Math.floor(Math.random() * (max - min + 1) + min);
  return isWrongRange ? 'Неверно передан диапазон значений' : randomInteger;
};

const checkStrLength = (string = '', maxLength = 10) => {
  string = string.toString();
  const isLongLength = string.length <= maxLength;
  return isLongLength;
};

checkStrLength();

export { getRandomInteger, checkStrLength };
