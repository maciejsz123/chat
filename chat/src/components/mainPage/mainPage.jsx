import React, { useEffect } from 'react';
import Chats from '../chats/chats';
import ChatBox from '../chatBox/chatBox';
import Contacts from '../contacts/contacts';
import LoginPage from '../loginForm/loginPage';
import { connect } from 'react-redux';
import './mainPage.sass';
const axios = require('axios');

function MainPage(props) {
  useEffect( () => {
    return () => {
      if(props.actualUser) {
        axios.post('http://localhost:5000/users/updateOnline', {
          id: props.actualUser._id,
          online: false
        })
        .then( res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        })
      }
    };
  }, [])

  if(!props.actualUser) {
    return <LoginPage />
  } else {

    return (
      <div id="main-page-screen">
        <Chats />
        <ChatBox />
        <Contacts />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    actualUser: state.user.actualUser
  }
}

export default connect(mapStateToProps)(MainPage);
