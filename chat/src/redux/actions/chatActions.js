import { SET_CHAT, SET_CHAT_NAME, ADD_MESSAGE_TO_CHAT } from './types';

export default setChat = value => dispatch => {
  dispatch({
    type: SET_CHAT,
    payload: value
  })
}

export default setChatName = value => dispatch => {
  dispatch({
    type: SET_CHAT_NAME,
    payload: value
  })
}

export default addMessageToChat = value => dispatch => {
  dispatch({
    type: ADD_MESSAGE_TO_CHAT,
    payload: value
  })
}
