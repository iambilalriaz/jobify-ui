import { request } from 'axios';
import { API_URL } from '../../constants/index';
const getJWT = () => {
  const token = JSON.parse(localStorage.getItem('user'))?.token;
  return token || null;
};
const getHeaders = (jwtToken) => ({
  Authorization: 'Bearer ' + jwtToken,
});
export const isAuthorized = () =>
  request({
    method: 'GET',
    url: `${API_URL}/auth/authorized`,
    headers: getHeaders(getJWT()),
  });
export const userLogin = ({ email, password }) =>
  request({
    method: 'POST',
    url: `${API_URL}/auth/login`,
    data: {
      email,
      password,
    },
  });
