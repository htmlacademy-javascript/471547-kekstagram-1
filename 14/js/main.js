import {renderGallery} from './gallery.js';
import {hideModal, setOnFormSubmit} from './form.js';
import {getData, sendData} from './api.js';
import {showErrorMessage, showSuccessMessage} from './popup-message.js';
import {showAlert} from './util.js';

setOnFormSubmit(async (data) => {
  try {
    await sendData(data);
    hideModal();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

try {
  const data = await getData();
  renderGallery(data);
} catch (err) {
  showAlert(err.message);
}
