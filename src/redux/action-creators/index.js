import {
  SET_EMAIL,
  SET_DISPLAY_NAME,
  SET_PASSWORD,
  SET_APP_USER,
  SET_JOBS,
  SET_KEYWORD_FILTER,
  SET_COUNTRY_FILTER,
  SET_CITY_FILTER,
  SET_TYPE_FILTER,
  SET_FILTERED_JOBS,
  SET_CATEGORY_FILTER,
} from '../action-types/index';
export const setEmail = (payload) => ({
  type: SET_EMAIL,
  payload,
});
export const setDisplayName = (payload) => ({
  type: SET_DISPLAY_NAME,
  payload,
});
export const setPassword = (payload) => ({
  type: SET_PASSWORD,
  payload,
});
export const setAppUser = (payload) => ({
  type: SET_APP_USER,
  payload,
});
export const setJobs = (payload) => ({
  type: SET_JOBS,
  payload,
});
export const setFilteredJobs = (payload) => ({
  type: SET_FILTERED_JOBS,
  payload,
});
export const setKeywordFilter = (payload) => ({
  type: SET_KEYWORD_FILTER,
  payload,
});
export const setTypeFilter = (payload) => ({
  type: SET_TYPE_FILTER,
  payload,
});
export const setCategoryFilter = (payload) => ({
  type: SET_CATEGORY_FILTER,
  payload,
});
export const setCountryFilter = (payload) => ({
  type: SET_COUNTRY_FILTER,
  payload,
});
export const setCityFilter = (payload) => ({
  type: SET_CITY_FILTER,
  payload,
});
