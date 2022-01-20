import React from 'react';
import { connect } from 'react-redux';
const messageStyle = {display: 'flex', padding: '5px', margin: '2px', backgroundColor: 'blue', borderRadius: '10px'};
const avatarStyle = {display: 'flex', padding: '5px', margin: '2px', borderRadius: '100px', border: '1px solid grey', fontSize: '7px', alignSelf: 'center'};

function MyMessage(props) {

  const user = props.listOfUsers.find( v => v._id === props.user)
  const initials = user.name.substring(0,1) + '' + user.lastName.substring(0,1)

  return(
    <div style={{display: 'flex', justifyContent: 'end'}}>
      <div style={messageStyle}>
        {props.message}
      </div>
      <div style={avatarStyle}>
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
