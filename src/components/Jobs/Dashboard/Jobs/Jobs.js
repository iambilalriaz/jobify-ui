import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setFilteredJobs, setJobs } from '../../../../redux/action-creators';
import { getApprovedJobs, getPendingJobs } from '../../../../utils/api';
import JobCard from '../../../Common/JobCard/JobCard';
import NoData from '../../../Common/NoData/NoData';
import TableView from '../../../Common/TableView/TableView';

const Jobs = ({ loggedIn, setFeaturedJobs }) => {
  const filteredJobs = useSelector((state) => state?.app?.filteredJobs);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    if (location?.pathname === '/jobs/pending')
      getPendingJobs()
        .then(({ data }) => {
          dispatch(setJobs(data ?? []));
          dispatch(setFilteredJobs(data ?? []));
        })
        .catch(() => {
          dispatch(setJobs([]));
          dispatch(setFilteredJobs([]));
        });
    else if (location?.pathname === '/jobs') {
      getApprovedJobs()
        .then(({ data }) => {
          dispatch(setJobs(data ?? []));
          dispatch(setFilteredJobs(data ?? []));
        })
        .catch(() => {
          dispatch(setJobs([]));
          dispatch(setFilteredJobs([]));
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location?.pathname]);
  return filteredJobs?.length > 0 ? (
    <div>
      {loggedIn === false ? (
        <div className='featured-section'>
          {filteredJobs?.map((job) => (
            <JobCard
              job={job}
              loggedIn={loggedIn}
              setFeaturedJobs={setFeaturedJobs}
            />
          ))}
        </div>
      ) : loggedIn === true ? (
        <TableView jobs={filteredJobs} setFeaturedJobs={setFeaturedJobs} />
      ) : (
        ''
      )}
    </div>
  ) : (
    <NoData />
  );
};

export default Jobs;
