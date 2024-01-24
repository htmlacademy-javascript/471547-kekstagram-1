const Scale = {
  STEP: 25,
  MIN: 25,
  MAX: 100,
  DEFAULT: 100,
};

const scaleContainerElement = document.querySelector('.scale');
const scaleInputElement = document.querySelector('.scale__control--value');
const imageElement = document.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  scaleInputElement.value = `${value}%`;
  imageElement.style.transform = `scale(${value / 100})`;
};

const changeScale = (evt) => {
  let currentValue = parseInt(scaleInputElement.value, 10);

  if (evt.target.matches('.scale__control--smaller') && currentValue > Scale.MIN) {
    currentValue = currentValue - Scale.STEP;
  }
  if (evt.target.matches('.scale__control--bigger') && currentValue < Scale.MAX) {
    currentValue = currentValue + Scale.STEP;
  }

  scaleImage(currentValue);
};

const resetScale = () => scaleImage(Scale.DEFAULT);

const initScale = () => {
  scaleContainerElement.addEventListener('click', (evt) => {
    changeScale(evt);
  });
};

export {resetScale, initScale};
