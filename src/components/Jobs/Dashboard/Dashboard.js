import React from 'react';
import Featured from './Featured/Featured';
import Header from './Header/Header';
import './index.css';
import Jobs from './Jobs/Jobs';

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <Header />
      <Featured />
      <hr className='jobs-separator' />
      <Jobs />
    </div>
  );
};

export default Dashboard;
