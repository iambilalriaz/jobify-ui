import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { isAuthorized } from '../utils/api/index';
import AuthRoute from './AuthRoute';
import Home from '../components/Home/Home';
import Login from '../components/Auth/Login';

const Router = () => {
  const [loggedIn, setLoggedIn] = useState(null);
  useEffect(() => {
    isAuthorized().then(({ data }) => setLoggedIn(data));
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/dashboard' element={<PrivateRoute loggedIn={loggedIn} />}>
          <Route path='/dashboard' element={<Home loggedIn={loggedIn} />} />
        </Route>
        <Route path='/profile' element={<PrivateRoute loggedIn={loggedIn} />}>
          <Route path='/profile' element={<Home loggedIn={loggedIn} />} />
        </Route>
        <Route path='/' element={<PrivateRoute />}>
          <Route path='/' element={<Home loggedIn={loggedIn} />} />
        </Route>
        <Route path='/login' element={<AuthRoute />}>
          <Route path='/login' element={<Login />} />
        </Route>
        <Route path='*' element={<PrivateRoute />}>
          <Route path='*' element={<Home loggedIn={loggedIn} />} />
        </Route>
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
