import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthorized } from '../utils/api';

const PrivateRoute = () => {
  const [loggedIn, setLoggedIn] = useState(null);
  useEffect(() => {
    isAuthorized().then(({ data }) => setLoggedIn(data));
  }, []);
  return loggedIn === true ? (
    <Outlet />
  ) : loggedIn === false ? (
    <Navigate replace to='/login' />
  ) : (
    ''
  );
};

export default PrivateRoute;
