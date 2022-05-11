import { locations } from '../../constants/locations';
export const getSuccessMessage = (response, defaultMsg) =>
  response?.data?.message || defaultMsg;
export const getErrorMessage = (error) =>
  error?.response?.data?.message || 'Some error occured.';
export const getCountries = () => Object.keys(locations);
export const getCities = async (country) =>
  await [...new Set(locations?.[country])];
