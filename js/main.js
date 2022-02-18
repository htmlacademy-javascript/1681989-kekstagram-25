function getRandomInteger(min = 0, max = 1) {
  min = +min;
  max = +max;
  const isWrongRange = min >= max || min < 0 || max < 0 || isNaN(min) || isNaN(max);

  if (isWrongRange) {
    return 'Неверно передан диапазон значений';
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
}

getRandomInteger(0, 3);

function checkStrLength (string = '', maxLength = 10) {
  string = string.toString();
  if (string.length > maxLength) {
    return false;
  }

  return true;
}

checkStrLength('some value', 10);
