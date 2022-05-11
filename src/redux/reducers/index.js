import {
  SET_APP_USER,
  SET_JOBS,
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
  jobs: [],
};
const appReducer = (state = initialState, { type, payload }) => {
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
    case SET_JOBS: {
      return { ...state, jobs: payload };
    }
    default:
      return state;
  }
};
export const rootReducer = combineReducers({
  app: appReducer,
});
