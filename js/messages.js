import {ALERT_DELAY, isEscapeKey} from './util.js';

const errorElementTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const successElementTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const showErrorMessage = () => {
  const errorElement = errorElementTemplate.cloneNode(true);
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
  }, ALERT_DELAY);
};

const showSuccessMessage = () => {
  const successContainerElement = successElementTemplate.cloneNode(true);
  document.body.append(successContainerElement);
  const successCloseButton = successContainerElement.querySelector('.success__button');
  const onDocumentClick = (evt) => {
    if (!successContainerElement.querySelector('.success__inner').contains(evt.target)) {
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
    successContainerElement.remove();
    successCloseButton.removeEventListener('click', closeSuccessMessage);
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);
  }

  successCloseButton.addEventListener('click', closeSuccessMessage);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);

  setTimeout(() => {
    successContainerElement.remove();
  }, ALERT_DELAY);
};

export {showErrorMessage, showSuccessMessage};
