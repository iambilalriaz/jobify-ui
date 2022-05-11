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
export const postJob = (formData) =>
  request({
    method: 'POST',
    url: `${API_URL}/job`,
    headers: getHeaders(getJWT()),
    data: formData,
  });
export const updateJob = (formData, jobId) =>
  request({
    method: 'PATCH',
    url: `${API_URL}/job/${jobId}`,
    headers: getHeaders(getJWT()),
    data: formData,
  });
export const getApprovedJobs = () =>
  request({
    method: 'GET',
    url: `${API_URL}/job/approved`,
  });
export const getPendingJobs = () =>
  request({
    method: 'GET',
    url: `${API_URL}/job/pending`,
    headers: getHeaders(getJWT()),
  });
export const getFeaturedJobs = () =>
  request({
    method: 'GET',
    url: `${API_URL}/job/featured`,
  });
export const approveJob = (jobId) =>
  request({
    method: 'PATCH',
    url: `${API_URL}/job/${jobId}/approve`,
    headers: getHeaders(getJWT()),
  });
export const markJobAsFeatured = (jobId) =>
  request({
    method: 'PATCH',
    url: `${API_URL}/job/${jobId}/featured`,
    headers: getHeaders(getJWT()),
  });
export const getJobInfo = (jobId) =>
  request({
    method: 'GET',
    url: `${API_URL}/job/${jobId}`,
    headers: getHeaders(getJWT()),
  });
export const deleteJob = (jobId) =>
  request({
    method: 'DELETE',
    url: `${API_URL}/job/${jobId}`,
    headers: getHeaders(getJWT()),
  });
