import {initScale, resetScale} from './scale.js';
import {initEffects, resetEffects} from './effects.js';
import {sendData} from './api.js';
import {showSuccessMessage, showErrorMessage} from './messages.js';

const Hashtag = {
  MAX_LENGTH: 20,
  MIN_LENGTH: 2,
  MAX_COUNT: 5
};

const VALID_SYMBOLS = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/i;
const TagError = {
  FIRST_SYMBOL_CHECK: 'Первым символом должен быть знак #',
  MIN_LENGTH_CHECK: 'Минимальная длина хэштега — 2 символа',
  MAX_LENGTH_CHECK: 'Максимальная длина хэштега — 20 символов',
  VALID_SYMBOLS_CHECK: 'Использован неверный символ при написании хэштега',
  HASHTAGS_COUNT_CHECK: 'Допустимо использование не более 5 хэштегов',
  UNIQUE_HASHTAG_CHECK: 'Такой хэштег уже использован'
};

const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const cancelButton = document.querySelector('#upload-cancel');
const uploadFileField = document.querySelector('#upload-file');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');

const SubmitButtonText = {
  DEFAULT: 'Опубликовать',
  SENDING: 'Публикую'
};

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
  resetScale();
  resetEffects();
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
  TagError.FIRST_SYMBOL_CHECK,
  6,
  true
);

pristine.addValidator(
  hashtagField,
  hasValidMinLength,
  TagError.MIN_LENGTH_CHECK,
  5,
  true
);

pristine.addValidator(
  hashtagField,
  hasValidMaxLength,
  TagError.MAX_LENGTH_CHECK,
  4,
  true
);

pristine.addValidator(
  hashtagField,
  hasValidSymbols,
  TagError.VALID_SYMBOLS_CHECK,
  3,
  true
);

pristine.addValidator(
  hashtagField,
  checkHashtagsCount,
  TagError.HASHTAGS_COUNT_CHECK,
  2,
  true
);

pristine.addValidator(
  hashtagField,
  hasUniqueHashtags,
  TagError.UNIQUE_HASHTAG_CHECK,
  1,
  true
);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.DEFAULT;
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
  uploadFileField.addEventListener('change', onFileInputChange);
  cancelButton.addEventListener('click', onCancelButtonClick);
  imageUploadForm.addEventListener('submit', onFormSubmit);
};

export {hideModal, initForm};
