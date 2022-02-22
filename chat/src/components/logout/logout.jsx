import React from 'react';
import './logout.sass';
import { setActualUser } from '../../redux/actions/userActions';
import { setChatName } from '../../redux/actions/chatActions';
import { connect } from 'react-redux';
import io from 'socket.io-client';
const socket = io.connect('/');

function Logout(props) {
  function logout() {
    socket.emit('logout', (props.users.actualUser._id));
    props.setActualUser(null);
    props.setChatName('');
  }

  return (
    <div>
      <button type='button' id='logout-button' onClick={logout}>Logout</button>
    </div>
  )
}

const mapStateToProps = (state) => ({
  users: state.user
})

export default connect(mapStateToProps, { setActualUser, setChatName })(Logout);
