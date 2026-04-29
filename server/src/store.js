const menuSeed = require('./data/menuSeed');

// In-memory data store
const store = {
  menu: [...menuSeed],
  orders: [],
};

module.exports = store;
