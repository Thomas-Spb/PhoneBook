const getStorage = key => {
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
const removeStorage = phone => {
  const data = getStorage('data');
  data.forEach((contact, index) => {
    if (contact.phone === phone) {
      data.splice(index, 1);
      localStorage.setItem('data', JSON.stringify(data));
    }
  });
};

export default { getStorage, setStorage, removeStorage };
