import {
  SET_APP_USER,
  SET_JOBS,
  SET_DISPLAY_NAME,
  SET_EMAIL,
  SET_PASSWORD,
  SET_KEYWORD_FILTER,
  SET_TYPE_FILTER,
  SET_COUNTRY_FILTER,
  SET_CITY_FILTER,
  SET_FILTERED_JOBS,
  SET_CATEGORY_FILTER,
} from '../action-types';

const { combineReducers } = require('redux');

const initialState = {
  email: '',
  displayName: '',
  password: '',
  appUser: null,
  jobs: [],
  filteredJobs: [],
  keywordFilter: '',
  typeFilter: {
    fullTime: false,
    partTime: false,
    remote: false,
    contract: false,
  },
  categoryFilter: '',
  countryFilter: '',
  cityFilter: '',
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
    case SET_FILTERED_JOBS: {
      return { ...state, filteredJobs: payload };
    }
    case SET_KEYWORD_FILTER: {
      return {
        ...state,
        keywordFilter: payload,
      };
    }
    case SET_TYPE_FILTER: {
      return {
        ...state,
        typeFilter: payload,
      };
    }
    case SET_CATEGORY_FILTER: {
      return {
        ...state,
        categoryFilter: payload,
      };
    }
    case SET_COUNTRY_FILTER: {
      return {
        ...state,
        countryFilter: payload,
      };
    }
    case SET_CITY_FILTER: {
      return {
        ...state,
        cityFilter: payload,
      };
    }
    default:
      return state;
  }
};
export const rootReducer = combineReducers({
  app: appReducer,
});
