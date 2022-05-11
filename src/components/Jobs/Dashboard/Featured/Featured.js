import React, { useState, useEffect } from 'react';
import './index.css';
import JobCard from '../../../Common/JobCard/JobCard';
import { getFeaturedJobs } from '../../../../utils/api';
const Featured = ({ loggedIn }) => {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    getFeaturedJobs()
      .then(({ data }) => {
        setJobs(data ?? []);
      })
      .catch(() => {
        setJobs([]);
      });
  }, []);
  return (
    <>
      <div className='featured-jobs'>Featured Jobs</div>
      <div className='featured'>
        {jobs?.map((job) => (
          <JobCard job={job} setFeaturedJobs={setJobs} loggedIn={loggedIn} />
        ))}
      </div>
      {jobs?.length > 0 && <hr className='jobs-separator' />}
    </>
  );
};

export default Featured;
