import React, { useState, useEffect } from 'react';
import './chats.sass';
import { connect } from 'react-redux';
import { setChat, setChatName } from '../../redux/chatActions';

function Chats(props) {
  useEffect( () => {
    axios.get('http://localhost:5000/messages')
      .then( resp => {
        props.setChat(resp.data)
      })
      .catch( err => {
        console.log(err);
      })
  }, [, props.chat.chatName])

  let privateChats = props.chat.filter( v => v.chatType === 'private')
    .map( v => {
      if(v) {
        return (
          <div key={v._id} onClick={() => props.setChatName(v.chatName)}>{v.chatName}</div>
        )
      }
    })

  let privateChats = props.chat.filter( v => v.chatType === 'groupChat')
    .map( v => {
      if(v) {
        return (
          <div key={v._id} onClick={() => props.setChatName(v.chatName)}>{v.chatName}</div>
        )
      }
    })

  return (
    <div id='chats'>
      <div>
        <div>Private</div>
        {privateChats}
      </div>
      <div>
        <div>Group chats</div>
        {groupChat}
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
