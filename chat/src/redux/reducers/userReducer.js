import { SET_LOGIN, SET_PASSWORD, SET_ACTUAL_USER } from '../actions/types';

const initialState = {
  login: 'test',
  password: 'test',
  actualUser: null
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case SET_LOGIN:
      return {
        ...state,
        login: action.payload
      }
    case SET_PASSWORD:
      return {
        ...state,
        password: action.payload
      }
    case SET_ACTUAL_USER:
      return {
        ...state,
        actualUser: action.payload
      }
    default:
      return state
  }
}
