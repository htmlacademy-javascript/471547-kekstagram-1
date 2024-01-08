import {resetScale} from './scale.js';
import {resetEffects} from './effects.js';

const MAX_HASHTAG_COUNT = 5;
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const VALID_SYMBOLS = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/i;
const TAG_ERROR_TEXT = 'Хэштеги заполнены неверно';

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

const startHashtags = (string) => string[0] === '#';

const hasValidLength = (string) =>
  string.length >= MIN_HASHTAG_LENGTH && string.length <= MAX_HASHTAG_LENGTH;

const hasValidSymbols = (string) => !VALID_SYMBOLS.test(string.slice(1));

const isValidHashtag = (tag) => startHashtags(tag) && hasValidLength(tag) && hasValidSymbols(tag);

const isValidCountHashtags = (tags) => tags.length <= MAX_HASHTAG_COUNT;

const hasUniqueHashtags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateHashgtags = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return isValidCountHashtags(tags) && hasUniqueHashtags(tags) && tags.every(isValidHashtag);
};

pristine.addValidator(
  hashtagField,
  validateHashgtags,
  TAG_ERROR_TEXT
);

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

uploadFileField.addEventListener('input', onFileInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);
imageUploadForm.addEventListener('submit', onFormSubmit);
