'use script';

// const data = [
//   {
//     name: 'Иван',
//     surname: 'Петров',
//     phone: '+79514545454',
//   },
//   {
//     name: 'Игорь',
//     surname: 'Семёнов',
//     phone: '+79999999999',
//   },
//   {
//     name: 'Семён',
//     surname: 'Иванов',
//     phone: '+79800252525',
//   },
//   {
//     name: 'Мария',
//     surname: 'Попова',
//     phone: '+79876543210',
//   },
// ];

{
  const getStorage = (key) => {
    if (localStorage.getItem(key) === null) {
      return [];
    } else {
      return JSON.parse(localStorage.getItem(key));
    }
  };
  const setStorage = (key, contact) => {
    const data = getStorage('data');
    localStorage.setItem(key, contact);
    data.push(JSON.parse(localStorage.getItem(key)));
    localStorage.setItem('data', JSON.stringify(data));
  };
  const removeStorage = (phone) => {
    const data = getStorage('data');
    data.forEach((contact, index) => {
      if (contact.phone === phone) {
        data.splice(index, 1);
        localStorage.setItem('data', JSON.stringify(data));
      }
    });
  };

  // const addContactData = (contact) => {
  //   data.push(contact);
  // };

  const createHeader = () => {
    const header = document.createElement('header');
    header.classList.add('header');
    const headerContainer = createContainer();
    header.append(headerContainer);
    header.headerContainer = headerContainer;
    return header;
  };

  const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('container');
    return container;
  };

  const createLogo = (title) => {
    const h1 = document.createElement('h1');
    h1.classList.add('logo');
    h1.textContent = `Телефонный справочник -  ${title}`;
    return h1;
  };

  const createMain = () => {
    const main = document.createElement('main');
    const mainContainer = createContainer();
    main.append(mainContainer);
    main.mainContainer = mainContainer;
    return main;
  };

  const createButtonsGroup = (params) => {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('btn-wrapper');

    const btns = params.map(({ className, type, text }) => {
      const button = document.createElement('button');
      button.type = type;
      button.textContent = text;
      button.className = className;
      return button;
    });

    btnWrapper.append(...btns);
    return {
      btnWrapper,
      btns,
    };
  };

  const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');

    const thead = document.createElement('thead');
    thead.insertAdjacentHTML(
      'beforeend',
      `<tr>
        <th class="delete">Удалить</th>
        <th class="th-name">Имя</th>
        <th class="th-surname">Фамилия</th>
        <th>Телефон</th>
      </tr>`
    );

    const tbody = document.createElement('tbody');
    table.append(thead, tbody);
    table.tbody = tbody;
    table.thead = thead;

    return table;
  };

  const createForm = () => {
    const overlay = document.createElement('div');
    overlay.classList.add('form-overlay');

    const form = document.createElement('form');
    form.classList.add('form');
    form.insertAdjacentHTML(
      'beforeend',
      `
      <button class="close" type="button"></button>
      <h2 class="form-title">Добавить контакнт</h2>
      <div class="form-group">
        <label class="form-label" for="name">Имя: </label>
        <input class="form-input" name="name" id="name" type="text" required />
      </div>
      <div class="form-group">
        <label class="form-label" for="surname">Фамилия: </label>
        <input class="form-input" name="surname" id="surname" type="text" required />
      </div>
      <div class="form-group">
        <label class="form-label" for="phone">Телефон: </label>
        <input class="form-input" name="phone" id="phone" type="phone" required />
      </div>
    `
    );

    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-3 js-add',
        type: 'submit',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'reset',
        text: 'Отмена',
      },
    ]);

    form.append(...buttonGroup.btns);
    overlay.append(form);

    return {
      overlay,
      form,
    };
  };

  const createFooter = (title) => {
    const footer = document.createElement('footer');
    footer.classList.add('footer');
    const h2 = document.createElement('h2');
    h2.textContent = `Все права защищены ©${title}`;
    const footerContainer = createContainer();
    footerContainer.append(h2);
    footer.append(footerContainer);
    return footer;
  };

  const renderPhoneBook = (app, title) => {
    const header = createHeader();
    const logo = createLogo(title);
    const main = createMain();
    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-3',
        type: 'button',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'button',
        text: 'Удалить',
      },
    ]);

    const table = createTable();
    const { form, overlay } = createForm();
    const footer = createFooter(title);

    header.headerContainer.append(logo);
    main.mainContainer.append(buttonGroup.btnWrapper, table, overlay);
    app.append(header, main, footer);

    return {
      list: table.tbody,
      thead: table.thead,
      logo,
      btnAdd: buttonGroup.btns[0],
      btnDel: buttonGroup.btns[1],
      formOverlay: overlay,
      form,
    };
  };

  const createRow = ({ name: firstName, surname, phone }) => {
    const tr = document.createElement('tr');
    tr.classList.add('contact');

    const tdDel = document.createElement('td');
    tdDel.classList.add('delete');

    const buttonDel = document.createElement('button');
    buttonDel.classList.add('del-icon');
    tdDel.append(buttonDel);

    const tdName = document.createElement('td');
    tdName.textContent = firstName;

    const tdSurname = document.createElement('td');
    tdSurname.textContent = surname;

    const tdPhone = document.createElement('td');

    const phoneLink = document.createElement('a');
    phoneLink.href = `tel:${phone}`;
    phoneLink.textContent = phone;
    tr.phoneLink = phoneLink;
    tdPhone.append(phoneLink);

    const tdEditBtn = document.createElement('button');
    tdEditBtn.classList.add('btn', 'btn-outline-secondary', 'btn-sm');
    tdEditBtn.textContent = 'Редактировать';

    const tdEdit = document.createElement('td');
    tdEdit.append(tdEditBtn);

    tr.append(tdDel, tdName, tdSurname, tdPhone, tdEdit);

    return tr;
  };

  const renderContacts = (elem, data) => {
    const allRow = data.map(createRow);
    elem.append(...allRow);
    return allRow;
  };

  const hoverRow = (allRow, logo) => {
    const text = logo.textContent;
    allRow.forEach((contact) => {
      //   console.log(contact);
      contact.addEventListener('mouseenter', () => {
        logo.textContent = contact.phoneLink.textContent;
      });
      contact.addEventListener('mouseleave', () => {
        logo.textContent = text;
      });
    });
  };

  const modalControl = (btnAdd, formOverlay) => {
    const openModal = () => {
      formOverlay.classList.add('is-visible');
    };

    const closeModal = () => {
      formOverlay.classList.remove('is-visible');
    };

    btnAdd.addEventListener('click', openModal);

    formOverlay.addEventListener('click', (e) => {
      const target = e.target;
      if (target === formOverlay || target.classList.contains('close')) {
        closeModal();
      }
    });

    return {
      closeModal,
    };
  };

  const deleteControl = (btnDel, list) => {
    btnDel.addEventListener('click', () => {
      document.querySelectorAll('.delete').forEach((del) => {
        del.classList.toggle('is-visible');
      });
    });

    list.addEventListener('click', (e) => {
      const target = e.target;
      if (target.closest('.del-icon')) {
        removeStorage(
          target.closest('.contact').querySelector('a').textContent
        );
        target.closest('.contact').remove();
      }
      console.log('e.target: ', e.target);
    });
  };

  const trSort = (filter, list) => {
    const arr = Array.from(document.querySelectorAll('.contact'));
    //   console.log('arr: ', arr);

    arr.sort((a, b) => {
      if (a.cells[filter].textContent < b.cells[filter].textContent) return -1;
      if (a.cells[filter].textContent > b.cells[filter].textContent) return 1;
      if (a.cells[3].textContent < b.cells[3].textContent) return -1;
      if (a.cells[3].textContent > b.cells[3].textContent) return 1;
      return 0;
    });
    list.append(...arr);
  };

  const tableSort = (thead, list) => {
    thead.addEventListener('click', (e) => {
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

  const addContactToPage = (contact, list) => {
    list.append(createRow(contact));
  };

  const formControl = (form, list, closeModal) => {
    // console.log('form: ', form);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const newContact = Object.fromEntries(formData);

      setStorage('contact', JSON.stringify(newContact));

      addContactToPage(newContact, list);
      // addContactData(newContact);
      form.reset();
      closeModal();
    });
  };

  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);

    const { list, thead, logo, btnAdd, btnDel, formOverlay, form } =
      renderPhoneBook(app, title);

    console.log(getStorage('data'));

    //  Функционал
    const allRow = renderContacts(list, getStorage('data'));
    const { closeModal } = modalControl(btnAdd, formOverlay);

    hoverRow(allRow, logo);
    deleteControl(btnDel, list);
    tableSort(thead, list);
    trSort(localStorage.getItem('sort'), list);
    formControl(form, list, closeModal, allRow, logo);
    // console.log(btnAdd);
    // console.log(formOverlay);
  };

  window.phoneBookInit = init;
}
