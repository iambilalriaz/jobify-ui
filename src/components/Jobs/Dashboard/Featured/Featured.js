import React, { useEffect } from 'react';
import './index.css';
import JobCard from '../../../Common/JobCard/JobCard';
import { getFeaturedJobs } from '../../../../utils/api';
import TableView from '../../../Common/TableView/TableView';
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
    featuredJobs?.length > 0 && (
      <>
        <div className='featured-jobs'>Featured Jobs</div>
        {loggedIn === false ? (
          <div className='featured'>
            {featuredJobs?.map((job) => (
              <JobCard
                job={job}
                setFeaturedJobs={setFeaturedJobs}
                loggedIn={loggedIn}
              />
            ))}
          </div>
        ) : loggedIn === true ? (
          <TableView jobs={featuredJobs} setFeaturedJobs={setFeaturedJobs} />
        ) : (
          ''
        )}
        {featuredJobs?.length > 0 && <hr className='jobs-separator' />}
      </>
    )
  );
};

export default Featured;
