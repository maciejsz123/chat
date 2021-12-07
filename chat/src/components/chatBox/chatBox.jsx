import React from 'react';
import './chatBox.sass';

function ChatBox(props) {
  return (
    <div id='chat-div'>
      <div id='chat-box'>
        <div id='chat-name'>
          community
        </div>
        <div id='chat-field'>
          chat field
        </div>
      </div>
      <div id='chat-input'>
        <input type='text' />
      </div>
    </div>
  )
}

export default ChatBox;
