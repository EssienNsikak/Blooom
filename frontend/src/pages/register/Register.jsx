import React, { useRef } from 'react';
import { useHistory } from 'react-router';
import './register.css';
import Axios from 'axios';

export default function Register() {

  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (confirmPassword.current.value !== password.current.value) {
      confirmPassword.current.setCustomValidity('Password does not match!');
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };

      try {
        await Axios.post('/auth/signup', user);
        history.push('/login');
      } catch (err) {
        console.log(err)
      }
      
    }
  };

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
          <form className='loginBox' onSubmit={handleClick}>
            <input 
              placeholder='Username' 
              required 
              ref={username} 
              className='loginInput' 
            />
            <input 
              placeholder='Email'
              type='email' 
              required 
              ref={email} 
              className='loginInput' 
            />
            <input 
              placeholder='Password'
              type='password' 
              required 
              minLength='6'
              ref={password} 
              className='loginInput' 
            />
            <input 
              placeholder='Confirm Password'
              type='password' 
              required 
              ref={confirmPassword} 
              className='loginInput' 
            />
            <button className='loginButton' type='submit'>Sign Up</button>
            <button className='loginRegisterButton'>Log into Account</button>
          </form>
        </div>

      </div>
    </div>
  )
}
