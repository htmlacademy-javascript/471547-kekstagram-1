import {showModal} from './form.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const picturePreviewElement = document.querySelector('.img-upload__preview img');
const effectsPreviewElement = document.querySelectorAll('.effects__preview');

const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

const loadPicture = (evt) => {
  const file = evt.target.files[0];

  if (file && isValidType(file)) {
    picturePreviewElement.src = URL.createObjectURL(file);
    effectsPreviewElement.forEach((preview) => {
      preview.style.backgroundImage = `url('${picturePreviewElement.src}')`;
      showModal();
    });
  }
};

export {loadPicture};
