import {initScale, resetScale} from './scale.js';
import {initEffects, resetEffects} from './effects.js';
import {sendData} from './api.js';
import {showSuccessMessage, showErrorMessage} from './messages.js';
import {loadPicture} from './upload-picture.js';

const Hashtag = {
  MAX_LENGTH: 20,
  MIN_LENGTH: 2,
  MAX_COUNT: 5,
};

const VALID_SYMBOLS = /^[A-Za-zА-Яа-яЁё0-9]{1,19}$/i;

const TagError = {
  FIRST_SYMBOL_CHECK: 'Первым символом должен быть знак #',
  MIN_LENGTH_CHECK: 'Минимальная длина хэштега — 2 символа',
  MAX_LENGTH_CHECK: 'Максимальная длина хэштега — 20 символов',
  VALID_SYMBOLS_CHECK: 'Использован неверный символ при написании хэштега',
  HASHTAGS_COUNT_CHECK: 'Допустимо использование не более 5 хэштегов',
  UNIQUE_HASHTAG_CHECK: 'Такой хэштег уже использован',
};

const SubmitButtonText = {
  DEFAULT: 'Опубликовать',
  SENDING: 'Публикую',
};

const imageUploadFormElement = document.querySelector('.img-upload__form');
const imageUploadOverlayElement = document.querySelector('.img-upload__overlay');
const bodyElement = document.querySelector('body');
const cancelButtonElement = document.querySelector('#upload-cancel');
const uploadFileFieldElement = document.querySelector('#upload-file');
const hashtagFieldElement = document.querySelector('.text__hashtags');
const commentFieldElement = document.querySelector('.text__description');
const submitButtonElement = document.querySelector('.img-upload__submit');

const pristine = new Pristine(imageUploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const showModal = () => {
  imageUploadOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const hideModal = () => {
  imageUploadFormElement.reset();
  resetScale();
  resetEffects();
  pristine.reset();
  imageUploadOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const isTextFieldFocused = () =>
  document.activeElement === hashtagFieldElement ||
  document.activeElement === commentFieldElement;

function onDocumentKeydown (evt) {
  const errorCloseButtonElement = document.querySelector('.error__button');
  if (evt.key === 'Escape' && !isTextFieldFocused() && !errorCloseButtonElement) {
    evt.preventDefault();
    hideModal();
  }
}

const onCancelButtonClick = () => {
  hideModal();
};

const onFileInputChange = (evt) => {
  loadPicture(evt);
};

const getHashtagsFromString = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return tags;
};

const checkFirstSymbolHashtag = (string) => {
  const hashtags = getHashtagsFromString(string);
  return hashtags.every((tag) => tag[0] === '#');
};

const hasValidMinLength = (string) => {
  const hashtags = getHashtagsFromString(string);
  return hashtags.every((tag) => tag.length >= Hashtag.MIN_LENGTH);
};

const hasValidMaxLength = (string) => {
  const hashtags = getHashtagsFromString(string);
  return hashtags.every((tag) => tag.length <= Hashtag.MAX_LENGTH);
};

const hasValidSymbols = (string) => {
  const hashtags = getHashtagsFromString(string);
  return hashtags.every((tag) => VALID_SYMBOLS.test(tag.slice(1)));
};

const checkHashtagsCount = (tags) => getHashtagsFromString(tags).length <= Hashtag.MAX_COUNT;

const hasUniqueHashtags = (tags) => {
  const lowerCaseTags = getHashtagsFromString(tags).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

pristine.addValidator(
  hashtagFieldElement,
  checkFirstSymbolHashtag,
  TagError.FIRST_SYMBOL_CHECK,
  6,
  true
);

pristine.addValidator(
  hashtagFieldElement,
  hasValidMinLength,
  TagError.MIN_LENGTH_CHECK,
  5,
  true
);

pristine.addValidator(
  hashtagFieldElement,
  hasValidMaxLength,
  TagError.MAX_LENGTH_CHECK,
  4,
  true
);

pristine.addValidator(
  hashtagFieldElement,
  hasValidSymbols,
  TagError.VALID_SYMBOLS_CHECK,
  3,
  true
);

pristine.addValidator(
  hashtagFieldElement,
  checkHashtagsCount,
  TagError.HASHTAGS_COUNT_CHECK,
  2,
  true
);

pristine.addValidator(
  hashtagFieldElement,
  hasUniqueHashtags,
  TagError.UNIQUE_HASHTAG_CHECK,
  1,
  true
);

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = SubmitButtonText.DEFAULT;
};

const onFormSubmit = (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    sendData(new FormData(evt.target))
      .then(() => {
        hideModal();
        showSuccessMessage();
      })
      .catch(() => {
        showErrorMessage();
      })
      .finally(unblockSubmitButton);
  }
};

const initForm = () => {
  initScale();
  initEffects();
  uploadFileFieldElement.addEventListener('change', onFileInputChange);
  cancelButtonElement.addEventListener('click', onCancelButtonClick);
  imageUploadFormElement.addEventListener('submit', onFormSubmit);
};

export {hideModal, initForm, showModal};
