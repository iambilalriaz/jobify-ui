export const getErrorMessage = (error) =>
  error?.response?.data?.message || 'Some error occured.';
