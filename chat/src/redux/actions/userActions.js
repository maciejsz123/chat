import { SET_LOGIN, SET_PASSWORD, SET_ACTUAL_USER, SET_USERS } from './types';

export const setLogin = (value) => dispatch => {
  dispatch({
    type: SET_LOGIN,
    payload: value
  })
}

export const setPassword = (value) => dispatch => {
  dispatch({
    type: SET_PASSWORD,
    payload: value
  })
}

export const setActualUser = value => dispatch => {
  dispatch({
    type: SET_ACTUAL_USER,
    payload: value
  })
}

export const setUsers = value => dispatch => {
  dispatch({
    type: SET_USERS,
    payload: value
  })
}
