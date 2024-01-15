import {ALERT_SHOW_TIME, isEscapeKey} from './util.js';

const errorContainerTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
const successContainerTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const showErrorMessage = () => {
  const errorElement = errorContainerTemplate.cloneNode(true);
  const errorCloseButton = errorElement.querySelector('.error__button');
  document.body.append(errorElement);
  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeErrorMessage();
    }
  };

  const onDocumentClick = (evt) => {
    if (!errorElement.querySelector('.error__inner').contains(evt.target)) {
      evt.preventDefault();
      closeErrorMessage();
    }
  };

  function closeErrorMessage() {
    errorElement.remove();
    errorCloseButton.removeEventListener('click', closeErrorMessage);
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);
  }

  errorCloseButton.addEventListener('click', closeErrorMessage);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
  setTimeout(() => {
    errorElement.remove();
  }, ALERT_SHOW_TIME);
};

const showSuccessMessage = () => {
  const successContainer = successContainerTemplate.cloneNode(true);
  document.body.append(successContainer);
  const successCloseButton = successContainer.querySelector('.success__button');
  const onDocumentClick = (evt) => {
    if (!successContainer.querySelector('.success__inner').contains(evt.target)) {
      evt.preventDefault();
      closeSuccessMessage();
    }
  };

  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeSuccessMessage();
    }
  };

  function closeSuccessMessage() {
    successContainer.remove();
    successCloseButton.removeEventListener('click', closeSuccessMessage);
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);
  }

  successCloseButton.addEventListener('click', closeSuccessMessage);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);

  setTimeout(() => {
    successContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {showErrorMessage, showSuccessMessage};
