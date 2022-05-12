import moment from 'moment';
import React from 'react';
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
import { setJobs } from '../../../redux/action-creators/index';
import { useDispatch } from 'react-redux';
const JobCard = ({
  job: {
    _id,
    company_name,
    title,
    type,
    skills,
    salary,
    city,
    country,
    createdAt,
    is_featured,
    is_approved,
    company_logo,
    description,
    category,
  },
  setFeaturedJobs,
  loggedIn,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const refreshData = () => {
    getApprovedJobs()
      .then(({ data }) => {
        dispatch(setJobs(data ?? []));
      })
      .catch(() => {
        dispatch(setJobs([]));
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
      {/* <Card.Header
        className={`job-card-header ${
          is_featured ? '' : 'non-'
        }featured-header`}
      >
        <div>{title}</div>
        <div className='d-flex align-items-center'>
          {loggedIn === true && !is_featured && is_approved && (
            <div
              className='featured-text custom-button-inverted'
              onClick={markFeatured}
            >
              Mark as Featured
            </div>
          )}
          {loggedIn === true && !is_approved && (
            <div
              className='featured-text custom-button-inverted'
              onClick={onApproveJob}
            >
              Approve
            </div>
          )}
          {loggedIn === true && (
            <>
              <div onClick={selectJob}>
                <span className='fas fa-pencil-alt' />
              </div>
              <div onClick={onDeleteJob}>
                <span className='fas fa-trash-alt' />
              </div>
            </>
          )}
        </div>
      </Card.Header> */}
      <Card.Body className='job-card-body'>
        <div className='d-flex justify-content-apart'>
          <div className='d-flex justify-content-center align-items-center'>
            <div>
              <img
                className='company-logo'
                src={`${API_URL}/${company_logo}`}
                defer
                alt='logo'
              />
            </div>
            <div className='company-name'>{company_name}</div>
          </div>

          <div>
            <div className='job-info'>
              <div>{title}</div>
            </div>
            <div className='middle-info d-flex align-items-center'>
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
          <div className='action-icons d-flex justify-content-apart'>
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
      </Card.Body>
    </Card>
  );
};

export default JobCard;
