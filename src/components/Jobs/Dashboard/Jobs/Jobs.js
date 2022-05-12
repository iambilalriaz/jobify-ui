import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setJobs } from '../../../../redux/action-creators';
import { getApprovedJobs, getPendingJobs } from '../../../../utils/api';
import JobCard from '../../../Common/JobCard/JobCard';

const Jobs = ({ loggedIn, setFeaturedJobs }) => {
  const jobs = useSelector((state) => state?.app?.jobs);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    if (location?.pathname === '/jobs/pending')
      getPendingJobs()
        .then(({ data }) => {
          dispatch(setJobs(data ?? []));
        })
        .catch(() => {
          dispatch(setJobs([]));
        });
    else if (location?.pathname === '/jobs') {
      getApprovedJobs()
        .then(({ data }) => {
          dispatch(setJobs(data ?? []));
        })
        .catch(() => {
          dispatch(setJobs([]));
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location?.pathname]);
  return (
    <div>
      <div className='featured-section'>
        {jobs?.map((job) => (
          <JobCard
            job={job}
            loggedIn={loggedIn}
            setFeaturedJobs={setFeaturedJobs}
          />
        ))}
      </div>
    </div>
  );
};

export default Jobs;
