import { SET_LOGIN, SET_PASSWORD } from '../actions/types';

const initialState = {
  login: 'qwer1234',
  password: 'qwer',
  logged: true
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
    default:
      return state
  }
}
