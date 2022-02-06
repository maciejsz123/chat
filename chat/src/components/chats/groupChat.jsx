import React from 'react';
import './chats.sass';
import AddUserModal from '../addUserModal/addUserModal';
import { connect } from 'react-redux';
import { setChatName } from '../../redux/actions/chatActions';

function GroupChat(props) {

  function displayUserList(e, id) {
    const elem = document.getElementById(id);
    if(e.target.classList.contains('arrow-active')) {
      e.target.classList.remove('arrow-active')
      elem.classList.remove('group-display-users')
    } else {
      e.target.classList.add('arrow-active');
      elem.classList.add('group-display-users')
    }
  }

  const groupChats = props.chat.chat.filter( v => !v.privateType)
    .filter( v => v.users.includes(props.users.actualUser._id))
    .map( v => (
      <div key={v._id} className='chat-user-name' style={{flexFlow: 'column'}} onClick={() => props.setChatName(v)}>
        <div>
          <div style={{display: 'flex'}}>
            <div className='arrow' onClick={ (e) => displayUserList(e, v._id.concat('-user-list'))}></div>
            <div style={{margin: '0 30px'}}>{v.name}</div>
            <AddUserModal chatId={v._id} />
          </div>
        </div>
        <div id={v._id.concat('-user-list')} className='group-users'>
          <ul>
            {v.users.map( userId => (
              <li key={userId}>
                {props.users.users.filter( user => user._id === userId).map( user => user.name + " " + user.lastName)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    ))

  return (
    <div>
      {groupChats}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    users: state.user,
    chat: state.chat
  }
}

export default connect(mapStateToProps, { setChatName })(GroupChat);
