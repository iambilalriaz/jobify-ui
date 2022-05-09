import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
const Navbar = ({ loggedIn }) => {
  const navigate = useNavigate();

  return (
    <div className='navbar'>
      <div>Jobify</div>
      <div>
        <div>
          {loggedIn ? (
            <span
              className='custom-button'
              onClick={() => {
                localStorage.removeItem('user');
                navigate('/login');
              }}
            >
              Logout
            </span>
          ) : (
            <span className='custom-button' onClick={() => navigate('/login')}>
              Login
            </span>
          )}
        </div>{' '}
        <div className='custom-button-inverted'>Post a Job</div>
      </div>
    </div>
  );
};

export default Navbar;
