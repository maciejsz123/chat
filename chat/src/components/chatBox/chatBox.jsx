import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './chatBox.sass';
import MyMessage from '../myMessage/myMessage';
import OtherUserMessage from '../otherUserMessage/otherUserMessage';
import { addMessageToChat } from '../../actions/chatActions';
import axios from 'axios';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:5000');

function ChatBox(props) {
  const [message, setMessage] = useState('');

  useEffect( () => {
    socket.on('receiveMessageBack', ({ messageId, userId, chatTypem chatName, message }) => {
      props.addMessageToChat([{_id: messageId, userId, chatType, chatName, message}])
    })

    return () => {
      socket.off();
    }
  }, [props.chat])

  const elements = [];
  for (const elem of props.chat) {
    if(elem.userId === props.actualUser._id) {
      elements.push(<MyMessage message={elem.message} key={elem._id} />);
    } else {
      elements.push(<OtherUserMessage message={elem.message} key={elem._id}/>);
    }
  }

  function sendMessage(e) {
    if(e._reactName === 'onClick' || e.key === "Enter") {
      socket.emit('message', ({userId: props.actualUser._id, chatType: 'private', chatName: 'maciej', message: message}))
      setMessage('');
    }
  }

  return (
    <div id='chat-div'>
      <div id='chat-box'>
        <div id='chat-name'>
          { elements.length ? elements[0].chatName : '' }
        </div>
        <div id='chat-field'>
          { elements }
        </div>
      </div>
      <div id='chat-input'>
        <input type='text' value={message} onChange={ e => setMessage(e.target.value)} onKeyDown={(e) => sendMessage(e)}/>
        <div onClick={(e) => sendMessage(e)}>
          <img src={require(`../../imgs/send.png`).default} alt='img' />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    actualUser: state.user.actualUser,
    chat: state.chat.chat
  }
}

export default connect(mapStateToProps, { addMessageToChat })(ChatBox);
