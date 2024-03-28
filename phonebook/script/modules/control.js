import { createRow } from './createElements.js';
import storage from './serviceStorage.js';

export const renderContacts = (elem, data) => {
  const allRow = data.map(createRow);
  elem.append(...allRow);
  return allRow;
};

export const hoverRow = (allRow, logo) => {
  const text = logo.textContent;
  allRow.forEach(contact => {
    //   console.log(contact);
    contact.addEventListener('mouseenter', () => {
      logo.textContent = contact.phoneLink.textContent;
    });
    contact.addEventListener('mouseleave', () => {
      logo.textContent = text;
    });
  });
};

export const modalControl = (btnAdd, formOverlay) => {
  const openModal = () => {
    formOverlay.classList.add('is-visible');
  };

  const closeModal = () => {
    formOverlay.classList.remove('is-visible');
  };

  btnAdd.addEventListener('click', openModal);

  formOverlay.addEventListener('click', e => {
    const target = e.target;
    if (target === formOverlay || target.classList.contains('close')) {
      closeModal();
    }
  });

  return {
    closeModal,
  };
};

export const deleteControl = (btnDel, list) => {
  btnDel.addEventListener('click', () => {
    document.querySelectorAll('.delete').forEach(del => {
      del.classList.toggle('is-visible');
    });
  });

  list.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.del-icon')) {
      storage.removeStorage(target.closest('.contact').querySelector('a').textContent);
      target.closest('.contact').remove();
    }
    console.log('e.target: ', e.target);
  });
};

export const trSort = (filter, list) => {
  const arr = Array.from(document.querySelectorAll('.contact'));
  console.log('arr: ', arr);
  //   debugger;

  arr.sort((a, b) => {
    if (a.cells[filter].textContent < b.cells[filter].textContent) return -1;
    if (a.cells[filter].textContent > b.cells[filter].textContent) return 1;
    if (a.cells[3].textContent < b.cells[3].textContent) return -1;
    if (a.cells[3].textContent > b.cells[3].textContent) return 1;
    return 0;
  });
  list.append(...arr);
};

export const tableSort = (thead, list) => {
  thead.addEventListener('click', e => {
    const target = e.target;
    // console.log('target: ', target);

    if (target.closest('.th-name')) {
      trSort(1, list);
      localStorage.setItem('sort', 1);
    } else if (target.closest('.th-surname')) {
      trSort(2, list);
      localStorage.setItem('sort', 2);
    }
  });
};

export const addContactToPage = (contact, list) => {
  list.append(createRow(contact));
};

export const formControl = (form, list, closeModal) => {
  // console.log('form: ', form);
  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newContact = Object.fromEntries(formData);

    storage.setStorage('contact', JSON.stringify(newContact));

    addContactToPage(newContact, list);
    // addContactData(newContact);
    form.reset();
    closeModal();
  });
};
