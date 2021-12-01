import React from 'react';
import './loginForm.sass';
import { connect } from 'react-redux';
import { setLogin, setPassword } from '../../redux/actions/userActions';

function LoginForm(props) {
  return (
    <div id='login-page'>
      <div className='login-form'>
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
        <div>
          <button type='button'>login</button>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { setLogin, setPassword })(LoginForm);
