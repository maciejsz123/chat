import React from 'react';
import './contacts.sass';
import { connect } from 'react-redux';
import { addChat, setChatName } from '../../redux/actions/chatActions';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:5000');

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

  let users = props.users.users.filter( u => u._id !== props.users.actualUser._id)
    .map( (user, i) => (
    <div key={user._id} className='chat-user-name' onClick={() => createPrivateChat(user)}>{user.name} {user.lastName}</div>
  ))
  return (
    <div id='contacts'>
      <div id='chatbox-name'><b>list of users</b></div>
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
