import React, { useState, useEffect } from 'react';
import './chatBox.sass';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:5000');

function ChatBox(props) {
  const [response, setResponse] = useState('');
  const [inputData, setInputData] = useState('');

  useEffect( () => {
    socket.on('privateMessage', (data) => {
      setResponse(data);
    })
  }, [inputData])

  const addData = (val) => {

    setInputData(val);
    socket.emit('addElem', val)
  }

  return (
    <div id='chat-div'>
      <div id='chat-box'>
        <div id='chat-name'>
          {response}
        </div>
        <div id='chat-field'>
          chat field
        </div>
      </div>
      <div id='chat-input'>
        <input type='text' value={inputData} onChange={ e => addData(e.target.value)}/>
      </div>
    </div>
  )
}

export default ChatBox;
