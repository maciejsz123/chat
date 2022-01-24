import { SET_LOGIN, SET_PASSWORD, SET_ACTUAL_USER, SET_USERS } from '../actions/types';

const initialState = {
  login: 'test',
  password: 'test',
  actualUser: null,
  users: [{
    _id: '',
    name: '',
    lastName: '',
    username: '',
    password: '',
    online: false
  }]
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
    case SET_USERS:
      return {
        ...state,
        users: action.payload
      }
    default:
      return state
  }
}
