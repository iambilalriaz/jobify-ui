import { rootReducer } from '../reducers/index';
const { createStore } = require('redux');

export const store = createStore(rootReducer);
