import React from 'react';
import './loginForm.sass';
import { connect } from 'react-redux';
import { setLogin, setPassword, setActualUser, setUsers } from '../../redux/actions/userActions';
const axios = require('axios');

function LoginForm(props) {
  function sendData(e) {
    e.preventDefault();
    axios.post('http://localhost:5000/users/login', {
        username: props.user.login,
        password: props.user.password
      })
      .then( resp => {
        props.setActualUser(resp.data);
      })
      .then( users => {
        axios.get('http://localhost:5000/users')
        .then( users => {
          props.setUsers(users.data)
        })
      })
      .catch( err => {
        console.log(err.data);
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
      </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { setLogin, setPassword, setActualUser, setUsers })(LoginForm);
