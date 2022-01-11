import { SET_CHAT, SET_CHAT_NAME, ADD_MESSAGE_TO_CHAT } from '../actions/types';

const initialState = {
  chat: [],
  chatName: ''
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
        ..state,
        chatName: action.payload
      }
    case ADD_MESSAGE_TO_CHAT:
      return {
        ...state,
        chat: [...state.chat, action.payload]
      }
    default:
      return state
  }
}

export default chatReducer;
