import React, { useState, useEffect } from 'react';
import './chatBox.sass';
import MyMessage from '../myMessage/myMessage';
import OtherUserMessage from '../otherUserMessage/otherUserMessage';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:5000');

function ChatBox(props) {
  const [response, setResponse] = useState('');
  const [inputData, setInputData] = useState('');
  const [chat, setChat] = useState({chatName: '', messages: []});

  useEffect( () => {
    socket.on('privateMessage', (data) => {
      setResponse(data);
    })
  }, [inputData])

  const addData = (val) => {

    setInputData(val);
    socket.emit('addElem', val)
  }

  useEffect( () => {
    socket.on('chat', (chat) => {
      setChat(chat)
    })
  }, [])

  let elements = [];
  for (const elem of chat.messages) {
    if(elem.user === 'maciej') {
      elements.push(<MyMessage message={elem.message} key={elem.id} />);
    } else {
      elements.push(<OtherUserMessage message={elem.message} key={elem.id}/>);
    }
  }

  function sendMessage(e) {
    if(e._reactName === 'onClick' || e.key === "Enter") {
      socket.emit('addMessage', ({user: 'maciej', message: inputData, id: 4}))
      setInputData('');
    }

  }

  return (
    <div id='chat-div'>
      <div id='chat-box'>
        <div id='chat-name'>
          {chat.chatName}
        </div>
        <div id='chat-field'>
          { elements }
        </div>
      </div>
      <div id='chat-input'>
        <input type='text' value={inputData} onChange={ e => addData(e.target.value)} onKeyDown={(e) => sendMessage(e)}/>
        <div onClick={(e) => sendMessage(e)}>
          <img src={require(`../../imgs/send.png`).default} alt='img' />
        </div>
      </div>
    </div>
  )
}

export default ChatBox;
