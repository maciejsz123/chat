import { SET_CHAT, SET_CHAT_NAME, ADD_MESSAGE_TO_CHAT, SET_MESSAGES } from '../actions/types';

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
      return{
        ...state,
        chatName: action.payload
      }
    case ADD_MESSAGE_TO_CHAT:
      return {
        ...state,
        messages: [...state.messages, action.payload]
      }
    case SET_MESSAGES:
      return {
        ...state,
        messages: action.payload
      }
    default:
      return state
  }
}

export default chatReducer;
