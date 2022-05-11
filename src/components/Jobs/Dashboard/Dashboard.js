import React from 'react';
import Featured from './Featured/Featured';
import Header from './Header/Header';
import './index.css';
import Jobs from './Jobs/Jobs';
import JobForm from '../JobForm/JobForm';
import { useLocation } from 'react-router-dom';

const Dashboard = ({ loggedIn }) => {
  const { pathname } = useLocation();
  return (
    <div className='dashboard'>
      {!pathname?.includes('post') && !pathname?.includes('update') && (
        <Header />
      )}
      {!pathname?.includes('pending') &&
        !pathname?.includes('post') &&
        !pathname?.includes('update') && <Featured loggedIn={loggedIn} />}
      {pathname?.includes('post') || pathname?.includes('update') ? (
        <JobForm />
      ) : (
        <Jobs loggedIn={loggedIn} />
      )}
    </div>
  );
};

export default Dashboard;
