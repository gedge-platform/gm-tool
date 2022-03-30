const setItem = (key, value) => {
  window.sessionStorage.setItem(key, JSON.stringify(value));
};

const getItem = (key) => {
  return JSON.parse(window.sessionStorage.getItem(key));
};

const removeItem = (key) => {
  window.sessionStorage.removeItem(key);
};

export { setItem, getItem, removeItem };
