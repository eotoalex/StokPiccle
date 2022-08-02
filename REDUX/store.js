const {createStore} = require('redux');
const reducer = require('./reducers/reducer');
const store = createStore(reducer);

module.exports = store;