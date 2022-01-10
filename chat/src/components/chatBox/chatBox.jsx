import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './chatBox.sass';
import MyMessage from '../myMessage/myMessage';
import OtherUserMessage from '../otherUserMessage/otherUserMessage';
import axios from 'axios';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:5000');

function ChatBox(props) {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect( () => {
    axios.get('http://localhost:5000/messages')
      .then( resp => {
        setChat(resp.data)
      })
      .catch( err => {
        console.log(err);
      })
  }, [])

  useEffect( () => {
    socket.on('receiveMessageBack', ({ messageId, userId, chatName, message }) => {
      setChat([...chat, {_id: messageId, userId, chatName, message}])
    })

    return () => {
      socket.off();
    }
  }, [chat])

  const elements = [];
  for (const elem of chat) {
    if(elem.userId === props.actualUser._id) {
      elements.push(<MyMessage message={elem.message} key={elem._id} />);
    } else {
      elements.push(<OtherUserMessage message={elem.message} key={elem._id}/>);
    }
  }

  function sendMessage(e) {
    if(e._reactName === 'onClick' || e.key === "Enter") {
      socket.emit('message', ({userId: props.actualUser._id, chatName: 'private', message: message}))
      setMessage('');
    }
  }
  console.log(chat);
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
    actualUser: state.user.actualUser
  }
}

export default connect(mapStateToProps, {})(ChatBox);
