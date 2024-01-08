//import {resetScale} from './scale.js';
//import {resetEffects} from './effects.js';

const Hashtag = {
  MAX_LENGTH: 20,
  MIN_LENGTH: 2,
  MAX_COUNT: 5
};

const VALID_SYMBOLS = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/i;
const TAG_ERROR_TEXT_1 = 'Первым символом должен быть знак #';
const TAG_ERROR_TEXT_2 = 'Минимальная длина хэштега — 2 символа';
const TAG_ERROR_TEXT_3 = 'Максимальная длина хэштега — 20 символов';
const TAG_ERROR_TEXT_4 = 'Использован неверный символ при написании хэштега';
const TAG_ERROR_TEXT_5 = 'Допустимо использование не более 5 хэштегов';
const TAG_ERROR_TEXT_6 = 'Такой хэштег уже использован';

const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const cancelButton = document.querySelector('#upload-cancel');
const uploadFileField = document.querySelector('#upload-file');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const showModal = () => {
  imageUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const hideModal = () => {
  imageUploadForm.reset();
  //resetScale();
  //resetEffects();
  pristine.reset();
  imageUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const isTextFieldFocused = () =>
  document.activeElement === hashtagField ||
  document.activeElement === commentField;

function onDocumentKeydown (evt) {
  if (evt.key === 'Escape' && !isTextFieldFocused()) {
    evt.preventDefault();
    hideModal();
  }
}

const onCancelButtonClick = () => {
  hideModal();
};

const onFileInputChange = () => {
  showModal();
};

const getHashtagsFromString = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return tags;
};

const checkFirstSymbolHashtag = (string) => {
  getHashtagsFromString(string);
  return string[0] === '#';
};

const hasValidMinLength = (string) => {
  getHashtagsFromString(string);
  return string.length >= Hashtag.MIN_LENGTH;
};

const hasValidMaxLength = (string) => {
  getHashtagsFromString(string);
  return string.length <= Hashtag.MAX_LENGTH;
};

const hasValidSymbols = (string) => {
  getHashtagsFromString(string);
  return !VALID_SYMBOLS.test(string.slice(1));
};

const checkHashtagsCount = (tags) => getHashtagsFromString(tags).length <= Hashtag.MAX_COUNT;

const hasUniqueHashtags = (tags) => {
  const lowerCaseTags = getHashtagsFromString(tags).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

pristine.addValidator(
  hashtagField,
  checkFirstSymbolHashtag,
  TAG_ERROR_TEXT_1
);

pristine.addValidator(
  hashtagField,
  hasValidMinLength,
  TAG_ERROR_TEXT_2
);

pristine.addValidator(
  hashtagField,
  hasValidMaxLength,
  TAG_ERROR_TEXT_3
);

pristine.addValidator(
  hashtagField,
  hasValidSymbols,
  TAG_ERROR_TEXT_4
);

pristine.addValidator(
  hashtagField,
  checkHashtagsCount,
  TAG_ERROR_TEXT_5
);

pristine.addValidator(
  hashtagField,
  hasUniqueHashtags,
  TAG_ERROR_TEXT_6
);

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

uploadFileField.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);
imageUploadForm.addEventListener('submit', onFormSubmit);
