import { uploadFile } from './validate-form.js';

const scaleControlImg = document.querySelector('.img-upload__preview img');
const scaleControl = document.querySelector('.scale__control--value');
const btnMinus = document.querySelector('.scale__control--smaller');
const btnPlus = document.querySelector('.scale__control--bigger');
const previewEffects = document.querySelectorAll('.effects__preview');
const sliderWrapper = document.querySelector('.img-upload__effect-level');
const slider = document.querySelector('.effect-level__slider');
const sliderInput = document.querySelector('.effect-level__value');

const loadLocalPictureHandler = (e) => {
  if (e.target === uploadFile) {
    const files = e.target.files;
    const file = files[0];
    const fileReader = new FileReader();
    fileReader.onload = function () {
      const url = fileReader.result;
      scaleControlImg.src = url;
      previewEffects.forEach((item) => {
        item.style.backgroundImage = `url(${url})`;
      });
    };

    fileReader.readAsDataURL(file);
  }
};


const incrementValueHandler = (value) => {
  let counter = parseFloat(value);
  return () => {
    for (let i = 0; i < 25; i++) {
      if (counter >= 100) {
        btnPlus.setAttribute('disabled', '');
        return;
      }
      btnMinus.removeAttribute('disabled', '');
      ++counter;

      const scale = `scale(${parseFloat(counter / 100)}`;
      scaleControlImg.setAttribute('style',
        `-webkit-transform: ${scale});
        transform: ${scale})
        `
      );

      scaleControl.value = `${counter}%`;
    }
  };
};

const decrementValueHandler = (value) => {
  let counter = parseFloat(value);
  return () => {
    for (let i = 0; i < 25; i++) {
      if (counter <= 25) {
        btnMinus.setAttribute('disabled', '');
        return;
      }
      btnPlus.removeAttribute('disabled', '');
      --counter;

      const scale = `scale(${parseFloat(counter / 100)}`;
      scaleControlImg.setAttribute('style',
        `-webkit-transform: ${scale});
        transform: ${scale})
        `
      );

      scaleControl.value =  `${counter}%`;
    }
  };
};

const sliderSettings = {
  start: 1,
  connect: [true, false],
  range: {
    min: 0,
    max: 1,
  },
};

const checkSliderSettings = (value) => {
  switch (value) {
    case 'none':
      sliderWrapper.classList.add('hidden');
      scaleControlImg.style = '';
      break;
    case 'chrome':
    case 'sepia':
      sliderWrapper.classList.remove('hidden');
      sliderSettings.step = 0.1;
      sliderSettings.range= {
        min: 0,
        max: 1,
      };
      break;
    case 'marvin':
      sliderWrapper.classList.remove('hidden');
      sliderSettings.step = 0.01;
      sliderSettings.range= {
        min: 0,
        max: 1,
      };
      break;
    case 'phobos':
      sliderWrapper.classList.remove('hidden');
      sliderSettings.start = 3;
      sliderSettings.step = 0.1;
      sliderSettings.range= {
        min: 0,
        max: 3,
      };
      break;
    case 'heat':
      sliderWrapper.classList.remove('hidden');
      sliderSettings.start = 3;
      sliderSettings.step = 0.1;
      sliderSettings.range= {
        min: 1,
        max: 3,
      };
      break;
  }

  return sliderSettings;
};

const changeEffect = (value) => {
  slider.noUiSlider.on('update', (values) => {
    sliderInput.value = values[0];
    const obj = {
      'chrome': `grayscale(${values[0]})`,
      'sepia': `sepia(${values[0]})`,
      'marvin': `invert(${values[0]})`,
      'phobos': `blur(${values[0]}px)`,
      'heat': `brightness(${values[0]})`,
    };
    scaleControlImg.style.filter = obj[value];
  });
};

const initRangeSlider = (value) => {
  if (!document.querySelector('.noUi-handle')) {
    noUiSlider.create(slider, checkSliderSettings(value));
  } else {
    slider.noUiSlider.destroy();
    noUiSlider.create(slider, checkSliderSettings(value));
  }
};

initRangeSlider('none');

const resetInputValue = () => {
  scaleControl.value = '100%';
  btnMinus.removeAttribute('disabled', '');
  btnPlus.removeAttribute('disabled', '');
};

const changeEffectHandler = (e) => {
  const [...effectsRadios] = document.querySelectorAll('.effects__item input');
  const checkedRadio = effectsRadios.find((item) => item.checked);
  const effectClass = `effects__preview--${checkedRadio.value}`;
  scaleControlImg.setAttribute('class', `${effectClass}`);
  if (e.target.classList.contains('effects__radio')) {
    initRangeSlider(checkedRadio.value);
    resetInputValue();
    changeEffect(checkedRadio.value);
    document.querySelector('.img-upload__preview img').style = 'transform: scale(1)';
  }
};

export {
  btnMinus,
  btnPlus,
  scaleControl,
  changeEffectHandler,
  incrementValueHandler,
  decrementValueHandler,
  loadLocalPictureHandler,
  sliderInput,
};
