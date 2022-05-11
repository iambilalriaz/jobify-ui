import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
import LogoutModal from './LogoutModal';
const Navbar = ({ loggedIn }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState('');

  const navigate = useNavigate();
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const onLogout = () => {
    localStorage.removeItem('user');
    navigate('/jobs');
    window.location.reload();
  };
  return (
    <div className='navbar'>
      <div
        onClick={() => {
          setCurrentPage('');
          navigate('/jobs');
        }}
      >
        Jobify
      </div>
      <div>
        {loggedIn === true && (
          <div
            className={`custom-button ${
              currentPage === 'pending'
                ? 'selected-page-link'
                : 'not-selected-page-link'
            }`}
          >
            <span
              onClick={() => {
                setCurrentPage('pending');
                navigate('/jobs/pending');
              }}
            >
              Pending Jobs
            </span>
          </div>
        )}
        <div
          className={`custom-button ${
            currentPage === 'post'
              ? 'selected-page-link'
              : 'not-selected-page-link'
          }`}
        >
          <span
            onClick={() => {
              setCurrentPage('post');
              navigate('/post-job');
            }}
          >
            Post a Job
          </span>
        </div>
        <div>
          {loggedIn === true ? (
            <span className='custom-button-inverted' onClick={handleOpen}>
              Logout
            </span>
          ) : loggedIn === false ? (
            <span
              className='custom-button-inverted'
              onClick={() => navigate('/login')}
            >
              Login
            </span>
          ) : (
            ''
          )}
        </div>
      </div>
      <LogoutModal
        show={showModal}
        handleClose={handleClose}
        confirmHandler={onLogout}
      />
    </div>
  );
};

export default Navbar;
