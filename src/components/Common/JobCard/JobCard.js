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
  const selectJob = () => {
    navigate(`/update?job=${_id}`);
  };
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
      <Card.Header
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
      </Card.Header>
      <Card.Body className='job-card-body'>
        <div className='d-flex justify-content-apart'>
          <div className='job-info'>
            <div>Company Name</div>
            <div>
              <img
                className='company-logo'
                src={`${API_URL}/${company_logo}`}
                defer
                alt='logo'
              />
              {company_name}
            </div>
          </div>
          <div className='job-info'>
            <div>Salary</div>
            <div>{salary}</div>
          </div>
        </div>
        <div className='d-flex justify-content-apart'>
          <div className='job-info'>
            <div>Type</div>
            <div>{type}</div>
          </div>
          <div className='job-info'>
            <div>Location</div>
            <div>
              {city && country ? (
                <>
                  {city}
                  {`${city && country ? ',' : ''}`} {country}
                </>
              ) : (
                '-'
              )}
            </div>
          </div>
        </div>
        <div className='d-flex justify-content-apart'>
          <div className='job-info'>
            <div>Skills</div>
            <div>{skills}</div>
          </div>
          <div className='job-info'>
            <div>Date Posted</div>
            <div>{moment(createdAt).format('L')}</div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default JobCard;
