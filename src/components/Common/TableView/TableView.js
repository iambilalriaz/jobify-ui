import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setFilteredJobs, setJobs } from '../../../redux/action-creators';
import {
  approveJob,
  deleteJob,
  extendJobExpiration,
  getApprovedJobs,
  getFeaturedJobs,
  markJobAsFeatured,
} from '../../../utils/api';
import { getErrorMessage, getSuccessMessage } from '../../../utils/helpers';
import JobDetails from '../JobDetails/JobDetails';
import './index.css';
const TableView = ({ jobs, setFeaturedJobs }) => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [showJobDetails, setShowJobDetails] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const refreshData = () => {
    getApprovedJobs()
      .then(({ data }) => {
        dispatch(setJobs(data ?? []));
        dispatch(setFilteredJobs(data ?? []));
      })
      .catch(() => {
        dispatch(setJobs([]));
        dispatch(setFilteredJobs([]));
      });
    getFeaturedJobs()
      .then(({ data }) => {
        setFeaturedJobs(data ?? []);
      })
      .catch(() => {
        setFeaturedJobs([]);
      });
  };
  const markFeatured = (_id) => {
    markJobAsFeatured(_id)
      .then((response) => {
        toast.success(getSuccessMessage(response));
        refreshData();
      })

      .catch((error) => {
        toast.error(getErrorMessage(error));
      });
  };
  const selectJob = (_id) => navigate(`/update?job=${_id}`);

  const onDeleteJob = (_id) => {
    deleteJob(_id)
      .then((response) => {
        toast.success(getSuccessMessage(response));
        refreshData();
      })
      .catch((error) => {
        toast.error(getErrorMessage(error));
      });
  };
  const onApproveJob = (_id) => {
    approveJob(_id)
      .then((response) => {
        toast.success(getSuccessMessage(response));
        navigate('/jobs');
      })
      .catch((error) => {
        toast.error(getErrorMessage(error));
      });
  };
  const hasExpired = (createdAt, expires_in) =>
    moment(createdAt).format('MMM DD, YYYY') === expires_in;
  const extendExpiration = (jobId) => {
    extendJobExpiration(jobId)
      .then((response) => {
        toast.success(getSuccessMessage(response));
        refreshData();
      })
      .catch((error) => toast.error(getErrorMessage(error)));
  };
  return (
    <div className='jobs-table'>
      <table>
        <thead>
          <th>Title</th>
          <th>Type</th>
          <th>Company</th>
          <th>Category</th>
          <th>Country</th>
          <th>City</th>
          <th>Date Posted</th>
          <th>Expires on</th>
          <th />
        </thead>
        <tbody>
          {jobs?.map((job) => {
            const {
              _id,
              title,
              type,
              company_name,
              category,
              country,
              city,
              createdAt,
              expires_in,
              is_featured,
              is_approved,
            } = job;
            return (
              <tr key={_id}>
                <td>{title}</td>
                <td>{type}</td>
                <td>{company_name}</td>
                <td>{category || '-'}</td>
                <td>{country}</td>
                <td>{city}</td>
                <td>{moment(createdAt).format('MMM DD, YYYY')}</td>
                <td>
                  {hasExpired(createdAt, expires_in) ? (
                    <span
                      onClick={() => extendExpiration(_id)}
                      className='custom-button-inverted'
                    >
                      RENEW
                    </span>
                  ) : (
                    expires_in
                  )}
                </td>
                <td>
                  <div className='d-flex align-items-center action-icons'>
                    <div
                      onClick={() => {
                        setSelectedJob(job);
                        setShowJobDetails(true);
                      }}
                    >
                      <span className='view-job-icon fas fa-eye fa-lg' />
                    </div>
                    {is_approved ? (
                      <i
                        className={`feature-icon fa${
                          is_featured ? 's featured-icon' : 'r'
                        } fa-bookmark fa-lg`}
                        onClick={
                          !is_featured ? () => markFeatured(_id) : () => {}
                        }
                      />
                    ) : !is_approved ? (
                      <div onClick={() => onApproveJob(_id)}>
                        <span className='approve-job-icon fa fa-check fa-lg' />
                      </div>
                    ) : (
                      ''
                    )}
                    <div onClick={() => selectJob(_id)}>
                      <span className='edit-job-icon fa fa-pencil-alt fa-lg' />
                    </div>
                    <div onClick={() => onDeleteJob(_id)}>
                      <span className='delete-job-icon fa fa-trash-alt fa-lg' />{' '}
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <JobDetails
        job={selectedJob}
        show={showJobDetails}
        handleClose={() => setShowJobDetails(false)}
      />
    </div>
  );
};

export default TableView;
