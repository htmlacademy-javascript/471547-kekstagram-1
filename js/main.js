import {renderGallery} from './gallery.js';
import {initForm} from './form.js';
import {getData} from './api.js';
import {showAlert} from './util.js';

try {
  const data = await getData();
  initForm();
  renderGallery(data);
} catch (err) {
  showAlert(err.message);
}
