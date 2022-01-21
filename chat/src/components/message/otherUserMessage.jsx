import React from 'react';
import { connect } from 'react-redux';
import './message.sass';
const avatarStyle = {display: 'flex', padding: '5px', margin: '2px', borderRadius: '100px', border: '1px solid grey', fontSize: '7px', alignSelf: 'center'};

function OtherUserMessage(props) {

  const user = props.listOfUsers.find( v => v._id === props.user)
  const initials = user.name.substring(0,1) + '' + user.lastName.substring(0,1)

  return(
    <div style={{display: 'flex', justifyContent: 'start'}} id='message'>
      <div className='tooltip'>{user.name + ' ' + user.lastName}</div>
      <div style={avatarStyle}>
        {initials}
      </div>
      <div className='other-user-message'>
        {props.message}
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
