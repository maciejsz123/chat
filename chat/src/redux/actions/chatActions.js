import { SET_CHAT, SET_CHAT_NAME, ADD_MESSAGE_TO_CHAT, SET_MESSAGES, ADD_CHAT } from './types';

export const setChat = value => dispatch => {
  dispatch({
    type: SET_CHAT,
    payload: value
  })
}

export const setMessages = value => dispatch => {
  dispatch({
    type: SET_MESSAGES,
    payload: value
  })
}

export const setChatName = value => dispatch => {
  dispatch({
    type: SET_CHAT_NAME,
    payload: value
  })
}

export const addMessageToChat = value => dispatch => {
  dispatch({
    type: ADD_MESSAGE_TO_CHAT,
    payload: value
  })
}
export const addChat = value => dispatch => {
  dispatch({
    type: ADD_CHAT,
    payload: value
  })
}
