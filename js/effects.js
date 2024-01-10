const EFFECTS = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
];

const DEFAULT_EFFECT = EFFECTS[0];
let chosenEffect = DEFAULT_EFFECT;

const imageElement = document.querySelector('.img-upload__preview img');
const effectsElement = document.querySelector('.effects');
const sliderElement = document.querySelector('.effect-level__slider');
const chooseEffectValue = document.querySelector('.img-upload__effect-level');
const effectLevelElement = document.querySelector('.effect-level__value');
const formElement = document.querySelector('.img-upload__form');

const isDefault = () => chosenEffect === DEFAULT_EFFECT;

const showSlider = () => {
  chooseEffectValue.classList.remove('hidden');
};

const hideSlider = () => {
  chooseEffectValue.classList.add('hidden');
};

const onSliderUpdate = () => {
  if (isDefault()) {
    imageElement.className = '';
    effectLevelElement.value = '';
    imageElement.style.filter = 'none';
    return;
  }
  const sliderValue = sliderElement.noUiSlider.get();
  imageElement.style.filter = `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
  imageElement.classList.add(`effects__preview--${chosenEffect.name}`);
  effectLevelElement.value = sliderValue;
};

const updateSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start: chosenEffect.max,
  });
  if(isDefault()) {
    hideSlider();
    return;
  }
  showSlider();
};

const onEffectsChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  chosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  imageElement.className = `effects__preview--${chosenEffect.name}`;
  updateSlider(chosenEffect);
};

const resetEffects = () => {
  chosenEffect = DEFAULT_EFFECT;
  chooseEffectValue.classList.add('hidden');
  updateSlider();
};

const createSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: DEFAULT_EFFECT.min,
      max: DEFAULT_EFFECT.max
    },
    start: DEFAULT_EFFECT.max,
    step: DEFAULT_EFFECT.step,
    connect: 'lower'
  });
  hideSlider();
};

const initEffects = () => {
  createSlider();
  formElement.addEventListener('change', onEffectsChange);
  effectsElement.addEventListener('change', onEffectsChange);
  sliderElement.noUiSlider.on('update', onSliderUpdate);
};

export {initEffects, resetEffects};
