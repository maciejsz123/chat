import { SET_CHAT, SET_CHAT_NAME, ADD_MESSAGE_TO_CHAT, SET_MESSAGES, ADD_CHAT } from '../actions/types';

const initialState = {
  chat: [],
  messages: [],
  chatNameId: ''
}

const chatReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_CHAT:
      return {
        ...state,
        chat: action.payload
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
    case SET_MESSAGES:
      return {
        ...state,
        messages: action.payload
      }
    case ADD_CHAT:
      return {
        ...state,
        chat: [...state.chat, action.payload]
      }
    default:
      return state
  }
}

export default chatReducer;
