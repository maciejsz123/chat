import React from 'react';
import './loginForm.sass';
import { connect } from 'react-redux';
import { setLogin, setPassword, setActualUser, getUsers } from '../../redux/actions/userActions';
const axios = require('axios');

function LoginForm(props) {
  function sendData(e) {
    e.preventDefault();
    axios.post('/users/login', {
        username: props.user.login,
        password: props.user.password
      })
      .then( resp => {
        props.setActualUser(resp.data);
      })
      .then( users => {
        props.getUsers();
      })
      .catch( err => {
        console.log(err);
      })
  }
  
  return (
      <div>
        <form onSubmit={(e) => sendData(e)}>
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
            <button className='submit-button'>login</button>
          </div>
        </form>
        {props.user.actualUser === 'error' ? <div className='input-error'>invalid login or password</div> : <div></div>}
      </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { setLogin, setPassword, setActualUser, getUsers })(LoginForm);
