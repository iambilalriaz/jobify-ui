import React, { useEffect } from 'react';
import './index.css';
import JobCard from '../../../Common/JobCard/JobCard';
import { getFeaturedJobs } from '../../../../utils/api';
const Featured = ({ loggedIn, featuredJobs, setFeaturedJobs }) => {
  useEffect(() => {
    getFeaturedJobs()
      .then(({ data }) => {
        setFeaturedJobs(data ?? []);
      })
      .catch(() => {
        setFeaturedJobs([]);
      });
  }, [setFeaturedJobs]);
  return (
    <>
      <div className='featured-jobs'>Featured Jobs</div>
      <div className='featured'>
        {featuredJobs?.map((job) => (
          <JobCard
            job={job}
            setFeaturedJobs={setFeaturedJobs}
            loggedIn={loggedIn}
          />
        ))}
      </div>
      {featuredJobs?.length > 0 && <hr className='jobs-separator' />}
    </>
  );
};

export default Featured;
