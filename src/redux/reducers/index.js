import {
  SET_APP_USER,
  SET_DISPLAY_NAME,
  SET_EMAIL,
  SET_PASSWORD,
} from '../action-types';

const { combineReducers } = require('redux');

const initialState = {
  email: '',
  displayName: '',
  password: '',
  appUser: null,
};
const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_EMAIL: {
      return { ...state, email: payload };
    }
    case SET_DISPLAY_NAME: {
      return { ...state, displayName: payload };
    }
    case SET_PASSWORD: {
      return { ...state, password: payload };
    }
    case SET_APP_USER: {
      return { ...state, appUser: payload };
    }

    default:
      return state;
  }
};
export const rootReducer = combineReducers({
  auth: authReducer,
});
