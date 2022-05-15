import React, { useState } from 'react';
import Featured from './Featured/Featured';
import Header from './Header/Header';
import './index.css';
import Jobs from './Jobs/Jobs';
import JobForm from '../JobForm/JobForm';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Dashboard = ({ loggedIn }) => {
  const { pathname } = useLocation();
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const {
    keywordFilter,
    typeFilter,
    categoryFilter,
    countryFilter,
    cityFilter,
  } = useSelector((state) => state?.app);
  const isNotFiltering = () =>
    !keywordFilter &&
    !countryFilter &&
    !categoryFilter &&
    !cityFilter &&
    !Object.values(typeFilter)?.includes(true);
  return (
    <div className='dashboard'>
      {!pathname?.includes('post') && !pathname?.includes('update') && (
        <Header />
      )}
      {isNotFiltering() &&
        !pathname?.includes('pending') &&
        !pathname?.includes('post') &&
        !pathname?.includes('update') && (
          <Featured
            loggedIn={loggedIn}
            featuredJobs={featuredJobs}
            setFeaturedJobs={setFeaturedJobs}
          />
        )}
      {pathname?.includes('post') || pathname?.includes('update') ? (
        <JobForm />
      ) : (
        <Jobs loggedIn={loggedIn} setFeaturedJobs={setFeaturedJobs} />
      )}
    </div>
  );
};

export default Dashboard;
