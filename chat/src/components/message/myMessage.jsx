import React from 'react';
import { connect } from 'react-redux';
import './message.sass';
const avatarStyle = {display: 'flex', padding: '5px', margin: '2px', borderRadius: '100px', border: '1px solid grey', fontSize: '7px', alignSelf: 'center'};

function MyMessage(props) {

  let initials = '';
  let user = '';
  if(props.listOfUsers.length) {
    user = props.listOfUsers.find( v => v._id === props.user);
    initials = user.name.substring(0,1) + '' + user.lastName.substring(0,1);
  }

  return(
    <div style={{display: 'flex', justifyContent: 'end'}}>
      <div className='actual-user-message'>
        <span>{props.message}</span>
        <span className='send-date'>{props.createdAt}</span>
      </div>
      <div style={avatarStyle} id='avatar'>
        <div className='tooltip tootlip-actual-user'>{user.name + ' ' + user.lastName}</div>
        {initials}
      </div>
    </div>

  )
}
const mapStateToProps = state => {
  return {
    listOfUsers: state.user.users
  }
}

export default connect(mapStateToProps, {})(MyMessage);
