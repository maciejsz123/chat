import React, { useEffect } from 'react';
import './contacts.sass';
import { connect } from 'react-redux';
import { addChat, setChatName } from '../../redux/actions/chatActions';
import io from 'socket.io-client';
const socket = io.connect('/');

function Contacts(props) {
  function createPrivateChat(user) {
    const usersArray = [props.users.actualUser._id, user._id];

    const check = props.chats.chat.filter( u => u.privateType)
      .filter( u => u.users.includes(usersArray[0]) && u.users.includes(usersArray[1]) )

    if(check.length === 0) {
      socket.emit('createChat', ({ name: 'private', privateType: true, users: usersArray }))
    } else {
      props.setChatName({ _id: check[0]._id, userId: user._id, name: user.name, lastName: user.lastName})
    }
  }

  useEffect( () => {
    socket.on('receiveChatBack', ({ chatId, name, privateType, users }) => {
      if(privateType) {
        const userData = props.users.users.filter( user => user._id !== props.users.actualUser._id && users.flat().includes(user._id))
          .flat();
        props.setChatName({ _id: chatId, userId: userData[0]._id, name: userData[0].name, lastName: userData[0].lastName})
      }
    })

    return () => {
      socket.off();
    }
  })

  let users = props.users.users.filter( u => u._id !== props.users.actualUser._id)
    .map( (user, i) => (
    <div key={user._id} className='chat-user-name' onClick={() => createPrivateChat(user)}>{user.name} {user.lastName}</div>
  ))
  return (
    <div id='contacts'>
      <div id='chatbox-name'>
        <b>list of users</b>
      </div>
      {users}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    users: state.user,
    chats: state.chat
  }
}

export default connect(mapStateToProps, { addChat, setChatName })(Contacts);
