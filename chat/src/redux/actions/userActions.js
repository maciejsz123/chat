import { SET_LOGIN, SET_PASSWORD, SET_ACTUAL_USER, UPDATE_USERS,
  GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_ERROR } from './types';
import axios from 'axios';

export const getUsers = () => async dispatch => {
  dispatch(getUsersRequest());
  try {
    const resp = await axios.get('https://calm-island-98118.herokuapp.com/users');
    dispatch(getUsersSuccess(resp.data));
  } catch(err) {
    dispatch(getUsersError(err))
  }
}

function getUsersRequest() {
  return {
    type: GET_USERS_REQUEST
  }
}

function getUsersSuccess(payload) {
  return {
    type: GET_USERS_SUCCESS,
    payload
  }
}

function getUsersError(payload) {
  return {
    type: GET_USERS_ERROR,
    payload
  }
}

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

export const updateUsers = value => dispatch => {
  dispatch({
    type: UPDATE_USERS,
    payload: value
  })
}
