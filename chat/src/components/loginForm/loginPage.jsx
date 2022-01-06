import React, { useState } from 'react';
import './loginForm.sass';
import LoginForm from './loginForm';
import RegisterForm from './registerForm';

function LoginPage(props) {
  const [formSelect, setFormSelect] = useState('login');

  return (
    <div>
      <div onClick={ () => setFormSelect('login')}>login</div>
      <div onClick={ () => setFormSelect('register')}>register</div>
      {formSelect === 'login' ? <LoginForm /> : <RegisterForm />}
    </div>
  )
}

export default LoginPage;
