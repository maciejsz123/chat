import { SET_LOGIN, SET_PASSWORD } from './types';

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
