let store = {};

const localStorageMock = {
  getItem: (key) => store[key],
  setItem: (key, value) => {
    store[key] = value.toString();
  },
  clear: () => {
    store = {};
  },
};

export default localStorageMock;
