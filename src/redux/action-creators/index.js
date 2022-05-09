import {
  SET_EMAIL,
  SET_DISPLAY_NAME,
  SET_PASSWORD,
  SET_APP_USER,
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
