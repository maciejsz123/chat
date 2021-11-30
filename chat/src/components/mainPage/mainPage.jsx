import React from 'react';
import Chats from '../chats/chats';
import ChatBox from '../chatBox/chatBox';
import Contacts from '../contacts/contacts';
import './mainPage.sass';

function MainPage(props) {
  return (
    <div id="main-page-screen">
      <Chats />
      <ChatBox />
      <Contacts />
    </div>
  )
}

export default MainPage;
