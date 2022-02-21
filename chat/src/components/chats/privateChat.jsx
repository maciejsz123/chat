import React from 'react';
import './chats.sass';
import { connect } from 'react-redux';
import { setChatName } from '../../redux/actions/chatActions';
function PrivateChat(props) {
  if(!props.users.users[0]._id) return <div></div>;

  const privateChats = props.chat.chat.filter( v => v.privateType && v.users.includes(props.users.actualUser._id))
    .reduce( (prev, current) => {
      if(current.users[0] !== props.users.actualUser._id) {
          return [...prev, {
            userId: current.users[0],
            _id: current._id,
            name: props.users.users.find( u => u._id === current.users[0]).name,
            lastName: props.users.users.find( u => u._id === current.users[0]).lastName,
            online: props.users.usersOnline.includes(current.users[0])
          }];
        }
      return [...prev, {
        userId: current.users[1],
        _id: current._id,
        name: props.users.users.find( u => u._id === current.users[1]).name,
        lastName: props.users.users.find( u => u._id === current.users[1]).lastName,
        online: props.users.usersOnline.includes(current.users[1])
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
    <div>
      {privateChats}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    users: state.user,
    chat: state.chat
  }
}

export default connect(mapStateToProps, { setChatName })(PrivateChat);
