import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './chatBox.sass';
import MyMessage from '../myMessage/myMessage';
import OtherUserMessage from '../otherUserMessage/otherUserMessage';
import { addMessageToChat, setMessages } from '../../redux/actions/chatActions';
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
    axios.get('http://localhost:5000/messages')
      .then( resp => {
        let elements = resp.data.filter( v => v.chatId === props.chat.chatNameId._id);
        props.setMessages(elements)
      })
      .catch( err => {
        console.log(err);
      })
  }, [props.chat.chatNameId])

  useEffect( () => {
    socket.on('receiveMessageBack', ({ messageId, userId, chatId, message }) => {
      props.addMessageToChat({_id: messageId, userId, chatId, message})
    })

    return () => {
      scrollDownToBottom();
      socket.off();
    }
  }, [props.chat])

  function sendMessage(e) {
    if(e._reactName === 'onClick' || e.key === "Enter") {
      socket.emit('message', ({ userId: props.actualUser._id, chatId: props.chat.chatNameId._id, message }))
      setMessage('');
    }
  }

  const messages = props.chat.messages.map( elem => {
    if(elem.userId !== props.actualUser._id) return <OtherUserMessage user={elem.userId} message={elem.message} key={elem._id} />;
    return <MyMessage user={elem.userId} message={elem.message} key={elem._id} />;
  })

  return (
    <div id='chat-div'>
      <div id='chat-box'>
        <div id='chat-name'>
          <div>
            { props.chat.chatNameId === '' ? '' : props.chat.chatNameId.name + ' ' + (props.chat.chatNameId.lastName || '') }
          </div>
          <div>
            { props.chat.chatNameId.hasOwnProperty('users') ? 'lista rozwijana' : ''}
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

export default connect(mapStateToProps, { addMessageToChat, setMessages })(ChatBox);
