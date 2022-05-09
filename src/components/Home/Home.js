import React from 'react';
import Dashboard from '../Jobs/Dashboard/Dashboard';
import Navbar from '../Navbar/Navbar';
import './index.css';
const Home = ({ loggedIn }) => {
  return (
    <div className='home'>
      <Navbar loggedIn={loggedIn} />
      <Dashboard />
    </div>
  );
};

export default Home;
