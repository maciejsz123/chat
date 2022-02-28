import { SET_LOGIN, SET_PASSWORD, SET_ACTUAL_USER,
  GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_ERROR,
  UPDATE_USERS } from '../actions/types';

const initialState = {
  login: 'test',
  password: 'test',
  actualUser: null,
  loading: false,
  error: null,
  usersOnline: [],
  users: []
}

const userReducer = (state = initialState, action) => {
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
    case GET_USERS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload
      }
    case GET_USERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        users: []
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


export default userReducer;
