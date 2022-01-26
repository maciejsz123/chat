import React, { useEffect, useState } from 'react';
import './chats.sass';
import { connect } from 'react-redux';
import axios from 'axios';
import { setChat, setChatName, addChat } from '../../redux/actions/chatActions';
import { setActualUser, updateUsers } from '../../redux/actions/userActions';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:5000');

function Chats(props) {
  const [createButtonVisible, setCreateButtonVisible] = useState(true);
  const [groupChatName, setGroupChatName] = useState('');

  useEffect( () => {
    document.addEventListener( 'click', v => {
      if(v.target.id === 'create-chat-button' || v.target.id === 'create-chat-input') {

      } else if(v.target.id !== 'create-chat-button') {
        setCreateButtonVisible(true);
      }
    })
    window.onbeforeunload = function() {//logout user
      if(props.users.actualUser) {
        axios.post('http://localhost:5000/users/updateOnline', {
          id: props.users.actualUser._id,
          online: false
        })
        .then( res => {
          console.log(res.data);
          props.setActualUser(null);
        })
        .catch(err => {
          console.log(err);
        })
      }
    }
  }, [])

  useEffect( () => {
    axios.get('http://localhost:5000/chats')
      .then( resp => {
        props.setChat(resp.data)
      })
      .catch( err => {
        console.log(err);
      })
  }, [props.chat.chatNameId])

  useEffect( () => {
    socket.on('receiveChatBack', ({ chatId, name, privateType, users }) => {
      props.addChat({_id: chatId, name, privateType, users})
    })

    return () => {
      socket.off();
    }
  }, [props.chat])

  useEffect( () => {
    socket.on('receiveOnlineUsersBack', ({data}) => {
      console.log(data);
      props.updateUsers({ _id: data.userId, online: data.online })
    })
    return () => {
      socket.off();
    }
  }, [props.users])

  function createGroup(e) {
    if(e._reactName === 'onClick' || e.key === 'Enter') {
      socket.emit('createChat', ({ name: groupChatName, privateType: false, users: props.users.actualUser._id }))
      setGroupChatName('');
      setCreateButtonVisible(!createButtonVisible);
    }
  }

  let groupChats = props.chat.chat.filter( v => !v.privateType)
    .filter( v => v.users.includes(props.users.actualUser._id))
    .map( v => (
      <div key={v._id} className='chat-user-name' onClick={() => props.setChatName(v)}>{v.name}</div>
    ))

  let privateChats = props.chat.chat.filter( v => v.privateType && v.users.includes(props.users.actualUser._id))
    .reduce( (prev, current) => {
      if(current.users[0] !== props.users.actualUser._id) {
          return [...prev, {
            userId: current.users[0],
            _id: current._id,
            name: props.users.users.find( u => u._id === current.users[0]).name,
            lastName: props.users.users.find( u => u._id === current.users[0]).lastName,
            online: props.users.users.find( u => u._id === current.users[0]).online
          }];
        }
      return [...prev, {
        userId: current.users[1],
        _id: current._id,
        name: props.users.users.find( u => u._id === current.users[1]).name,
        lastName: props.users.users.find( u => u._id === current.users[1]).lastName,
        online: props.users.users.find( u => u._id === current.users[1]).online
      }];
    }, [])
    .map( v => (
      <div key={v._id} className='chat-user-name' onClick={ () => props.setChatName(v)}>
        <div>
          {v.online ? <div className='online-dot'></div> : <div className='offline-dot'></div>}
        </div>
        <div>
          {v.name} {v.lastName}
        </div>
      </div>
    ));

  return (
    <div id='chats'>
      <div>
        <div>
          <div id='chatbox-name'><b>Private</b></div>
          {privateChats}
        </div>
        <div>
          <div id='chatbox-name'><b>Group chats</b></div>
          {groupChats}
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

export default connect(mapStateToProps, { setChat, setChatName, addChat, setActualUser, updateUsers })(Chats);
