import storage from './modules/serviceStorage.js';
import { renderPhoneBook } from './modules/render.js';
import * as control from './modules/control.js';

{
  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);

    const { list, thead, logo, btnAdd, btnDel, formOverlay, form } = renderPhoneBook(app, title);

    console.log(storage.getStorage('data'));

    //  Функционал
    const allRow = control.renderContacts(list, storage.getStorage('data'));
    const { closeModal } = control.modalControl(btnAdd, formOverlay);

    control.hoverRow(allRow, logo);
    control.deleteControl(btnDel, list);
    control.tableSort(thead, list);
    control.trSort(localStorage.getItem('sort'), list);
    control.formControl(form, list, closeModal, allRow, logo);
    // console.log(btnAdd);
    // console.log(formOverlay);
  };

  window.phoneBookInit = init;
}
