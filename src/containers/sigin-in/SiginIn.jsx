import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'

import './SignIn.scss'
import { useNavigate } from 'react-router-dom'

function SignIn() {
  const Navigate = useNavigate()
  return (
    <div className='signin-container'>
      <div className='signin-form'>
        <h2>Sign In</h2>
        <div className='input-group'>
          <FontAwesomeIcon icon={faEnvelope} className='icon' />
          <input type='email' placeholder='Email' />
        </div>
        <div className='input-group'>
          <FontAwesomeIcon icon={faLock} className='icon' />
          <input type='password' placeholder='Password' />
        </div>
        <div className='forgot-password'>
          <a href='/'>Forgot Password?</a>
        </div>
        <button
          type='button'
          className='login-button'
          onClick={() => {
            Navigate('/home')
          }}
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default SignIn
