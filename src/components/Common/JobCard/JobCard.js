import moment from 'moment';
import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL } from '../../../constants';
import {
  approveJob,
  deleteJob,
  getApprovedJobs,
  getFeaturedJobs,
  markJobAsFeatured,
} from '../../../utils/api';
import { getErrorMessage, getSuccessMessage } from '../../../utils/helpers';
import './index.css';
import { setFilteredJobs, setJobs } from '../../../redux/action-creators/index';
import { useDispatch } from 'react-redux';
import JobDetails from '../JobDetails/JobDetails';
const JobCard = ({ job, setFeaturedJobs, loggedIn }) => {
  const {
    _id,
    company_name,
    title,
    city,
    country,
    createdAt,
    is_featured,
    is_approved,
    company_logo,
    description,
    category,
  } = job;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedJob, setSelectedJob] = useState(null);
  const [showJobDetails, setShowJobDetails] = useState(false);
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
  const onApproveJob = () => {
    approveJob(_id)
      .then((response) => {
        toast.success(getSuccessMessage(response));
        navigate('/jobs');
      })
      .catch((error) => {
        toast.error(getErrorMessage(error));
      });
  };
  const markFeatured = () => {
    markJobAsFeatured(_id)
      .then((response) => {
        toast.success(getSuccessMessage(response));
        refreshData();
      })

      .catch((error) => {
        toast.error(getErrorMessage(error));
      });
  };
  const selectJob = () => navigate(`/update?job=${_id}`);

  const onDeleteJob = () => {
    deleteJob(_id)
      .then((response) => {
        toast.success(getSuccessMessage(response));
        refreshData();
      })
      .catch((error) => {
        toast.error(getErrorMessage(error));
      });
  };
  return (
    <Card className='job-card'>
      <Card.Body className='job-card-body'>
        <div className='d-flex justify-content-apart'>
          {company_logo && (
            <div
              className={
                'logo-div d-flex justify-content-center align-items-center'
              }
            >
              <div>
                <img
                  className='company-logo'
                  src={`${API_URL}/${company_logo}`}
                  defer
                  alt='logo'
                />
              </div>
            </div>
          )}

          <div
            className={!company_logo ? 'first-child' : 'second-child-with-logo'}
          >
            <div className='job-info'>
              <div>{title}</div>
            </div>
            <div className='middle-info d-flex align-items-center'>
              <div className='middle-icons'>{company_name}</div>
              <div className='middle-icons'>
                <i className='fa fa-briefcase' />
                {category || 'Engineering'}
              </div>
              {city && country && (
                <div className='middle-icons'>
                  {city && country ? (
                    <>
                      <i className='fa fa-map-marker-alt' />
                      {city}
                      {`${city && country ? ',' : ''}`} {country}
                    </>
                  ) : (
                    ''
                  )}
                </div>
              )}
              <div className='middle-icons'>
                <i className='far fa-calendar-alt' />
                {moment(createdAt).format('MMM DD, YYYY')}
              </div>
            </div>
            <div className='description'>{description}</div>
          </div>
          <div
            className={`${
              !company_logo ? 'second-child' : 'third-child-with-logo'
            } action-icons d-flex justify-content-apart`}
          >
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
                  !is_featured && loggedIn === true ? markFeatured : () => {}
                }
              />
            ) : !is_approved && loggedIn === true ? (
              <div onClick={onApproveJob}>
                <span className='approve-job-icon fa fa-check fa-lg' />
              </div>
            ) : (
              ''
            )}
            {loggedIn === true && (
              <>
                <div onClick={selectJob}>
                  <span className='edit-job-icon fa fa-pencil-alt fa-lg' />
                </div>
                <div onClick={onDeleteJob}>
                  <span className='delete-job-icon fa fa-trash-alt fa-lg' />{' '}
                </div>
              </>
            )}
          </div>
        </div>
        <JobDetails
          job={selectedJob}
          show={showJobDetails}
          handleClose={() => setShowJobDetails(false)}
        />
      </Card.Body>
    </Card>
  );
};

export default JobCard;
