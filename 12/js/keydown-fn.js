import { closeImgInfoHandler } from './set-info.js';
import { hideErrorMessage, hideSettingsHandler, hideSuccessMessage } from './validate-form.js';

const hideSuccessKey = (e) => {
  if (e.code === 'Escape') {
    hideSuccessMessage();
    window.removeEventListener('keydown', hideSuccessKey);
  }
};

const hideErrorKey = (e) => {
  if (e.code === 'Escape') {
    hideErrorMessage();
    window.removeEventListener('keydown', hideErrorKey);
  }
};

const closeInfoKey = (e) => {
  if (e.code === 'Escape') {
    closeImgInfoHandler();
    window.removeEventListener('keydown', closeInfoKey);
  }
};

const hideSettingsKey = (e) => {
  if (e.code === 'Escape') {
    hideSettingsHandler();
    window.removeEventListener('keydown', hideSettingsKey);
  }
};

export {
  hideErrorKey,
  hideSuccessKey,
  closeInfoKey,
  hideSettingsKey
};
