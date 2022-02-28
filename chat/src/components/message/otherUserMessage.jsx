import React from 'react';
import { connect } from 'react-redux';
import './message.sass';
const avatarStyle = {display: 'flex', padding: '5px', margin: '2px', borderRadius: '100px', border: '1px solid grey', fontSize: '7px', alignSelf: 'center'};

function OtherUserMessage(props) {

  let initials = '';
  let user = '';
  if(props.listOfUsers) {
    user = props.listOfUsers.find( v => v._id === props.user);
    initials = user.name.substring(0,1) + '' + user.lastName.substring(0,1);
  }

  return(
    <div style={{display: 'flex', justifyContent: 'start'}}>
      <div style={avatarStyle} id='avatar'>
        <div className='tooltip tooltip-other-user'>{user.name + ' ' + user.lastName}</div>
        {initials}
      </div>
      <div className='other-user-message'>
        <span>{props.message}</span>
        <span className='send-date'>{props.createdAt}</span>
      </div>
    </div>

  )
}

const mapStateToProps = state => {
  return {
    listOfUsers: state.user.users
  }
}

export default connect(mapStateToProps, {})(OtherUserMessage);
