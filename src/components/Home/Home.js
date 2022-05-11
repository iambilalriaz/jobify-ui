import React, { useLayoutEffect, useState } from 'react';
import { isAuthorized } from '../../utils/api';
import Dashboard from '../Jobs/Dashboard/Dashboard';
import Navbar from '../Navbar/Navbar';
import './index.css';
const Home = () => {
  const [loggedIn, setLoggedIn] = useState(null);
  useLayoutEffect(() => {
    isAuthorized().then(({ data }) => setLoggedIn(data));
  }, []);
  return (
    <div className='home'>
      <Navbar loggedIn={loggedIn} />
      <Dashboard loggedIn={loggedIn} />
    </div>
  );
};

export default Home;
