import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './chatBox.sass';
import MyMessage from '../message/myMessage';
import OtherUserMessage from '../message/otherUserMessage';
import { addMessageToChat, getMessages } from '../../redux/actions/chatActions';
import axios from 'axios';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:5000');

function ChatBox(props) {
  const [message, setMessage] = useState('');

  function scrollDownToBottom() {
    const div = document.getElementById('chat-field');
    div.scrollTop = div.scrollHeight;
  }

  useEffect( () => {
    props.getMessages(props.chat.chatNameId._id);
  }, [props.chat.chatNameId])

  useEffect( () => {
    scrollDownToBottom();
  }, [props.chat.messages])

  useEffect( () => {
    socket.on('receiveMessageBack', ({ messageId, userId, chatId, message }) => {
      props.addMessageToChat({_id: messageId, userId, chatId, message, createdAt: new Date()})
    })

    scrollDownToBottom();
    return () => {
      socket.off();
    }
  }, [props.chat])

  function sendMessage(e) {
    if(e._reactName === 'onClick' || e.key === "Enter" && message.trim().length > 0) {
      socket.emit('message', ({ userId: props.actualUser._id, chatId: props.chat.chatNameId._id, message }))
      setMessage('');
    }
  }

  function formatedCreatedAt(createdAt) {
    const monthsMap = new Map()
      .set(0, 'Jan')
      .set(1, 'Feb')
      .set(2, 'Mar')
      .set(3, 'Apr')
      .set(4, 'May')
      .set(5, 'Jun')
      .set(6, 'Jul')
      .set(7, 'Aug')
      .set(8, 'Sep')
      .set(9, 'Oct')
      .set(10, 'Nov')
      .set(11, 'Dec');

    const sendDate = new Date(createdAt);
    const today = new Date();

    if(sendDate.getFullYear() !== today.getFullYear()) {
      return sendDate.getDate() + '.' + monthsMap.get(sendDate.getMonth()) + '.' + sendDate.getFullYear() + ' ' + (sendDate.getHours() + 1) + ':' + sendDate.getMinutes();
    } else if(sendDate.getMonth() !== today.getMonth() || sendDate.getDate() !== today.getDate()) {
      return sendDate.getDate() + '.' + monthsMap.get(sendDate.getMonth()) + ' ' + (sendDate.getHours() + 1) + ':' + sendDate.getMinutes();
    } else {
      return (sendDate.getHours() + 1) + ':' + sendDate.getMinutes();
    }
  }

  const messages = props.chat.messages.map( elem => {
    if(elem.userId !== props.actualUser._id) return <OtherUserMessage user={elem.userId} createdAt={formatedCreatedAt(elem.createdAt)} message={elem.message} key={elem._id} />;
    return <MyMessage user={elem.userId} createdAt={formatedCreatedAt(elem.createdAt)} message={elem.message} key={elem._id} />;
  })

  return (
    <div id='chat-div'>
      <div id='chat-box'>
        <div id='chatbox-name'>
          <div>
            { props.chat.chatNameId === '' ? '' : props.chat.chatNameId.name + ' ' + (props.chat.chatNameId.lastName || '') }
          </div>
        </div>
        <div id='chat-field'>
          { messages }
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
    users: state.user.users,
    actualUser: state.user.actualUser,
    chat: state.chat
  }
}

export default connect(mapStateToProps, { addMessageToChat, getMessages })(ChatBox);
