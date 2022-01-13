import React, { useEffect } from 'react';
import './chats.sass';
import { connect } from 'react-redux';
import axios from 'axios';
import { setChat, setChatName } from '../../redux/actions/chatActions';

function Chats(props) {
  useEffect( () => {
    axios.get('http://localhost:5000/chats')
      .then( resp => {
        props.setChat(resp.data)
      })
      .catch( err => {
        console.log(err);
      })
  }, [props.chat.name])

  let privateChats = props.chat.chat.filter( v => v.privateType)
    .map( v => (
      <div key={v._id} onClick={() => props.setChatName(v.name)}>{v.name}</div>
    ))

  let groupChats = props.chat.chat.filter( v => !v.privateType)
    .map( v => (
      <div key={v._id} onClick={() => props.setChatName(v.name)}>{v.name}</div>
    ))

  return (
    <div id='chats'>
      <div>
        <div>Private</div>
        {privateChats}
      </div>
      <div>
        <div>Group chats</div>
        {groupChats}
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    users: state.user.users,
    chat: state.chat
  }
}

export default connect(mapStateToProps, { setChat, setChatName })(Chats);
