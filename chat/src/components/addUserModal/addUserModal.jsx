import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './addUserModal.sass';

function AddUserModal(props) {
  const [filterName, setFilterName] = useState('');

  useEffect( () => {
    function hideModalListener(e) {
      if(e.target.className === 'modal') {
        hideModal(props.chatId)
      }
    }
    document.addEventListener( 'click', hideModalListener);
    return () => {
      document.removeEventListener('click', hideModalListener);
    }
  }, [])

  function displayModal(e, id) {
    let elem = document.getElementById(id + 'chat');
    elem.style.display = 'block';
  }

  function hideModal(id) {
    let elem = document.getElementById(id + 'chat');
    elem.style.display = 'none';
  }

  function addUserToGroup(userId) {
    console.log(userId);
  }

  return (
    <div>
      <div onClick={ (e) => displayModal(e, props.chatId)}>
        <img src={require('../../imgs/add-user.png').default} alt='add-user' style={{width: '20px'}}/>
      </div>
      <div className='modal' id={`${props.chatId}chat`}>
        <div className='modal-window'>
          <div className='close-button' onClick={ ()=> hideModal(props.chatId)}>
            <img alt='close' src={require('../../imgs/close-button.png').default} style={{width: '25px'}}/>
          </div>
          <input value={filterName} onChange={ e => setFilterName(e.target.value)} placeholder='search user'/>
          <div>
            {
              props.users.users.filter( user => user.name.toLowerCase().includes(filterName.toLowerCase()) || user.lastName.toLowerCase().includes(filterName.toLowerCase()))
                .filter( (user, i) => i<15)
                .map( user => (
                  <div className='user-list-item' key={user._id}>
                    <span>{user.name + " " + user.lastName}</span>
                    <img className='add-user-icon' alt='add_user' src={require('../../imgs/add-user.png').default} onClick={ () => addUserToGroup(user._id)} />
                  </div>
                ))
            }
          </div>
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
