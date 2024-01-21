import { showModal } from './form.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const picturePreview = document.querySelector('.img-upload__preview img');
const effectsPreview = document.querySelectorAll('.effects__preview');

const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

const loadPicture = (evt) => {
  const file = evt.target.files[0];

  if (file && isValidType(file)) {
    picturePreview.src = URL.createObjectURL(file);
    effectsPreview.forEach((preview) => {
      preview.style.backgroundImage = `url('${picturePreview.src}')`;
      showModal();
    });
  }
};

export {loadPicture};
