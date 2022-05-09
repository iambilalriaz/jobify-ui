import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthorized } from '../utils/api';

const AuthRoute = () => {
  const [loggedIn, setLoggedIn] = useState(null);
  useEffect(() => {
    isAuthorized().then(({ data }) => setLoggedIn(data));
  }, []);
  return loggedIn === false ? (
    <Outlet />
  ) : loggedIn === true ? (
    <Navigate replace to='/dashboard' />
  ) : (
    ''
  );
};

export default AuthRoute;
