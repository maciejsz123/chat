import { GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_ERROR,
  SET_CHAT_NAME, ADD_MESSAGE_TO_CHAT, SET_MESSAGES, ADD_CHAT, UPDATE_CHAT } from './types';
import axios from 'axios';

export const getChat = () => async dispatch => {
  dispatch(getChatRequest());
  try {
    const resp = await axios.get('http://localhost:5000/chats');
    dispatch(getChatSuccess(resp.data));
  } catch(err) {
    dispatch(getChatError(err));
  }
}

function getChatRequest() {
  return {
    type: GET_CHAT_REQUEST
  }
}

function getChatSuccess(payload) {
  return {
    type: GET_CHAT_SUCCESS,
    payload
  }
}

function getChatError(payload) {
  return {
    type: GET_CHAT_ERROR,
    payload
  }
}

export const getMessages = (chatId) => async dispatch => {
  dispatch(getMessagesRequest());
  try {
    const resp = await axios.get('http://localhost:5000/messages');
    const filteredResp = resp.data.filter( message => message.chatId === chatId)
    dispatch(getMessagesSuccess(filteredResp.data));
  } catch(err) {
    dispatch(getMessagesError(err));
  }
}

function getMessagesRequest() {
  return {
    type: GET_MESSAGES_REQUEST
  }
}

function getMessagesSuccess(payload) {
  return {
    type: GET_MESSAGES_SUCCESS,
    payload
  }
}

function getMessagesError(payload) {
  return {
    type: GET_MESSAGES_ERROR,
    payload
  }
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
export const updateChat = value => dispatch => {
  dispatch({
    type: UPDATE_CHAT,
    payload: value
  })
}
