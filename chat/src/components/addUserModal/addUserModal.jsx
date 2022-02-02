import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './addUserModal.sass';

function AddUserModal(props) {
  const [name, setName] = useState('');

  useEffect( () => {
    window.addEventListener( 'click', (e) => {
      if(e.target.className === 'modal') {
        hideModal(props.chatId)
      }
    })
  }, [])

  function displayModal(e, id) {
    let elem = document.getElementById(id + 'chat');
    elem.style.display = 'block';
  }

  function hideModal(id) {
    let elem = document.getElementById(id + 'chat');
    elem.style.display = 'none';
  }

  return (
    <div>
      <div onClick={ (e) => displayModal(e, props.chatId)}>
        <span>Add user</span>
      </div>
      <div className='modal' id={`${props.chatId}chat`}>
        <div className='modal-window'>
          <div onClick={ ()=> hideModal(props.chatId)}>close</div>
          <input value={name} onChange={ e => setName(e.target.value)} placeholder='search user'/>
          <div>
            list of names
          </div>
          <button type='button'>add</button>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    users: state.user,
    chat: state.chat
  }
}

export default connect(mapStateToProps, { })(AddUserModal);
