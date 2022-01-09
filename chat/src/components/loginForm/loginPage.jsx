import React, { useState } from 'react';
import './loginForm.sass';
import LoginForm from './loginForm';
import RegisterForm from './registerForm';

function LoginPage(props) {
  const [formSelect, setFormSelect] = useState('login');

  return (
    <div>
      <div id='login-page'>
        <div className='login-form'>
          <div className='login-header'>
            <div
              onClick={ () => setFormSelect('login')}
              style={{ color: formSelect === 'login' ? 'black' : 'white'}}>
              login
            </div>
            <div
              onClick={ () => setFormSelect('register')}
              style={{ color: formSelect !== 'login' ? 'black' : 'white'}}>
              register
            </div>
          </div>
          {formSelect === 'login' ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  )
}

export default LoginPage;
