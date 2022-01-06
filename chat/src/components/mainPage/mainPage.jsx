import React from 'react';
import Chats from '../chats/chats';
import ChatBox from '../chatBox/chatBox';
import Contacts from '../contacts/contacts';
import LoginForm from '../loginForm/loginForm';
import { connect } from 'react-redux';
import './mainPage.sass';

function MainPage(props) {
  if(!props.actualUser) {
    return <LoginForm />
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
