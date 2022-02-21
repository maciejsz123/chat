import React, { useState } from 'react';
import './loginForm.sass';
import { connect } from 'react-redux';
import { setLogin, setPassword, setActualUser } from '../../redux/actions/userActions';
const axios = require('axios');

function RegisterForm(props) {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function register(e) {
    e.preventDefault();
    axios.post('http://localhost:5000/users/register', {
        username: props.user.login,
        password: props.user.password,
        name: name,
        lastName: lastName
      })
      .then( resp => {
        if(resp.data.code === 11000) {
          setErrorMessage('user arleady exists')
        } else if(resp.data.name === 'ValidationError') {
          setErrorMessage(resp.data.message)
        } else {
          setErrorMessage('')
        }
        console.log(resp.data);
      })
      .catch( err => {
        console.log(err.data);
      })
  }

  return (
      <div>
        <form onSubmit={(e) => register(e)}>
          <div>

            <input
              type='text'
              placeholder='name'
              className='login-input'
              maxLength='20'
              value={name}
              onChange={e => setName(e.target.value)}
            />

          </div>
          <div>

            <input
              type='text'
              placeholder='last name'
              className='login-input'
              maxLength='20'
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />

          </div>
          <div>

            <input
              type='text'
              placeholder='login'
              className='login-input'
              maxLength='20'
              value={props.user.login}
              onChange={e => props.setLogin(e.target.value)}
            />

          </div>
          <div>

            <input
              type='password'
              placeholder='password'
              className='login-input'
              maxLength='20'
              value={props.user.password}
              onChange={e => props.setPassword(e.target.value)}
            />

          </div>
          <div className='submit-button-container'>
            <button className='submit-button'>register</button>
          </div>
        </form>
        <div className='input-error'>{errorMessage}</div>
      </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { setLogin, setPassword, setActualUser })(RegisterForm);
