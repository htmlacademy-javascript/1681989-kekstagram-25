const getRandomInteger = (min = 0, max = 1) => {
  min = +min;
  max = +max;
  const isWrongRange = min >= max || min < 0 || max < 0 || isNaN(min) || isNaN(max);

  if (isWrongRange) {
    return 'Неверно передан диапазон значений';
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
};

getRandomInteger(0, 3);

const checkStrLength = (string = '', maxLength = 10) => {
  string = string.toString();
  const isLong = string.length <= maxLength;
  return isLong;
};

checkStrLength('some value', 11);
