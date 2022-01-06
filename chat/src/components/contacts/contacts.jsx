import React from 'react';
import './contacts.sass';
import { connect } from 'react-redux';

function Contacts(props) {
  let users = props.users.map( (user, i) => (
    <div key={i}>{user.name} {user.lastName}</div>
  ))
  return (
    <div id='contacts'>
      {users}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    users: state.user.users
  }
}

export default connect(mapStateToProps)(Contacts);
