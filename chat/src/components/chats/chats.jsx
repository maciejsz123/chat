import React, { useEffect, useState } from 'react';
import './chats.sass';
import { connect } from 'react-redux';
import axios from 'axios';
import { getChat, addChat } from '../../redux/actions/chatActions';
import { setActualUser, updateUsers } from '../../redux/actions/userActions';
import GroupChat from './groupChat';
import PrivateChat from './privateChat';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:5000');

function Chats(props) {
  const [createButtonVisible, setCreateButtonVisible] = useState(true);
  const [groupChatName, setGroupChatName] = useState('');

  useEffect( () => {
    function buttonVisibility(v) {
      if(v.target.id === 'create-chat-button' || v.target.id === 'create-chat-input') {

      } else if(v.target.id !== 'create-chat-button') {
        setCreateButtonVisible(true);
      }
    }
    document.addEventListener('click', buttonVisibility);
    return () => {
      document.removeEventListener('click', buttonVisibility);
    }
  }, [])

  useEffect( () => {
    props.getChat()
  }, [props.chat.chatNameId])

  useEffect( () => {
    socket.on('receiveChatBack', ({ chatId, name, privateType, users }) => {
      props.addChat({_id: chatId, name, privateType, users})
    })

    return () => {
      socket.off();
    }
  }, [props.chat.chat])

  useEffect( () => {
    socket.on('receiveUsersStatusBack', (id) => {
      props.updateUsers(id)
    })
    return () => {
      socket.off();
    }
  })

  useEffect( () => {
    socket.emit('sendUserStatus', (props.users.actualUser._id));
  }, [])

  function createGroup(e) {
    if(e._reactName === 'onClick' || e.key === 'Enter') {
      socket.emit('createChat', ({ name: groupChatName, privateType: false, users: props.users.actualUser._id }))
      setGroupChatName('');
      setCreateButtonVisible(!createButtonVisible);
    }
  }
  console.log(props.chat.chat);
  return (
    <div id='chats'>
      <div>
        <div>
          <div id='chatbox-name'><b>Private</b></div>
          <PrivateChat />
        </div>
        <div>
          <div id='chatbox-name'><b>Group chats</b></div>
          <GroupChat />
        </div>
      </div>
      <div>
        <div>
          <div id='create-chat-div'>
            <img
              alt='CREATE_CHAT'
              src={require('../../imgs/add.png').default}
              id='create-chat-button'
              onClick={ () => setCreateButtonVisible(!createButtonVisible)}
              style={{display: createButtonVisible ? 'block' : 'none'}}
            />
            <div className='group-tooltip'>Create new group</div>
          </div>
          <div style={{display: createButtonVisible ? 'none' : 'block', position: 'relative'}}>
            <input
              id='create-chat-input'
              type='text'
              onKeyDown={ e => createGroup(e)}
              value={groupChatName}
              onChange={ e => setGroupChatName(e.target.value)}
            />
            <div>
              <img
                alt='send'
                src={require('../../imgs/send.png').default}
                style={{width: '30px', position: 'absolute', top: '5px', right: '10px', cursor: 'pointer'}}
                onClick={e => createGroup(e)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    users: state.user,
    chat: state.chat
  }
}

export default connect(mapStateToProps, { getChat, addChat, setActualUser, updateUsers })(Chats);
