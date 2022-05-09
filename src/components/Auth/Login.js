import { validate } from 'email-validator';
import React, { useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './index.css';
import { toast } from 'react-toastify';
import { userLogin } from '../../utils/api';
import {
  setAppUser,
  setEmail,
  setPassword,
} from '../../redux/action-creators/index';
import { getErrorMessage } from '../../utils/helpers/index';
const Login = () => {
  const { email, password } = useSelector((state) => state?.auth);
  const [didLoginBtnClick, setDidLoginBtnClick] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onLogin = () => {
    setDidLoginBtnClick(true);
    if (validate(email) && password) {
      setIsLoggingIn(true);
      userLogin({ email, password })
        .then(({ data }) => {
          const {
            token,
            user: { userId, name, email },
          } = data;
          dispatch(setAppUser(data?.user));
          localStorage.setItem(
            'user',
            JSON.stringify({ userId, name, token, email })
          );
          setIsLoggingIn(false);
          toast.success('Login successful.');
          navigate('/dashboard');
        })
        .catch((error) => {
          setIsLoggingIn(false);
          toast.error(getErrorMessage(error));
        });
    }
  };
  const handleEnterPress = (e) => {
    if (e?.key === 'Enter') {
      onLogin();
    }
  };
  return (
    <div className='auth-layout'>
      <Card className='auth-card'>
        <Card.Header className='auth-card-header'>LOGIN</Card.Header>
        <Card.Body className='auth-card-body'>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              className='text-input'
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => dispatch(setEmail(e?.target?.value))}
              onKeyDown={handleEnterPress}
            />
            {didLoginBtnClick && !validate(email) && (
              <div className='auth-error'>Please enter valid email address</div>
            )}
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              className='text-input'
              type='password'
              placeholder='Enter Password'
              value={password}
              onChange={(e) => dispatch(setPassword(e?.target?.value))}
              onKeyDown={handleEnterPress}
            />
            {didLoginBtnClick && !password && (
              <div className='auth-error'>Password enter password</div>
            )}
          </Form.Group>

          <button
            disabled={isLoggingIn}
            className='custom-button'
            onClick={onLogin}
          >
            Login
          </button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
