import React, { useEffect, useLayoutEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { isAuthorized } from '../utils/api/index';
import Home from '../components/Home/Home';
import Login from '../components/Auth/Login';
import JobForm from '../components/Jobs/JobForm/JobForm';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/jobs' element={<Home />} />
        <Route path='/login' element={<Login />} />
        {/* <Route path='/post-job' element={<JobForm />} /> */}
        <Route path='*' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
