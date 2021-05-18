/* eslint-disable no-unused-vars */
import React, { useRef, useContext } from 'react';
import './login.css';
import { loginCall } from '../../apiCalls.js';
import { AuthContext } from '../../components/context/AuthContext';
import { CircularProgress } from '@material-ui/core';

export default function Login() {
  const email =  useRef();
  const password =  useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext)

  const handleClick = (e) => {
    e.preventDefault();
    loginCall({ email: email.current.value, password: password.current.value }, dispatch )
  };

  console.log(user);

  return (
    <div className='login'>
      <div className='loginWrapper'>

        <div className='loginLeft'>
          <h3 className='loginLogo'>Blooom</h3>
          <span 
            className='loginDesc'
          >
            Connect With Friends And The World Around You On Blooom.
          </span>
        </div>

        <div className='loginRight'>
          <form className='loginBox' onSubmit={ handleClick }>
            <input 
              placeholder='Email' 
              type='email'
              required 
              className='loginInput' 
              ref={email} 
            />
            <input 
              placeholder='Password' 
              type='password' 
              required
              minLength='6'
              className='loginInput' 
              ref={password} 
            />
            <button className='loginButton' type='submit' disabled={isFetching}>
              {isFetching 
                ? <CircularProgress color='white' size='25px' /> 
                : 'Log In'
              }
            </button>
            <span className='loginForgot'>Forgot Password?</span>
            <button className='loginRegisterButton'>
              {isFetching 
                ? <CircularProgress color='white' size='25px' /> 
                : 'Create New Account'
              }              
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}
