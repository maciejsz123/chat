import { SET_LOGIN, SET_PASSWORD, SET_ACTUAL_USER, SET_USERS, UPDATE_USERS } from '../actions/types';

const initialState = {
  login: 'test',
  password: 'test',
  actualUser: null,
  users: [{
    _id: '',
    name: '',
    lastName: '',
    username: '',
    password: ''
  }],
  usersOnline: []
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
    case UPDATE_USERS:
      const usersOnlineArray = Object.keys(action.payload.usersOnline).map( key => action.payload.usersOnline[key])
        .reduce( (acc, current) => {
          if(acc.includes(current)) return acc;
          return [...acc, current]
        }, [])

      return {
        ...state,
        usersOnline: usersOnlineArray
      }
    default:
      return state
  }
}
