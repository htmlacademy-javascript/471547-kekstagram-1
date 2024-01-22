const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const scaleContainer = document.querySelector('.scale');
const scaleInputElement = document.querySelector('.scale__control--value');
const imageElement = document.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  scaleInputElement.value = `${value}%`;
  imageElement.style.transform = `scale(${value / 100})`;
};

const changeScale = (evt) => {
  let currentValue = parseInt(scaleInputElement.value, 10);

  if (evt.target.matches('.scale__control--smaller') && currentValue > MIN_SCALE) {
    currentValue = currentValue - MIN_SCALE;
  }
  if (evt.target.matches('.scale__control--bigger') && currentValue < MAX_SCALE) {
    currentValue = currentValue + MIN_SCALE;
  }

  scaleImage(currentValue);
};

const resetScale = () => scaleImage(DEFAULT_SCALE);

const initScale = () => {
  scaleContainer.addEventListener('click', (evt) => {
    changeScale(evt);
  });
};

export {resetScale, initScale};
