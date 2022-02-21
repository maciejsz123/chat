import {  GET_CHAT_REQUEST, GET_CHAT_SUCCESS, GET_CHAT_ERROR,
  SET_CHAT_NAME, ADD_MESSAGE_TO_CHAT, SET_MESSAGES, ADD_CHAT, UPDATE_CHAT } from '../actions/types';

const initialState = {
  chatNameId: '',
  chat: [],
  chatLoading: false,
  chatError: null,
  messages: [],
  messagesLoading: false,
  messagesError: null
}

const chatReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_CHAT_REQUEST:
      return {
        ...state,
        chatLoading: true
      }
    case GET_CHAT_SUCCESS:
      return {
        ...state,
        chatLoading: false,
        chat: action.payload
      }
    case GET_CHAT_ERROR:
      return {
        ...state,
        chatLoading: false,
        chatError: action.payload
      }
    case SET_CHAT_NAME:
      return {
        ...state,
        chatNameId: action.payload
      }
    case ADD_MESSAGE_TO_CHAT:
      if(state.chatNameId._id !== action.payload.chatId) return state

      return {
        ...state,
        messages: [...state.messages, action.payload]
      }
    case GET_MESSAGES_REQUEST:
      return {
        ...state,
        messagesLoading: true
      }
    case GET_MESSAGES_SUCCESS:
      return {
        ...state,
        messagesLoading: false,
        messages: action.payload
      }
    case GET_MESSAGES_ERROR:
      return {
        ...state,
        messagesLoading: false,
        messagesError: action.payload
      }
    case ADD_CHAT:
      return {
        ...state,
        chat: [...state.chat, action.payload]
      }
    case UPDATE_CHAT:
    console.log(action.payload);
      return {
        ...state,
        chat: state.chat.reduce( (accumulator, chat) => {
          if(chat._id === action.payload._id) {
            return [...accumulator, action.payload]
          }
          return [...accumulator, chat]
        }, [])
      }
    default:
      return state
  }
}

export default chatReducer;
